import { supabase } from "@/integrations/supabase/client";
import type { Difficulty, Question } from "./questions";

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
    .limit(5000);
  if (subject) query = query.eq("subject", subject);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return ((data ?? []) as Row[]).map(toQuestion);
}

export async function fetchRemoteCounts(): Promise<Map<string, number>> {
  const { data, error } = await supabase.from("questions").select("subject").limit(20000);
  if (error) throw new Error(error.message);
  const map = new Map<string, number>();
  ((data ?? []) as { subject: string }[]).forEach((r) =>
    map.set(r.subject, (map.get(r.subject) ?? 0) + 1),
  );
  return map;
}
