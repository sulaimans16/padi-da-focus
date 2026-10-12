import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuizRunner, type QuizSummary } from "@/components/QuizRunner";
import { GlassCard, Icon, Pill } from "@/components/Primitives";
import { Reveal, SPRING } from "@/components/motion/Reveal";
import { motion } from "motion/react";
import { StreakFlame } from "@/components/game/Widgets";
import { useGameState } from "@/hooks/useGameState";
import { XP, claimXp } from "@/lib/gamification";
import {
  fetchDailyChallenge,
  loadDailyResults,
  saveDailyResult,
  todayKey,
  type DailyResult,
} from "@/lib/quiz";
import type { Question } from "@/lib/questions";
import { localizeHead } from "@/lib/tracks";

export const Route = createFileRoute("/$track/daily")({
  staticData: { sitemap: true },
  head: ({ params }) =>
    localizeHead(params.track, {
      meta: [
        { title: "Daily Challenge — PG Prep" },
        {
          name: "description",
          content:
            "Ten fresh NEET PG questions every day with instant explanations, a streak counter and a week-long history of your daily scores.",
        },
        { property: "og:title", content: "Daily Challenge — PG Prep" },
        {
          property: "og:description",
          content: "Ten questions a day, instant explanations, streaks that keep you honest.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
  component: DailyPage,
});

function DailyPage() {
  const day = todayKey();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DailyResult[]>([]);

  useEffect(() => {
    setResults(loadDailyResults());
  }, []);

  const today = results.find((r) => r.day === day);
  const { state } = useGameState();
  const streak = state?.streak ?? 0;

  const start = async () => {
    setLoading(true);
    try {
      const qs = await fetchDailyChallenge(day, 10);
      setQuestions(qs);
      setStarted(true);
    } finally {
      setLoading(false);
    }
  };

  const finish = (s: QuizSummary) => {
    const result = { day, correct: s.correct, total: s.total };
    saveDailyResult(result);
    setResults((prev) => [result, ...prev.filter((r) => r.day !== day)]);
    if (s.answered >= 5) void claimXp("daily_complete", day, XP.daily);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Every day, 10 questions</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Daily challenge</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The same ten questions for everyone today, with the explanation right after each answer.
          Come back tomorrow for a fresh set and keep the streak alive.
        </p>
      </Reveal>

      {!started ? (
        <Reveal delay={0.05}>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="card-pop p-4 sm:p-5">
              <p className="label-eyebrow">Current streak</p>
              <div className="mt-1 flex items-center gap-2">
                <StreakFlame streak={streak} lit={Boolean(state?.streakExtendedToday)} size="md" />
                <span className="text-sm text-muted-foreground">days</span>
              </div>
            </div>
            <div className="card-pop p-4 sm:p-5">
              <p className="label-eyebrow">Today</p>
              <p className="mt-1 font-display text-3xl font-bold">
                {today ? `${today.correct}/${today.total}` : "—"}
              </p>
            </div>
            <div className="card-pop p-4 sm:p-5">
              <p className="label-eyebrow">Days played</p>
              <p className="mt-1 font-display text-3xl font-bold">{results.length}</p>
            </div>
          </div>
        </Reveal>
      ) : null}

      {started && questions?.length ? (
        <div className="mt-6">
          <QuizRunner
            questions={questions}
            context="daily_challenge"
            reveal="immediate"
            onFinish={finish}
          />
        </div>
      ) : (
        <Reveal delay={0.08}>
          <div className="card-pop mt-6 flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
            <motion.span
              initial={{ scale: 0.6, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={SPRING}
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-xp/20 text-xp animate-bob"
            >
              <Icon name="bolt" filled className="text-[48px]" />
            </motion.span>
            <div className="flex-1">
              {today ? (
                <p className="text-sm text-muted-foreground">
                  You already finished today's challenge with {today.correct}/{today.total}. You can
                  replay it to revise the explanations.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Ten questions, mixed subjects, no timer. Explanations appear as you go, and
                  finishing earns a <strong className="text-xp">+{XP.daily} XP</strong> bonus.
                </p>
              )}
            </div>
            <Pill
              variant="primary"
              className="h-13 w-full px-8 text-base sm:w-auto"
              disabled={loading}
              onClick={() => void start()}
            >
              <Icon name={loading ? "hourglass_top" : "bolt"} className="text-[18px]" />
              {loading ? "Loading…" : today ? "Replay today" : "Start today's challenge"}
            </Pill>
          </div>
        </Reveal>
      )}

      {results.length ? (
        <Reveal delay={0.1}>
          <GlassCard className="mt-6 p-5">
            <p className="label-eyebrow">Recent days</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {results.slice(0, 14).map((r) => (
                <span key={r.day} className="chip">
                  {r.day.slice(5)} · {r.correct}/{r.total}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      ) : null}
    </div>
  );
}
