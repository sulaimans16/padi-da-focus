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
 * OpenRouter model for every AI feature. Set OPENROUTER_MODEL in the hosting
 * environment to switch models without a code change (free models come and go).
 */
export const OPENROUTER_MODEL =
  process.env["OPENROUTER_MODEL"]?.trim() || "nvidia/nemotron-3-super-120b-a12b:free";

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
