import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";

/**
 * Interactive product tour that behaves like a video: chapters auto-advance,
 * progress bars fill, and the viewer can scrub, pause or jump around.
 * Each chapter renders a live mock of the real screen instead of a video file.
 */

type Chapter = {
  title: string;
  caption: string;
  seconds: number;
  screen: () => React.ReactElement;
};

function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "accent" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full rounded-full ${tone === "primary" ? "bg-primary" : "bg-accent"}`}
      />
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.25rem] bg-white/5 p-4 ring-1 ring-inset ring-glass-line">
      {children}
    </div>
  );
}

function QuestionScreen() {
  const options = [
    "Minimal change disease",
    "Membranous nephropathy",
    "Focal segmental glomerulosclerosis",
    "Diabetic nephropathy",
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Question 12 of 50 · Pediatrics</span>
        <span className="font-mono text-primary">00:38</span>
      </div>
      <Tile>
        <p className="text-sm leading-relaxed">
          Which of the following is the most common cause of nephrotic syndrome in children?
        </p>
      </Tile>
      <div className="space-y-2">
        {options.map((o, i) => (
          <motion.div
            key={o}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.09, duration: 0.45 }}
            className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-xs ring-1 ring-inset ${
              i === 0
                ? "bg-primary/15 text-foreground ring-primary/40"
                : "bg-white/5 text-muted-foreground ring-glass-line"
            }`}
          >
            <span className="grid size-5 place-items-center rounded-full bg-white/10 text-[10px]">
              {String.fromCharCode(65 + i)}
            </span>
            {o}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FocusScreen() {
  return (
    <div className="grid h-full place-items-center py-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto grid size-40 place-items-center rounded-full ring-1 ring-inset ring-primary/40"
        >
          <div className="absolute inset-3 animate-breathe rounded-full bg-primary/10 blur-xl" />
          <div className="relative">
            <p className="font-mono text-3xl">24:18</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              locked in
            </p>
          </div>
        </motion.div>
        <p className="mt-5 text-xs text-muted-foreground">
          Leave the tab or look away and the deterrent plays. No snooze, no escape.
        </p>
      </div>
    </div>
  );
}

function StatsScreen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Streak", "12", "days"],
          ["Accuracy", "78%", "+6% wk"],
          ["Mock", "642", "of 1050"],
        ].map(([k, v, s]) => (
          <Tile key={k}>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{k}</p>
            <p className="mt-1 text-xl">{v}</p>
            <p className="text-[10px] text-muted-foreground">{s}</p>
          </Tile>
        ))}
      </div>
      <Tile>
        <p className="text-[11px] text-muted-foreground">Subject completion</p>
        <div className="mt-3 space-y-3">
          {[
            ["Pathology", 85],
            ["Pharmacology", 72],
            ["Microbiology", 58],
          ].map(([label, v]) => (
            <div key={label as string}>
              <div className="mb-1.5 flex justify-between text-[11px]">
                <span>{label}</span>
                <span className="text-muted-foreground">{v}%</span>
              </div>
              <Bar value={v as number} />
            </div>
          ))}
        </div>
      </Tile>
    </div>
  );
}

function WeakSpotScreen() {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">
        Weakest topics from your last 340 attempts
      </p>
      {[
        ["Acid–base disorders", "Medicine", 41],
        ["Antiarrhythmics", "Pharmacology", 47],
        ["Obstetric haemorrhage", "OBG", 52],
      ].map(([topic, subject, acc], i) => (
        <motion.div
          key={topic as string}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.45 }}
        >
          <Tile>
            <div className="flex items-baseline justify-between">
              <p className="text-sm">{topic}</p>
              <p className="font-mono text-sm text-destructive">{acc}%</p>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{subject}</p>
            <div className="mt-3">
              <Bar value={acc as number} tone="accent" />
            </div>
          </Tile>
        </motion.div>
      ))}
    </div>
  );
}

