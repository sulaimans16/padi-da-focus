import { supabase } from "@/integrations/supabase/client";
import type { Difficulty, Question } from "./questions";
import { currentExam, scoped } from "./exam-query";

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
  difficulty: (["easy", "med", "hard"].includes(r.difficulty) ? r.difficulty : "med") as Difficulty,
  isPyq: r.is_pyq,
  ...(r.pyq_year != null ? { pyqYear: r.pyq_year } : {}),
  ...(r.repeat_count != null ? { repeatCount: r.repeat_count } : {}),
  ...(r.source ? { source: r.source } : {}),
  ...(r.image_url ? { imageUrl: r.image_url } : {}),
});

export async function fetchRemoteQuestions(subject?: string): Promise<Question[]> {
  const { data, error } = await scoped((on) => {
    let query = supabase.from("questions").select("*");
    if (on) query = query.eq("exam", currentExam());
    if (subject) query = query.eq("subject", subject);
    return query.order("created_at", { ascending: false }).limit(subject ? 2000 : 400);
  });
  if (error) throw new Error(error.message);
  return ((data ?? []) as Row[]).map(toQuestion);
}

/** Only previous-year questions — keeps the PYQ vault light now the bank is large. */
export async function fetchRemotePyqs(): Promise<Question[]> {
  const { data, error } = await scoped((on) => {
    const q = supabase.from("questions").select("*").eq("is_pyq", true);
    return (on ? q.eq("exam", currentExam()) : q)
      .order("pyq_year", { ascending: false })
      .limit(3000);
  });
  if (error) throw new Error(error.message);
  return ((data ?? []) as Row[]).map(toQuestion);
}

export async function fetchRemoteCounts(subjects: string[]): Promise<Map<string, number>> {
  const results = await Promise.all(
    subjects.map(async (s) => {
      const { count } = await scoped((on) => {
        const q = supabase.from("questions").select("id", { count: "exact", head: true });
        return (on ? q.eq("exam", currentExam()) : q).eq("subject", s);
      });
      return [s, count ?? 0] as const;
    }),
  );
  const map = new Map<string, number>();
  results.forEach(([s, c]) => {
    if (c > 0) map.set(s, c);
  });
  return map;
}
