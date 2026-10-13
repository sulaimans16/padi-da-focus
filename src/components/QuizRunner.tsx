import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Icon, Pill, Badge, GlassCard } from "@/components/Primitives";
import { ProgressRing } from "@/components/ProgressRing";
import { CountUp, SPRING } from "@/components/motion/Reveal";
import { ComboMeter, ProgressBar } from "@/components/game/Widgets";
import { Mascot, type MascotMood } from "@/components/mascot/Mascot";
import { useAuth } from "@/hooks/useAuth";
import { answerFeedback } from "@/lib/game-feedback";
import { emitGameEvent } from "@/lib/gamification";
import { recordAttempt } from "@/lib/tracker";
import { subjectColor, type Question } from "@/lib/questions";
import { cn } from "@/lib/utils";
import { useTrack } from "@/hooks/useTrack";

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

type Feedback = { correct: boolean; amount: number; combo: number; message: string };

function buddyMood(feedback: Feedback | null, combo: number): MascotMood {
  if (!feedback) return combo >= 5 ? "fire" : "think";
  if (!feedback.correct) return "sad";
  return combo >= 5 ? "fire" : "happy";
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
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [combo, setCombo] = useState(0);
  const [shake, setShake] = useState(0);
  const stats = useRef({ xp: 0, bestCombo: 0 });
  const startedAt = useRef(Date.now());
  const shownAt = useRef(Date.now());
  const finished = useRef(false);

  const q = questions[index];
  const remaining = durationSec != null ? durationSec - elapsed : null;
  const immediate = reveal === "immediate";

  useEffect(() => {
    const t = window.setInterval(() => {
      setElapsed(Math.round((Date.now() - startedAt.current) / 1000));
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    shownAt.current = Date.now();
    setFeedback(null);
  }, [index]);

  const summary = useMemo<QuizSummary>(() => {
    const answered = Object.keys(answers).length;
    const correct = questions.filter((item) => answers[item.id] === item.correctOptionId).length;
    return { total: questions.length, answered, correct, seconds: elapsed };
  }, [answers, questions, elapsed]);

  const submit = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setSubmitted(true);
    onFinish?.({ ...summary, seconds: Math.round((Date.now() - startedAt.current) / 1000) });
  }, [onFinish, summary]);

  useEffect(() => {
    if (remaining != null && remaining <= 0 && !submitted) submit();
  }, [remaining, submitted, submit]);

  const choose = useCallback(
    (optionId: string) => {
      if (!q || submitted) return;
      if (immediate && answers[q.id]) return;
      const first = !answers[q.id];
      const correct = optionId === q.correctOptionId;
      setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
      if (first) {
        // Mock tests stay silent so the score isn't revealed mid-paper.
        const fb = answerFeedback(correct, { silent: !immediate });
        stats.current.xp += fb.amount;
        stats.current.bestCombo = Math.max(stats.current.bestCombo, fb.combo);
        setCombo(fb.combo);
        if (immediate) {
          setFeedback({ correct, ...fb });
          if (!correct) setShake((s) => s + 1);
        }
      }
      void recordAttempt({
        questionId: q.id,
        subject: q.subject,
        topic: q.topic,
        chosenOptionId: optionId,
        correct,
        seconds: (Date.now() - shownAt.current) / 1000,
        context,
      });
    },
    [q, submitted, immediate, answers, context],
  );

  const next = useCallback(() => {
    if (index === questions.length - 1) submit();
    else setIndex((i) => Math.min(questions.length - 1, i + 1));
  }, [index, questions.length, submit]);

  // Keyboard: 1-4 / A-D to answer, Enter to continue.
  useEffect(() => {
    if (submitted || !q) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const n = "1234".indexOf(e.key);
      const l = "abcd".indexOf(e.key.toLowerCase());
      const pick = n >= 0 ? n : l;
      if (pick >= 0 && q.options[pick] && !(immediate && answers[q.id])) {
        e.preventDefault();
        choose(q.options[pick]!.id);
      } else if (e.key === "Enter" && answers[q.id]) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, submitted, immediate, answers, choose, next]);

  if (submitted) {
    return (
      <ResultReview
        questions={questions}
        answers={answers}
        summary={summary}
        xp={stats.current.xp}
        bestCombo={stats.current.bestCombo}
      />
    );
  }

  if (!q) return null;

  const chosen = answers[q.id];
  const showAnswer = immediate && Boolean(chosen);
  const accent = subjectColor(q.subject);

  return (
    <div className={cn("grid gap-5 lg:grid-cols-[1fr_260px]", showAnswer && "pb-44 sm:pb-28")}>
      <div className="min-w-0 space-y-4">
        {/* Lesson progress, with Dr. Pulse reacting alongside */}
        <div className="flex items-center gap-3">
          <Mascot mood={buddyMood(feedback, combo)} size={48} />
          <ProgressBar
            value={(index + (chosen ? 1 : 0)) / questions.length}
            color="var(--color-success)"
            className="h-4 flex-1"
          />
          <ComboMeter combo={immediate ? combo : 0} />
          <span className="font-display text-xs font-bold tabular-nums text-muted-foreground">
            {index + 1}/{questions.length}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div key={shake} className={cn("card-pop p-5 sm:p-7", shake > 0 && "animate-nag")}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip" style={{ color: accent, borderColor: `${accent}66` }}>
                  {q.subject}
                </span>
                <Badge>{q.topic || "General"}</Badge>
                {q.isPyq ? (
                  <Badge tone="warning" tooltip="Appeared in a past exam">
                    PYQ {q.pyqYear ?? ""}
                  </Badge>
                ) : null}
                <button
                  type="button"
                  onClick={() =>
                    setFlagged((f) =>
                      f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id],
                    )
                  }
                  className={cn(
                    "ml-auto flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-2",
                    flagged.includes(q.id) ? "text-warning" : "text-muted-foreground",
                  )}
                  aria-label={flagged.includes(q.id) ? "Unflag question" : "Flag question"}
                >
                  <Icon name="flag" filled={flagged.includes(q.id)} className="text-[18px]" />
                </button>
              </div>

              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed clinical-text">
                {q.stem}
              </p>
              {q.imageUrl ? (
                <img
                  src={q.imageUrl}
                  alt={`Clinical figure for ${q.topic}`}
                  loading="lazy"
                  className="mt-4 max-h-72 w-full rounded-2xl border border-glass-line object-contain"
                />
              ) : null}

              <div className="mt-6 grid gap-3">
                {q.options.map((opt, i) => {
                  const isChosen = chosen === opt.id;
                  const isRight = opt.id === q.correctOptionId;
                  const state = showAnswer
                    ? isRight
                      ? "correct"
                      : isChosen
                        ? "wrong"
                        : "dim"
                    : isChosen
                      ? "selected"
                      : undefined;
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      onClick={() => choose(opt.id)}
                      disabled={showAnswer}
                      data-state={state}
                      animate={showAnswer && isRight ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="option-tile"
                    >
                      <span className="option-key text-muted-foreground">{i + 1}</span>
                      <span className="flex-1 pt-0.5 leading-snug">{opt.text}</span>
                      {showAnswer && isRight ? (
                        <Icon name="check_circle" filled className="text-[22px] text-success" />
                      ) : showAnswer && isChosen ? (
                        <Icon name="cancel" filled className="text-[22px] text-destructive" />
                      ) : null}
                    </motion.button>
                  );
                })}
              </div>

              {showAnswer ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-2xl border-2 border-glass-line bg-surface-2/50 p-4"
                >
                  <p className="text-sm font-semibold">{q.oneLiner}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {q.explanation}
                  </p>
                  {q.highYield ? (
                    <p className="mt-3 flex gap-2 rounded-xl bg-xp/10 px-3 py-2 text-xs font-semibold text-foreground">
                      <Icon name="star" filled className="text-[16px] text-xp" />
                      {q.highYield}
                    </p>
                  ) : null}
                </motion.div>
              ) : null}

              {!immediate ? (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Pill onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
                    <Icon name="chevron_left" className="text-[18px]" />
                    Previous
                  </Pill>
                  <Pill variant="primary" onClick={next}>
                    {index === questions.length - 1 ? "Finish" : "Next"}
                    <Icon name="chevron_right" className="text-[18px]" />
                  </Pill>
                </div>
              ) : !showAnswer ? (
                <p className="mt-5 text-center text-[11px] text-muted-foreground">
                  Tip: press 1–4 to answer, Enter to continue
                </p>
              ) : null}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

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
              const answer = answers[item.id];
              const state = answer
                ? immediate
                  ? answer === item.correctOptionId
                    ? "right"
                    : "wrong"
                  : "answered"
                : flagged.includes(item.id)
                  ? "flagged"
                  : "blank";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-8 rounded-xl border-2 text-[11px] font-bold transition-all duration-200 ease-out hover:scale-105",
                    i === index && "ring-2 ring-primary/60",
                    state === "right" || state === "answered"
                      ? "border-success/50 bg-success/15 text-success"
                      : state === "wrong"
                        ? "border-destructive/50 bg-destructive/15 text-destructive"
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

      {/* Duolingo-style feedback sheet */}
      <AnimatePresence>
        {feedback && showAnswer ? (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 border-t-2 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 backdrop-blur-xl md:left-64 md:pb-5",
              feedback.correct
                ? "border-success/40 bg-[color-mix(in_oklab,var(--color-success)_16%,var(--color-background))]"
                : "border-destructive/40 bg-[color-mix(in_oklab,var(--color-destructive)_14%,var(--color-background))]",
            )}
          >
            <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-4">
              <motion.span
                initial={{ scale: 0.3, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={SPRING}
                className="relative -mt-10 shrink-0"
              >
                <Mascot mood={buddyMood(feedback, feedback.combo)} size={76} />
                <span
                  className={cn(
                    "absolute -right-1 bottom-1 flex h-7 w-7 items-center justify-center rounded-full ring-2 ring-background",
                    feedback.correct
                      ? "bg-success text-success-foreground"
                      : "bg-destructive text-destructive-foreground",
                  )}
                >
                  <Icon name={feedback.correct ? "check" : "close"} className="text-[18px]" />
                </span>
              </motion.span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "font-display text-xl font-bold",
                    feedback.correct ? "text-success" : "text-destructive",
                  )}
                >
                  {feedback.correct ? feedback.message : "Not quite"}
                </p>
                <p className="text-sm text-foreground/80">
                  {feedback.correct ? (
                    <>
                      <span className="font-bold text-xp">+{feedback.amount} XP</span>
                      {feedback.combo >= 2 ? ` · ${feedback.combo} in a row` : ""}
                    </>
                  ) : (
                    <>
                      Answer:{" "}
                      <strong>{q.options.find((o) => o.id === q.correctOptionId)?.text}</strong>
                      <span className="hidden sm:inline"> · {feedback.message}</span>
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={next}
                className={cn(
                  "btn-base h-12 w-full px-8 text-base sm:w-auto",
                  feedback.correct ? "btn-success" : "btn-danger",
                )}
              >
                {index === questions.length - 1 ? "See results" : "Continue"}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ResultReview({
  questions,
  answers,
  summary,
  xp,
  bestCombo,
}: {
  questions: Question[];
  answers: Record<string, string>;
  summary: QuizSummary;
  xp: number;
  bestCombo: number;
}) {
  const track = useTrack();
  const { user } = useAuth();
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 0;
  const wrong = questions.filter((q) => answers[q.id] && answers[q.id] !== q.correctOptionId);
  const skipped = questions.filter((q) => !answers[q.id]);
  const great = pct >= 70;

  useEffect(() => {
    if (great && summary.answered > 0) emitGameEvent({ type: "confetti" });
    // Once per finished run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tiles = [
    { label: "XP earned", value: <CountUp value={xp} />, icon: "bolt", color: "var(--color-xp)" },
    {
      label: "Best combo",
      value: `${bestCombo}×`,
      icon: "local_fire_department",
      color: "var(--color-streak)",
    },
    { label: "Time", value: fmt(summary.seconds), icon: "timer", color: "var(--color-primary)" },
    {
      label: "Skipped",
      value: skipped.length,
      icon: "skip_next",
      color: "var(--color-muted-foreground)",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="card-pop p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-center gap-4 sm:justify-start">
          <Mascot mood={great ? "cheer" : pct >= 40 ? "happy" : "sad"} size={92} />
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            className="text-2xl sm:text-3xl"
          >
            {great
              ? "Lesson complete! 🎉"
              : pct >= 40
                ? "Good session 💪"
                : "Every miss is a lesson 📚"}
          </motion.h2>
        </div>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={SPRING}
          >
            <ProgressRing
              progress={pct / 100}
              size={150}
              strokeWidth={12}
              color={great ? "var(--color-success)" : "var(--color-xp)"}
            >
              <span className="font-display text-4xl font-bold">
                <CountUp value={pct} />%
              </span>
              <span className="label-eyebrow">
                {summary.correct}/{summary.total} right
              </span>
            </ProgressRing>
          </motion.div>
          <div className="grid w-full flex-1 grid-cols-2 gap-3">
            {tiles.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.1 + i * 0.07 }}
                className="rounded-2xl border-2 p-3"
                style={{ borderColor: `color-mix(in oklab, ${t.color} 45%, transparent)` }}
              >
                <p className="label-eyebrow flex items-center gap-1" style={{ color: t.color }}>
                  <Icon name={t.icon} filled className="text-[14px]" />
                  {t.label}
                </p>
                <p className="mt-1 font-display text-2xl font-bold tabular-nums">{t.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {wrong.length ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-destructive/10 px-4 py-3">
            <p className="text-sm">
              <strong>
                {wrong.length} mistake{wrong.length > 1 ? "s" : ""}
              </strong>{" "}
              went into your review queue. Fixing each one earns{" "}
              <span className="font-bold text-xp">+15 XP</span>.
            </p>
            {user ? (
              <Link
                to="/$track/review"
                params={{ track: track.slug }}
                className="btn-base btn-danger text-sm"
              >
                <Icon name="healing" className="text-[18px]" />
                Fix mistakes
              </Link>
            ) : (
              <Link to="/auth" className="btn-base btn-ghost text-sm">
                Sign in to save them
              </Link>
            )}
          </div>
        ) : null}
      </div>

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
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed clinical-text">
                {q.stem}
              </p>
              <div className="mt-3 grid gap-2 text-sm">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={cn(
                      "rounded-xl border-2 px-3 py-2",
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
