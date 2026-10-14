import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Icon } from "@/components/Primitives";
import { Mascot } from "@/components/mascot/Mascot";
import { cn } from "@/lib/utils";

/**
 * The product, row by row: copy on one side, a small markup mock of the real
 * screen on the other (no screenshots, so it follows the theme).
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const panel = "rounded-[1.75rem] bg-white/5 p-5 ring-1 ring-inset ring-glass-line";
const tile = "rounded-[1.1rem] bg-white/5 ring-1 ring-inset ring-glass-line";

function DrPulseMock() {
  return (
    <div className={cn(panel, "space-y-3")}>
      <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-xs text-primary-foreground">
        How am I doing? What should I study today?
      </p>
      <div className="flex items-start gap-2">
        <Mascot mood="happy" size={30} className="mt-1 shrink-0" />
        <div className="rounded-2xl rounded-tl-md border border-glass-line bg-background/60 px-3 py-2 text-xs leading-relaxed">
          You&apos;re at <b>78%</b> overall, but <b>Renal pathology</b> is at 41% over 22 questions.
          With 118 days left:
          <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
            <li>
              Revise the{" "}
              <span className="font-semibold text-primary underline">Nephrotic syndrome</span>{" "}
              lesson
            </li>
            <li>
              Then a <span className="font-semibold text-primary underline">Smart Practice</span>{" "}
              set
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function FocusMock() {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn(panel, "flex flex-col items-center gap-4 py-7")}>
      <div className="relative grid size-32 place-items-center">
        <svg viewBox="0 0 108 108" className="absolute inset-0 -rotate-90" aria-hidden>
          <circle
            cx="54"
            cy="54"
            r={r}
            fill="none"
            strokeWidth="8"
            stroke="var(--color-surface-2)"
          />
          <circle
            cx="54"
            cy="54"
            r={r}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="var(--color-primary)"
            strokeDasharray={c}
            strokeDashoffset={c * 0.38}
          />
        </svg>
        <span className="font-mono text-2xl font-bold tabular-nums">15:32</span>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-[11px] ring-1 ring-inset ring-glass-line">
        <Icon name="lock_clock" className="text-[15px] text-primary" />
        Outside links are locked until your timer ends
      </span>
    </div>
  );
}

function ReadinessMock() {
  return (
    <div className={cn(panel, "grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center")}>
      <div className="mx-auto text-center">
        <p className="font-display text-5xl font-bold tabular-nums">
          64<span className="text-lg text-muted-foreground">/100</span>
        </p>
        <p className="mt-1 text-[11px] font-semibold text-primary">On track</p>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Smart Practice picked
        </p>
        {[
          ["Renal pathology", "41%"],
          ["Antiarrhythmics", "52%"],
          ["Mistakes due", "6"],
        ].map(([k, v]) => (
          <div key={k} className={cn(tile, "flex items-center justify-between px-3 py-2 text-xs")}>
            {k}
            <span className="font-mono text-muted-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialMock() {
  return (
    <div className={cn(panel, "space-y-3")}>
      <div className="grid grid-cols-2 gap-3">
        <div className={cn(tile, "p-3")}>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Streak</p>
          <p className="mt-1 flex items-center gap-1 text-lg">
            <Icon name="local_fire_department" filled className="text-[20px] text-primary" />
            12 days
          </p>
        </div>
        <div className={cn(tile, "p-3")}>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">League</p>
          <p className="mt-1 text-lg">Gold · #3</p>
        </div>
      </div>
      <div className={cn(tile, "flex items-center justify-between gap-3 p-3")}>
        <div className="min-w-0">
          <p className="truncate text-xs">
            <span className="text-primary">@rahul_md</span> challenged you
          </p>
          <p className="text-[10px] text-muted-foreground">10 questions · they scored 7</p>
        </div>
        <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
          Play
        </span>
      </div>
    </div>
  );
}

type Row = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  pro?: boolean;
  mock: ReactNode;
};

const ROWS: Row[] = [
  {
    eyebrow: "Dr. Pulse AI",
    title: "A tutor that knows your progress.",
    body: "Ask a doubt at 2am, or ask what to study next. Dr. Pulse reads your accuracy, weak topics, exam date and roadmap, and answers with links straight to the right lesson or practice set.",
    points: [
      "Explains the question on your screen",
      "Hints first, answers when you ask",
      "Knows every corner of the app",
    ],
    pro: true,
    mock: <DrPulseMock />,
  },
  {
    eyebrow: "Focus Lock",
    title: "Use the whole app. Nothing else.",
    body: "Start a timed session and study anywhere in Learners Studio. Leaving for another tab counts as an escape, outside links stay locked and the timer follows you on every page.",
    points: [
      "Fullscreen, distraction-free",
      "Escape count on every session",
      "Focus minutes in your analytics",
    ],
    mock: <FocusMock />,
  },
  {
    eyebrow: "Smart Practice & readiness",
    title: "Practise what moves your score.",
    body: "Every answer feeds a readiness score built on accuracy, syllabus coverage and consistency. Smart Practice then serves your weakest topics and the mistakes that are due.",
    points: [
      "Speed rounds and image questions",
      "Spaced-repetition flashcards",
      "Weak-spot lists per topic",
    ],
    mock: <ReadinessMock />,
  },
  {
    eyebrow: "Streaks, leagues & friends",
    title: "Stay consistent, together.",
    body: "Daily goals and streaks keep the habit going. Weekly leagues, friend challenges and a monthly sprint add just enough competition to show up tomorrow.",
    points: [
      "Challenge friends by @username",
      "Weekly XP leagues",
      "Invite a friend, both get 7 days of Pro",
    ],
    mock: <SocialMock />,
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="mx-auto max-w-6xl space-y-24 px-6 py-20">
      {ROWS.map((row, i) => (
        <motion.div
          key={row.eyebrow}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div className={cn(i % 2 === 1 && "lg:order-2")}>
            <div className="flex items-center gap-2">
              <p className="label-eyebrow text-primary">{row.eyebrow}</p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset",
                  row.pro
                    ? "bg-primary/15 text-primary ring-primary/30"
                    : "bg-white/5 text-muted-foreground ring-glass-line",
                )}
              >
                {row.pro ? "Pro" : "Free"}
              </span>
            </div>
            <h3 className="mt-3 text-3xl leading-tight tracking-tight">{row.title}</h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {row.body}
            </p>
            <ul className="mt-6 space-y-2.5">
              {row.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm">
                  <Icon name="check_circle" className="text-[18px] text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className={cn("mx-auto w-full max-w-md", i % 2 === 1 && "lg:order-1")}>
            {row.mock}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
