import { supabase } from "@/integrations/supabase/client";
import { currentExam, scoped } from "./exam-query";
import { fetchMistakes } from "./gamification";
import { toQuestionRow, type QuestionRow } from "./question-row";
import { allQuestions, type Question } from "./questions";
import { fetchMockQuestions, fetchQuestionsByIds, shuffle } from "./quiz";
import { fetchAttempts, topicStats, type AttemptRow, type TopicStat } from "./tracker";

/**
 * Question selection for the Practice hub: Smart Practice (your weak topics +
 * mistakes that are due), Speed rounds and Image questions.
 */

export type PracticeSet = {
  questions: Question[];
  /** Why each question was picked, keyed by question id (Smart Practice only). */
  tags: Record<string, string>;
  /** True when the set is tailored to the learner's history. */
  personalised: boolean;
};

const DAY = 86_400_000;

async function signedIn() {
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session?.user);
}

/**
 * Rank topics to practise: weaker and better-sampled first, with a nudge for
 * topics not seen for a week (forgetting) — pure, so it can be unit-checked.
 */
export function rankWeakTopics(stats: TopicStat[], now: number = Date.now()) {
  return stats
    .filter((s) => s.attempts >= 2)
    .map((s) => {
      const confidence = Math.min(1, s.attempts / 8);
      const stale = now - Date.parse(s.lastAttemptAt) >= 7 * DAY ? 0.15 : 0;
      return { ...s, priority: (1 - s.accuracy) * (0.4 + 0.6 * confidence) + stale };
    })
    .filter((s) => s.accuracy < 0.85)
    .sort((a, b) => b.priority - a.priority);
}

async function questionsForTopics(topics: { subject: string; topic: string }[], limit: number) {
  if (!topics.length) return [];
  const names = [...new Set(topics.map((t) => t.topic))];
  const local = allQuestions().filter((q) =>
    topics.some((t) => t.subject === q.subject && t.topic === (q.topic?.trim() || "General")),
  );
  const { data } = await scoped((on) => {
    const q = supabase.from("questions").select("*").in("topic", names);
    return (on ? q.eq("exam", currentExam()) : q).limit(limit * 6);
  });
  const remote = ((data ?? []) as QuestionRow[])
    .map(toQuestionRow)
    .filter((q) => topics.some((t) => t.subject === q.subject && t.topic === q.topic));
  return [...local, ...remote];
}

/** Smart Practice: due mistakes + weak topics, topped up with a balanced mix. */
export async function buildSmartSet(count = 10): Promise<PracticeSet> {
  const tags: Record<string, string> = {};
  const picked = new Map<string, Question>();
  const add = (q: Question, tag: string) => {
    if (picked.size >= count || picked.has(q.id)) return;
    picked.set(q.id, q);
    tags[q.id] = tag;
  };

  let personalised = false;
  if (await signedIn()) {
    const [mistakes, attempts] = await Promise.all([
      fetchMistakes().catch(() => []),
      fetchAttempts().catch(() => [] as AttemptRow[]),
    ]);

    const due = mistakes.filter((m) => Date.parse(m.due_at) <= Date.now()).slice(0, 3);
    if (due.length) {
      const qs = await fetchQuestionsByIds(due.map((m) => m.question_id)).catch(() => []);
      qs.forEach((q) => add(q, "Mistake due for review"));
    }

    const practiced = attempts.filter((a) => a.context !== "speed_round");
    const weak = rankWeakTopics(topicStats(practiced)).slice(0, 4);
    if (weak.length) {
      const recent = new Set(
        attempts
          .filter((a) => Date.now() - Date.parse(a.created_at) < 3 * DAY)
          .map((a) => a.question_id),
      );
      const pool = (await questionsForTopics(weak, count).catch(() => [])).filter(
        (q) => !recent.has(q.id),
      );
      // Round-robin across the weak topics so one topic doesn't take the whole set.
      const byTopic = weak.map((t) =>
        shuffle(pool.filter((q) => q.subject === t.subject && q.topic === t.topic)),
      );
      for (let round = 0; picked.size < count && byTopic.some((l) => l.length); round += 1) {
        byTopic.forEach((list, i) => {
          const q = list.shift();
          const t = weak[i]!;
          if (q) add(q, `Weak spot: ${t.topic} (${Math.round(t.accuracy * 100)}%)`);
        });
      }
    }
    personalised = picked.size > 0;
  }

  if (picked.size < count) {
    const fill = await fetchMockQuestions(count * 2).catch(() => shuffle(allQuestions()));
    fill.forEach((q) => add(q, personalised ? "Mixed review" : ""));
  }

  const questions = shuffle([...picked.values()]);
  Object.keys(tags).forEach((id) => {
    if (!tags[id]) delete tags[id];
  });
  return { questions, tags, personalised };
}

/** Speed round pool: short, image-free stems that can be read in a few seconds. */
export async function fetchSpeedPool(n = 60): Promise<Question[]> {
  const pool = await fetchMockQuestions(n * 2).catch(() => shuffle(allQuestions()));
  const quick = pool.filter((q) => !q.imageUrl && q.stem.length <= 260);
  const rest = pool.filter((q) => !quick.includes(q));
  return [...quick, ...rest].slice(0, n);
}

function imageQuery(head: boolean) {
  return scoped((on) => {
    const q = head
      ? supabase.from("questions").select("id", { count: "exact", head: true })
      : supabase.from("questions").select("*");
    const scopedQ = (on ? q.eq("exam", currentExam()) : q).not("image_url", "is", null);
    return head ? scopedQ : scopedQ.limit(600);
  });
}

/** How many questions with a figure this track has (bank + bundled). */
export async function countImageQuestions(): Promise<number> {
  const local = allQuestions().filter((q) => q.imageUrl).length;
  try {
    const { count } = await imageQuery(true);
    return local + (count ?? 0);
  } catch {
    return local;
  }
}

/** A shuffled set of questions that come with a figure (diagrams, graphs, structures). */
export async function fetchImageQuestions(count = 15): Promise<Question[]> {
  const local = allQuestions().filter((q) => q.imageUrl);
  let remote: Question[] = [];
  try {
    const { data } = await imageQuery(false);
    remote = ((data ?? []) as QuestionRow[]).map(toQuestionRow);
  } catch {
    // offline — bundled figures only
  }
  return shuffle([...local, ...remote]).slice(0, count);
}
