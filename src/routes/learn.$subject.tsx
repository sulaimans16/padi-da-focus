import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Primitives";
import { SPRING } from "@/components/motion/Reveal";
import { ProgressBar } from "@/components/game/Widgets";
import { useLearned } from "@/hooks/useLearned";
import { emitGameEvent } from "@/lib/gamification";
import { playCorrect } from "@/lib/sfx";
import { cn } from "@/lib/utils";
import { getModule, LEARN_MODULES } from "@/lib/learn";
import { ModuleCover } from "@/components/learn/ModuleCover";
import { ConceptBody } from "@/components/learn/ConceptBody";

export const Route = createFileRoute("/learn/$subject")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const mod = getModule(params.subject);
    if (!mod) throw notFound();
    return { subject: mod.subject, blurb: mod.blurb };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Module not found — PG Prep" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.subject} Concepts — PG Prep`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.blurb },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LearnSubject,
  notFoundComponent: ModuleNotFound,
});

function ModuleNotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 text-center">
      <h1 className="text-2xl">Module not available yet</h1>
      <Link to="/learn" className="btn-base btn-primary mt-4 text-sm">
        Back to subject modules
      </Link>
    </div>
  );
}

// Zig-zag offsets for the lesson path, Duolingo style.
const PATH_OFFSETS = [0, 46, 70, 46, 0, -46, -70, -46];

