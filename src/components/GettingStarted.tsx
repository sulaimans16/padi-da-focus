import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { ProgressBar } from "@/components/game/Widgets";
import { useAuth } from "@/hooks/useAuth";
import { useTrack } from "@/hooks/useTrack";
import { onboardedAt } from "@/lib/onboarding";
import { loadDailyResults, todayKey } from "@/lib/quiz";
import { loadLastRoadmap } from "@/lib/roadmap-store";
import { fetchFriends } from "@/lib/social";
import { fetchAttempts } from "@/lib/tracker";
import { trackKey } from "@/lib/track-state";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; icon: string; done: boolean; to: string };

const WINDOW_MS = 14 * 86_400_000;

/**
 * First-fortnight checklist on the dashboard: the handful of habits that make the
 * app stick. Hides itself when everything is done, when dismissed, or after 14 days.
 */
export function GettingStarted() {
  const track = useTrack();
  const { user } = useAuth();
  const dismissKey = trackKey("gettingStarted.dismissed");
  const [hidden, setHidden] = useState(true);
  const [local, setLocal] = useState({ examDate: false, daily: false, roadmap: false });

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(dismissKey) === "1";
    } catch {
      // ignore
    }
    const since = onboardedAt();
    setHidden(dismissed || since == null || Date.now() - since > WINDOW_MS);
    let examDate = false;
    try {
      examDate = Boolean(localStorage.getItem(trackKey("localGoal")));
    } catch {
      // ignore
    }
    setLocal({
      examDate,
      daily: loadDailyResults().some((r) => r.day === todayKey()),
      roadmap: Boolean(loadLastRoadmap()),
    });
  }, [dismissKey]);

  const attempts = useQuery({
    queryKey: ["attempts", track.id],
    queryFn: fetchAttempts,
    enabled: Boolean(user) && !hidden,
  });
  const friends = useQuery({
    queryKey: ["friends", track.id],
    queryFn: fetchFriends,
    enabled: Boolean(user) && !hidden,
    retry: false,
  });

  if (hidden) return null;

  const rows = attempts.data ?? [];
  const items: Item[] = [
    { id: "exam", label: "Set your exam date", icon: "event", done: local.examDate, to: "/$track" },
    {
      id: "daily",
      label: "Finish today's Daily Challenge",
      icon: "today",
      done: local.daily,
      to: "/$track/daily",
    },
    {
      id: "ten",
      label: "Answer 10 questions",
      icon: "quiz",
      done: rows.length >= 10,
      to: "/$track/practice",
    },
    {
      id: "smart",
      label: "Try Smart Practice or a Speed Round",
      icon: "auto_awesome",
      done: rows.some((r) => r.context === "smart_practice" || r.context === "speed_round"),
      to: "/$track/practice",
    },
    {
      id: "friend",
      label: "Add a friend (you both get 7 days of Pro)",
      icon: "group_add",
      done: (friends.data ?? []).some((f) => f.direction === "friend"),
      to: "/$track/friends",
    },
    {
      id: "roadmap",
      label: "Create your study roadmap",
      icon: "route",
      done: local.roadmap,
      to: "/$track/roadmap",
    },
  ];
  const doneCount = items.filter((i) => i.done).length;
  if (doneCount === items.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING}
      className="card-pop mt-6 p-5"
      aria-label="Getting started"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Icon name="checklist" className="text-[22px]" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg font-bold">Getting started</h2>
          <p className="text-xs text-muted-foreground">
            {doneCount}/{items.length} done · the habits that make prep stick
          </p>
        </div>
        <button
          type="button"
          aria-label="Hide getting started"
          onClick={() => {
            try {
              localStorage.setItem(dismissKey, "1");
            } catch {
              // ignore
            }
            setHidden(true);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-surface-2"
        >
          <Icon name="close" className="text-[18px]" />
        </button>
      </div>
      <ProgressBar
        value={doneCount / items.length}
        color="var(--color-primary)"
        className="mt-3 h-2.5"
      />
      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.id}>
            <Link
              to={it.to as "/$track"}
              params={{ track: track.slug }}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors hover:bg-surface-2/50",
                it.done && "text-muted-foreground line-through",
              )}
            >
              <Icon
                name={it.done ? "check_circle" : it.icon}
                filled={it.done}
                className={cn("text-[20px]", it.done ? "text-success" : "text-primary")}
              />
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
