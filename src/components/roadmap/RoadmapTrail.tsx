import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { Mascot, MascotSays, type MascotMood } from "@/components/mascot/Mascot";
import type { Roadmap } from "@/lib/roadmap.functions";
import { emitGameEvent } from "@/lib/gamification";
import { playCorrect, playLevelUp } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { useTrack } from "@/hooks/useTrack";

// Horizontal position of each milestone (percent of the trail width), winding left and right.
const X = [24, 50, 72, 50];
const SCENERY = [
  "local_hospital",
  "biotech",
  "menu_book",
  "vaccines",
  "science",
  "psychology",
  "monitor_heart",
  "medication",
];

/**
 * Where Dr. Pulse stands next to a milestone: on mobile (labels sit below the node) on the
 * roomier side; on wider screens opposite the label.
 */
function mascotPlacement(x: number) {
  const mobile = x > 50 ? "right-[88px]" : "left-[88px]";
  const desktop = x > 60 ? "sm:left-[88px] sm:right-auto" : "sm:right-[88px] sm:left-auto";
  return `${mobile} ${desktop}`;
}

export type TrailLink = { key: string; label: string; node: ReactNode };

function Connector({
  from,
  to,
  state,
}: {
  from: number;
  to: number;
  state: "done" | "active" | "todo";
}) {
  const d = `M ${from} 0 C ${from} 45, ${to} 45, ${to} 90`;
  return (
    <svg
      viewBox="0 0 100 90"
      preserveAspectRatio="none"
      className="block h-[90px] w-full"
      aria-hidden
    >
      {/* soft road bed */}
      <path
        d={d}
        stroke="color-mix(in oklab, var(--color-surface-3) 80%, transparent)"
        strokeWidth={16}
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        d={d}
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        strokeWidth={4}
        stroke={
          state === "done"
            ? "var(--color-xp)"
            : state === "active"
              ? "var(--color-primary)"
              : "var(--color-muted-foreground)"
        }
        strokeDasharray={state === "done" ? "0" : "2 12"}
        initial={{ pathLength: 0 }}
        animate={
          state === "active" ? { pathLength: 1, strokeDashoffset: [0, -28] } : { pathLength: 1 }
        }
        transition={
          state === "active"
            ? {
                pathLength: { duration: 0.8 },
                strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" },
              }
            : { duration: 0.8 }
        }
        opacity={state === "todo" ? 0.45 : 1}
      />
    </svg>
  );
}

function Milestone({
  index,
  state,
  open,
  onClick,
}: {
  index: number;
  state: "done" | "current" | "todo";
  open: boolean;
  onClick: () => void;
}) {
  const color =
    state === "done"
      ? "var(--color-xp)"
      : state === "current"
        ? "var(--color-primary)"
        : "var(--color-surface-3)";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.93, y: 4 }}
      transition={SPRING}
      aria-expanded={open}
      aria-label={`Phase ${index + 1}`}
      className={cn(
        "relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full",
        state === "current" && "animate-pulse-ring",
        open && "ring-4 ring-foreground/25 ring-offset-4 ring-offset-background",
      )}
      style={{
        background:
          state === "todo"
            ? "var(--color-surface-2)"
            : `linear-gradient(180deg, color-mix(in oklab, ${color} 82%, white), ${color})`,
        boxShadow: `0 6px 0 color-mix(in oklab, ${state === "todo" ? "var(--color-edge)" : color} ${state === "todo" ? "100%" : "50%"}, black)`,
      }}
    >
      {state === "done" ? (
        <Icon name="flag" filled className="text-[36px] text-[color:var(--color-background)]" />
      ) : (
        <span
          className={cn(
            "font-display text-2xl font-bold",
            state === "current" ? "text-[color:var(--color-background)]" : "text-muted-foreground",
          )}
        >
          {index + 1}
        </span>
      )}
    </motion.button>
  );
}

/**
 * A study roadmap drawn as a winding trail. Dr. Pulse walks to the current phase;
 * completing a phase plants a flag and sends him on to the next one.
 */
