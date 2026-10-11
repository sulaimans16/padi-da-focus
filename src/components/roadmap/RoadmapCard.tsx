import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { ProgressBar } from "@/components/game/Widgets";
import { Mascot } from "@/components/mascot/Mascot";
import { loadLastRoadmap, roadmapProgress, type SavedMap } from "@/lib/roadmap-store";
import { cn } from "@/lib/utils";

/** Horizontal mini trail: one milestone per phase, Dr. Pulse standing at the current one. */
function MiniTrail({
  phases,
  phaseDone,
  current,
}: {
  phases: number;
  phaseDone: boolean[];
  current: number;
}) {
  const at = current === -1 ? phases : current;
  const stops = phases + 1; // phases + finish trophy
  const x = (i: number) => (stops === 1 ? 50 : 6 + (i * 88) / (stops - 1));
  const y = (i: number) => (i % 2 === 0 ? 62 : 38);
  const pathTo = (last: number) =>
    Array.from({ length: last + 1 }, (_, i) => i)
      .map((i) =>
        i === 0
          ? `M ${x(0)} ${y(0)}`
          : `C ${(x(i - 1) + x(i)) / 2} ${y(i - 1)}, ${(x(i - 1) + x(i)) / 2} ${y(i)}, ${x(i)} ${y(i)}`,
      )
      .join(" ");
  const d = pathTo(stops - 1);
  const walked = at > 0 ? pathTo(at) : null;

  return (
    <div className="relative h-28 w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <path
          d={d}
          fill="none"
          stroke="color-mix(in oklab, var(--color-surface-3) 85%, transparent)"
          strokeWidth={12}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {walked ? (
          <motion.path
            d={walked}
            fill="none"
            stroke="var(--color-xp)"
            strokeWidth={4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        ) : null}
      </svg>
      {Array.from({ length: stops }, (_, i) => {
        const finish = i === phases;
        const done = finish ? current === -1 : phaseDone[i];
        const isCurrent = i === current;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x(i)}%`, top: `${y(i)}%` }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...SPRING, delay: 0.1 + i * 0.05 }}
              className={cn(
                "flex items-center justify-center rounded-full font-display text-xs font-bold",
                finish ? "h-10 w-10 rounded-2xl" : "h-8 w-8",
                done
                  ? "bg-xp text-[color:var(--color-background)] shadow-[0_3px_0_color-mix(in_oklab,var(--color-xp)_50%,black)]"
                  : isCurrent
                    ? "animate-pulse-ring bg-primary text-primary-foreground shadow-[0_3px_0_color-mix(in_oklab,var(--color-primary)_50%,black)]"
                    : "bg-surface-2 text-muted-foreground",
              )}
            >
              {finish ? (
                <Icon name="trophy" filled className="text-[20px]" />
              ) : done ? (
                <Icon name="flag" filled className="text-[16px]" />
              ) : (
                i + 1
              )}
            </motion.span>
            {i === at ? (
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.6 }}
                className="absolute bottom-[calc(100%-2px)] left-1/2 -translate-x-1/2"
              >
                <Mascot mood={current === -1 ? "cheer" : "walk"} size={44} />
              </motion.div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

const SAMPLE_DONE = [true, true, false, false];

/** Home-page roadmap: continue your saved route, or start one. */
export function RoadmapCard() {
  const [map, setMap] = useState<SavedMap | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setMap(loadLastRoadmap());
    setReady(true);
  }, []);

  if (!ready) return <div className="card-pop h-56" aria-hidden />;

  if (!map) {
    return (
      <Link
        to="/roadmap"
        className="card-pop card-pop-hover group flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
      >
        <div className="min-w-0 flex-1">
          <p className="label-eyebrow flex items-center gap-1.5">
            <Icon name="route" filled className="text-[16px] text-primary" />
            AI study roadmap
          </p>
          <h2 className="mt-1 text-2xl">Draw your route to exam day</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell Dr. Pulse your goal (a subject, a weak area, a final sprint) and get a
            phase-by-phase trail you walk together.
          </p>
          <span className="btn-base btn-primary mt-4 h-11 px-5 text-sm">
            <Icon name="route" filled className="text-[18px]" />
            Draw my route
          </span>
        </div>
        <div className="w-full opacity-80 sm:w-72">
          <MiniTrail phases={4} phaseDone={SAMPLE_DONE} current={2} />
        </div>
      </Link>
    );
  }

  const p = roadmapProgress(map);
  const finished = p.current === -1;

  return (
    <div className="card-pop p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="label-eyebrow flex items-center gap-1.5">
            <Icon name="route" filled className="text-[16px] text-primary" />
            Your study route
          </p>
          <h2 className="mt-1 truncate text-2xl">{map.roadmap.title}</h2>
        </div>
        <span className="font-display text-2xl font-bold text-xp tabular-nums">{p.pct}%</span>
      </div>

      <div className="mt-2">
        <MiniTrail phases={map.roadmap.phases.length} phaseDone={p.phaseDone} current={p.current} />
      </div>

      <ProgressBar value={p.pct / 100} color="var(--color-xp)" className="h-3" />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="min-w-0 text-sm">
          {finished ? (
            <span className="font-semibold">Route complete! You're exam ready. 🏆</span>
          ) : p.nextStep ? (
            <>
              <span className="text-muted-foreground">
                Phase {p.nextStep.phase + 1}: {map.roadmap.phases[p.nextStep.phase]!.title} · next
                up{" "}
              </span>
              <span className="font-semibold">{p.nextStep.title}</span>
            </>
          ) : null}
        </p>
        <Link to="/roadmap" className="btn-base btn-primary h-11 px-5 text-sm">
          {finished ? "Plan a new route" : "Continue route"}
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </div>
  );
}
