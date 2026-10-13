import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { levelForXp, rankFor } from "./gamification";
import type { LearnModule } from "./learn";
import { rankWeakTopics } from "./practice";
import { readiness } from "./readiness";
import type { Roadmap } from "./roadmap.functions";
import { roadmapProgress } from "./roadmap-store";
import { subjectStats, topicStats, type AttemptRow } from "./tracker";
import { TRACKS } from "./tracks";
import type { TrackId } from "./track-state";

/**
 * What Dr. Pulse knows beyond medicine: the learner's own progress (read with
 * their RLS-scoped client, so it can only ever see their rows), a guide to the
 * app's features, the lessons that match the doubt, and what is on screen.
 * Everything comes back as compact text blocks for the prompt.
 */

type Client = SupabaseClient<Database>;

export type AiPage = {
  path: string;
  question?:
    | {
        subject: string;
        topic: string;
        stem: string;
        options: string[];
        answer: string;
        explanation: string;
        answered: boolean;
      }
    | undefined;
  lesson?: { module: string; concept: string } | undefined;
};

const DAY = 86_400_000;
const pct = (x: number) => `${Math.round(x * 100)}%`;

type RawGame = {
  xp_total?: number;
  today_xp?: number;
  daily_goal?: number;
  streak?: number;
  longest_streak?: number;
  mistakes_due?: number;
  mistakes_total?: number;
  league_tier?: number;
};

/** Never let one failing read sink the answer. */
async function safe<T>(p: PromiseLike<T>): Promise<T | null> {
  try {
    return await p;
  } catch {
    return null;
  }
}

