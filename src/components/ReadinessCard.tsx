import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import { ProgressRing } from "@/components/ProgressRing";
import { ProgressBar } from "@/components/game/Widgets";
import { useAuth } from "@/hooks/useAuth";
import { useTrack } from "@/hooks/useTrack";
import { MIN_ATTEMPTS, readiness, type Readiness } from "@/lib/readiness";
import { fetchAttempts } from "@/lib/tracker";
import { cn } from "@/lib/utils";

const BAND_COLOR: Record<Readiness["band"], string> = {
  "Getting started": "var(--color-destructive)",
  Building: "var(--color-streak)",
  "On track": "var(--color-xp)",
  "Exam ready": "var(--color-success)",
};

/** Exam-readiness estimate (0–100) from the learner's own attempts on this track. */
export function ReadinessCard({ className }: { className?: string }) {
  const track = useTrack();
  const { user, loading } = useAuth();
  const [r, setR] = useState<Readiness | null>(null);

  useEffect(() => {
    if (!user) return;
    let live = true;
    fetchAttempts()
      .then((rows) => {
        if (live) setR(readiness(rows, track.subjects));
      })
      .catch(() => {
        if (live) setR(readiness([], track.subjects));
      });
    return () => {
      live = false;
    };
  }, [user, track.subjects]);

  const shell = cn("card-pop p-5", className);
  const head = (
    <div className="flex items-center gap-2">
      <Icon name="speed" className="text-[20px] text-primary" />
      <p className="font-display text-base font-bold">Exam readiness</p>
    </div>
  );

  if (loading) return <div className={cn(shell, "h-44")} aria-hidden />;

  if (!user) {
    return (
      <div className={shell}>
        {head}
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in and practise to see a live readiness score for {track.name}.
        </p>
        <Link to="/auth" className="btn-base btn-ghost mt-4 h-10 w-full text-sm">
          Sign in
        </Link>
      </div>
    );
  }

  if (!r) return <div className={cn(shell, "h-44 animate-pulse")} aria-hidden />;

  if (r.score == null) {
    return (
      <div className={shell}>
        {head}
        <p className="mt-2 text-sm text-muted-foreground">
          Answer {MIN_ATTEMPTS} questions to unlock your readiness score.
        </p>
        <ProgressBar
          value={r.attempts / MIN_ATTEMPTS}
          color="var(--color-primary)"
          className="mt-3 h-3"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {r.attempts}/{MIN_ATTEMPTS} answered
        </p>
        <Link
          to="/$track/practice"
          params={{ track: track.slug }}
          className="btn-base btn-primary mt-4 h-10 w-full text-sm"
        >
          Start Smart Practice
        </Link>
      </div>
    );
  }

  const color = BAND_COLOR[r.band];
  const parts = [
    { label: "Accuracy (all subjects)", value: r.accuracy, color: "var(--color-success)" },
    { label: "Coverage", value: r.coverage, color: "var(--color-primary)" },
    { label: "Consistency", value: r.consistency, color: "var(--color-streak)" },
  ];

  return (
    <div className={shell}>
      {head}
      <div className="mt-4 flex items-center gap-4">
        <ProgressRing progress={r.score / 100} size={96} strokeWidth={9} color={color}>
          <span className="font-display text-2xl font-bold tabular-nums">{r.score}</span>
        </ProgressRing>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="font-display text-sm font-bold" style={{ color }}>
            {r.band}
          </p>
          {parts.map((p) => (
            <div key={p.label}>
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{p.label}</span>
                <span className="tabular-nums">{Math.round(p.value * 100)}%</span>
              </div>
              <ProgressBar value={p.value} color={p.color} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>
      {r.focus.length ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Focus next: <span className="font-semibold text-foreground">{r.focus.join(", ")}</span>
        </p>
      ) : null}
      <Link
        to="/$track/practice"
        params={{ track: track.slug }}
        className="btn-base btn-ghost mt-3 h-10 w-full text-sm"
      >
        <Icon name="auto_awesome" className="text-[18px]" />
        Smart Practice
      </Link>
    </div>
  );
}
