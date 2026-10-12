import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchRemoteCounts } from "@/lib/remote-questions";
import { allQuestions, saveCustomQuestion, subjectColor, type Question } from "@/lib/questions";
import { useTrack } from "@/hooks/useTrack";
import { localizeHead } from "@/lib/tracks";

export const Route = createFileRoute("/$track/bank/")({
  staticData: { sitemap: true },
  head: ({ params }) =>
    localizeHead(params.track, {
      meta: [
        { title: "Question Bank — PG Prep NEET PG" },
        {
          name: "description",
          content:
            "Subject-wise NEET PG question bank with NBE-style single-best-answer questions, distractor breakdowns and high-yield fact boxes.",
        },
        { property: "og:title", content: "Question Bank — PG Prep NEET PG" },
        {
          property: "og:description",
          content: "Drill NEET PG questions subject by subject, with 2am-mode explanations.",
        },
      ],
    }),
  component: BankIndex,
});

const TARGET = 100;

function BankIndex() {
  const track = useTrack();
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
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow">Practice library</p>
          <h1 className="text-3xl sm:text-4xl">Question Bank</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} questions loaded across {track.subjects.length} subjects. Open a subject and use
            “Fill to 50/100” to grow it.
          </p>
        </div>
        <Link
          to="/$track/bank/fill"
          params={{ track: track.slug }}
          className="btn-base btn-primary text-sm"
        >
          <span aria-hidden className="material-symbols-outlined text-[18px]">
            cloud_download
          </span>
          Fill every subject
        </Link>
      </div>

      <section className="card-surface mt-6 overflow-hidden">
        <div className="card-head">
          <span className="label-eyebrow">Subject modules</span>
          <span className="label-eyebrow">Target {TARGET} Qs each</span>
        </div>
        <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {track.subjects.map((s) => {
            const count = counts.get(s) ?? 0;
            const pct = Math.min(100, Math.round((count / TARGET) * 100));
            return (
              <Link
                key={s}
                to="/$track/bank/$subject"
                params={{ track: track.slug, subject: s }}
                className="rounded-xl border border-border bg-surface p-4 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold leading-tight">{s}</span>
                  <span
                    className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: subjectColor(s) }}
                  />
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(2, pct)}%`, backgroundColor: subjectColor(s) }}
                  />
                </div>
                <div className="mt-2 flex items-baseline justify-between font-mono text-[11px] text-muted-foreground">
                  <span>{count} Qs</span>
                  <span>{pct}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <p className="mt-4 text-xs text-muted-foreground">
        Bank includes questions from the open-source{" "}
        <a
          href="https://github.com/medmcqa/medmcqa"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          MedMCQA
        </a>{" "}
        dataset (AIIMS &amp; NEET-PG entrance MCQs with explanations, MIT licensed).
      </p>

      <div className="mt-6">
        <button
          onClick={() => setShowForm((v) => !v)}
          className="btn-base btn-ghost w-full text-sm sm:w-auto"
        >
          <span aria-hidden className="material-symbols-outlined text-[18px]">
            {showForm ? "close" : "add"}
          </span>
          {showForm ? "Close" : "Add my own question (study group)"}
        </button>
        {showForm && <AddQuestionForm onSaved={() => setQuestions(allQuestions())} />}
      </div>
    </div>
  );
}

function AddQuestionForm({ onSaved }: { onSaved: () => void }) {
  const track = useTrack();
  const [subject, setSubject] = useState<string>(track.subjects[0] ?? "");
  const [topic, setTopic] = useState("");
  const [stem, setStem] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState("a");
  const [oneLiner, setOneLiner] = useState("");
  const [saved, setSaved] = useState(false);
  const ids = ["a", "b", "c", "d"];
  const field =
    "w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-ring";

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
    <div className="card-surface mt-3 overflow-hidden">
      <div className="card-head">
        <span className="label-eyebrow">New question</span>
        <span className="label-eyebrow">Tap a letter to mark the key</span>
      </div>
      <div className="space-y-3 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className={field}>
            {track.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Topic"
            className={field}
          />
        </div>
        <textarea
          value={stem}
          onChange={(e) => setStem(e.target.value)}
          placeholder="Clinical vignette / question stem"
          rows={3}
          className={`${field} clinical-text`}
        />
        {ids.map((id, i) => (
          <div key={id} className="flex items-center gap-2">
            <button
              onClick={() => setCorrect(id)}
              className={`h-9 w-9 shrink-0 rounded-full font-mono text-xs font-bold uppercase ${correct === id ? "btn-primary" : "btn-ghost"}`}
            >
              {id}
            </button>
            <input
              value={opts[i]}
              onChange={(e) => setOpts(opts.map((o, j) => (j === i ? e.target.value : o)))}
              placeholder={`Option ${id}`}
              className={field}
            />
          </div>
        ))}
        <input
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          placeholder="One-line explanation"
          className={field}
        />
        <button onClick={submit} className="btn-base btn-primary w-full text-sm">
          Save question
        </button>
        {saved && (
          <p className="text-center text-xs font-bold text-success">
            Saved. It shows up in that subject.
          </p>
        )}
      </div>
    </div>
  );
}
