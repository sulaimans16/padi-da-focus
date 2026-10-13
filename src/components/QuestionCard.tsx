import { useEffect, useRef, useState } from "react";
import {
  loadBookmarks,
  logAttempt,
  subjectColor,
  toggleBookmark,
  type Question,
} from "@/lib/questions";
import { fetchBookmarkIds, recordAttempt, toggleRemoteBookmark } from "@/lib/tracker";
import { motion } from "motion/react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { answerFeedback } from "@/lib/game-feedback";
import { cn } from "@/lib/utils";
import { useTrack } from "@/hooks/useTrack";
import { aiQuestion, setAiPageContext } from "@/lib/ai-page-context";

const DIFF_LABEL: Record<Question["difficulty"], string> = {
  easy: "Easy",
  med: "Moderate",
  hard: "Hard",
};

export function QuestionCard({
  question,
  index,
  total,
  context,
}: {
  question: Question;
  index: number;
  total: number;
  context: "question_bank" | "pyq";
}) {
  const track = useTrack();
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<ReturnType<typeof answerFeedback> | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => loadBookmarks());
  const shownAt = useRef(Date.now());
  const answered = selected !== null;
  const bookmarked = bookmarks.includes(question.id);
  const accent = subjectColor(question.subject);

  useEffect(() => {
    // Signed-in users get their cloud bookmarks; signed-out users keep the local list.
    void fetchBookmarkIds()
      .then((ids) => {
        if (ids.length) setBookmarks((prev) => Array.from(new Set([...ids, ...prev])));
      })
      .catch(() => undefined);
  }, []);

  // The card the learner last touched is the one Dr. Pulse sees.
  const shareWithAi = (isAnswered: boolean) =>
    setAiPageContext({ question: aiQuestion(question, isAnswered) });

  const choose = (optionId: string) => {
    if (answered) return;
    setSelected(optionId);
    shareWithAi(true);
    const isCorrect = optionId === question.correctOptionId;
    setFeedback(answerFeedback(isCorrect));
    logAttempt({
      questionId: question.id,
      subject: question.subject,
      selectedOptionId: optionId,
      isCorrect,
      context,
      attemptedAt: Date.now(),
    });
    void recordAttempt({
      questionId: question.id,
      subject: question.subject,
      topic: question.topic,
      chosenOptionId: optionId,
      correct: isCorrect,
      seconds: (Date.now() - shownAt.current) / 1000,
      context,
    });
  };

  const flip = () => {
    const next = toggleBookmark(question.id);
    setBookmarks(next);
    void toggleRemoteBookmark(question.id, next.includes(question.id));
  };

  return (
    <article
      className={cn(
        "card-pop overflow-hidden",
        answered && selected !== question.correctOptionId && "animate-nag",
      )}
    >
      <div className="card-head">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-muted-foreground">
            Q{index + 1}/{total}
          </span>
          <span className="chip" style={{ backgroundColor: `${accent}1f`, color: accent }}>
            {question.topic}
          </span>
          <span className="chip">{DIFF_LABEL[question.difficulty]}</span>
          {question.isPyq && (
            <span className="chip text-primary">
              {question.source ?? `PYQ ${question.pyqYear}`}
            </span>
          )}
          {(question.repeatCount ?? 0) >= 3 && (
            <span className="chip text-destructive">
              Repeated {question.repeatCount}× since 2020
            </span>
          )}
          {question.createdBy && <span className="chip text-warning">Crowdsourced</span>}
        </div>
        <button
          onClick={flip}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-3"
          aria-label={bookmarked ? "Remove bookmark" : "Revise later"}
        >
          <span
            aria-hidden
            className={`material-symbols-outlined text-[20px] ${bookmarked ? "text-primary" : "text-muted-foreground"}`}
            style={bookmarked ? { fontVariationSettings: '"FILL" 1' } : undefined}
          >
            bookmark
          </span>
        </button>
      </div>

      <div className="grid gap-0 lg:grid-cols-12">
        {/* Clinical vignette */}
        <div className="border-b border-border p-5 lg:col-span-7 lg:border-b-0 lg:border-r">
          <p className="label-eyebrow mb-2">
            {track.id === "neet_ug" ? "Question" : "Clinical vignette"}
          </p>
          {/* pre-line keeps statement lists and match-the-column rows on their own lines */}
          <p className="clinical-text whitespace-pre-line text-foreground">{question.stem}</p>
          {question.imageUrl ? (
            <img
              src={question.imageUrl}
              alt={`Figure for: ${question.stem.slice(0, 80)}`}
              loading="lazy"
              className="mt-3 max-h-72 w-full rounded-lg border border-border bg-surface-2 object-contain"
            />
          ) : null}
        </div>

        {/* Options + feedback */}
        <div className="p-5 lg:col-span-5">
          <p className="label-eyebrow mb-2">Single best answer</p>
          <div className="space-y-2.5">
            {question.options.map((opt, i) => {
              const isCorrect = opt.id === question.correctOptionId;
              const isPicked = opt.id === selected;
              const state = !answered
                ? undefined
                : isCorrect
                  ? "correct"
                  : isPicked
                    ? "wrong"
                    : "dim";
              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => choose(opt.id)}
                  disabled={answered}
                  data-state={state}
                  animate={answered && isCorrect ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="option-tile py-2.5"
                >
                  <span className="option-key text-muted-foreground">{i + 1}</span>
                  <span className="flex-1 pt-0.5 leading-snug">{opt.text}</span>
                  {answered && isCorrect && (
                    <Icon name="check_circle" filled className="text-[20px] text-success" />
                  )}
                  {answered && isPicked && !isCorrect && (
                    <Icon name="cancel" filled className="text-[20px] text-destructive" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={SPRING}
              className={cn(
                "mt-4 flex items-center gap-3 rounded-2xl px-4 py-3",
                selected === question.correctOptionId ? "bg-success/15" : "bg-destructive/12",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  selected === question.correctOptionId
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground",
                )}
              >
                <Icon
                  name={selected === question.correctOptionId ? "check" : "close"}
                  className="text-[22px]"
                />
              </span>
              <p className="min-w-0 flex-1 text-sm font-semibold">{feedback.message}</p>
              <span className="shrink-0 font-display text-sm font-bold text-xp">
                +{feedback.amount} XP
              </span>
            </motion.div>
          )}

          {answered && (
            <div className="mt-4 space-y-3 rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-sm">
                <span className="font-bold" style={{ color: accent }}>
                  2am mode:
                </span>{" "}
                {question.oneLiner}
              </p>
              <button
                onClick={() => {
                  setExpanded((v) => !v);
                  shareWithAi(answered);
                }}
                className="label-eyebrow text-primary"
              >
                {expanded ? "Collapse explanation" : "Full explanation"}
              </button>
              {expanded && (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="clinical-text text-foreground">{question.explanation}</p>
                  <ul className="space-y-1">
                    {Object.entries(question.distractors).map(([id, why]) => (
                      <li key={id}>
                        <span className="font-mono font-bold uppercase text-destructive">
                          {id})
                        </span>{" "}
                        {why}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="flex gap-2 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-foreground">
                <span aria-hidden className="material-symbols-outlined text-[16px] text-warning">
                  star
                </span>
                <span>
                  <strong>High yield:</strong> {question.highYield}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
