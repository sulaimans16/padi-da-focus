import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { QuizRunner } from "@/components/QuizRunner";
import { Icon } from "@/components/Primitives";
import { Reveal, SPRING } from "@/components/motion/Reveal";
import { ProgressBar } from "@/components/game/Widgets";
import { fetchMistakes } from "@/lib/gamification";
import { fetchQuestionsByIds, shuffle } from "@/lib/quiz";
import type { Question } from "@/lib/questions";
import { subjectColor } from "@/lib/questions";

export const Route = createFileRoute("/_authenticated/review")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Fix Mistakes — PG Prep" },
      {
        name: "description",
        content: "Spaced review of the NEET PG questions you got wrong. Each fix earns bonus XP.",
      },
    ],
  }),
  component: Review,
});

const STAGES = ["New", "1 day", "3 days", "7 days"];

function Review() {
  const mistakes = useQuery({ queryKey: ["mistakes"], queryFn: fetchMistakes });
  const [session, setSession] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rows = mistakes.data ?? [];
  const now = Date.now();
  const due = rows.filter((r) => new Date(r.due_at).getTime() <= now);
  const upcoming = rows.filter((r) => new Date(r.due_at).getTime() > now);
  const bySubject = Object.entries(
    rows.reduce<Record<string, number>>((acc, r) => {
      const key = r.subject || "General";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const start = async () => {
    setLoading(true);
    setError(null);
    try {
      const picked = shuffle(due)
        .slice(0, 10)
        .map((r) => r.question_id);
      const qs = await fetchQuestionsByIds(picked);
      if (!qs.length) setError("Couldn't load those questions. Try again in a moment.");
      else setSession(qs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            className="btn-base btn-ghost text-xs"
            onClick={() => {
              setSession(null);
              void mistakes.refetch();
            }}
          >
            <Icon name="close" className="text-[16px]" />
            End review
          </button>
          <span className="chip text-destructive">Fix mistakes · +15 XP each</span>
        </div>
        <QuizRunner questions={session} context="mistake_review" reveal="immediate" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Spaced repetition</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Fix your mistakes</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every question you miss lands here and comes back after 1, 3 and 7 days until it sticks.
          Each correct fix earns <span className="font-bold text-xp">+15 XP</span> on top of the
          answer itself.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="card-pop mt-6 flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left">
          <motion.span
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={SPRING}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-destructive/15 text-destructive"
          >
            <Icon name="healing" filled className="text-[44px]" />
          </motion.span>
          <div className="flex-1">
            <p className="font-display text-4xl font-bold">
              {mistakes.isLoading ? "…" : due.length}
              <span className="ml-2 text-base font-semibold text-muted-foreground">due now</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {upcoming.length} scheduled for later · {rows.length} in the queue
            </p>
          </div>
          <button
            type="button"
            disabled={!due.length || loading}
            onClick={() => void start()}
            className="btn-base btn-danger h-13 w-full px-8 text-base sm:w-auto"
          >
            <Icon name={loading ? "hourglass_top" : "play_arrow"} filled className="text-[20px]" />
            {loading
              ? "Loading…"
              : due.length
                ? `Fix ${Math.min(10, due.length)} now`
                : "All caught up"}
          </button>
        </div>
        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
        {mistakes.error ? (
          <p className="mt-3 text-sm text-muted-foreground">
            The review queue isn't available yet. It switches on once the latest database update is
            applied.
          </p>
        ) : null}
      </Reveal>

      {!rows.length && !mistakes.isLoading && !mistakes.error ? (
        <Reveal delay={0.08}>
          <div className="mt-6 rounded-3xl border-2 border-dashed border-glass-line p-8 text-center">
            <p className="text-4xl">🎯</p>
            <p className="mt-2 font-semibold">Nothing to fix. Clean sheet!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Drill the QBank and anything you miss will show up here.
            </p>
            <Link to="/bank" className="btn-base btn-primary mt-4 text-sm">
              Open QBank
            </Link>
          </div>
        </Reveal>
      ) : null}

      {bySubject.length ? (
        <Reveal delay={0.1}>
          <div className="card-surface mt-6 p-6">
            <p className="label-eyebrow">By subject</p>
            <div className="mt-4 space-y-3">
              {bySubject.slice(0, 10).map(([subject, n]) => (
                <div key={subject} className="flex items-center gap-3">
                  <span className="w-40 truncate text-sm font-semibold">{subject}</span>
                  <ProgressBar
                    value={n / (bySubject[0]?.[1] ?? 1)}
                    color={subjectColor(subject)}
                    className="h-2.5 flex-1"
                  />
                  <span className="w-8 text-right text-xs font-bold tabular-nums">{n}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {STAGES.map((s, i) => (
                <span key={s} className="chip">
                  {s}: {rows.filter((r) => r.stage === i).length}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