function PyqScreen() {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">Previous year recalls, 2018 – 2025</p>
      <div className="grid grid-cols-2 gap-3">
        {["2025", "2024", "2023", "2022"].map((y, i) => (
          <motion.div
            key={y}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Tile>
              <p className="text-lg">{y}</p>
              <p className="text-[11px] text-muted-foreground">
                {[52, 48, 44, 39][i]} recalls · free paper
              </p>
            </Tile>
          </motion.div>
        ))}
      </div>
      <Tile>
        <p className="text-xs text-muted-foreground">
          Download any year as a printable paper — free, no account needed.
        </p>
      </Tile>
    </div>
  );
}

const CHAPTERS: Chapter[] = [
  {
    title: "Practice like the real exam",
    caption: "NBE-pattern MCQs with timers, flags and instant explanations.",
    seconds: 6,
    screen: QuestionScreen,
  },
  {
    title: "Focus Lock keeps you honest",
    caption: "A hard lockout with tab and gaze watching, so the session actually happens.",
    seconds: 6,
    screen: FocusScreen,
  },
  {
    title: "Progress you can read at a glance",
    caption: "Streaks, accuracy and subject completion update with every attempt.",
    seconds: 6,
    screen: StatsScreen,
  },
  {
    title: "Weak spots found for you",
    caption: "Your lowest-accuracy topics, ranked, so revision starts where it hurts.",
    seconds: 6,
    screen: WeakSpotScreen,
  },
  {
    title: "Eight years of PYQs",
    caption: "Authentic recalls by year and subject, with free downloadable papers.",
    seconds: 6,
    screen: PyqScreen,
  },
];

export function VideoTour({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  const chapter = CHAPTERS[index]!;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 0.1 >= chapter.seconds) {
          setIndex((i) => (i + 1) % CHAPTERS.length);
          return 0;
        }
        return e + 0.1;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing, chapter.seconds]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const go = (i: number) => {
    setIndex((i + CHAPTERS.length) % CHAPTERS.length);
    setElapsed(0);
  };

  const Screen = chapter.screen;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-background/80 px-4 py-8 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white/5 p-5 ring-1 ring-inset ring-glass-line sm:p-7"
      >
        <button
          onClick={onClose}
          aria-label="Close the tour"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="close" className="text-[20px]" />
        </button>

        <p className="label-eyebrow">Interactive tour</p>
        <h2 className="mt-1 pr-12 text-2xl sm:text-3xl">How PG Prep works</h2>

        {/* chapter progress bars, like a video timeline */}
        <div className="mt-5 flex gap-1.5">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.title}
              onClick={() => go(i)}
              aria-label={c.title}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-100"
                style={{
                  width: i < index ? "100%" : i === index ? `${(elapsed / c.seconds) * 100}%` : "0%",
                }}
              />
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="min-h-[340px] rounded-[1.75rem] bg-white/[0.04] p-5 ring-1 ring-inset ring-glass-line">
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.caption}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[11px] font-mono text-primary">
                  Chapter {index + 1} / {CHAPTERS.length}
                </p>
                <h3 className="mt-2 text-xl leading-snug">{chapter.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {chapter.caption}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous chapter"
                className="grid size-11 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-glass-line transition-colors hover:bg-white/10"
              >
                <Icon name="skip_previous" className="text-[20px]" />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="btn-base btn-primary h-11 flex-1 text-sm"
              >
                <Icon name={playing ? "pause" : "play_arrow"} className="text-[20px]" />
                {playing ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next chapter"
                className="grid size-11 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-glass-line transition-colors hover:bg-white/10"
              >
                <Icon name="skip_next" className="text-[20px]" />
              </button>
            </div>

            <ul className="mt-6 space-y-1">
              {CHAPTERS.map((c, i) => (
                <li key={c.title}>
                  <button
                    onClick={() => go(i)}
                    className={`w-full rounded-full px-4 py-2 text-left text-xs transition-colors ${
                      i === index
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {i + 1}. {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
