import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Icon, Pill, Badge, GlassCard } from "@/components/Primitives";
import { recordAttempt } from "@/lib/tracker";
import { subjectColor, type Question } from "@/lib/questions";
import { cn } from "@/lib/utils";

export type QuizSummary = {
  total: number;
  answered: number;
  correct: number;
  seconds: number;
};

function fmt(total: number) {
  const s = Math.max(0, Math.round(total));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export function QuizRunner({
  questions,
  context,
  durationSec,
  reveal = "onSubmit",
  onFinish,
}: {
  questions: Question[];
  context: string;
  /** Countdown length; omit for untimed. */
  durationSec?: number;
  reveal?: "immediate" | "onSubmit";
  onFinish?: (summary: QuizSummary) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startedAt = useRef(Date.now());
  const shownAt = useRef(Date.now());
  const finished = useRef(false);

  const q = questions[index];
  const remaining = durationSec != null ? durationSec - elapsed : null;

  useEffect(() => {
    const t = window.setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    shownAt.current = Date.now();
  }, [index]);

  const summary = useMemo<QuizSummary>(() => {
    const answered = Object.keys(answers).length;
    const correct = questions.filter((item) => answers[item.id] === item.correctOptionId).length;
    return { total: questions.length, answered, correct, seconds: elapsed };
  }, [answers, questions, elapsed]);

  const submit = () => {
    if (finished.current) return;
    finished.current = true;
    setSubmitted(true);
    onFinish?.({ ...summary, seconds: Math.round((Date.now() - startedAt.current) / 1000) });
  };

  useEffect(() => {
    if (remaining != null && remaining <= 0 && !submitted) submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, submitted]);

  const choose = (optionId: string) => {
    if (!q) return;
    if (submitted) return;
    if (reveal === "immediate" && answers[q.id]) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
    void recordAttempt({
      questionId: q.id,
      subject: q.subject,
      topic: q.topic,
      chosenOptionId: optionId,
      correct: optionId === q.correctOptionId,
      seconds: (Date.now() - shownAt.current) / 1000,
      context,
    });
  };

  if (submitted) {
    return <ResultReview questions={questions} answers={answers} summary={summary} />;
  }

  if (!q) return null;

  const chosen = answers[q.id];
  const showAnswer = reveal === "immediate" && Boolean(chosen);
  const accent = subjectColor(q.subject);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
      <GlassCard className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip" style={{ color: accent, borderColor: `${accent}66` }}>
            {q.subject}
          </span>
          <Badge>{q.topic || "General"}</Badge>
          {q.isPyq ? <Badge tone="warning" tooltip="Appeared in a past exam">PYQ {q.pyqYear ?? ""}</Badge> : null}
          <span className="ml-auto text-xs font-semibold text-muted-foreground">
            Q{index + 1} / {questions.length}
          </span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed clinical-text">{q.stem}</p>
        {q.imageUrl ? (
          <img
            src={q.imageUrl}
            alt={`Clinical figure for ${q.topic}`}
            loading="lazy"
            className="mt-4 max-h-72 w-full rounded-xl border border-glass-line object-contain"
          />
        ) : null}

        <div className="mt-5 grid gap-2.5">
          {q.options.map((opt) => {
            const isChosen = chosen === opt.id;
            const isRight = opt.id === q.correctOptionId;
            return (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => choose(opt.id)}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ease-out",
                  showAnswer && isRight
                    ? "border-success/60 bg-success/10"
                    : showAnswer && isChosen
                      ? "border-destructive/60 bg-destructive/10"
                      : isChosen
                        ? "border-primary/60 bg-primary/10"
                        : "border-glass-line bg-surface-2/40 hover:border-primary/40",
                )}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-glass-line text-[11px] font-bold uppercase">
                  {opt.id}
                </span>
                <span className="flex-1">{opt.text}</span>
              </motion.button>
            );
          })}
        </div>

        {showAnswer ? (
          <div className="mt-4 rounded-xl border border-glass-line bg-surface-2/50 p-4">
            <p className="text-sm font-semibold">{q.oneLiner}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
            {q.highYield ? (
              <p className="mt-2 text-xs font-semibold text-primary">{q.highYield}</p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Pill onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
            <Icon name="chevron_left" className="text-[18px]" />
            Previous
          </Pill>
          <Pill
            variant="primary"
            onClick={() =>
              index === questions.length - 1
                ? submit()
                : setIndex((i) => Math.min(questions.length - 1, i + 1))
            }
          >
            {index === questions.length - 1 ? "Finish" : "Next"}
            <Icon name="chevron_right" className="text-[18px]" />
          </Pill>
          <Pill
            onClick={() =>
              setFlagged((f) => (f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id]))
            }
          >
            <Icon name={flagged.includes(q.id) ? "flag" : "flag_2"} className="text-[18px]" />
            {flagged.includes(q.id) ? "Flagged" : "Flag"}
          </Pill>
        </div>
      </GlassCard>

      <div className="space-y-4">
        <GlassCard className="p-5">
          <p className="label-eyebrow">{remaining != null ? "Time left" : "Time elapsed"}</p>
          <p
            className={cn(
              "mt-1 font-mono text-3xl font-bold tabular-nums",
              remaining != null && remaining < 300 && "text-destructive",
            )}
          >
            {fmt(remaining != null ? remaining : elapsed)}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="label-eyebrow">Answered</p>
              <p className="text-lg font-bold">
                {summary.answered}
                <span className="text-xs text-muted-foreground">/{questions.length}</span>
              </p>
            </div>
            <div>
              <p className="label-eyebrow">Flagged</p>
              <p className="text-lg font-bold">{flagged.length}</p>
            </div>
          </div>
          <Pill variant="primary" className="mt-4 w-full justify-center" onClick={submit}>
            Submit test
          </Pill>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="label-eyebrow">Question palette</p>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {questions.map((item, i) => {
              const state = answers[item.id]
                ? "answered"
                : flagged.includes(item.id)
                  ? "flagged"
                  : "blank";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-8 rounded-lg border text-[11px] font-bold transition-all duration-200 ease-out hover:scale-105",
                    i === index && "ring-2 ring-primary/60",
                    state === "answered"
                      ? "border-success/50 bg-success/15 text-success"
                      : state === "flagged"
                        ? "border-warning/50 bg-warning/15 text-warning"
                        : "border-glass-line bg-surface-2/40 text-muted-foreground",
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function ResultReview({
  questions,
  answers,
  summary,
}: {
  questions: Question[];
  answers: Record<string, string>;
  summary: QuizSummary;
}) {
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 0;
  const wrong = questions.filter((q) => answers[q.id] && answers[q.id] !== q.correctOptionId);
  const skipped = questions.filter((q) => !answers[q.id]);

  return (
    <div className="space-y-5">
      <GlassCard className="p-6">
        <p className="label-eyebrow">Result</p>
        <div className="mt-2 flex flex-wrap items-end gap-6">
          <p className="font-display text-5xl font-bold">
            {summary.correct}
            <span className="text-xl text-muted-foreground">/{summary.total}</span>
          </p>
          <div>
            <p className="label-eyebrow">Accuracy</p>
            <p className={cn("text-2xl font-bold", pct >= 60 ? "text-success" : "text-warning")}>
              {pct}%
            </p>
          </div>
          <div>
            <p className="label-eyebrow">Time taken</p>
            <p className="text-2xl font-bold tabular-nums">{fmt(summary.seconds)}</p>
          </div>
          <div>
            <p className="label-eyebrow">Skipped</p>
            <p className="text-2xl font-bold">{skipped.length}</p>
          </div>
        </div>
      </GlassCard>

      <h2 className="text-lg font-bold">Review {wrong.length ? `· ${wrong.length} to fix` : ""}</h2>
      <div className="space-y-4">
        {questions.map((q, i) => {
          const chosen = answers[q.id];
          const ok = chosen === q.correctOptionId;
          return (
            <GlassCard key={q.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Q{i + 1}</span>
                <Badge tone={ok ? "success" : chosen ? "destructive" : "muted"}>
                  {ok ? "Correct" : chosen ? "Wrong" : "Skipped"}
                </Badge>
                <Badge>{q.subject}</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed clinical-text">{q.stem}</p>
              <div className="mt-3 grid gap-2 text-sm">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={cn(
                      "rounded-lg border px-3 py-2",
                      opt.id === q.correctOptionId
                        ? "border-success/50 bg-success/10"
                        : opt.id === chosen
                          ? "border-destructive/50 bg-destructive/10"
                          : "border-glass-line",
                    )}
                  >
                    <span className="mr-2 font-bold uppercase">{opt.id}</span>
                    {opt.text}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold">{q.oneLiner}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
