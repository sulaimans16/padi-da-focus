import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const RoadmapInput = z.object({
  goal: z.string().min(3).max(300),
  weeks: z.number().min(1).max(52).optional(),
  exam: z.enum(["neet_pg", "neet_ug"]).optional(),
});

const StepSchema = z.object({
  title: z.string(),
  detail: z.string(),
  resource: z.string().optional(),
});

const PhaseSchema = z.object({
  title: z.string(),
  summary: z.string(),
  steps: z.array(StepSchema).min(2).max(8),
});

const RoadmapSchema = z.object({
  title: z.string(),
  intro: z.string(),
  phases: z.array(PhaseSchema).min(3).max(10),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

const SYSTEM = [
  "You are a senior NEET PG / INICET mentor designing study roadmaps for Indian",
  "postgraduate medical entrance aspirants.",
  "Given a study goal, produce a structured, ordered roadmap like roadmap.sh:",
  "phases in dependency order (foundations first, revision and MCQ practice last),",
  "each phase with concrete, actionable steps.",
  "Every step: a short title, one sentence of detail on what to do, and an optional",
  "resource naming a standard textbook or tool (Harrison, Robbins, Katzung, Williams,",
  "Park, Ganong, Bailey & Love, PG Prep QBank, PG Prep PYQ Vault, PG Prep Mock Tests).",
  "Reference PG Prep's own tools where they genuinely fit (QBank for practice,",
  "PYQ Vault for past-year questions, Mock Tests for timed papers, Focus Lock for",
  "distraction-free sessions, Weak Spots for analytics).",
  "Keep the whole plan realistic for a working medical graduate. No fluff, no invented",
  "resources. Titles under 8 words, details under 25 words.",
].join(" ");

const SYSTEM_UG = [
  "You are a senior NEET UG mentor designing study roadmaps for Indian Class 11-12 students",
  "and droppers preparing for the NTA NEET UG exam (Physics, Chemistry, Botany, Zoology).",
  "Given a study goal, produce a structured, ordered roadmap like roadmap.sh:",
  "phases in dependency order (NCERT reading and concepts first, then numericals and",
  "PYQs, revision and full mocks last), each phase with concrete, actionable steps.",
  "Every step: a short title, one sentence of detail on what to do, and an optional",
  "resource naming the NCERT textbook chapter or a standard book (NCERT Class 11/12,",
  "NCERT Exemplar, HC Verma, DC Pandey, MS Chouhan, Trueman's Biology) or one of the",
  "app's tools (UG Prep QBank, UG Prep PYQ Vault, UG Prep Mock Tests, Focus Lock,",
  "Weak Spots). Keep it realistic for a school student. No fluff, no invented",
  "resources. Titles under 8 words, details under 25 words.",
].join(" ");

export const generateRoadmap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => RoadmapInput.parse(input))
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
    const { friendlyAiError } = await import("./ai-help.server");

    const weeks = data.weeks && data.weeks > 0 ? data.weeks : 8;
    const prompt = [
      `Study goal: ${data.goal}`,
      `Time available: about ${weeks} weeks.`,
      "Design the roadmap now. Return ONLY a JSON object of this exact shape:",
      '{"title": string, "intro": string, "phases": [{"title": string, "summary": string, "steps": [{"title": string, "detail": string, "resource": string}]}]}',
      "Use 3-10 phases, each with 2-8 steps.",
    ].join("\n");

    const useOpenRouter = Boolean(openRouterKey);
    const gateway = useOpenRouter
      ? createOpenRouterProvider(openRouterKey!, { structuredOutputs: false })
      : createLovableAiGatewayProvider(lovableKey!, { structuredOutputs: true });

    // One attempt per model: generate, then salvage JSON from a near-miss reply.
    const attempt = async (model: string): Promise<Roadmap> => {
      try {
        const { output } = await generateText({
          model: gateway(model),
          system: data.exam === "neet_ug" ? SYSTEM_UG : SYSTEM,
          prompt,
          output: Output.object({ schema: RoadmapSchema }),
          ...(useOpenRouter
            ? {
                maxOutputTokens: 10000,
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
              const safe = RoadmapSchema.safeParse(JSON.parse(match[0]));
              if (safe.success) return safe.data;
            } catch {
              // fall through
            }
          }
          throw new Error("AI returned no usable roadmap.");
        }
        throw error;
      }
    };

    let parsed: Roadmap | null = null;
    try {
      parsed = useOpenRouter
        ? await withModelFallback(openRouterModels(), attempt)
        : await attempt("openai/gpt-5.6-sol");
    } catch (error) {
      throw new Error(friendlyAiError(error));
    }

    if (!parsed) throw new Error("AI returned no usable roadmap.");
    return { roadmap: parsed };
  });