export function RoadmapTrail({
  roadmap,
  done,
  onToggle,
  phaseLinks,
  interactive = true,
}: {
  roadmap: Roadmap;
  done: Set<string>;
  onToggle?: (id: string) => void;
  phaseLinks?: (phase: Roadmap["phases"][number]) => TrailLink[];
  interactive?: boolean;
}) {
  const track = useTrack();
  const phases = roadmap.phases;
  const phaseDone = (pi: number) => phases[pi]!.steps.every((_, si) => done.has(`${pi}:${si}`));
  const current = phases.findIndex((_, pi) => !phaseDone(pi));
  const finished = current === -1;
  const at = finished ? phases.length : current;

  const [open, setOpen] = useState<number | null>(null);
  const openIndex = open ?? (finished ? null : current);
  const [mood, setMood] = useState<MascotMood>("idle");
  const [line, setLine] = useState<string | null>(null);
  const prevAt = useRef(at);

  // When the current phase advances, celebrate and walk on.
  useEffect(() => {
    if (prevAt.current === at) return;
    const advanced = at > prevAt.current;
    prevAt.current = at;
    if (!advanced) return;
    setMood("walk");
    playLevelUp();
    emitGameEvent({ type: "confetti" });
    setLine(
      at >= phases.length
        ? "Route complete! You're exam ready. Keep sharp with mocks."
        : `Phase done! Next stop: ${phases[at]!.title}.`,
    );
    setOpen(null);
    const t = window.setTimeout(() => setMood(at >= phases.length ? "cheer" : "happy"), 1300);
    return () => window.clearTimeout(t);
  }, [at, phases]);

  return (
    <div className="relative">
      {phases.map((phase, pi) => {
        const x = X[pi % X.length]!;
        const nextX = X[(pi + 1) % X.length]!;
        const state = phaseDone(pi) ? "done" : pi === current ? "current" : "todo";
        const doneCount = phase.steps.filter((_, si) => done.has(`${pi}:${si}`)).length;
        const isOpen = openIndex === pi;
        const labelOnLeft = x > 60;
        return (
          <div key={pi}>
            <div className="relative h-[150px] sm:h-[96px]">
              {/* scenery on the empty side */}
              <span
                aria-hidden
                className="absolute top-6 text-muted-foreground/25"
                style={{ left: x < 40 ? "78%" : x > 60 ? "12%" : pi % 2 ? "84%" : "8%" }}
              >
                <Icon name={SCENERY[pi % SCENERY.length]!} filled className="text-[34px]" />
              </span>

              <div className="absolute top-2 -translate-x-1/2" style={{ left: `${x}%` }}>
                <Milestone
                  index={pi}
                  state={state}
                  open={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : pi)}
                />
                {/* Dr. Pulse stands beside the current milestone; layoutId makes him walk */}
                {at === pi ? (
                  <motion.div
                    layoutId="trail-mascot"
                    transition={{ type: "spring", stiffness: 70, damping: 14 }}
                    className={cn("absolute top-[-6px]", mascotPlacement(x))}
                  >
                    <Mascot mood={mood} size={70} />
                  </motion.div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : pi)}
                className={cn(
                  "absolute top-[92px] w-44 -translate-x-1/2 text-center sm:w-56",
                  labelOnLeft
                    ? "sm:-translate-x-[calc(100%+3.25rem)] sm:text-right"
                    : "sm:translate-x-[3.25rem] sm:text-left",
                  "sm:top-5",
                )}
                style={{ left: `${x}%` }}
              >
                <span className="label-eyebrow block">
                  Phase {pi + 1} · {doneCount}/{phase.steps.length}
                </span>
                <span className="block font-display text-sm font-bold leading-tight sm:text-base">
                  {phase.title}
                </span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="card-pop mx-auto mb-2 mt-10 max-w-xl p-5 sm:mt-6">
                    <p className="label-eyebrow">Phase {pi + 1}</p>
                    <h3 className="font-display text-lg font-bold">{phase.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{phase.summary}</p>
                    <ul className="mt-4 space-y-2.5">
                      {phase.steps.map((step, si) => {
                        const id = `${pi}:${si}`;
                        const isDone = done.has(id);
                        return (
                          <li key={si}>
                            <button
                              type="button"
                              disabled={!interactive}
                              onClick={() => {
                                if (!isDone) playCorrect();
                                onToggle?.(id);
                              }}
                              data-state={isDone ? "correct" : undefined}
                              className="option-tile py-3"
                            >
                              <span
                                className={cn(
                                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2",
                                  isDone
                                    ? "border-success bg-success text-success-foreground"
                                    : "border-muted-foreground/40",
                                )}
                              >
                                {isDone ? <Icon name="check" className="text-[16px]" /> : null}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span
                                  className={cn(
                                    "block text-sm font-semibold",
                                    isDone && "line-through opacity-60",
                                  )}
                                >
                                  {step.title}
                                </span>
                                <span className="mt-0.5 block text-xs text-muted-foreground">
                                  {step.detail}
                                </span>
                                {step.resource ? (
                                  <span className="mt-1.5 inline-block rounded-full bg-tint px-2 py-0.5 text-[10px] font-bold text-primary">
                                    {step.resource}
                                  </span>
                                ) : null}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    {phaseLinks ? (
                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t-2 border-glass-line pt-3">
                        <span className="label-eyebrow">Go practise</span>
                        {phaseLinks(phase).map((l) => (
                          <span key={l.key}>{l.node}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <Connector
              from={x}
              to={pi === phases.length - 1 ? 50 : nextX}
              state={phaseDone(pi) ? "done" : pi === current ? "active" : "todo"}
            />
          </div>
        );
      })}

      {/* Finish line */}
      <div className="relative flex flex-col items-center pb-4">
        <div className="relative">
          <motion.span
            animate={finished ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.2, repeat: finished ? Infinity : 0, repeatDelay: 1 }}
            className={cn(
              "flex h-24 w-24 items-center justify-center rounded-[2rem]",
              finished
                ? "bg-xp/25 text-xp ring-4 ring-xp/40"
                : "bg-surface-2 text-muted-foreground",
            )}
          >
            <Icon name="trophy" filled className="text-[52px]" />
          </motion.span>
          {finished ? (
            <motion.div
              layoutId="trail-mascot"
              transition={{ type: "spring", stiffness: 70, damping: 14 }}
              className="absolute left-[104px] top-0"
            >
              <Mascot mood={mood === "walk" ? "walk" : "cheer"} size={76} />
            </motion.div>
          ) : null}
        </div>
        <p className="mt-3 font-display text-lg font-bold">Exam ready</p>
        <p className="text-xs text-muted-foreground">Finish every phase to reach the trophy</p>
      </div>

      <AnimatePresence>
        {line ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-md md:bottom-6 md:left-64"
          >
            <button type="button" className="w-full text-left" onClick={() => setLine(null)}>
              <MascotSays mood="cheer" size={64}>
                {line}
              </MascotSays>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {line ? <AutoDismiss onDone={() => setLine(null)} /> : null}
      {!interactive ? null : (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Tap a milestone to see its steps. Progress is saved on this device.{" "}
          <Link
            to="/$track/bank"
            params={{ track: track.slug }}
            className="font-semibold text-primary hover:underline"
          >
            Open the QBank →
          </Link>
        </p>
      )}
    </div>
  );
}

function AutoDismiss({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 4500);
    return () => window.clearTimeout(t);
  }, [onDone]);
  return null;
}
