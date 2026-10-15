import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Primitives";
import { CountUp, SPRING } from "@/components/motion/Reveal";
import { ProgressBar } from "@/components/game/Widgets";
import { Mascot, type MascotMood } from "@/components/mascot/Mascot";
import { previewLabel, type CardState, type Rating } from "@/lib/fsrs";
import { kindLabel, reviewCard, type Flashcard, type ReviewMap } from "@/lib/flashcards";
import { emitGameEvent } from "@/lib/gamification";
import { playCorrect, playTick, playWrong } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const RATINGS: {
  rating: Rating;
  label: string;
  hint: string;
  help: string;
  key: string;
  className: string;
  color: string;
}[] = [
  {
    rating: 1,
    label: "Again",
    hint: "forgot",
    help: "Forgot it. It comes back in a few minutes, this session.",
    key: "1",
    className: "btn-danger",
    color: "text-destructive",
  },
  {
    rating: 2,
    label: "Hard",
    hint: "tough",
    help: "Got it, but with effort. A shorter gap before the next review.",
    key: "2",
    className: "btn-ghost",
    color: "text-foreground",
  },
  {
    rating: 3,
    label: "Good",
    hint: "got it",
    help: "Recalled it normally. The usual gap.",
    key: "3",
    className: "btn-success",
    color: "text-success",
  },
  {
    rating: 4,
    label: "Easy",
    hint: "too easy",
    help: "Instant, no effort. The longest gap.",
    key: "4",
    className: "btn-primary",
    color: "text-primary",
  },
];

const HELP_KEY = "padida.flashcards.helpSeen";

function helpSeen() {
  try {
    return localStorage.getItem(HELP_KEY) === "1";
  } catch {
    return true;
  }
}

/** "3d" → "3 days" for screen readers and tooltips. */
function spoken(label: string) {
  const m = /^([\d.]+)(m|d|mo|y)$/.exec(label);
  if (!m) return label;
  const unit = { m: "minute", d: "day", mo: "month", y: "year" }[m[2] as "m" | "d" | "mo" | "y"];
  return `${m[1]} ${unit}${m[1] === "1" ? "" : "s"}`;
}

