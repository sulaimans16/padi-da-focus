import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizRunner, type QuizSummary } from "@/components/QuizRunner";
import { GlassCard, Icon, Pill, Badge } from "@/components/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { fetchMockQuestions } from "@/lib/quiz";
import { SUBJECT_HUE, type Question } from "@/lib/questions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mock")({
  head: () => ({
    meta: [
      { title: "Timed Mock Tests — PG Prep" },
      {
        name: "description",
        content:
          "Sit full-length timed NEET PG mock tests with exam-style timing, a question palette, flagging and a detailed answer review at the end.",
      },
      { property: "og:title", content: "Timed Mock Tests — PG Prep" },
      {
        property: "og:description",
        content: "Exam-clock mock tests with palette navigation and full answer review.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MockPage,
});

const PRESETS = [
  { label: "Quick blitz", count: 25, minutes: 25 },
  { label: "Half paper", count: 50, minutes: 55 },
  { label: "Grand test", count: 100, minutes: 110 },
  { label: "Full length", count: 200, minutes: 210 },
] as const;

function MockPage() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]>(PRESETS[1]);
  const [subject, setSubject] = useState("all");
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [last, setLast] = useState<QuizSummary | null>(null);

  const start = async () => {
    setLoading(true);
    setLast(null);
    try {
      const qs = await fetchMockQuestions(
        preset.count,
        subject === "all" ? undefined : subject,
      );
      setQuestions(qs);
    } finally {
      setLoading(false);
    }
  };

  if (questions && questions.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="font-display text-xl font-bold">
            Mock test · {questions.length} questions
          </h1>
          <Pill className="ml-auto" onClick={() => setQuestions(null)}>
            <Icon name="close" className="text-[18px]" />
            Exit
          </Pill>
        </div>
        <QuizRunner
          questions={questions}
          context="mock_test"
          durationSec={preset.minutes * 60}
          reveal="onSubmit"
          onFinish={setLast}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Exam simulation</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Timed mock test</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Exam clock, question palette, flagging and a full answer review at the end. Every answer
          also feeds your analytics.
        </p>
      </Reveal>

      {last ? (
        <Reveal delay={0.05}>
          <GlassCard className="mt-6 p-5">
            <p className="label-eyebrow">Last attempt</p>
            <p className="mt-1 text-lg font-bold">
              {last.correct}/{last.total} correct ·{" "}
              {last.total ? Math.round((last.correct / last.total) * 100) : 0}%
            </p>
          </GlassCard>
        </Reveal>
      ) : null}

      <Reveal delay={0.08}>
        <GlassCard className="mt-6 p-5 sm:p-6">
          <p className="label-eyebrow">Test length</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {PRESETS.map((p) => (
              <button
                key={p.count}
                type="button"
                onClick={() => setPreset(p)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition-all duration-300 ease-out hover:border-primary/50",
                  preset.count === p.count
                    ? "border-primary/60 bg-primary/10"
                    : "border-glass-line bg-surface-2/40",
                )}
              >
                <p className="text-sm font-bold">{p.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.count} questions · {p.minutes} min
                </p>
              </button>
            ))}
          </div>

          <p className="label-eyebrow mt-6">Subject</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => setSubject("all")}>
              <Badge tone={subject === "all" ? "primary" : "muted"}>Mixed bag</Badge>
            </button>
            {Object.keys(SUBJECT_HUE).map((s) => (
              <button key={s} type="button" onClick={() => setSubject(s)}>
                <Badge tone={subject === s ? "primary" : "muted"}>{s}</Badge>
              </button>
            ))}
          </div>

          <Pill
            variant="primary"
            className="mt-6"
            disabled={loading}
            onClick={() => void start()}
          >
            <Icon name={loading ? "hourglass_top" : "timer"} className="text-[18px]" />
            {loading ? "Building your paper…" : `Start ${preset.count}-question test`}
          </Pill>
        </GlassCard>
      </Reveal>
    </div>
  );
}
