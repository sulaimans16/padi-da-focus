import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createLovableAiGatewayProvider(
  lovableApiKey: string,
  options?: { structuredOutputs?: boolean },
) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    supportsStructuredOutputs: options?.structuredOutputs ?? false,
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

/**
 * OpenRouter models, tried in order. Free models come and go on OpenRouter (two
 * have been withdrawn already), so a missing, rate-limited or failing model
 * falls through to the next one, ending with a cheap paid model so the AI never
 * goes down. Override with OPENROUTER_MODEL (first choice) and
 * OPENROUTER_FALLBACK_MODELS (comma-separated) in the hosting environment.
 */
const DEFAULT_MODELS = [
  "nvidia/nemotron-3.5-super-vl:free",
  "google/gemma-4-31b-it:free",
  "openai/gpt-4o-mini",
];

export function openRouterModels(): string[] {
  const first = process.env["OPENROUTER_MODEL"]?.trim();
  const fallbacks = process.env["OPENROUTER_FALLBACK_MODELS"]
    ?.split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  const list = [...(first ? [first] : []), ...(fallbacks?.length ? fallbacks : DEFAULT_MODELS)];
  return [...new Set(list)];
}

/** First choice, for callers that only need one model id. */
export const OPENROUTER_MODEL = openRouterModels()[0]!;

/** Errors worth trying the next model for (gone, busy, broken output) — not bad keys or credits. */
export function isRetriableAiError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/\b401\b|\b402\b|\b403\b|unauthor|credit|insufficient/i.test(message)) return false;
  return /no endpoints|not a valid model|model.*(not found|unavailable|does not exist)|\b404\b|\b408\b|\b429\b|rate.?limit|overloaded|\b5\d\d\b|timeout|timed out|provider returned error|no usable|no object generated|could not parse/i.test(
    message,
  );
}

/**
 * Run an AI call against each OpenRouter model in turn until one succeeds.
 * `run` gets the model id; throw from it (e.g. on unusable output) to try the next.
 */
export async function withModelFallback<T>(
  models: string[],
  run: (model: string) => Promise<T>,
): Promise<T> {
  let last: unknown = new Error("No AI model is configured.");
  for (const [i, model] of models.entries()) {
    try {
      return await run(model);
    } catch (error) {
      last = error;
      const retry = i < models.length - 1 && isRetriableAiError(error);
      console.warn(
        `[ai] ${model} failed${retry ? ", trying the next model" : ""}:`,
        error instanceof Error ? error.message : error,
      );
      if (!retry) break;
    }
  }
  throw last;
}

export function createOpenRouterProvider(
  apiKey: string,
  options?: { structuredOutputs?: boolean },
) {
  return createOpenAICompatible({
    name: "openrouter",
    baseURL: "https://openrouter.ai/api/v1",
    supportsStructuredOutputs: options?.structuredOutputs ?? false,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://pg-pre.learners-studio.com",
      "X-Title": "PG Prep",
    },
  });
}
