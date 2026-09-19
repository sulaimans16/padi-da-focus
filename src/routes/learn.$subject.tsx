import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { figureSource, figureUrl, getModule, LEARN_MODULES, type Vignette } from "@/lib/learn";

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

function VignetteBlock({ v }: { v: Vignette }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-5 rounded-xl border border-border p-4">
      <p className="label-eyebrow text-primary">Test yourself</p>
      <p className="clinical-text mt-1">{v.stem}</p>
      {show ? (
        <div className="mt-3 rounded-lg bg-surface-2 p-3">
          <p className="text-sm font-bold">{v.answer}</p>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">{v.reasoning}</p>
        </div>
      ) : (
        <button type="button" onClick={() => setShow(true)} className="btn-base btn-ghost mt-3 text-xs">
          Reveal answer
        </button>
      )}
    </div>
  );
}

function LearnSubject() {
  const { subject } = Route.useParams();
  const mod = getModule(subject)!;
  const [open, setOpen] = useState<string | null>(mod.concepts[0]?.id ?? null);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <Link to="/learn" className="label-eyebrow inline-flex items-center gap-1 text-primary">
        <span aria-hidden className="material-symbols-outlined text-[16px]">
          arrow_back
        </span>
        All modules
      </Link>

      <section className="card-surface mt-3 overflow-hidden">
        <img
          src={figureUrl(mod.cover.file, 1200)}
          alt={mod.cover.caption}
          className="h-48 w-full bg-surface object-contain p-3 sm:h-60"
        />
        <div className="border-t border-border p-5">
          <p className="label-eyebrow">Subject module</p>
          <h1 className="text-3xl">{mod.subject}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{mod.blurb}</p>
          <div className="mt-4 rounded-xl border border-border bg-surface-2 p-4">
            <p className="label-eyebrow">By the end of this module you can</p>
            <ul className="mt-2 space-y-1.5">
              {mod.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm leading-snug">
                  <span aria-hidden className="material-symbols-outlined mt-0.5 text-[16px] text-primary">
                    task_alt
                  </span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/bank/$subject"
              params={{ subject: mod.subject }}
              className="btn-base btn-primary text-xs"
            >
              <span aria-hidden className="material-symbols-outlined text-[16px]">
                quiz
              </span>
              Practise {mod.subject} questions
            </Link>
            <Link to="/focus" className="btn-base btn-ghost text-xs">
              <span aria-hidden className="material-symbols-outlined text-[16px]">
                lock
              </span>
              Lock in and study
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-3">
        {mod.concepts.map((c, i) => {
          const expanded = open === c.id;
          return (
            <article key={c.id} className="card-surface overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : c.id)}
                aria-expanded={expanded}
                className="card-head w-full text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-tint font-mono text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{c.title}</span>
                    <span className="label-eyebrow">{c.minutes} min read</span>
                  </span>
                </span>
                <span aria-hidden className="material-symbols-outlined text-[20px] text-muted-foreground">
                  {expanded ? "expand_less" : "expand_more"}
                </span>
              </button>

              {expanded && (
                <div className="p-5">
                  <figure className="mb-4 overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                      src={figureUrl(c.figure.file, 1200)}
                      alt={c.figure.caption}
                      loading="lazy"
                      className="max-h-80 w-full object-contain p-3"
                    />
                    <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface-2 px-4 py-2">
                      <span className="text-xs font-semibold">{c.figure.caption}</span>
                      <a
                        href={figureSource(c.figure.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-eyebrow text-primary"
                      >
                        {c.figure.credit} ↗
                      </a>
                    </figcaption>
                  </figure>

                  <p className="clinical-text">{c.summary}</p>

                  <h3 className="label-eyebrow mt-5 text-primary">Why this is true</h3>
                  <p className="clinical-text mt-1">{c.mechanism}</p>

                  <h3 className="label-eyebrow mt-5">Key points</h3>
                  <ul className="mt-2 space-y-2">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm leading-snug">
                        <span
                          aria-hidden
                          className="material-symbols-outlined mt-0.5 text-[16px] text-primary"
                        >
                          check_circle
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {c.table && (
                    <div className="mt-5">
                      <h3 className="label-eyebrow">{c.table.title}</h3>
                      <div className="mt-2 overflow-x-auto rounded-xl border border-border">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead className="bg-surface-2">
                            <tr>
                              {c.table.columns.map((col) => (
                                <th key={col} className="px-3 py-2 text-xs font-bold uppercase tracking-wide">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {c.table.rows.map((row) => (
                              <tr key={row.join("|")} className="border-t border-border">
                                {row.map((cell) => (
                                  <td key={cell} className="px-3 py-2 align-top leading-snug">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {c.pitfalls && c.pitfalls.length > 0 && (
                    <div className="mt-5 rounded-xl border border-border bg-surface-2 p-4">
                      <p className="label-eyebrow flex items-center gap-1">
                        <span aria-hidden className="material-symbols-outlined text-[16px]">
                          warning
                        </span>
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
                  )}

                  {c.mnemonic && (
                    <p className="mt-4 rounded-xl border border-dashed border-border px-4 py-3 text-sm">
                      <span className="label-eyebrow mr-2">Mnemonic</span>
                      {c.mnemonic}
                    </p>
                  )}

                  {c.vignette && <VignetteBlock v={c.vignette} />}

                  <div className="mt-4 rounded-xl border border-border bg-tint/60 p-4">
                    <p className="label-eyebrow text-primary">High-yield</p>
                    <p className="mt-1 text-sm font-semibold">{c.highYield}</p>
                  </div>

                </div>
              )}
            </article>
          );
        })}
      </div>

      <section className="mt-6">
        <p className="label-eyebrow">Other modules</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LEARN_MODULES.filter((m) => m.slug !== mod.slug).map((m) => (
            <Link key={m.slug} to="/learn/$subject" params={{ subject: m.slug }} className="chip">
              {m.subject}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
