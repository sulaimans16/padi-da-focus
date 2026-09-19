import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuizRunner, type QuizSummary } from "@/components/QuizRunner";
import { GlassCard, Icon, Pill } from "@/components/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import {
  dailyStreak,
  fetchDailyChallenge,
  loadDailyResults,
  saveDailyResult,
  todayKey,
  type DailyResult,
} from "@/lib/quiz";
import type { Question } from "@/lib/questions";

export const Route = createFileRoute("/daily")({
  staticData: { sitemap: true },
  head: () => ({
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
  const streak = dailyStreak(results);

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

      <Reveal delay={0.05}>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <GlassCard className="p-5">
            <p className="label-eyebrow">Current streak</p>
            <p className="mt-1 font-display text-3xl font-bold">
              {streak}
              <span className="ml-1 text-sm text-muted-foreground">days</span>
            </p>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="label-eyebrow">Today</p>
            <p className="mt-1 font-display text-3xl font-bold">
              {today ? `${today.correct}/${today.total}` : "—"}
            </p>
          </GlassCard>
          <GlassCard className="p-5">
            <p className="label-eyebrow">Days played</p>
            <p className="mt-1 font-display text-3xl font-bold">{results.length}</p>
          </GlassCard>
        </div>
      </Reveal>

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
          <GlassCard className="mt-6 p-6">
            {today ? (
              <p className="text-sm text-muted-foreground">
                You already finished today's challenge with {today.correct}/{today.total}. You can
                replay it to revise the explanations.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Ten questions, mixed subjects, no timer. Explanations appear as you go.
              </p>
            )}
            <Pill
              variant="primary"
              className="mt-4"
              disabled={loading}
              onClick={() => void start()}
            >
              <Icon name={loading ? "hourglass_top" : "bolt"} className="text-[18px]" />
              {loading ? "Loading…" : today ? "Replay today" : "Start today's challenge"}
            </Pill>
          </GlassCard>
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
