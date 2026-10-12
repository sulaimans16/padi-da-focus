import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { LearnModule } from "@/lib/learn";
import { Icon } from "@/components/Primitives";
import { Reveal } from "@/components/motion/Reveal";
import { MascotSays } from "@/components/mascot/Mascot";
import { ModuleCover } from "@/components/learn/ModuleCover";
import { ProgressBar } from "@/components/game/Widgets";
import { useLearned } from "@/hooks/useLearned";
import { useTrack } from "@/hooks/useTrack";
import { localizeHead } from "@/lib/tracks";

export const Route = createFileRoute("/$track/learn/")({
  staticData: { sitemap: true },
  head: ({ params }) =>
    localizeHead(params.track, {
      meta: [
        { title: "Subject Modules — Concept Lessons | PG Prep" },
        {
          name: "description",
          content:
            "Illustrated NEET PG concept lessons for all 19 subjects: real reference figures, flowcharts, comparison tables, exam traps, mnemonics and high-yield takeaways.",
        },
        { property: "og:title", content: "Subject Modules — PG Prep" },
        {
          property: "og:description",
          content: "Concept lessons with real medical reference figures for NEET PG 2026.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
  component: LearnIndex,
});

function ModuleTile({ m, learned }: { m: LearnModule; learned: number }) {
  const track = useTrack();
  const total = m.concepts.length;
  return (
    <Link
      to="/$track/learn/$subject"
      params={{ track: track.slug, subject: m.slug }}
      className="card-pop card-pop-hover group flex h-full flex-col overflow-hidden"
    >
      <ModuleCover mod={m} className="h-24 w-full sm:h-32" />
      <div className="flex flex-1 flex-col border-t-2 border-glass-line p-4">
        <div className="flex items-center gap-2">
          <Icon name={m.icon} filled className="text-[20px] text-primary" />
          <h3 className="text-base font-bold">{m.title ?? m.subject}</h3>
          <span className="ml-auto text-[11px] font-semibold text-muted-foreground">
            {total} concepts
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-snug text-muted-foreground">{m.blurb}</p>
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2">
            <ProgressBar
              value={learned / Math.max(1, total)}
              color="var(--color-xp)"
              className="h-2.5 flex-1"
            />
            <span className="text-[11px] font-bold tabular-nums text-muted-foreground">
              {learned}/{total}
            </span>
          </div>
          <p className="label-eyebrow mt-2 text-primary">
            {learned === total
              ? "Completed 🏆 · Review →"
              : learned
                ? "Continue →"
                : "Start learning →"}
          </p>
        </div>
      </div>
    </Link>
  );
}

function LearnIndex() {
  const track = useTrack();
  const { done } = useLearned();
  const [query, setQuery] = useState("");
  const total = track.learn.reduce((n, m) => n + m.concepts.length, 0);
  const learnedTotal = track.learn.reduce(
    (n, m) => n + m.concepts.filter((c) => done.has(`${m.slug}/${c.id}`)).length,
    0,
  );

  const q = query.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!q) return [];
    return track.learn
      .flatMap((m) =>
        m.concepts
          .filter((c) => `${c.title} ${c.summary} ${c.highYield}`.toLowerCase().includes(q))
          .map((c) => ({ m, c })),
      )
      .slice(0, 30);
  }, [q]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <p className="label-eyebrow">Learn</p>
      <h1 className="text-3xl sm:text-4xl">Subject modules</h1>
      <MascotSays mood={learnedTotal ? "happy" : "idle"} size={76} className="mt-4 max-w-2xl">
        {learnedTotal
          ? `${learnedTotal} of ${total} concepts learned across ${track.learn.length} subjects. Pick up where you left off!`
          : `${total} concepts across ${track.learn.length} ${track.name} subjects. Each one teaches the why, then the line the exam tests.`}
      </MascotSays>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-full border-2 border-glass-line bg-surface-2 px-4 py-2.5 focus-within:border-primary">
          <Icon name="search" className="text-[20px] text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, e.g. thyroid, Erb's palsy, ECG"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            aria-label="Search concepts"
          />
          {query ? (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <Icon name="close" className="text-[18px] text-muted-foreground" />
            </button>
          ) : null}
        </label>
        <Link
          to="/$track/videos"
          params={{ track: track.slug }}
          className="btn-base btn-ghost h-11 text-sm"
        >
          <Icon name="play_circle" filled className="text-[18px]" />
          Video modules
        </Link>
      </div>

      {q ? (
        <section className="mt-6">
          <p className="label-eyebrow">
            {hits.length} result{hits.length === 1 ? "" : "s"}
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {hits.map(({ m, c }) => (
              <li key={`${m.slug}/${c.id}`}>
                <Link
                  to="/$track/learn/$subject"
                  params={{ track: track.slug, subject: m.slug }}
                  hash={c.id}
                  className="card-pop card-pop-hover flex items-center gap-3 p-3"
                >
                  <Icon name={m.icon} filled className="text-[22px] text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{c.title}</span>
                    <span className="block text-xs text-muted-foreground">
                      {m.title ?? m.subject}
                    </span>
                  </span>
                  {done.has(`${m.slug}/${c.id}`) ? (
                    <Icon name="check_circle" filled className="text-[18px] text-xp" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        track.learnGroups.map((g) => {
          const mods = track.learn.filter((m) => m.group === g.id);
          if (!mods.length) return null;
          return (
            <Reveal key={g.id} className="mt-8">
              <div className="mb-4 flex items-end gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{g.id}</h2>
                  <p className="text-xs text-muted-foreground">{g.note}</p>
                </div>
                <span className="fade-rule mb-2 flex-1" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mods.map((m) => (
                  <ModuleTile
                    key={m.slug}
                    m={m}
                    learned={m.concepts.filter((c) => done.has(`${m.slug}/${c.id}`)).length}
                  />
                ))}
              </div>
            </Reveal>
          );
        })
      )}

      <p className="mt-8 text-xs text-muted-foreground">
        Reference figures are sourced from Wikimedia Commons and credited on each concept.
      </p>
    </div>
  );
}
