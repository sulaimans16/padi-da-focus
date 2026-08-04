import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { GenerateQuestions } from "@/components/GenerateQuestions";
import { fetchRemoteQuestions } from "@/lib/remote-questions";
import { allQuestions, subjectColor, type Question } from "@/lib/questions";

export const Route = createFileRoute("/bank/$subject")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.subject} Questions — PadiDa NEET PG` },
      {
        name: "description",
        content: `Practice NBE-style ${params.subject} questions for NEET PG with detailed explanations and high-yield facts.`,
      },
      { property: "og:title", content: `${params.subject} Questions — PadiDa` },
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

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <Link to="/bank" className="text-xs text-muted-foreground underline underline-offset-4">
        ← Question Bank
      </Link>
      <h1 className="mt-2 text-3xl font-bold" style={{ color: subjectColor(subject) }}>
        {subject}
      </h1>
      <p className="text-sm text-muted-foreground">{shown.length} questions loaded</p>

      {topics.length > 2 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full px-3 py-1.5 text-xs ${topic === t ? "btn-primary" : "btn-ghost"}`}
            >
              {t === "all" ? "All topics" : t}
            </button>
          ))}
        </div>
      )}

      <GenerateQuestions
        subject={subject}
        topic={topic}
        currentCount={shown.length}
        existingStems={shown.map((q) => q.stem.slice(0, 90))}
        onDone={load}
      />


      <div className="mt-4 space-y-3">
        {shown.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            total={shown.length}
            context="question_bank"
          />
        ))}
        {shown.length === 0 && (
          <p className="card-surface p-6 text-center text-sm text-muted-foreground">
            No questions here yet. Add your own from the Question Bank screen, or import real content.
          </p>
        )}
      </div>
    </main>
  );
}
