import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GenerateInput = z.object({
  subject: z.string(),
  topic: z.string(),
  count: z.number(),
  avoid: z.array(z.string()),
});

const QuestionSchema = z.object({
  topic: z.string(),
  stem: z.string(),
  options: z.array(z.object({ id: z.string(), text: z.string() })),
  correctOptionId: z.string(),
  oneLiner: z.string(),
  explanation: z.string(),
  distractors: z.array(z.object({ optionId: z.string(), why: z.string() })),
  highYield: z.string(),
  difficulty: z.string(),
  isPyq: z.boolean(),
  pyqYear: z.number().nullable(),
  repeatCount: z.number().nullable(),
});

const BatchSchema = z.object({ questions: z.array(QuestionSchema) });

const SYSTEM = [
  "You are a senior NEET PG (Indian postgraduate medical entrance) question setter.",
  "Write NBE-style single-best-answer MCQs at real exam difficulty: clinical vignettes,",
  "high-yield recall, and image-free reasoning. Exactly 4 options with ids a, b, c, d.",
  "Every fact must be standard textbook medicine (Harrison, Robbins, Katzung, Williams,",
  "Park, Ganong, Bailey & Love). Never invent drugs, doses, or eponyms.",
  "oneLiner: one crisp sentence a tired student can read at 2am.",
  "explanation: 2-4 sentences of reasoning.",
  "distractors: one entry per WRONG option id saying exactly why it is wrong.",
  "highYield: a one-line fact box worth memorising.",
  "difficulty: one of easy, med, hard.",
  "isPyq: true only for concepts genuinely repeated in past NEET PG/AIIMS/INICET papers;",
  "then set pyqYear (2015-2025) and repeatCount (1-6). Otherwise both null.",
  "Never repeat a stem concept already listed as covered.",
].join(" ");

export const generateQuestionBatch = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const openRouterKey = process.env["OPENROUTER_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    if (!openRouterKey && !lovableKey) throw new Error("AI is not configured for this project yet.");

    const { generateText, Output, NoObjectGeneratedError } = await import("ai");
    const { createLovableAiGatewayProvider, createOpenRouterProvider, OPENROUTER_MODEL } =
      await import("./ai-gateway.server");
    const { researchTopic } = await import("./web-research.server");

    const count = Math.max(1, Math.min(10, Math.round(data.count)));
    const topicLine =
      data.topic === "all"
        ? `Spread them across the major high-yield topics of ${data.subject}.`
        : `All of them must be on the topic "${data.topic}" within ${data.subject}.`;

    // Scout the public web first so questions mirror what is actually being asked/discussed.
    const sources = await researchTopic(data.subject, data.topic);
    const researchBlock = sources.length
      ? [
          "Use the following freshly scouted web material as your factual and pattern reference.",
          "Only keep facts that agree with standard textbooks; ignore anything dubious or promotional.",
          ...sources.map((s, i) => `[S${i + 1}] ${s.title} (${s.url})\n${s.text.slice(0, 2500)}`),
        ].join("\n\n")
      : "";

    const prompt = [
      `Write ${count} NEET PG questions for the subject "${data.subject}".`,
      topicLine,
      researchBlock,
      data.avoid.length
        ? `Already covered (do NOT repeat these concepts): ${data.avoid.slice(0, 60).join(" | ")}`
        : "",
      "Return only the JSON object described by the schema.",
    ]
      .filter(Boolean)
      .join("\n");

    const useOpenRouter = Boolean(openRouterKey);
    const gateway = useOpenRouter
      ? createOpenRouterProvider(openRouterKey!, { structuredOutputs: true })
      : createLovableAiGatewayProvider(lovableKey!, { structuredOutputs: true });
    const modelId = useOpenRouter ? OPENROUTER_MODEL : "openai/gpt-5.6-sol";

    let parsed: z.infer<typeof BatchSchema> | null = null;
    try {
      const { output } = await generateText({
        model: gateway(modelId),
        system: SYSTEM,
        prompt,
        output: Output.object({ schema: BatchSchema }),
        ...(useOpenRouter ? {} : { providerOptions: { lovable: { reasoningEffort: "none" } } }),
      });
      parsed = output;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error) && error.text) {
        const match = error.text.match(/\{[\s\S]*\}/);
        if (match) {
          const safe = BatchSchema.safeParse(JSON.parse(match[0]));
          if (safe.success) parsed = safe.data;
        }
      }
      if (!parsed) {
        const message = error instanceof Error ? error.message : "AI generation failed.";
        throw new Error(
          /429|rate/i.test(message)
            ? "AI is rate limited right now — wait a few seconds and try again."
            : /402|credit/i.test(message)
              ? "AI credits are exhausted for this workspace."
              : message,
        );
      }
    }

    if (!parsed) throw new Error("AI returned no usable questions.");

    const rows = parsed.questions
      .filter(
        (q) =>
          q.stem.trim() &&
          q.options.length === 4 &&
          q.options.some((o) => o.id === q.correctOptionId),
      )
      .map((q) => ({
        subject: data.subject,
        topic: (data.topic === "all" ? q.topic : data.topic).trim() || "Mixed",
        stem: q.stem.trim(),
        options: q.options.map((o) => ({ id: o.id, text: o.text.trim() })),
        correct_option_id: q.correctOptionId,
        one_liner: q.oneLiner.trim(),
        explanation: q.explanation.trim(),
        distractors: Object.fromEntries(q.distractors.map((d) => [d.optionId, d.why])),
        high_yield: q.highYield.trim(),
        difficulty: ["easy", "med", "hard"].includes(q.difficulty) ? q.difficulty : "med",
        is_pyq: q.isPyq,
        pyq_year: q.isPyq ? q.pyqYear : null,
        repeat_count: q.isPyq ? q.repeatCount : null,
        source: sources.length
          ? "AI + web research — verify against a standard text"
          : "AI generated — verify against a standard text",
      }));

    if (!rows.length) return { inserted: 0 };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("questions").insert(rows);
    if (error) throw new Error(error.message);

    return { inserted: rows.length };
  });
