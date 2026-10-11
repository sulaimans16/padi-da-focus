import { supabase } from "@/integrations/supabase/client";
import { requestGameSync } from "./gamification";

export type AttemptRow = {
  id: string;
  question_id: string;
  subject: string;
  topic: string;
  chosen_option_id: string;
  correct: boolean;
  seconds: number;
  context: string;
  created_at: string;
};

export type FocusRow = {
  id: string;
  minutes: number;
  planned_minutes: number;
  escapes: number;
  completed: boolean;
  started_at: string;
};

async function currentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

/** Records an answered question against the signed-in user. No-ops when signed out. */
export async function recordAttempt(input: {
  questionId: string;
  subject: string;
  topic: string;
  chosenOptionId: string;
  correct: boolean;
  seconds: number;
  context: string;
}) {
  const userId = await currentUserId();
  if (!userId) return;
  const { error } = await supabase.from("attempts").insert({
    user_id: userId,
    question_id: input.questionId,
    subject: input.subject,
    topic: input.topic,
    chosen_option_id: input.chosenOptionId,
    correct: input.correct,
    seconds: Math.max(0, Math.round(input.seconds)),
    context: input.context,
  });
  if (error) console.error("[tracker] attempt insert failed", error.message);
  else requestGameSync();
}

export async function recordFocusSession(input: {
  minutes: number;
  plannedMinutes: number;
  escapes: number;
  completed: boolean;
  startedAt: string;
}) {
  const userId = await currentUserId();
  if (!userId) return;
  const { error } = await supabase.from("focus_sessions").insert({
    user_id: userId,
    minutes: Math.max(0, Math.round(input.minutes)),
    planned_minutes: Math.max(0, Math.round(input.plannedMinutes)),
    escapes: input.escapes,
    completed: input.completed,
    started_at: input.startedAt,
  });
  if (error) console.error("[tracker] session insert failed", error.message);
  else requestGameSync();
}

export async function fetchAttempts(): Promise<AttemptRow[]> {
  const { data, error } = await supabase
    .from("attempts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5000);
  if (error) throw new Error(error.message);
  return (data ?? []) as AttemptRow[];
}

export async function fetchFocusSessions(): Promise<FocusRow[]> {
  const { data, error } = await supabase
    .from("focus_sessions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) throw new Error(error.message);
  return (data ?? []) as FocusRow[];
}

export async function fetchBookmarkIds(): Promise<string[]> {
  const { data, error } = await supabase.from("bookmarks").select("question_id").limit(2000);
  if (error) throw new Error(error.message);
  return ((data ?? []) as { question_id: string }[]).map((r) => r.question_id);
}

export async function toggleRemoteBookmark(questionId: string, on: boolean) {
  const userId = await currentUserId();
  if (!userId) return;
  if (on) {
    await supabase.from("bookmarks").insert({ user_id: userId, question_id: questionId });
  } else {
    await supabase.from("bookmarks").delete().eq("user_id", userId).eq("question_id", questionId);
  }
}

// ---------- derived stats ----------

export type SubjectStat = {
  subject: string;
  attempts: number;
  correct: number;
  accuracy: number;
};

export function subjectStats(rows: AttemptRow[]): SubjectStat[] {
  const map = new Map<string, { attempts: number; correct: number }>();
  rows.forEach((r) => {
    const cur = map.get(r.subject) ?? { attempts: 0, correct: 0 };
    cur.attempts += 1;
    if (r.correct) cur.correct += 1;
    map.set(r.subject, cur);
  });
  return Array.from(map.entries())
    .map(([subject, v]) => ({
      subject,
      attempts: v.attempts,
      correct: v.correct,
      accuracy: v.attempts ? v.correct / v.attempts : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

export type TopicStat = {
  subject: string;
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number;
  lastAttemptAt: string;
};

/** Accuracy per subject+topic pair, weakest first. */
export function topicStats(rows: AttemptRow[]): TopicStat[] {
  const map = new Map<string, TopicStat>();
  rows.forEach((r) => {
    const topic = r.topic?.trim() || "General";
    const key = `${r.subject}///${topic}`;
    const cur =
      map.get(key) ??
      ({
        subject: r.subject,
        topic,
        attempts: 0,
        correct: 0,
        accuracy: 0,
        lastAttemptAt: r.created_at,
      } as TopicStat);
    cur.attempts += 1;
    if (r.correct) cur.correct += 1;
    if (new Date(r.created_at) > new Date(cur.lastAttemptAt)) cur.lastAttemptAt = r.created_at;
    map.set(key, cur);
  });
  return Array.from(map.values())
    .map((s) => ({ ...s, accuracy: s.attempts ? s.correct / s.attempts : 0 }))
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
}

export function streakDays(rows: { created_at: string }[]): number {
  const days = new Set(rows.map((r) => new Date(r.created_at).toDateString()));
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
