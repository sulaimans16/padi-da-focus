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

export const OPENROUTER_MODEL = "openai/gpt-4o";

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
      "HTTP-Referer": "https://padi-da-focus.lovable.app",
      "X-Title": "PadiDa",
    },
  });
}
