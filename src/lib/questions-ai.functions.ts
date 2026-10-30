import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GenerateInput = z.object({
  subject: z.string(),
  topic: z.string(),
  count: z.number(),
  avoid: z.array(z.string()),
  pyqOnly: z.boolean().optional(),
  year: z.number().nullable().optional(),
  tricky: z.boolean().optional(),
  exam: z.enum(["neet_pg", "neet_ug"]).optional(),
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

const SYSTEM_UG = [
  "You are a senior NTA NEET UG (Indian undergraduate medical entrance) question setter.",
  "Write NTA-style single-correct MCQs at real exam difficulty, strictly within the NCERT",
  "Class 11 and 12 syllabus for Physics, Chemistry and Biology (Botany, Zoology).",
  "Mix direct NCERT-line questions, statement-based (I/II), assertion-reason, match-the-column",
  "and, for Physics/Chemistry, short numericals with clean values. Exactly 4 options with ids",
  "a, b, c, d. Every fact must agree with the NCERT textbooks; never invent data, constants",
  "or exceptions. Write formulae in plain text (e.g. v = u + at, E = mc^2).",
  "oneLiner: one crisp sentence a tired student can read at 2am.",
  "explanation: 2-4 sentences of reasoning, with the working for numericals.",
  "distractors: one entry per WRONG option id saying exactly why it is wrong.",
  "highYield: a one-line NCERT fact worth memorising.",
  "difficulty: one of easy, med, hard.",
  "isPyq: true only for concepts genuinely asked in past NEET UG / AIPMT papers;",
  "then set pyqYear (2013-2025) and repeatCount (1-6). Otherwise both null.",
  "Never repeat a stem concept already listed as covered.",
].join(" ");

export const generateQuestionBatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data, context }) => {
    const { assertPro } = await import("./access.server");
    await assertPro(context.supabase, context.userId);

    const openRouterKey = process.env["OPENROUTER_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    if (!openRouterKey && !lovableKey)
      throw new Error("AI is not configured for this project yet.");

    const { generateText, Output, NoObjectGeneratedError } = await import("ai");
    const {
      createLovableAiGatewayProvider,
      createOpenRouterProvider,
      openRouterModels,
      withModelFallback,
    } = await import("./ai-gateway.server");
    const { researchTopic } = await import("./web-research.server");

    const exam = data.exam ?? "neet_pg";
    const isUg = exam === "neet_ug";
    const examName = isUg ? "NEET UG" : "NEET PG";
    const count = Math.max(1, Math.min(10, Math.round(data.count)));
    const topicLine =
      data.topic === "all"
        ? `Spread them across the major high-yield topics of ${data.subject}.`
        : `All of them must be on the topic "${data.topic}" within ${data.subject}.`;

    // Scout the public web first so questions mirror what is actually being asked/discussed.
    const sources = await researchTopic(data.subject, data.topic, examName);
    const researchBlock = sources.length
      ? [
          "Use the following freshly scouted web material as your factual and pattern reference.",
          "Only keep facts that agree with standard textbooks; ignore anything dubious or promotional.",
          ...sources.map((s, i) => `[S${i + 1}] ${s.title} (${s.url})\n${s.text.slice(0, 2500)}`),
        ].join("\n\n")
      : "";

    const pyqLine = data.pyqOnly
      ? [
          "Every question must be a previous-year style question: model it on concepts that have",
          isUg
            ? "genuinely been asked in NEET UG / AIPMT papers."
            : "genuinely been asked in NEET PG / AIIMS / INICET papers.",
          data.year
            ? `Set isPyq true, pyqYear ${data.year}, and repeatCount 1-6 for all of them.`
            : "Set isPyq true, pick pyqYear between 2016 and 2025, and repeatCount 1-6.",
        ].join(" ")
      : "";

    const trickyLine = data.tricky
      ? [
          "TRICKY MODE: make every question genuinely hard (difficulty 'hard').",
          "All four options must be closely related and highly plausible — same drug class,",
          "same organism family, adjacent anatomical structures, or near-identical syndromes —",
          "so the answer turns on one discriminating detail (a single lab value, timing,",
          "age, receptor, enzyme step, nerve root, or exception to a rule).",
          "Use second-order clinical vignettes and 'most likely / next best step / except' framing.",
          "No option may be obviously absurd or eliminable at a glance, and option lengths",
          "should be similar so length gives no clue. The correct answer must still be",
          "unambiguously defensible from standard textbooks, and the explanation must state",
          "the exact discriminator that rules each distractor out.",
        ].join(" ")
      : "";

    const prompt = [
      `Write ${count} ${examName} questions for the subject "${data.subject}".`,
      topicLine,
      pyqLine,
      trickyLine,
      researchBlock,
      data.avoid.length
        ? `Already covered (do NOT repeat these concepts): ${data.avoid.slice(0, 60).join(" | ")}`
        : "",
      "Return ONLY a JSON object of this exact shape:",
      '{"questions": [{"topic": string, "stem": string, "options": [{"id": "a"|"b"|"c"|"d", "text": string}], "correctOptionId": string, "oneLiner": string, "explanation": string, "distractors": [{"optionId": string, "why": string}], "highYield": string, "difficulty": "easy"|"med"|"hard", "isPyq": boolean, "pyqYear": number|null, "repeatCount": number|null}]}',
    ]
      .filter(Boolean)
      .join("\n");

    const useOpenRouter = Boolean(openRouterKey);
    const gateway = useOpenRouter
      ? createOpenRouterProvider(openRouterKey!, { structuredOutputs: false })
      : createLovableAiGatewayProvider(lovableKey!, { structuredOutputs: true });

    type Batch = z.infer<typeof BatchSchema>;
    // One attempt per model: generate, then salvage JSON from a near-miss reply.
    const attempt = async (model: string): Promise<Batch> => {
      try {
        const { output } = await generateText({
          model: gateway(model),
          system: isUg ? SYSTEM_UG : SYSTEM,
          prompt,
          output: Output.object({ schema: BatchSchema }),
          ...(useOpenRouter
            ? {
                maxOutputTokens: 12000,
                providerOptions: { openrouter: { reasoningEffort: "low" } },
              }
            : { providerOptions: { lovable: { reasoningEffort: "none" } } }),
        });
        return output;
      } catch (error) {
        if (NoObjectGeneratedError.isInstance(error) && error.text) {
          const match = error.text.match(/\{[\s\S]*\}/);
          if (match) {
            try {
              const safe = BatchSchema.safeParse(JSON.parse(match[0]));
              if (safe.success) return safe.data;
            } catch {
              // fall through
            }
          }
          throw new Error("AI returned no usable questions.");
        }
        throw error;
      }
    };

    let parsed: Batch | null = null;
    try {
      parsed = useOpenRouter
        ? await withModelFallback(openRouterModels(), attempt)
        : await attempt("openai/gpt-5.6-sol");
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI generation failed.";
      throw new Error(
        /429|rate/i.test(message)
          ? "AI is rate limited right now — wait a few seconds and try again."
          : /402|credit/i.test(message)
            ? "AI credits are exhausted for this workspace."
            : /no endpoints|not a valid model|not found/i.test(message)
              ? "The AI is temporarily unavailable. Please try again a little later."
              : message,
      );
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
        // NEET PG relies on the column default so it also works before migration 0004.
        ...(isUg ? { exam } : {}),
        subject: data.subject,
        topic: (data.topic === "all" ? q.topic : data.topic).trim() || "Mixed",
        stem: q.stem.trim(),
        options: q.options.map((o) => ({ id: o.id, text: o.text.trim() })),
        correct_option_id: q.correctOptionId,
        one_liner: q.oneLiner.trim(),
        explanation: q.explanation.trim(),
        distractors: Object.fromEntries(q.distractors.map((d) => [d.optionId, d.why])),
        high_yield: q.highYield.trim(),
        difficulty: data.tricky
          ? "hard"
          : ["easy", "med", "hard"].includes(q.difficulty)
            ? q.difficulty
            : "med",
        is_pyq: data.pyqOnly ? true : q.isPyq,
        pyq_year: data.pyqOnly ? (data.year ?? q.pyqYear ?? 2024) : q.isPyq ? q.pyqYear : null,
        repeat_count: data.pyqOnly ? (q.repeatCount ?? 2) : q.isPyq ? q.repeatCount : null,
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