export async function buildLearnerContext(
  supabase: Client,
  userId: string,
  exam: TrackId,
  now: number = Date.now(),
): Promise<string> {
  const track = TRACKS[exam];
  const since7 = new Date(now - 7 * DAY).toISOString();

  const [game, attempts, goal, roadmap, focus, friends, profile] = await Promise.all([
    safe(supabase.rpc("get_game_state", { _exam: exam })),
    safe(
      supabase
        .from("attempts")
        .select("subject, topic, correct, seconds, created_at")
        .eq("user_id", userId)
        .eq("exam", exam)
        .order("created_at", { ascending: false })
        .limit(2000),
    ),
    safe(
      supabase
        .from("goals")
        .select("title, target_at")
        .eq("user_id", userId)
        .eq("exam", exam)
        .order("updated_at", { ascending: false })
        .limit(1),
    ),
    safe(
      supabase
        .from("study_roadmaps")
        .select("goal, roadmap, done, opened_at")
        .eq("user_id", userId)
        .eq("exam", exam)
        .order("opened_at", { ascending: false })
        .limit(1),
    ),
    safe(
      supabase
        .from("focus_sessions")
        .select("minutes, completed, escapes")
        .eq("user_id", userId)
        .eq("exam", exam)
        .gte("started_at", since7),
    ),
    safe(supabase.rpc("get_friends", { _exam: exam })),
    safe(supabase.from("profiles").select("display_name, username").eq("id", userId).limit(1)),
  ]);

  const lines: string[] = [`Exam track: ${track.name}.`];

  const me = profile?.data?.[0];
  if (me) lines.push(`Name: ${me.display_name}${me.username ? ` (@${me.username})` : ""}.`);

  const g = (game?.data ?? null) as RawGame | null;
  if (g && typeof g.xp_total === "number") {
    const lvl = levelForXp(g.xp_total);
    lines.push(
      `Level ${lvl.level} (${rankFor(lvl.level).title}), ${g.xp_total} XP total.`,
      `Streak: ${g.streak ?? 0} days (best ${g.longest_streak ?? 0}). Today: ${g.today_xp ?? 0}/${g.daily_goal ?? 0} XP of the daily goal.`,
      `Mistakes due for review: ${g.mistakes_due ?? 0} (of ${g.mistakes_total ?? 0} saved).`,
    );
  }

  const rows = (attempts?.data ?? []) as Pick<
    AttemptRow,
    "subject" | "topic" | "correct" | "seconds" | "created_at"
  >[];
  if (rows.length) {
    const full = rows as AttemptRow[];
    const today = new Date(now).toDateString();
    const todayRows = rows.filter((r) => new Date(r.created_at).toDateString() === today);
    const correct = rows.filter((r) => r.correct).length;
    lines.push(
      `Questions answered: ${rows.length}${rows.length >= 2000 ? "+" : ""} overall, ${pct(correct / rows.length)} correct; ${todayRows.length} today.`,
    );
    const subjects = subjectStats(full).filter((s) => s.attempts >= 5);
    if (subjects.length) {
      const fmt = (s: (typeof subjects)[number]) =>
        `${s.subject} ${pct(s.accuracy)} (${s.attempts} Qs)`;
      lines.push(`Weakest subjects: ${subjects.slice(0, 3).map(fmt).join(", ")}.`);
      if (subjects.length > 3)
        lines.push(`Strongest subjects: ${subjects.slice(-3).reverse().map(fmt).join(", ")}.`);
    }
    const weak = rankWeakTopics(topicStats(full), now).slice(0, 5);
    if (weak.length)
      lines.push(
        `Weak topics to fix: ${weak.map((t) => `${t.subject} › ${t.topic} ${pct(t.accuracy)} (${t.attempts} Qs)`).join("; ")}.`,
      );
    const untouched = track.subjects.filter((s) => !rows.some((r) => r.subject === s));
    if (untouched.length && untouched.length < track.subjects.length)
      lines.push(`Not practised yet: ${untouched.slice(0, 8).join(", ")}.`);
    const ready = readiness(rows, track.subjects, now);
    lines.push(
      ready.score === null
        ? `Readiness score: not enough answers yet (${rows.length}/30).`
        : `Readiness score: ${ready.score}/100 (${ready.band}); accuracy ${pct(ready.accuracy)}, syllabus coverage ${pct(ready.coverage)}, consistency ${pct(ready.consistency)}. Suggested focus: ${ready.focus.join(", ") || "keep going"}.`,
    );
    const avgSec =
      rows.slice(0, 200).reduce((n, r) => n + (r.seconds || 0), 0) / Math.min(200, rows.length);
    if (avgSec > 0) lines.push(`Average time per question (recent): ${Math.round(avgSec)} s.`);
  } else {
    lines.push("Has not answered any questions on this track yet.");
  }

  const exam0 = goal?.data?.[0];
  if (exam0) {
    const days = Math.ceil((Date.parse(exam0.target_at) - now) / DAY);
    lines.push(
      days >= 0
        ? `Exam date: ${exam0.target_at.slice(0, 10)} (${days} days left).`
        : `Exam date ${exam0.target_at.slice(0, 10)} has passed.`,
    );
  } else {
    lines.push("Exam date: not set.");
  }

  const map = roadmap?.data?.[0];
  if (map) {
    const prog = roadmapProgress({
      goal: map.goal,
      roadmap: map.roadmap as unknown as Roadmap,
      done: map.done ?? [],
    });
    lines.push(
      `Study roadmap "${map.goal}": ${prog.pct}% done (${prog.completed}/${prog.total} steps)${
        prog.nextStep ? `; next step: "${prog.nextStep.title}"` : ""
      }.`,
    );
  } else {
    lines.push("No study roadmap yet.");
  }

  const sessions = focus?.data ?? [];
  if (sessions.length) {
    const mins = sessions.reduce((n, s) => n + (s.minutes || 0), 0);
    const done = sessions.filter((s) => s.completed).length;
    lines.push(
      `Focus Lock last 7 days: ${sessions.length} sessions, ${mins} min, ${done} completed.`,
    );
  }

  const fr = Array.isArray(friends?.data) ? (friends.data as { status?: string }[]) : [];
  const accepted = fr.filter((f) => f.status === "accepted").length;
  lines.push(`Friends: ${accepted}.`);

  return lines.join("\n");
}

// ---------- the app itself ----------

