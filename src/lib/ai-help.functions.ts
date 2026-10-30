import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const AskInput = z.object({
  question: z.string().min(2).max(2000),
  context: z.string().max(2000).optional(),
  exam: z.enum(["neet_pg", "neet_ug"]).optional(),
  /** Earlier turns of this chat, oldest first. */
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .max(6)
    .optional(),
  /** What is on screen (see ai-page-context.ts). */
  page: z
    .object({
      path: z.string().max(200),
      question: z
        .object({
          subject: z.string().max(100),
          topic: z.string().max(200),
          stem: z.string().max(2000),
          options: z.array(z.string().max(300)).max(6),
          answer: z.string().max(300),
          explanation: z.string().max(1500),
          answered: z.boolean(),
        })
        .optional(),
      lesson: z.object({ module: z.string().max(80), concept: z.string().max(120) }).optional(),
    })
    .optional(),
});

export const askStudyAi = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AskInput.parse(input))
  .handler(async ({ data, context }) => {
    const { assertPro } = await import("./access.server");
    await assertPro(context.supabase, context.userId);
    const openRouterKey = process.env["OPENROUTER_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    if (!openRouterKey && !lovableKey)
      throw new Error("AI is not configured for this project yet.");

    const { generateText } = await import("ai");
    const {
      createLovableAiGatewayProvider,
      createOpenRouterProvider,
      openRouterModels,
      withModelFallback,
    } = await import("./ai-gateway.server");
    const { ASK_SYSTEM, ASK_SYSTEM_UG, friendlyAiError } = await import("./ai-help.server");

    const useOpenRouter = Boolean(openRouterKey);
    const gateway = useOpenRouter
      ? createOpenRouterProvider(openRouterKey!)
      : createLovableAiGatewayProvider(lovableKey!);

    const exam = data.exam ?? "neet_pg";
    const { buildLearnerContext, appKnowledge } = await import("./ai-context.server");
    const learner = await buildLearnerContext(context.supabase, context.userId, exam).catch(
      (e: unknown) => {
        console.error("learner context failed", e);
        return "Unavailable right now.";
      },
    );
    const prompt = [
      `## Learner data (live from their account)\n${learner}`,
      appKnowledge(exam, data.question, data.page),
      data.context && !data.page ? `The student is currently studying: ${data.context}` : "",
      `## Question\n${data.question}`,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const ask = (model: string) =>
        generateText({
          model: gateway(model),
          system: exam === "neet_ug" ? ASK_SYSTEM_UG : ASK_SYSTEM,
          messages: [...(data.history ?? []), { role: "user" as const, content: prompt }],
          ...(useOpenRouter
            ? { maxOutputTokens: 4000, providerOptions: { openrouter: { reasoningEffort: "low" } } }
            : { providerOptions: { lovable: { reasoningEffort: "none" } } }),
        }).then((r) => {
          // An empty reply (e.g. all tokens spent reasoning) counts as a failure.
          if (!r.text.trim()) throw new Error("no usable answer");
          return r;
        });
      const result = useOpenRouter
        ? await withModelFallback(openRouterModels(), ask)
        : await ask("openai/gpt-5.6-sol");
      const answer = result.text;
      return { answer: answer.trim() };
    } catch (error) {
      console.error("askStudyAi failed", error);
      throw new Error(friendlyAiError(error));
    }
  });
