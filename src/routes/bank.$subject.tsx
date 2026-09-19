import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { GenerateQuestions } from "@/components/GenerateQuestions";
import { ProGate } from "@/components/ProGate";
import { Pagination, usePagination } from "@/components/Pagination";

import { fetchRemoteQuestions } from "@/lib/remote-questions";
import { allQuestions, subjectColor, type Question } from "@/lib/questions";

export const Route = createFileRoute("/bank/$subject")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.subject} Questions — PG Prep NEET PG` },
      {
        name: "description",
        content: `Practice NBE-style ${params.subject} questions for NEET PG with detailed explanations and high-yield facts.`,
      },
      { property: "og:title", content: `${params.subject} Questions — PG Prep` },
      {
        property: "og:description",
        content: `Topic-wise ${params.subject} drilling for the NEET PG sprint.`,
      },
    ],
  }),
  component: SubjectPractice,
});

function SubjectPractice() {
  const { subject } = Route.useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topic, setTopic] = useState("all");

  const load = useCallback(async () => {
    const local = allQuestions().filter((q) => q.subject === subject);
    try {
      const remote = await fetchRemoteQuestions(subject);
      setQuestions([...remote, ...local]);
    } catch {
      setQuestions(local);
    }
  }, [subject]);

  useEffect(() => {
    void load();
  }, [load]);

  const topics = useMemo(
    () => ["all", ...Array.from(new Set(questions.map((q) => q.topic)))],
    [questions],
  );
  const shown = topic === "all" ? questions : questions.filter((q) => q.topic === topic);
  const { page, setPage, totalPages, pageItems, offset } = usePagination(shown);


  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        to="/bank"
        className="label-eyebrow inline-flex items-center gap-1 text-muted-foreground hover:text-primary"
      >
        <span aria-hidden className="material-symbols-outlined text-[16px]">
          arrow_back
        </span>
        Question Bank
      </Link>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow" style={{ color: subjectColor(subject) }}>
            Subject drill
          </p>
          <h1 className="text-3xl sm:text-4xl">{subject}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{shown.length} questions loaded</p>
        </div>
      </div>

      {topics.length > 2 && (
        <div className="mt-4 flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-1">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${topic === t ? "btn-primary" : "btn-ghost"}`}
            >
              {t === "all" ? "All topics" : t}
            </button>
          ))}
        </div>
      )}

      <ProGate feature="AI question generation">
        <GenerateQuestions
          subject={subject}
          topic={topic}
          currentCount={shown.length}
          existingStems={shown.map((q) => q.stem.slice(0, 90))}
          onDone={load}
        />
      </ProGate>


      <div className="mt-4 space-y-4">
        {pageItems.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={offset + i}
            total={shown.length}
            context="question_bank"
          />
        ))}
        {shown.length === 0 && (
          <p className="card-surface p-8 text-center text-sm text-muted-foreground">
            No questions here yet. Generate a batch above, or add your own from the Question Bank
            screen.
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

