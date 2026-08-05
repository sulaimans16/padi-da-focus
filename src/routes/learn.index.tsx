import { createFileRoute, Link } from "@tanstack/react-router";
import { LEARN_MODULES } from "@/lib/learn";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Subject Modules — Concept Lessons | PadiDa" },
      {
        name: "description",
        content:
          "Illustrated NEET PG concept modules: anatomy, physiology, biochemistry, pharmacology, pathology and medicine, each with high-yield takeaways.",
      },
      { property: "og:title", content: "Subject Modules — PadiDa" },
      {
        property: "og:description",
        content: "Illustrated concept lessons with high-yield takeaways for NEET PG 2026.",
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
        Concepts taught properly — illustrated, compressed, and ending in the one line the exam actually
        tests.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARN_MODULES.map((m) => (
          <Link
            key={m.slug}
            to="/learn/$subject"
            params={{ subject: m.slug }}
            className="card-surface group overflow-hidden transition-colors hover:bg-surface-2"
          >
            <img
              src={m.image}
              alt={`${m.subject} concept illustration`}
              loading="lazy"
              width={768}
              height={512}
              className="h-36 w-full bg-surface-2 object-cover"
            />
            <div className="p-4">
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
    </div>
  );
}
