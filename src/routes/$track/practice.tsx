import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { QuizRunner } from "@/components/QuizRunner";
import { Icon, Pill } from "@/components/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MascotSays } from "@/components/mascot/Mascot";
import { ReadinessCard } from "@/components/ReadinessCard";
import { useAuth } from "@/hooks/useAuth";
import { useTrack } from "@/hooks/useTrack";
import {
  buildSmartSet,
  countImageQuestions,
  fetchImageQuestions,
  fetchSpeedPool,
} from "@/lib/practice";
import type { Question } from "@/lib/questions";
import { trackKey } from "@/lib/track-state";
import { localizeHead } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$track/practice")({
  staticData: { sitemap: true },
  head: ({ params }) =>
    localizeHead(params.track, {
      meta: [
        { title: "Practice — Smart sets, speed rounds & image questions | PG Prep" },
        {
          name: "description",
          content:
            "NEET PG practice that adapts to you: Smart Practice from your weak topics and due mistakes, 60-second speed rounds, and image-based questions.",
        },
        { property: "og:title", content: "Practice — PG Prep" },
        {
          property: "og:description",
          content: "Smart Practice, speed rounds and image questions for NEET PG.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
  component: PracticePage,
});

type Mode = "smart" | "speed" | "image";
type Session = {
  mode: Mode;
  questions: Question[];
  tags: Record<string, string>;
  durationSec?: number;
  note?: string;
};

const SPEED_LENGTHS = [60, 120] as const;

function readBest(sec: number) {
  try {
    return Number(localStorage.getItem(trackKey(`speed.best.${sec}`))) || 0;
  } catch {
    return 0;
  }
}

function PracticePage() {
  const track = useTrack();
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<Mode | null>(null);
  const [error, setError] = useState("");
  const [speedLen, setSpeedLen] = useState<(typeof SPEED_LENGTHS)[number]>(60);
  const [best, setBest] = useState(0);
  const [imageCount, setImageCount] = useState<number | null>(null);

  useEffect(() => setBest(readBest(speedLen)), [speedLen, session]);
  useEffect(() => {
    let live = true;
    void countImageQuestions().then((n) => {
      if (live) setImageCount(n);
    });
    return () => {
      live = false;
    };
  }, [track.id]);

  const start = async (mode: Mode) => {
    setLoading(mode);
    setError("");
    try {
      if (mode === "smart") {
        const set = await buildSmartSet(10);
        setSession({
          mode,
          questions: set.questions,
          tags: set.tags,
          ...(set.personalised
            ? {}
            : {
                note: user
                  ? "A balanced mix for now. Answer a few sets and I'll tailor these to your weak spots."
                  : "Sign in and answer a few sets, and I'll tailor these to your weak spots.",
              }),
        });
      } else if (mode === "speed") {
        setSession({ mode, questions: await fetchSpeedPool(60), tags: {}, durationSec: speedLen });
      } else {
        setSession({ mode, questions: await fetchImageQuestions(15), tags: {} });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load questions.");
    } finally {
      setLoading(null);
    }
  };

  if (session) {
    const title =
      session.mode === "smart"
        ? "Smart Practice"
        : session.mode === "speed"
          ? `Speed round · ${session.durationSec}s`
          : "Image questions";
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="font-display text-xl font-bold">{title}</h1>
          <Pill className="ml-auto" onClick={() => setSession(null)}>
            <Icon name="arrow_back" className="text-[18px]" />
            Practice
          </Pill>
        </div>
        {session.note ? (
          <p className="mb-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm">{session.note}</p>
        ) : null}
        {session.questions.length ? (
          <QuizRunner
            questions={session.questions}
            context={
              session.mode === "smart"
                ? "smart_practice"
                : session.mode === "speed"
                  ? "speed_round"
                  : "image_practice"
            }
            reveal="immediate"
            speed={session.mode === "speed"}
            tags={session.tags}
            {...(session.durationSec ? { durationSec: session.durationSec } : {})}
          />
        ) : (
          <p className="card-pop p-6 text-sm text-muted-foreground">
            No questions available right now. Try again in a moment.
          </p>
        )}
      </div>
    );
  }

  const cards: {
    mode: Mode;
    icon: string;
    color: string;
    title: string;
    body: string;
    meta: string;
    disabled?: boolean;
  }[] = [
    {
      mode: "smart",
      icon: "auto_awesome",
      color: "var(--color-primary)",
      title: "Smart Practice",
      body: user
        ? "10 questions picked for you: mistakes that are due, plus your weakest topics."
        : "10 questions that adapt to your weak topics once you sign in.",
      meta: "Adaptive · ~8 min",
    },
    {
      mode: "speed",
      icon: "bolt",
      color: "var(--color-xp)",
      title: "Speed Round",
      body: "Answer as many as you can before the clock runs out. No pausing, no explanations.",
      meta: best ? `Your best: ${best} correct in ${speedLen}s` : `${speedLen} seconds`,
    },
    {
      mode: "image",
      icon: "image",
      color: "var(--color-gem)",
      title: "Image questions",
      body: "Diagrams, graphs, structures and figures: practise reading the picture.",
      meta:
        imageCount == null
          ? "Counting…"
          : imageCount
            ? `${imageCount.toLocaleString()} questions with figures`
            : "Coming soon for this track",
      disabled: imageCount === 0,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Practice</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Pick your <span className="text-primary">workout</span>
        </h1>
        <MascotSays mood="happy" size={72} className="mt-4">
          {user
            ? "Smart Practice is the best use of 10 minutes. I've lined up exactly what you need."
            : "Try a speed round, or sign in so Smart Practice can learn your weak spots."}
        </MascotSays>
      </Reveal>

      {error ? (
        <p className="mt-4 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal
              key={c.mode}
              delay={0.04 * i}
              className={c.mode === "smart" ? "sm:col-span-2" : ""}
            >
              <div className={cn("card-pop flex h-full flex-col p-5", c.disabled && "opacity-60")}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      color: c.color,
                      backgroundColor: `color-mix(in oklab, ${c.color} 16%, transparent)`,
                    }}
                  >
                    <Icon name={c.icon} filled className="text-[24px]" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-bold">{c.title}</h2>
                    <p className="text-xs text-muted-foreground">{c.meta}</p>
                  </div>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                {c.mode === "speed" ? (
                  <div className="mt-3 flex gap-2" role="group" aria-label="Round length">
                    {SPEED_LENGTHS.map((len) => (
                      <button
                        key={len}
                        type="button"
                        onClick={() => setSpeedLen(len)}
                        aria-pressed={speedLen === len}
                        className={cn(
                          "flex-1 rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition-colors",
                          speedLen === len
                            ? "border-xp/60 bg-xp/15 text-xp"
                            : "border-glass-line text-muted-foreground",
                        )}
                      >
                        {len}s
                      </button>
                    ))}
                  </div>
                ) : null}
                <button
                  type="button"
                  disabled={Boolean(loading) || c.disabled}
                  onClick={() => void start(c.mode)}
                  className={cn(
                    "btn-base mt-4 h-11 w-full text-base",
                    c.mode === "smart" ? "btn-primary" : "btn-ghost",
                  )}
                >
                  {loading === c.mode ? (
                    <Icon name="progress_activity" className="animate-spin text-[20px]" />
                  ) : (
                    <Icon name="play_arrow" filled className="text-[20px]" />
                  )}
                  {loading === c.mode ? "Loading…" : "Start"}
                </button>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.16} className="sm:col-span-2">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                to="/$track/daily"
                params={{ track: track.slug }}
                className="card-pop card-pop-hover flex items-center gap-3 p-4"
              >
                <Icon name="today" filled className="text-[24px] text-streak" />
                <div className="min-w-0">
                  <p className="font-display font-bold">Daily Challenge</p>
                  <p className="text-xs text-muted-foreground">Same 10 for everyone, today</p>
                </div>
                <Icon name="chevron_right" className="ml-auto text-muted-foreground" />
              </Link>
              <Link
                to="/$track/mock"
                params={{ track: track.slug }}
                className="card-pop card-pop-hover flex items-center gap-3 p-4"
              >
                <Icon name="timer" filled className="text-[24px] text-primary" />
                <div className="min-w-0">
                  <p className="font-display font-bold">Mock test</p>
                  <p className="text-xs text-muted-foreground">Full timed paper</p>
                </div>
                <Icon name="chevron_right" className="ml-auto text-muted-foreground" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ReadinessCard />
        </Reveal>
      </div>
    </div>
  );
}