/** What the four buttons mean — shown once on the first flip, then on demand. */
function RatingHelp({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-background/70 p-3 pb-28 backdrop-blur-sm sm:items-center sm:pb-3"
    >
      <motion.div
        initial={{ y: 24 }}
        animate={{ y: 0 }}
        exit={{ y: 24 }}
        role="dialog"
        aria-modal="true"
        aria-label="How the rating buttons work"
        onClick={(e) => e.stopPropagation()}
        className="card-pop w-full max-w-md !bg-surface p-4"
      >
        <div className="flex items-start gap-3">
          <Mascot mood="happy" size={40} className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">How well did you remember it?</p>
            <ul className="mt-2 space-y-1 text-xs leading-relaxed">
              {RATINGS.map((r) => (
                <li key={r.rating}>
                  <span className={cn("font-bold", r.color)}>{r.label}:</span>{" "}
                  <span className="text-muted-foreground">{r.help}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              The time under each button is when you&apos;ll see this card again. Cards you keep
              remembering come back less and less often.{" "}
              <span className="sm:hidden">Tip: swipe ← for Again, → for Good.</span>
              <span className="hidden sm:inline">Tip: press 1–4 or swipe.</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="btn-base btn-primary mt-3 h-10 w-full text-sm"
        >
          Okay, let&apos;s review
        </button>
      </motion.div>
    </motion.div>
  );
}

const SWIPE = 110;

/** One review session: flip, grade (buttons, keys 1–4, or swipe), repeat. */
export function FlashcardSession({
  cards,
  reviews,
  onExit,
  onReviewed,
}: {
  cards: Flashcard[];
  reviews: ReviewMap;
  onExit: () => void;
  onReviewed: (cardId: string, state: CardState) => void;
}) {
  const [queue, setQueue] = useState<Flashcard[]>(cards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mood, setMood] = useState<MascotMood>("think");
  const [stats, setStats] = useState({ reviewed: 0, again: 0, xp: 0 });
  const [states, setStates] = useState<ReviewMap>(reviews);
  const [busy, setBusy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // First ever flip: explain the buttons once.
  useEffect(() => {
    if (flipped && !helpSeen()) setShowHelp(true);
  }, [flipped]);

  const closeHelp = () => {
    setShowHelp(false);
    try {
      localStorage.setItem(HELP_KEY, "1");
    } catch {
      // ignore
    }
  };
  const [againCount, setAgainCount] = useState<Record<string, number>>({});

  const card = queue[index];
  const done = !card;
  const prev = card ? (states[card.id] ?? null) : null;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const goodGlow = useTransform(x, [0, SWIPE], [0, 1]);
  const againGlow = useTransform(x, [-SWIPE, 0], [1, 0]);

  const grade = useCallback(
    async (rating: Rating) => {
      if (!card || busy) return;
      setBusy(true);
      if (rating === 1) playWrong();
      else if (rating >= 3) playCorrect();
      else playTick();
      setMood(rating === 1 ? "sad" : rating === 4 ? "cheer" : "happy");
      try {
        const { next, granted } = await reviewCard(card, rating, prev);
        setStates((s) => ({ ...s, [card.id]: next }));
        onReviewed(card.id, next);
        setStats((s) => ({
          reviewed: s.reviewed + 1,
          again: s.again + (rating === 1 ? 1 : 0),
          xp: s.xp + granted,
        }));
        // "Again" brings the card back later in this session (at most twice).
        const seen = againCount[card.id] ?? 0;
        if (rating === 1 && seen < 2) {
          setAgainCount((a) => ({ ...a, [card.id]: seen + 1 }));
          setQueue((q) => [...q, card]);
        }
      } finally {
        x.set(0);
        setFlipped(false);
        setIndex((i) => i + 1);
        setBusy(false);
        window.setTimeout(() => setMood("think"), 900);
      }
    },
    [card, busy, prev, onReviewed, againCount, x],
  );

  // Keyboard: space/enter flips, 1–4 grades.
  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA"].includes(t.tagName)) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && "1234".includes(e.key)) {
        e.preventDefault();
        void grade(Number(e.key) as Rating);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, flipped, grade]);

  useEffect(() => {
    if (done && stats.reviewed > 0) emitGameEvent({ type: "confetti" });
  }, [done, stats.reviewed]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!flipped) {
      x.set(0);
      return;
    }
    if (info.offset.x > SWIPE) void grade(3);
    else if (info.offset.x < -SWIPE) void grade(1);
    else x.set(0);
  };

  const labels = useMemo(
    () => (card ? RATINGS.map((r) => previewLabel(prev, r.rating)) : []),
    [card, prev],
  );

  if (done) {
    const retention = stats.reviewed
      ? Math.round(((stats.reviewed - stats.again) / stats.reviewed) * 100)
      : 0;
    return (
      <div className="card-pop mx-auto max-w-lg p-8 text-center">
        <Mascot mood={stats.reviewed ? "cheer" : "happy"} size={120} className="mx-auto" />
        <h2 className="mt-4 text-3xl">{stats.reviewed ? "Deck cleared!" : "All caught up!"}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {stats.reviewed
            ? "Your memory just got a little stronger. Come back when cards are due."
            : "Nothing due right now. Your next cards will be ready soon."}
        </p>
        {stats.reviewed ? (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              {
                label: "Reviewed",
                value: <CountUp value={stats.reviewed} />,
                color: "var(--color-primary)",
              },
              { label: "XP", value: <CountUp value={stats.xp} />, color: "var(--color-xp)" },
              { label: "Recalled", value: `${retention}%`, color: "var(--color-success)" },
            ].map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.1 + i * 0.07 }}
                className="rounded-2xl border-2 p-3"
                style={{ borderColor: `color-mix(in oklab, ${t.color} 45%, transparent)` }}
              >
                <p
                  className="font-display text-2xl font-bold tabular-nums"
                  style={{ color: t.color }}
                >
                  {t.value}
                </p>
                <p className="label-eyebrow">{t.label}</p>
              </motion.div>
            ))}
          </div>
        ) : null}
        <button
          type="button"
          onClick={onExit}
          className="btn-base btn-primary mt-7 h-12 w-full text-base"
        >
          Back to decks
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onExit}
          aria-label="End review"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2"
        >
          <Icon name="close" className="text-[22px]" />
        </button>
        <ProgressBar
          value={index / queue.length}
          color="var(--color-success)"
          className="h-4 flex-1"
        />
        <span className="font-display text-xs font-bold tabular-nums text-muted-foreground">
          {Math.min(index + 1, queue.length)}/{queue.length}
        </span>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <Mascot mood={mood} size={56} />
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          {flipped ? "How well did you know it?" : "Recall it first, then flip."}
        </p>
      </div>

      {/* Card stack */}
      <div className="relative mt-2 h-[22rem] [perspective:1400px] sm:h-[24rem]">
        {queue[index + 1] ? (
          <div className="card-pop absolute inset-x-4 top-3 h-full opacity-50" aria-hidden />
        ) : null}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${card.id}-${index}`}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
            transition={SPRING}
            drag={flipped ? "x" : false}
            dragSnapToOrigin
            onDragEnd={onDragEnd}
            style={{ x, rotate }}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <motion.button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative h-full w-full text-left [transform-style:preserve-3d]"
              aria-label={flipped ? "Show question" : "Show answer"}
            >
              {/* front */}
              <div className="card-pop absolute inset-0 flex flex-col p-6 [backface-visibility:hidden]">
                <span className="chip w-fit text-primary">{kindLabel(card.kind)}</span>
                <p className="clinical-text mt-5 flex-1 overflow-y-auto text-lg leading-relaxed">
                  {card.front}
                </p>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Icon name="touch_app" className="text-[16px]" />
                  Tap to flip
                </p>
              </div>
              {/* back */}
              <div className="card-pop absolute inset-0 flex flex-col p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="chip w-fit text-success">Answer</span>
                <div className="mt-4 flex-1 overflow-y-auto">
                  <p className="font-display text-xl font-bold leading-snug">{card.back}</p>
                  {card.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.note}
                    </p>
                  ) : null}
                </div>
                <p className="mt-3 hidden text-center text-[11px] font-semibold text-muted-foreground sm:block">
                  Swipe ← Again · Good → · or press 1–4
                </p>
              </div>
            </motion.button>
            {/* swipe tint */}
            <motion.span
              aria-hidden
              style={{ opacity: goodGlow }}
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-4 ring-success"
            />
            <motion.span
              aria-hidden
              style={{ opacity: againGlow }}
              className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-4 ring-destructive"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 min-h-[4.5rem]">
        <AnimatePresence>
          {flipped && showHelp ? <RatingHelp onClose={closeHelp} /> : null}
        </AnimatePresence>
        {flipped ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-4 gap-2">
              {RATINGS.map((r, i) => {
                const when = labels[i] ?? "";
                const tip = `${r.label} — ${r.hint}. Next review in ${spoken(when)}.`;
                return (
                  <button
                    key={r.rating}
                    type="button"
                    disabled={busy}
                    onClick={() => void grade(r.rating)}
                    title={tip}
                    aria-label={tip}
                    className={cn("btn-base h-[4.5rem] flex-col gap-0 px-1 text-sm", r.className)}
                  >
                    {r.label}
                    <span className="text-[10px] font-medium leading-tight opacity-80">
                      {r.hint}
                    </span>
                    <span className="text-[10px] font-semibold leading-tight opacity-75">
                      in {when}
                    </span>
                  </button>
                );
              })}
            </div>
            {!showHelp ? (
              <button
                type="button"
                onClick={() => setShowHelp(true)}
                className="mx-auto mt-3 flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
              >
                <Icon name="info" className="text-[16px]" />
                How do these work?
              </button>
            ) : null}
          </motion.div>
        ) : (
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="btn-base btn-primary h-14 w-full text-base"
          >
            Show answer
          </button>
        )}
      </div>
    </div>
  );
}
