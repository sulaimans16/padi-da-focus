import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { Mascot } from "@/components/mascot/Mascot";
import { answerFeedback } from "@/lib/game-feedback";
import {
  figureSource,
  figureUrl,
  type Check,
  type Concept,
  type Figure,
  type Flow,
  type Vignette,
} from "@/lib/learn";
import { cn } from "@/lib/utils";

/** Commons figure that removes itself if the image can't load, instead of showing a broken box. */
function FigureBlock({ figure }: { figure: Figure }) {
  const [failed, setFailed] = useState(false);
  const [zoom, setZoom] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (failed) return null;
  return (
    <>
      <figure className="mb-5 overflow-hidden rounded-2xl border-2 border-glass-line bg-white/95">
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="block w-full cursor-zoom-in"
          aria-label={`Enlarge: ${figure.caption}`}
        >
          <img
            ref={img}
            src={figureUrl(figure.file, 1200)}
            alt={figure.caption}
            loading="lazy"
            onError={() => setFailed(true)}
            className="max-h-80 w-full object-contain p-3"
          />
        </button>
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-glass-line bg-surface px-4 py-2">
          <span className="text-xs font-semibold">{figure.caption}</span>
          <a
            href={figureSource(figure.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="label-eyebrow text-primary"
          >
            {figure.credit} ↗
          </a>
        </figcaption>
      </figure>
      <AnimatePresence>
        {zoom ? (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-background/90 p-4 backdrop-blur"
            aria-label="Close figure"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={figureUrl(figure.file, 2000)}
              alt={figure.caption}
              className="max-h-full max-w-full rounded-2xl bg-white object-contain p-4"
            />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/** Flowchart that reveals step by step (or all at once). */
function FlowBlock({ flow }: { flow: Flow }) {
  const [shown, setShown] = useState(1);
  const all = shown >= flow.steps.length;
  return (
    <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="label-eyebrow flex items-center gap-1.5 text-primary">
          <Icon name="account_tree" filled className="text-[16px]" />
          {flow.title}
        </p>
        <button
          type="button"
          onClick={() => setShown(all ? 1 : flow.steps.length)}
          className="text-[11px] font-bold text-primary hover:underline"
        >
          {all ? "Replay" : "Show all"}
        </button>
      </div>
      <ol className="mt-3">
        {flow.steps.slice(0, shown).map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SPRING}
            className="relative flex gap-3 pb-3 last:pb-0"
          >
            {i < flow.steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute left-[13px] top-7 h-[calc(100%-1.5rem)] w-0.5 bg-primary/30"
              />
            ) : null}
            <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="min-w-0 pt-0.5">
              <span className="block text-sm font-semibold leading-snug">{s.label}</span>
              {s.detail ? (
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                  {s.detail}
                </span>
              ) : null}
            </span>
          </motion.li>
        ))}
      </ol>
      {!all ? (
        <button
          type="button"
          onClick={() => setShown((n) => n + 1)}
          className="btn-base btn-ghost mt-3 h-9 w-full text-xs"
        >
          Next step
          <Icon name="arrow_downward" className="text-[16px]" />
        </button>
      ) : null}
    </div>
  );
}

function VignetteBlock({ v }: { v: Vignette }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-6 rounded-2xl border-2 border-glass-line p-4">
      <p className="label-eyebrow flex items-center gap-1.5 text-primary">
        <Icon name="clinical_notes" filled className="text-[16px]" />
        Clinical case
      </p>
      <p className="clinical-text mt-2">{v.stem}</p>
      <AnimatePresence initial={false} mode="wait">
        {show ? (
          <motion.div
            key="a"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 overflow-hidden rounded-xl bg-success/10 p-3"
          >
            <p className="text-sm font-bold">{v.answer}</p>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">{v.reasoning}</p>
          </motion.div>
        ) : (
          <motion.button
            key="b"
            type="button"
            onClick={() => setShow(true)}
            className="btn-base btn-ghost mt-3 text-xs"
          >
            <Icon name="visibility" className="text-[16px]" />
            Think, then reveal
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckBlock({ check, index }: { check: Check; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  const right = picked === check.answer;
  return (
    <div className="rounded-2xl border-2 border-glass-line p-4">
      <p className="text-sm font-semibold">
        <span className="mr-1.5 text-muted-foreground">Q{index + 1}.</span>
        {check.q}
      </p>
      <div className="mt-3 grid gap-2">
        {check.options.map((o, i) => (
          <button
            key={o}
            type="button"
            disabled={answered}
            onClick={() => {
              setPicked(i);
              answerFeedback(i === check.answer);
            }}
            data-state={
              !answered
                ? undefined
                : i === check.answer
                  ? "correct"
                  : i === picked
                    ? "wrong"
                    : "dim"
            }
            className="option-tile py-2 text-sm"
          >
            <span className="option-key text-muted-foreground">{String.fromCharCode(65 + i)}</span>
            <span className="flex-1 pt-0.5">{o}</span>
          </button>
        ))}
      </div>
      {answered ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "mt-3 flex gap-3 rounded-xl p-3",
            right ? "bg-success/12" : "bg-destructive/10",
          )}
        >
          <Mascot mood={right ? "happy" : "sad"} size={40} />
          <p className="text-sm leading-snug">
            <strong>{right ? "Correct. " : "Not quite. "}</strong>
            {check.why}
          </p>
        </motion.div>
      ) : null}
    </div>
  );
}

/** Key points with an optional active-recall mode (tap each point to reveal it). */
function KeyPoints({ points }: { points: string[] }) {
  const [recall, setRecall] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="label-eyebrow">Key points</h3>
        <button
          type="button"
          onClick={() => {
            setRecall((r) => !r);
            setRevealed(new Set());
          }}
          className={cn("chip transition-colors", recall && "border-primary/50 text-primary")}
          aria-pressed={recall}
        >
          <Icon name="psychology" filled className="text-[14px]" />
          Recall mode
        </button>
      </div>
      <ul className="mt-3 space-y-2.5">
        {points.map((p, i) => {
          const hidden = recall && !revealed.has(i);
          return (
            <li key={p}>
              <button
                type="button"
                disabled={!recall}
                onClick={() => setRevealed((r) => new Set(r).add(i))}
                className="flex w-full gap-2.5 text-left text-sm leading-relaxed disabled:cursor-text"
              >
                <Icon name="check_circle" filled className="mt-0.5 text-[18px] text-primary" />
                <span
                  className={cn(
                    "transition-[filter] duration-300",
                    hidden && "select-none blur-[5px]",
                  )}
                >
                  {p}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {recall ? (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Say each point aloud, then tap to check yourself.
        </p>
      ) : null}
    </div>
  );
}

export function ConceptBody({ c }: { c: Concept }) {
  return (
    <div className="p-5 sm:p-6">
      {c.figure ? <FigureBlock figure={c.figure} /> : null}

      <p className="clinical-text">{c.summary}</p>

      {c.examFocus ? (
        <p className="mt-4 flex gap-2 rounded-xl border-2 border-gem/30 bg-gem/10 px-3 py-2.5 text-sm">
          <Icon name="target" filled className="mt-0.5 text-[18px] text-gem" />
          <span>
            <strong>How it's asked: </strong>
            {c.examFocus}
          </span>
        </p>
      ) : null}

      <h3 className="label-eyebrow mt-6 text-primary">Why this is true</h3>
      <p className="clinical-text mt-1">{c.mechanism}</p>

      <KeyPoints points={c.points} />

      {c.flow ? <FlowBlock flow={c.flow} /> : null}

      {c.table ? (
        <div className="mt-6">
          <h3 className="label-eyebrow">{c.table.title}</h3>
          <div className="mt-2 overflow-x-auto rounded-2xl border-2 border-glass-line">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-surface-2">
                <tr>
                  {c.table.columns.map((col) => (
                    <th key={col} className="px-3 py-2.5 text-xs font-bold uppercase tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.table.rows.map((row) => (
                  <tr
                    key={row.join("|")}
                    className="border-t-2 border-glass-line odd:bg-surface-2/30"
                  >
                    {row.map((cell, i) => (
                      <td
                        key={`${i}-${cell}`}
                        className={cn(
                          "px-3 py-2.5 align-top leading-snug",
                          i === 0 && "font-semibold",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {c.pitfalls?.length ? (
        <div className="mt-6 rounded-2xl border-2 border-destructive/30 bg-destructive/8 p-4">
          <p className="label-eyebrow flex items-center gap-1.5 text-destructive">
            <Icon name="warning" filled className="text-[16px]" />
            Common traps
          </p>
          <ul className="mt-2 space-y-2">
            {c.pitfalls.map((p) => (
              <li key={p} className="text-sm leading-snug">
                {p}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {c.mnemonic ? (
        <div className="mt-4 rounded-2xl border-2 border-dashed border-xp/50 bg-xp/8 px-4 py-3 text-sm">
          <p className="label-eyebrow flex items-center gap-1.5 text-xp">
            <Icon name="lightbulb" filled className="text-[16px]" />
            Mnemonic
          </p>
          <p className="mt-1 font-semibold">{c.mnemonic}</p>
        </div>
      ) : null}

      {c.vignette ? <VignetteBlock v={c.vignette} /> : null}

      <div className="mt-6 rounded-2xl border-2 border-primary/40 bg-tint/60 p-4">
        <p className="label-eyebrow flex items-center gap-1.5 text-primary">
          <Icon name="star" filled className="text-[16px]" />
          High-yield
        </p>
        <p className="mt-1 text-sm font-semibold">{c.highYield}</p>
      </div>

      {c.checks?.length ? (
        <div className="mt-6">
          <h3 className="label-eyebrow">Quick check</h3>
          <div className="mt-3 space-y-3">
            {c.checks.map((ch, i) => (
              <CheckBlock key={ch.q} check={ch} index={i} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
