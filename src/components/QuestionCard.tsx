import { useEffect, useRef, useState } from "react";
import {
  loadBookmarks,
  logAttempt,
  subjectColor,
  toggleBookmark,
  type Question,
} from "@/lib/questions";
import { fetchBookmarkIds, recordAttempt, toggleRemoteBookmark } from "@/lib/tracker";

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
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
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

  const choose = (optionId: string) => {
    if (answered) return;
    setSelected(optionId);
    const isCorrect = optionId === question.correctOptionId;
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
    <article className="card-surface overflow-hidden">
      <div className="h-1 w-full" style={{ backgroundColor: accent }} />
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
          <span className="font-mono text-muted-foreground">
            Q{index + 1}/{total}
          </span>
          <span className="rounded px-1.5 py-0.5" style={{ backgroundColor: accent, color: "var(--color-background)" }}>
            {question.topic}
          </span>
          <span className="rounded bg-surface-2 px-1.5 py-0.5 text-muted-foreground">
            {DIFF_LABEL[question.difficulty]}
          </span>
          {question.isPyq && (
            <span className="rounded bg-surface-2 px-1.5 py-0.5 text-accent">
              {question.source ?? `PYQ ${question.pyqYear}`}
            </span>
          )}
          {(question.repeatCount ?? 0) >= 3 && (
            <span className="rounded bg-destructive/20 px-1.5 py-0.5 text-destructive">
              🔥 asked {question.repeatCount}× since 2020
            </span>
          )}
          {question.createdBy && (
            <span className="rounded bg-surface-2 px-1.5 py-0.5 text-warning">Crowdsourced</span>
          )}
          <button
            onClick={flip}
            className="ml-auto text-base leading-none"
            aria-label={bookmarked ? "Remove bookmark" : "Revise later"}
          >
            {bookmarked ? "🔖" : "🏷️"}
          </button>
        </div>

        <p className="text-[15px] leading-snug">{question.stem}</p>

        <div className="space-y-1.5">
          {question.options.map((opt) => {
            const isCorrect = opt.id === question.correctOptionId;
            const isPicked = opt.id === selected;
            const state = !answered
              ? "border-input bg-background"
              : isCorrect
                ? "border-success bg-success/15"
                : isPicked
                  ? "border-destructive bg-destructive/15"
                  : "border-input bg-background opacity-60";
            return (
              <button
                key={opt.id}
                onClick={() => choose(opt.id)}
                disabled={answered}
                className={`flex w-full items-start gap-2.5 rounded-md border px-3 py-2.5 text-left text-sm ${state}`}
              >
                <span className="font-mono text-xs uppercase text-muted-foreground">{opt.id})</span>
                <span className="flex-1">{opt.text}</span>
                {answered && isCorrect && <span className="text-success">✓</span>}
                {answered && isPicked && !isCorrect && <span className="text-destructive">✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="space-y-2 rounded-md bg-surface-2 p-3">
            <p className="text-sm">
              <span className="font-semibold" style={{ color: accent }}>
                2am mode:
              </span>{" "}
              {question.oneLiner}
            </p>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-xs uppercase tracking-wider text-primary underline underline-offset-4"
            >
              {expanded ? "Collapse" : "Full explanation"}
            </button>
            {expanded && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="text-foreground">{question.explanation}</p>
                <ul className="space-y-1">
                  {Object.entries(question.distractors).map(([id, why]) => (
                    <li key={id}>
                      <span className="font-mono uppercase text-destructive">{id})</span> {why}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="rounded border border-warning/40 bg-warning/10 px-2.5 py-2 text-xs text-foreground">
              ⭐ High yield: {question.highYield}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
