import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchRemoteQuestions } from "@/lib/remote-questions";
import { allQuestions, type Question } from "@/lib/questions";
import { buildPaperHtml, downloadHtml, printHtml, slug } from "@/lib/paper-export";

export const Route = createFileRoute("/papers")({
  head: () => ({
    meta: [
      { title: "Download NEET PG Past Year Papers — PadiDa" },
      {
        name: "description",
        content:
          "Free year-wise and subject-wise NEET PG past year question papers you can download or print, with an optional answer key and explanations.",
      },
      { property: "og:title", content: "Download NEET PG Past Year Papers — PadiDa" },
      {
        property: "og:description",
        content: "Free downloadable year-wise NEET PG question papers with answer keys.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PapersPage,
});

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function PapersPage() {
  const [pyqs, setPyqs] = useState<Question[]>([]);
  const [withAnswers, setWithAnswers] = useState(true);
  const [subject, setSubject] = useState("all");

  useEffect(() => {
    const local = allQuestions().filter((q) => q.isPyq);
    void (async () => {
      try {
        const remote = await fetchRemoteQuestions();
        setPyqs([...remote.filter((q) => q.isPyq), ...local]);
      } catch {
        setPyqs(local);
      }
    })();
  }, []);

  const subjects = useMemo(
    () => Array.from(new Set(pyqs.map((q) => q.subject))).sort(),
    [pyqs],
  );

  const pool = useMemo(
    () => (subject === "all" ? pyqs : pyqs.filter((q) => q.subject === subject)),
    [pyqs, subject],
  );

  const papers = useMemo(() => {
    const byYear = new Map<number, Question[]>();
    pool.forEach((q) => {
      if (!q.pyqYear) return;
      byYear.set(q.pyqYear, [...(byYear.get(q.pyqYear) ?? []), q]);
    });
    return Array.from(byYear.entries())
      .map(([year, qs]) => [
        year,
        [...qs].sort((a, b) => a.subject.localeCompare(b.subject) || a.topic.localeCompare(b.topic)),
      ] as [number, Question[]])
      .sort((a, b) => b[0] - a[0]);
  }, [pool]);

  const paperTitle = (year: number) =>
    `NEET PG ${year} Question Paper${subject === "all" ? "" : ` — ${subject}`}`;

  const handleDownload = (year: number, qs: Question[]) => {
    const title = paperTitle(year);
    downloadHtml(`${slug(title)}.html`, buildPaperHtml(title, qs, withAnswers));
  };

  const field =
    "w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-ring";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <p className="label-eyebrow">Free for everyone</p>
        <h1 className="text-3xl sm:text-4xl">Past Year Papers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Year-wise papers assembled from the PYQ vault — download or print for offline revision.
          No subscription needed.
        </p>
      </div>

      <section className="card-surface mt-5 overflow-hidden">
        <div className="card-head">
          <span className="label-eyebrow">Paper options</span>
          <span className="label-eyebrow">{papers.length} papers</span>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          <label className="block">
            <span className="label-eyebrow">Subject</span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={`mt-1 ${field}`}
            >
              <option value="all">All subjects (full paper)</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setWithAnswers((v) => !v)}
            className={`btn-base mt-auto text-sm ${withAnswers ? "btn-primary" : "btn-ghost"}`}
          >
            <Icon name={withAnswers ? "check_circle" : "radio_button_unchecked"} className="text-[18px]" />
            Include answer key & explanations
          </button>
        </div>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {papers.map(([year, qs]) => (
          <article key={year} className="card-surface flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="label-eyebrow">NEET PG</p>
                <h2 className="text-2xl">{year}</h2>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-primary">
                <Icon name="description" className="text-[20px]" />
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {qs.length} questions ·{" "}
              {Array.from(new Set(qs.map((q) => q.subject))).length} subjects
              {withAnswers ? " · answer key included" : ""}
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleDownload(year, qs)}
                className="btn-base btn-primary h-9 px-3 text-xs"
              >
                <Icon name="download" className="text-[16px]" />
                Download
              </button>
              <button
                type="button"
                onClick={() => printHtml(buildPaperHtml(paperTitle(year), qs, withAnswers))}
                className="btn-base btn-ghost h-9 px-3 text-xs"
              >
                <Icon name="print" className="text-[16px]" />
                Print / Save as PDF
              </button>
            </div>
          </article>
        ))}
        {papers.length === 0 && (
          <p className="card-surface p-8 text-center text-sm text-muted-foreground sm:col-span-2">
            No papers available for this filter yet.
          </p>
        )}
      </div>
    </div>
  );
}