function PathNode({
  index,
  title,
  state,
  selected,
  onClick,
}: {
  index: number;
  title: string;
  state: "done" | "current" | "upcoming";
  selected: boolean;
  onClick: () => void;
}) {
  const color =
    state === "done"
      ? "var(--color-xp)"
      : state === "current"
        ? "var(--color-primary)"
        : "var(--color-surface-3)";
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateX(${PATH_OFFSETS[index % PATH_OFFSETS.length]}px)` }}
    >
      {state === "current" && !selected ? (
        <motion.span
          initial={{ y: 4 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute -top-9 z-10 whitespace-nowrap rounded-xl border-2 border-primary/50 bg-surface px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-primary"
        >
          Start
        </motion.span>
      ) : null}
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94, y: 4 }}
        transition={SPRING}
        aria-label={`${index + 1}. ${title}${state === "done" ? " (learned)" : ""}`}
        className={cn(
          "relative flex h-[72px] w-[72px] items-center justify-center rounded-full",
          state === "current" && "animate-pulse-ring",
          selected && "ring-4 ring-foreground/30 ring-offset-4 ring-offset-background",
        )}
        style={{
          background:
            state === "upcoming"
              ? "var(--color-surface-2)"
              : `linear-gradient(180deg, color-mix(in oklab, ${color} 85%, white), ${color})`,
          boxShadow: `0 6px 0 color-mix(in oklab, ${color} 50%, black)`,
        }}
      >
        <Icon
          name={state === "done" ? "check" : state === "current" ? "star" : "menu_book"}
          filled
          className={cn(
            "text-[34px]",
            state === "upcoming" ? "text-muted-foreground" : "text-[color:var(--color-background)]",
          )}
        />
      </motion.button>
      <p
        className={cn(
          "mt-3 max-w-[11rem] text-center text-xs font-semibold leading-tight",
          selected ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {title}
      </p>
    </div>
  );
}

function LearnSubject() {
  const { subject } = Route.useParams();
  const mod = getModule(subject)!;
  const { done, markLearned } = useLearned();
  const ref = (id: string) => `${mod.slug}/${id}`;
  const firstOpen =
    mod.concepts.find((c) => !done.has(ref(c.id)))?.id ?? mod.concepts[0]?.id ?? null;
  const [open, setOpen] = useState<string | null>(null);
  const selectedId = open ?? firstOpen;
  const contentRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  // Deep link from search: /learn/<subject>#<concept-id> opens that concept.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && mod.concepts.some((c) => c.id === id)) {
      setOpen(id);
      window.setTimeout(
        () => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        120,
      );
    }
  }, [mod]);

  const learnedCount = mod.concepts.filter((c) => done.has(ref(c.id))).length;
  const currentIndex = mod.concepts.findIndex((c) => !done.has(ref(c.id)));
  const selectedIndex = mod.concepts.findIndex((c) => c.id === selectedId);
  const selected = mod.concepts[selectedIndex];
  const allDone = learnedCount === mod.concepts.length;

  const select = (id: string) => {
    setOpen(id);
    window.setTimeout(() => {
      if (window.innerWidth < 1024)
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const finishConcept = async () => {
    if (!selected) return;
    setSaving(true);
    playCorrect();
    try {
      await markLearned(ref(selected.id));
    } finally {
      setSaving(false);
    }
    const remaining = mod.concepts.filter((c) => c.id !== selected.id && !done.has(ref(c.id)));
    if (!remaining.length) {
      emitGameEvent({
        type: "celebrate",
        kind: "lesson",
        title: `${mod.subject} complete!`,
        subtitle: "Every concept in this module is learned. Lock it in with a QBank drill.",
        icon: "workspace_premium",
      });
    } else {
      emitGameEvent({ type: "confetti" });
      const nextC =
        mod.concepts.slice(selectedIndex + 1).find((c) => !done.has(ref(c.id))) ?? remaining[0];
      if (nextC) select(nextC.id);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <Link to="/learn" className="label-eyebrow inline-flex items-center gap-1 text-primary">
        <Icon name="arrow_back" className="text-[16px]" />
        All modules
      </Link>

      {/* Module header */}
      <section className="card-pop mt-3 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          <div className="p-6">
            <p className="label-eyebrow">Subject module</p>
            <h1 className="flex items-center gap-2 text-3xl">
              {mod.subject}
              {allDone ? (
                <Icon name="workspace_premium" filled className="text-[30px] text-xp" />
              ) : null}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{mod.blurb}</p>
            <div className="mt-4 flex items-center gap-3">
              <ProgressBar
                value={learnedCount / Math.max(1, mod.concepts.length)}
                color="var(--color-xp)"
                className="h-4 flex-1"
              />
              <span className="font-display text-sm font-bold tabular-nums">
                {learnedCount}/{mod.concepts.length}
              </span>
            </div>
            <ul className="mt-4 space-y-1.5">
              {mod.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm leading-snug">
                  <Icon name="task_alt" className="mt-0.5 text-[16px] text-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/bank/$subject"
                params={{ subject: mod.subject }}
                className="btn-base btn-primary text-xs"
              >
                <Icon name="quiz" className="text-[16px]" />
                Practise {mod.subject} questions
              </Link>
              <Link to="/focus" className="btn-base btn-ghost text-xs">
                <Icon name="lock" className="text-[16px]" />
                Lock in and study
              </Link>
            </div>
          </div>
          <ModuleCover mod={mod} className="hidden h-full max-h-72 w-full md:flex" />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Lesson path */}
        <nav aria-label="Concept path" className="lg:sticky lg:top-20 lg:self-start">
          <div className="card-surface flex flex-col items-center gap-9 px-4 pb-8 pt-12">
            {mod.concepts.map((c, i) => (
              <PathNode
                key={c.id}
                index={i}
                title={c.title}
                state={done.has(ref(c.id)) ? "done" : i === currentIndex ? "current" : "upcoming"}
                selected={c.id === selectedId}
                onClick={() => select(c.id)}
              />
            ))}
            <div
              className="flex flex-col items-center"
              style={{
                transform: `translateX(${PATH_OFFSETS[mod.concepts.length % PATH_OFFSETS.length]}px)`,
              }}
            >
              <span
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-3xl",
                  allDone ? "bg-xp/25 text-xp" : "bg-surface-2 text-muted-foreground",
                )}
              >
                <Icon name="trophy" filled className="text-[34px]" />
              </span>
              <p className="mt-2 text-xs font-semibold text-muted-foreground">Module trophy</p>
            </div>
          </div>
        </nav>

        {/* Selected concept */}
        <div ref={contentRef} className="scroll-mt-20">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.article
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="card-pop overflow-hidden"
              >
                <div className="card-head">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-tint font-display text-sm font-bold text-primary">
                      {selectedIndex + 1}
                    </span>
                    <span>
                      <span className="block text-base font-bold">{selected.title}</span>
                      <span className="label-eyebrow">{selected.minutes} min read</span>
                    </span>
                  </span>
                  {done.has(ref(selected.id)) ? (
                    <span className="chip text-xp">
                      <Icon name="check_circle" filled className="text-[14px]" />
                      Learned
                    </span>
                  ) : (
                    <span className="chip text-xp">+15 XP</span>
                  )}
                </div>
                <ConceptBody c={selected} />
                <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-glass-line px-5 py-4">
                  <button
                    type="button"
                    disabled={selectedIndex <= 0}
                    onClick={() => select(mod.concepts[selectedIndex - 1]!.id)}
                    className="btn-base btn-ghost text-sm"
                  >
                    <Icon name="chevron_left" className="text-[18px]" />
                    Previous
                  </button>
                  {done.has(ref(selected.id)) ? (
                    <button
                      type="button"
                      disabled={selectedIndex >= mod.concepts.length - 1}
                      onClick={() => select(mod.concepts[selectedIndex + 1]!.id)}
                      className="btn-base btn-primary h-12 px-6 text-sm"
                    >
                      Next concept
                      <Icon name="chevron_right" className="text-[18px]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => void finishConcept()}
                      className="btn-base btn-success h-12 px-6 text-sm"
                    >
                      <Icon name="check" className="text-[20px]" />
                      I've got this · +15 XP
                    </button>
                  )}
                </div>
              </motion.article>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <section className="mt-8">
        <p className="label-eyebrow">Other modules</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LEARN_MODULES.filter((m) => m.slug !== mod.slug).map((m) => (
            <Link
              key={m.slug}
              to="/learn/$subject"
              params={{ subject: m.slug }}
              className="chip hover:text-primary"
            >
              {m.subject}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
