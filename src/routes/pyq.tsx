import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { allQuestions, type Question } from "@/lib/questions";

export const Route = createFileRoute("/pyq")({
  head: () => ({
    meta: [
      { title: "NEET PG PYQs by Year — PadiDa" },
      {
        name: "description",
        content:
          "Previous year NEET PG questions filtered by exam year and subject, with repeat-frequency badges marking frequently repeated high-yield questions.",
      },
      { property: "og:title", content: "NEET PG PYQs by Year — PadiDa" },
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

  useEffect(() => setPyqs(allQuestions().filter((q) => q.isPyq)), []);

  const years = useMemo(
    () =>
      Array.from(new Set(pyqs.map((q) => q.pyqYear).filter(Boolean) as number[])).sort(
        (a, b) => b - a,
      ),
    [pyqs],
  );
  const subjects = useMemo(
    () => Array.from(new Set(pyqs.map((q) => q.subject))).sort(),
    [pyqs],
  );

  const shown = pyqs.filter(
    (q) =>
      (year === "all" || String(q.pyqYear) === year) &&
      (subject === "all" || q.subject === subject) &&
      (!hotOnly || (q.repeatCount ?? 0) >= 3),
  );

  const themeLabel =
    year === "all" && subject === "all"
      ? "All PYQs"
      : `${year === "all" ? "All years" : year} Paper — ${subject === "all" ? "All subjects" : subject}`;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <Link to="/" className="text-xs text-muted-foreground underline underline-offset-4">
        ← Dashboard
      </Link>
      <h1 className="mt-2 text-3xl font-bold">PYQs</h1>
      <p className="text-sm text-muted-foreground">
        {themeLabel} · {shown.length} questions
      </p>

      <div className="card-surface mt-4 space-y-2 p-3">
        <div className="grid grid-cols-2 gap-2">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-md border border-input bg-background px-2 py-2 text-sm"
          >
            <option value="all">All years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>
                NEET PG {y}
              </option>
            ))}
          </select>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-md border border-input bg-background px-2 py-2 text-sm"
          >
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setHotOnly((v) => !v)}
          className={`btn-base w-full text-sm ${hotOnly ? "btn-primary" : "btn-ghost"}`}
        >
          🔥 Frequently repeated only
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {shown.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} total={shown.length} context="pyq" />
        ))}
        {shown.length === 0 && (
          <p className="card-surface p-6 text-center text-sm text-muted-foreground">
            No PYQs match this filter yet.
          </p>
        )}
      </div>
    </main>
  );
}
