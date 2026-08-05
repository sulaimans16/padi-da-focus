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
      <div className="card-head">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-muted-foreground">
            Q{index + 1}/{total}
          </span>
          <span
            className="chip"
            style={{ backgroundColor: `${accent}1f`, color: accent }}
          >
            {question.topic}
          </span>
          <span className="chip">{DIFF_LABEL[question.difficulty]}</span>
          {question.isPyq && (
            <span className="chip text-primary">{question.source ?? `PYQ ${question.pyqYear}`}</span>
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
          <p className="label-eyebrow mb-2">Clinical vignette</p>
          <p className="clinical-text text-foreground">{question.stem}</p>
        </div>

        {/* Options + feedback */}
        <div className="p-5 lg:col-span-5">
          <p className="label-eyebrow mb-2">Single best answer</p>
          <div className="space-y-2">
            {question.options.map((opt) => {
              const isCorrect = opt.id === question.correctOptionId;
              const isPicked = opt.id === selected;
              const state = !answered
                ? "border-border bg-surface hover:bg-surface-2"
                : isCorrect
                  ? "border-success bg-success/10"
                  : isPicked
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-surface opacity-60";
              return (
                <button
                  key={opt.id}
                  onClick={() => choose(opt.id)}
                  disabled={answered}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${state}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 font-mono text-[11px] font-bold uppercase text-muted-foreground">
                    {opt.id}
                  </span>
                  <span className="flex-1 leading-snug">{opt.text}</span>
                  {answered && isCorrect && (
                    <span aria-hidden className="material-symbols-outlined text-[18px] text-success">
                      check_circle
                    </span>
                  )}
                  {answered && isPicked && !isCorrect && (
                    <span aria-hidden className="material-symbols-outlined text-[18px] text-destructive">
                      cancel
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="mt-4 space-y-3 rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-sm">
                <span className="font-bold" style={{ color: accent }}>
                  2am mode:
                </span>{" "}
                {question.oneLiner}
              </p>
              <button
                onClick={() => setExpanded((v) => !v)}
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
                        <span className="font-mono font-bold uppercase text-destructive">{id})</span>{" "}
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
