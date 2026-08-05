import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SUBJECTS } from "@/lib/focus-session";
import { fetchRemoteCounts } from "@/lib/remote-questions";
import {
  allQuestions,
  saveCustomQuestion,
  subjectColor,
  type Question,
} from "@/lib/questions";

export const Route = createFileRoute("/bank/")({
  head: () => ({
    meta: [
      { title: "Question Bank — PadiDa NEET PG" },
      {
        name: "description",
        content:
          "Subject-wise NEET PG question bank with NBE-style single-best-answer questions, distractor breakdowns and high-yield fact boxes.",
      },
      { property: "og:title", content: "Question Bank — PadiDa NEET PG" },
      {
        property: "og:description",
        content: "Drill NEET PG questions subject by subject, with 2am-mode explanations.",
      },
    ],
  }),
  component: BankIndex,
});

function BankIndex() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [remote, setRemote] = useState<Map<string, number>>(new Map());
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setQuestions(allQuestions());
    try {
      setRemote(await fetchRemoteCounts());
    } catch {
      /* offline: local counts only */
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const counts = useMemo(() => {
    const map = new Map<string, number>(remote);
    questions.forEach((q) => map.set(q.subject, (map.get(q.subject) ?? 0) + 1));
    return map;
  }, [questions, remote]);

  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <Link to="/" className="text-xs text-muted-foreground underline underline-offset-4">
        ← Dashboard
      </Link>
      <h1 className="mt-2 text-3xl font-bold">Question Bank</h1>
      <p className="text-sm text-muted-foreground">
        {total} questions loaded. Open a subject and use “Fill to 50/100” to grow it.
      </p>

      <Link to="/bank/fill" className="btn-base btn-primary mt-3 w-full text-sm">
        🌐 Fill every subject from web research
      </Link>



      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SUBJECTS.map((s) => {
          const count = counts.get(s) ?? 0;
          return (
            <Link
              key={s}
              to="/bank/$subject"
              params={{ subject: s }}
              className={`card-surface flex flex-col justify-between gap-1 p-3 ${count ? "" : "opacity-50"}`}
              style={{ borderLeft: `3px solid ${subjectColor(s)}` }}
            >
              <span className="text-sm font-semibold leading-tight">{s}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{count} Qs</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="btn-base btn-ghost w-full text-sm"
        >
          {showForm ? "Close" : "＋ Add my own question (study group)"}
        </button>
        {showForm && <AddQuestionForm onSaved={() => setQuestions(allQuestions())} />}
      </div>
    </main>
  );
}

function AddQuestionForm({ onSaved }: { onSaved: () => void }) {
  const [subject, setSubject] = useState<string>(SUBJECTS[0]);
  const [topic, setTopic] = useState("");
  const [stem, setStem] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState("a");
  const [oneLiner, setOneLiner] = useState("");
  const [saved, setSaved] = useState(false);
  const ids = ["a", "b", "c", "d"];

  const submit = () => {
    if (!stem.trim() || opts.some((o) => !o.trim())) return;
    saveCustomQuestion({
      id: `custom-${Date.now()}`,
      subject,
      topic: topic.trim() || "Mixed",
      stem: stem.trim(),
      options: ids.map((id, i) => ({ id, text: (opts[i] ?? "").trim() })),
      correctOptionId: correct,
      oneLiner: oneLiner.trim() || "Added by your study group.",
      explanation: oneLiner.trim() || "Added by your study group.",
      distractors: {},
      highYield: "Crowdsourced — verify against a standard reference.",
      difficulty: "med",
      isPyq: false,
      createdBy: "me",
    });
    setStem("");
    setOpts(["", "", "", ""]);
    setOneLiner("");
    setSaved(true);
    onSaved();
  };

  return (
    <div className="card-surface mt-2 space-y-3 p-4">
      <div className="grid grid-cols-2 gap-2">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-md border border-input bg-background px-2 py-2 text-sm"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
          className="rounded-md border border-input bg-background px-2 py-2 text-sm"
        />
      </div>
      <textarea
        value={stem}
        onChange={(e) => setStem(e.target.value)}
        placeholder="Question stem"
        rows={3}
        className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
      />
      {ids.map((id, i) => (
        <div key={id} className="flex items-center gap-2">
          <button
            onClick={() => setCorrect(id)}
            className={`h-7 w-7 shrink-0 rounded-md font-mono text-xs uppercase ${correct === id ? "btn-primary" : "btn-ghost"}`}
          >
            {id}
          </button>
          <input
            value={opts[i]}
            onChange={(e) => setOpts(opts.map((o, j) => (j === i ? e.target.value : o)))}
            placeholder={`Option ${id}`}
            className="flex-1 rounded-md border border-input bg-background px-2 py-2 text-sm"
          />
        </div>
      ))}
      <input
        value={oneLiner}
        onChange={(e) => setOneLiner(e.target.value)}
        placeholder="One-line explanation"
        className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm"
      />
      <button onClick={submit} className="btn-base btn-primary w-full text-sm">
        Save question
      </button>
      {saved && <p className="text-center text-xs text-success">Saved. It shows up in that subject.</p>}
      <p className="text-center text-[11px] text-muted-foreground">
        Tap a letter to mark the correct option.
      </p>
    </div>
  );
}
