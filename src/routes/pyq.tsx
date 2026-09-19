import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { GeneratePyqs } from "@/components/GeneratePyqs";
import { ProGate } from "@/components/ProGate";
import { Pagination, usePagination } from "@/components/Pagination";

import { fetchRemotePyqs } from "@/lib/remote-questions";
import { allQuestions, type Question } from "@/lib/questions";

export const Route = createFileRoute("/pyq")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "NEET PG PYQs by Year — PG Prep" },
      {
        name: "description",
        content:
          "Previous year NEET PG questions filtered by exam year and subject, with repeat-frequency badges marking frequently repeated high-yield questions.",
      },
      { property: "og:title", content: "NEET PG PYQs by Year — PG Prep" },
      {
        property: "og:description",
        content: "Year-wise and subject-wise PYQ drilling with repeat-frequency tags.",
      },
    ],
  }),
  component: PyqPage,
});

function PyqPage() {
  const [pyqs, setPyqs] = useState<Question[]>([]);
  const [year, setYear] = useState<string>("all");
  const [subject, setSubject] = useState<string>("all");
  const [hotOnly, setHotOnly] = useState(false);

  const load = useCallback(async () => {
    const local = allQuestions().filter((q) => q.isPyq);
    try {
      const remote = await fetchRemotePyqs();
      setPyqs([...remote.filter((q) => q.isPyq), ...local]);
    } catch {
      setPyqs(local);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const years = useMemo(
    () =>
      Array.from(new Set(pyqs.map((q) => q.pyqYear).filter(Boolean) as number[])).sort(
        (a, b) => b - a,
      ),
    [pyqs],
  );
  const subjects = useMemo(() => Array.from(new Set(pyqs.map((q) => q.subject))).sort(), [pyqs]);

  const shown = pyqs.filter(
    (q) =>
      (year === "all" || String(q.pyqYear) === year) &&
      (subject === "all" || q.subject === subject) &&
      (!hotOnly || (q.repeatCount ?? 0) >= 3),
  );

  const { page, setPage, totalPages, pageItems, offset } = usePagination(shown);



  const themeLabel =
    year === "all" && subject === "all"
      ? "All PYQs"
      : `${year === "all" ? "All years" : year} Paper — ${subject === "all" ? "All subjects" : subject}`;

  const field =
    "w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-ring";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <p className="label-eyebrow">Archive</p>
        <h1 className="text-3xl sm:text-4xl">PYQ Vault</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {themeLabel} · {shown.length} questions
        </p>
      </div>

      <section className="card-surface mt-5 overflow-hidden">
        <div className="card-head">
          <span className="label-eyebrow">Filters</span>
          <span className="label-eyebrow">{shown.length} matching</span>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          <select value={year} onChange={(e) => setYear(e.target.value)} className={field}>
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                NEET PG {y}
              </option>
            ))}
          </select>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className={field}>
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setHotOnly((v) => !v)}
            className={`btn-base text-sm ${hotOnly ? "btn-primary" : "btn-ghost"}`}
          >
            <span aria-hidden className="material-symbols-outlined text-[18px]">
              local_fire_department
            </span>
            Frequently repeated
          </button>
        </div>
      </section>

      <ProGate feature="Growing the PYQ vault with AI">
        <GeneratePyqs existingStems={pyqs.map((q) => q.stem)} onDone={load} />
      </ProGate>

      <div className="mt-4 space-y-4">
        {pageItems.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={offset + i}
            total={shown.length}
            context="pyq"
          />
        ))}
        {shown.length === 0 && (
          <p className="card-surface p-8 text-center text-sm text-muted-foreground">
            No PYQs match this filter yet.
          </p>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        totalItems={shown.length}
      />

    </div>
  );
}