function featureGuide(exam: TrackId) {
  const t = TRACKS[exam];
  const p = (path: string) => `/${t.slug}${path}`;
  return [
    `Home dashboard ${p("")}: streak, daily goal, readiness score, exam countdown, Getting Started checklist.`,
    `Practice ${p("/practice")}: Smart Practice (picks your weak topics and due mistakes), Speed rounds, Image questions.`,
    `QBank ${p("/bank")}: questions by subject with explanations.`,
    `PYQ Vault ${p("/pyq")}: real past ${t.name} questions by year.`,
    `Mock Tests ${p("/mock")}: timed full-length mocks with ${t.name} marking.`,
    `Daily Challenge ${p("/daily")}: a short set every day.`,
    `Flashcards ${p("/flashcards")}: spaced-repetition review.`,
    `Fix Mistakes ${p("/review")}: re-try questions you got wrong when they are due.`,
    `Weak Spots ${p("/weak-spots")}: topics with the lowest accuracy.`,
    `Analytics ${p("/tracker")}: accuracy by subject and topic, focus time.`,
    `Learn ${p("/learn")}: concept lessons per subject, with checks and high-yield points.`,
    `Videos ${p("/videos")} and Papers ${p("/papers")}: curated lectures and papers.`,
    `Roadmap ${p("/roadmap")}: an AI study plan to the exam date with steps to tick off.`,
    `Focus Lock ${p("/focus")}: a timed lock; you can use the whole app, leaving it counts as an escape.`,
    `Leagues ${p("/leagues")}: weekly XP leagues. Friends ${p("/friends")}: add by @username, challenge friends, monthly sprint, invite (both get 7 days of Pro).`,
    `Profile ${p("/profile")}: badges, streak calendar, daily goal, share & invite. Pricing /pricing: Go Pro.`,
    `Ask Dr. Pulse (this chat): Pro feature for doubts, progress questions and study advice.`,
  ].join("\n");
}

const STOP = new Set(
  "a an and are as at be by can do does explain for from how i in is it me my of on or so tell the this to what when where which who why with you your about between difference vs".split(
    " ",
  ),
);

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

/** The lessons whose title, summary and points best match the doubt (keyword overlap). */
export function findLessons(modules: LearnModule[], query: string, limit = 3) {
  const q = new Set(words(query));
  if (!q.size) return [];
  const scored: {
    module: LearnModule;
    conceptId: string;
    title: string;
    text: string;
    score: number;
  }[] = [];
  for (const m of modules) {
    for (const c of m.concepts) {
      const title = words(c.title);
      const body = words(`${c.summary} ${c.points.join(" ")} ${c.highYield}`);
      let score = 0;
      for (const w of q) {
        if (title.includes(w)) score += 3;
        else if (body.includes(w)) score += 1;
      }
      if (score >= 3)
        scored.push({
          module: m,
          conceptId: c.id,
          title: c.title,
          text: `${c.summary} Key points: ${c.points.slice(0, 4).join(" ")} High-yield: ${c.highYield}`,
          score,
        });
    }
  }
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0]?.score ?? 0;
  return scored.filter((s) => s.score * 2 >= best).slice(0, limit);
}

export function appKnowledge(exam: TrackId, question: string, page: AiPage | undefined) {
  const t = TRACKS[exam];
  const blocks = [`## App guide (paths are in-app links)\n${featureGuide(exam)}`];

  const lessonText = [question, page?.question?.topic, page?.question?.stem.slice(0, 300)]
    .filter(Boolean)
    .join(" ");
  const lessons = findLessons(t.learn, lessonText);
  if (lessons.length)
    blocks.push(
      `## Matching lessons in the app\n${lessons
        .map(
          (l) =>
            `- [${l.title}](/${t.slug}/learn/${l.module.slug}#${l.conceptId}): ${l.text.slice(0, 500)}`,
        )
        .join("\n")}`,
    );

  if (page) {
    const where = [`Page: ${page.path}`];
    if (page.lesson) {
      const mod = t.learn.find((m) => m.slug === page.lesson!.module);
      const c = mod?.concepts.find((x) => x.id === page.lesson!.concept);
      if (mod && c)
        where.push(`Reading lesson "${c.title}" in ${mod.title ?? mod.subject}: ${c.summary}`);
    }
    const q = page.question;
    if (q) {
      where.push(
        `Question on screen (${q.subject} › ${q.topic}):\n${q.stem}\n${q.options.join("\n")}`,
        q.answered
          ? `Correct answer: ${q.answer}\nExplanation: ${q.explanation}`
          : `The learner has NOT answered it yet. Correct answer (do not reveal unless they ask for it): ${q.answer}`,
      );
    }
    blocks.push(`## What the learner is looking at\n${where.join("\n")}`);
  }
  return blocks.join("\n\n");
}
