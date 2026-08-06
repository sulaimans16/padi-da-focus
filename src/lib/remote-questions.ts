import { supabase } from "@/integrations/supabase/client";
import { SUBJECT_HUE, type Difficulty, type Question } from "./questions";

type Row = {
  id: string;
  subject: string;
  topic: string;
  stem: string;
  options: unknown;
  correct_option_id: string;
  one_liner: string;
  explanation: string;
  distractors: unknown;
  high_yield: string;
  difficulty: string;
  is_pyq: boolean;
  pyq_year: number | null;
  repeat_count: number | null;
  source: string | null;
  image_url?: string | null;
};

const toQuestion = (r: Row): Question => ({
  id: r.id,
  subject: r.subject,
  topic: r.topic,
  stem: r.stem,
  options: (r.options as Question["options"]) ?? [],
  correctOptionId: r.correct_option_id,
  oneLiner: r.one_liner,
  explanation: r.explanation,
  distractors: (r.distractors as Record<string, string>) ?? {},
  highYield: r.high_yield,
  difficulty: (["easy", "med", "hard"].includes(r.difficulty)
    ? r.difficulty
    : "med") as Difficulty,
  isPyq: r.is_pyq,
  ...(r.pyq_year != null ? { pyqYear: r.pyq_year } : {}),
  ...(r.repeat_count != null ? { repeatCount: r.repeat_count } : {}),
  ...(r.source ? { source: r.source } : {}),
  ...(r.image_url ? { imageUrl: r.image_url } : {}),
});

export async function fetchRemoteQuestions(subject?: string): Promise<Question[]> {
  let query = supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(subject ? 2000 : 400);
  if (subject) query = query.eq("subject", subject);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return ((data ?? []) as Row[]).map(toQuestion);
}

/** Only previous-year questions — keeps the PYQ vault light now the bank is large. */
export async function fetchRemotePyqs(): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("is_pyq", true)
    .order("pyq_year", { ascending: false })
    .limit(3000);
  if (error) throw new Error(error.message);
  return ((data ?? []) as Row[]).map(toQuestion);
}

export async function fetchRemoteCounts(): Promise<Map<string, number>> {
  const subjects = Object.keys(SUBJECT_HUE);
  const results = await Promise.all(
    subjects.map(async (s) => {
      const { count } = await supabase
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("subject", s);
      return [s, count ?? 0] as const;
    }),
  );
  const map = new Map<string, number>();
  results.forEach(([s, c]) => {
    if (c > 0) map.set(s, c);
  });
  return map;
}
