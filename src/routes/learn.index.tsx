import { createFileRoute, Link } from "@tanstack/react-router";
import { figureUrl, LEARN_MODULES } from "@/lib/learn";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Subject Modules — Concept Lessons | PadiDa" },
      {
        name: "description",
        content:
          "Illustrated NEET PG concept modules: anatomy, physiology, biochemistry, pharmacology, pathology and medicine, each with real reference figures and high-yield takeaways.",
      },
      { property: "og:title", content: "Subject Modules — PadiDa" },
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

function LearnIndex() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <p className="label-eyebrow">Learn</p>
      <h1 className="text-3xl sm:text-4xl">Subject modules</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Concepts taught properly — real reference figures, compressed notes, and the one line the exam
        actually tests.
      </p>

      <Link
        to="/videos"
        className="card-surface mt-4 flex items-center gap-3 p-4 transition-colors hover:bg-surface-2"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tint text-primary">
          <span aria-hidden className="material-symbols-outlined text-[22px]">
            play_circle
          </span>
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold">Prefer watching? Open the video modules</span>
          <span className="block text-xs text-muted-foreground">
            Curated lecture videos for every subject — included with PadiDa Pro.
          </span>
        </span>
        <span aria-hidden className="material-symbols-outlined ml-auto text-muted-foreground">
          chevron_right
        </span>
      </Link>


      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARN_MODULES.map((m) => (
          <Link
            key={m.slug}
            to="/learn/$subject"
            params={{ subject: m.slug }}
            className="card-surface group overflow-hidden transition-colors hover:bg-surface-2"
          >
            <img
              src={figureUrl(m.cover.file, 900)}
              alt={m.cover.caption}
              loading="lazy"
              className="h-36 w-full bg-surface object-contain p-2"
            />
            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tint text-primary">
                  <span aria-hidden className="material-symbols-outlined text-[18px]">
                    {m.icon}
                  </span>
                </span>
                <h2 className="text-base font-bold">{m.subject}</h2>
              </div>
              <p className="mt-2 text-xs leading-snug text-muted-foreground">{m.blurb}</p>
              <p className="label-eyebrow mt-3 text-primary">
                {m.concepts.length} concepts · Start learning →
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Reference figures are sourced from Wikimedia Commons and credited on each concept.
      </p>
    </div>
  );
}
