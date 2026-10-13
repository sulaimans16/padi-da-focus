import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { MascotSays } from "@/components/mascot/Mascot";
import { useAuth } from "@/hooks/useAuth";
import { doctorName } from "@/lib/doctor-name";
import { needsOnboarding } from "@/lib/onboarding";
import { lastTrack, type TrackId } from "@/lib/track-state";
import { TRACK_LIST, type Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Learners Studio Prep — NEET UG & NEET PG" },
      {
        name: "description",
        content:
          "Pick your exam: NEET UG (Physics, Chemistry, Biology from NCERT) or NEET PG (19 clinical subjects). Lessons, question bank, PYQs, mocks, flashcards, streaks and leagues.",
      },
      { property: "og:title", content: "NEET UG & NEET PG prep — Learners Studio" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ExamPicker,
});

const COMING_SOON = [
  { label: "Engineering", note: "JEE Main & Advanced", icon: "engineering" },
  { label: "Government", note: "UPSC, SSC, banking", icon: "account_balance" },
  { label: "Nursing & allied", note: "NORCET and more", icon: "medical_services" },
];

const TRACK_ART: Record<TrackId, { icon: string; hue: number; points: string[] }> = {
  neet_ug: {
    icon: "biotech",
    hue: 160,
    points: [
      "Physics · Chemistry · Botany · Zoology",
      "NCERT-first lessons",
      "180-question NTA mocks",
    ],
  },
  neet_pg: {
    icon: "stethoscope",
    hue: 250,
    points: ["19 clinical subjects", "Vignette-first lessons", "200-question NBE mocks"],
  },
};

function TrackCard({ track, last, index }: { track: Track; last: boolean; index: number }) {
  const art = TRACK_ART[track.id];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING, delay: 0.08 * index }}
    >
      <Link
        to="/$track"
        params={{ track: track.slug }}
        className={cn(
          "card-pop card-pop-hover group flex h-full flex-col overflow-hidden",
          last && "ring-2 ring-primary/50",
        )}
      >
        <div
          className="relative flex h-28 items-center justify-between px-5"
          style={{
            background: `linear-gradient(135deg, oklch(0.72 0.13 ${art.hue} / 0.35), oklch(0.72 0.13 ${art.hue + 40} / 0.12))`,
          }}
        >
          <div>
            <p className="label-eyebrow">{track.brand.a} Prep</p>
            <h2 className="mt-1 text-3xl">{track.name}</h2>
          </div>
          <span
            className="flex h-16 w-16 items-center justify-center rounded-3xl"
            style={{ background: `oklch(0.72 0.13 ${art.hue} / 0.25)` }}
          >
            <Icon name={art.icon} filled className="text-[36px] text-foreground" />
          </span>
          {last ? (
            <span className="chip absolute right-3 top-3 bg-primary/15 text-primary">
              Last studied
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col border-t-2 border-glass-line p-5">
          <p className="text-sm text-muted-foreground">{track.tagline}</p>
          <ul className="mt-3 space-y-1.5">
            {art.points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm">
                <Icon name="check_circle" filled className="text-[16px] text-primary" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">For {track.audience.toLowerCase()}</p>
          <span className="btn-base btn-primary mt-5 h-11 justify-center text-sm">
            {last ? "Continue" : "Enter"} {track.name}
            <Icon name="arrow_forward" className="text-[18px]" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ExamPicker() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [last, setLast] = useState<TrackId | null>(null);
  useEffect(() => setLast(lastTrack()), []);
  // Brand-new learners go through the short setup wizard first.
  useEffect(() => {
    if (!user) return;
    void needsOnboarding().then((need) => {
      if (need) void navigate({ to: "/onboarding", replace: true });
    });
  }, [user, navigate]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-6 sm:px-6 lg:py-10">
      <header className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-display text-lg font-bold">
          <BrandMark />
          Learners <span className="text-primary">Studio</span>
        </span>
        {user ? null : (
          <Link to="/auth" className="btn-base btn-ghost h-10 text-sm">
            <Icon name="login" className="text-[18px]" />
            Sign in
          </Link>
        )}
      </header>

      <section className="mt-8">
        <p className="label-eyebrow">Choose your exam</p>
        <h1 className="mt-1 text-3xl sm:text-4xl">
          {user
            ? `${last ? "Welcome back" : "Welcome"}, ${doctorName(user.user_metadata?.["full_name"] as string | undefined, user.email)}`
            : "What are you preparing for?"}
        </h1>
        <MascotSays mood="happy" size={72} className="mt-4 max-w-xl">
          Each exam is its own track — its own lessons, questions, streak and league. Switch any
          time from the top bar.
        </MascotSays>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-end gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Icon name="medical_services" filled className="text-[22px] text-primary" />
              Medical
            </h2>
            <p className="text-xs text-muted-foreground">Entrance exams for MBBS and MD/MS</p>
          </div>
          <span className="fade-rule mb-2 flex-1" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {TRACK_LIST.map((t, i) => (
            <TrackCard key={t.id} track={t} last={last === t.id} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="label-eyebrow">Coming later</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {COMING_SOON.map((c) => (
            <div
              key={c.label}
              className="card-surface flex items-center gap-3 p-4 opacity-60"
              aria-disabled="true"
            >
              <Icon name={c.icon} className="text-[24px] text-muted-foreground" />
              <div>
                <p className="text-sm font-semibold">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <Link to="/pricing" className="hover:text-foreground">
          Pro plans
        </Link>
        <Link to="/privacy" className="hover:text-foreground">
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}
