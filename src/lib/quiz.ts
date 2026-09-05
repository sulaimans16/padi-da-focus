import { supabase } from "@/integrations/supabase/client";
import { allQuestions, type Question } from "./questions";
import { toQuestionRow, type QuestionRow } from "./question-row";

/** Deterministic 32-bit RNG so the daily challenge is identical for every user. */
export function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

export function shuffle<T>(items: T[], rng: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

async function totalQuestions(): Promise<number> {
  const { count } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true });
  return count ?? 0;
}

async function fetchBlock(offset: number, size: number): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("id", { ascending: true })
    .range(offset, offset + size - 1);
  if (error) throw new Error(error.message);
  return ((data ?? []) as QuestionRow[]).map(toQuestionRow);
}

function localFallback(count: number, rng: () => number): Question[] {
  return shuffle(allQuestions(), rng).slice(0, count);
}

/** Random spread of questions for a mock test, sampled across the whole bank. */
export async function fetchMockQuestions(count: number, subject?: string): Promise<Question[]> {
  try {
    if (subject) {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("subject", subject)
        .limit(1500);
      if (error) throw new Error(error.message);
      const pool = ((data ?? []) as QuestionRow[]).map(toQuestionRow);
      return shuffle(pool).slice(0, count);
    }
    const total = await totalQuestions();
    if (!total) return localFallback(count, Math.random);
    const blocks = Math.min(8, Math.max(2, Math.ceil(count / 25)));
    const per = Math.ceil((count * 1.4) / blocks);
    const offsets = Array.from({ length: blocks }, () =>
      Math.max(0, Math.floor(Math.random() * Math.max(1, total - per))),
    );
    const groups = await Promise.all(offsets.map((o) => fetchBlock(o, per)));
    const seen = new Set<string>();
    const pool: Question[] = [];
    groups.flat().forEach((q) => {
      if (seen.has(q.id)) return;
      seen.add(q.id);
      pool.push(q);
    });
    const picked = shuffle(pool).slice(0, count);
    return picked.length ? picked : localFallback(count, Math.random);
  } catch {
    return localFallback(count, Math.random);
  }
}

export function todayKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** The same 10 questions for everyone, rotating each calendar day. */
export async function fetchDailyChallenge(dayKey: string, count = 10): Promise<Question[]> {
  const rng = seededRandom(`padida-daily-${dayKey}`);
  try {
    const total = await totalQuestions();
    if (!total) return localFallback(count, rng);
    const offsets = new Set<number>();
    while (offsets.size < Math.min(count, total)) {
      offsets.add(Math.floor(rng() * total));
    }
    const rows = await Promise.all(Array.from(offsets).map((o) => fetchBlock(o, 1)));
    const picked = rows.flat();
    return picked.length ? picked : localFallback(count, rng);
  } catch {
    return localFallback(count, rng);
  }
}

// ---------- local completion record (works signed out too) ----------

const DAILY_KEY = "padida.daily.results";

export type DailyResult = { day: string; correct: number; total: number };

export function loadDailyResults(): DailyResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DAILY_KEY);
    return raw ? (JSON.parse(raw) as DailyResult[]) : [];
  } catch {
    return [];
  }
}

export function saveDailyResult(result: DailyResult) {
  if (typeof window === "undefined") return;
  const rest = loadDailyResults().filter((r) => r.day !== result.day);
  window.localStorage.setItem(DAILY_KEY, JSON.stringify([result, ...rest].slice(0, 120)));
}

/** Consecutive days finished, counting back from today. */
export function dailyStreak(results: DailyResult[]): number {
  const days = new Set(results.map((r) => r.day));
  let streak = 0;
  const cursor = new Date();
  while (days.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
