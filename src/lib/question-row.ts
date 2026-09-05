import type { Difficulty, Question } from "./questions";

/** Shape of a row in the `questions` table. */
export type QuestionRow = {
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

export const toQuestionRow = (r: QuestionRow): Question => ({
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
