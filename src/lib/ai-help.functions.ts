import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AskInput = z.object({
  question: z.string().min(2).max(2000),
  context: z.string().max(2000).optional(),
});

export const askStudyAi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AskInput.parse(input))
  .handler(async ({ data }) => {
    const openRouterKey = process.env["OPENROUTER_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    if (!openRouterKey && !lovableKey) throw new Error("AI is not configured for this project yet.");

    const { streamText } = await import("ai");
    const { createLovableAiGatewayProvider, createOpenRouterProvider, OPENROUTER_MODEL } =
      await import("./ai-gateway.server");
    const { ASK_SYSTEM, friendlyAiError } = await import("./ai-help.server");

    const useOpenRouter = Boolean(openRouterKey);
    const gateway = useOpenRouter
      ? createOpenRouterProvider(openRouterKey!)
      : createLovableAiGatewayProvider(lovableKey!);

    const prompt = [
      data.context ? `The student is currently studying: ${data.context}` : "",
      data.question,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const result = streamText({
        model: gateway(useOpenRouter ? OPENROUTER_MODEL : "openai/gpt-5.6-sol"),
        system: ASK_SYSTEM,
        prompt,
        ...(useOpenRouter ? {} : { providerOptions: { lovable: { reasoningEffort: "none" } } }),
      });
      const answer = await result.text;
      return { answer: answer.trim() };
    } catch (error) {
      throw new Error(friendlyAiError(error));
    }
  });
