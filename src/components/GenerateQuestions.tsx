import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateQuestionBatch } from "@/lib/questions-ai.functions";
import { useTrack } from "@/hooks/useTrack";

const BATCH = 10;

export function GenerateQuestions({
  subject,
  topic = "all",
  existingStems,
  currentCount,
  onDone,
}: {
  subject: string;
  topic?: string;
  existingStems: string[];
  currentCount: number;
  onDone: () => void | Promise<void>;
}) {
  const track = useTrack();
  const generate = useServerFn(generateQuestionBatch);
  const [busy, setBusy] = useState(false);
  const [made, setMade] = useState(0);
  const [target, setTarget] = useState(0);
  const [tricky, setTricky] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (want: number) => {
    setBusy(true);
    setError(null);
    setMade(0);
    setTarget(want);
    let produced = 0;
    const avoid = [...existingStems];
    try {
      while (produced < want) {
        const batch = Math.min(BATCH, want - produced);
        const res = await generate({
          data: {
            subject,
            topic,
            count: batch,
            avoid: avoid.slice(0, 60),
            tricky,
            exam: track.id,
          },
        });
        if (!res.inserted) break;
        produced += res.inserted;
        setMade(produced);
        await onDone();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setBusy(false);
      await onDone();
    }
  };

  const fillTo = (goal: number) => run(Math.max(BATCH, goal - currentCount));

  return (
    <div className="card-surface mt-4 space-y-3 p-4">
      <div>
        <h2 className="text-sm font-semibold">Build the bank with AI</h2>
        <p className="text-[11px] leading-snug text-muted-foreground">
          NBE-style questions with explanations, distractor breakdowns and high-yield boxes
          {topic === "all" ? "" : ` on ${topic}`}. Always verify against a standard text before
          trusting a fact.
        </p>
      </div>

      <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-input bg-surface p-2.5">
        <input
          type="checkbox"
          checked={tricky}
          onChange={(e) => setTricky(e.target.checked)}
          disabled={busy}
          className="mt-0.5 accent-primary"
        />
        <span className="text-[11px] leading-snug">
          <span className="font-semibold">Tricky mode</span>
          <span className="text-muted-foreground">
            {" "}
            — hard, exam-trap questions where all four options look almost identical and one detail
            decides the answer.
          </span>
        </span>
      </label>

      <div className="grid grid-cols-3 gap-2">
        <button
          disabled={busy}
          onClick={() => run(BATCH)}
          className="btn-base btn-ghost text-xs disabled:opacity-50"
        >
          +10 questions
        </button>
        <button
          disabled={busy}
          onClick={() => fillTo(50)}
          className="btn-base btn-primary text-xs disabled:opacity-50"
        >
          Fill to 50
        </button>
        <button
          disabled={busy}
          onClick={() => fillTo(100)}
          className="btn-base btn-ghost text-xs disabled:opacity-50"
        >
          Fill to 100
        </button>
      </div>

      {busy && (
        <p className="font-mono text-[11px] text-muted-foreground">
          Writing questions… {made}/{target} done. Keep this tab open.
        </p>
      )}
      {!busy && made > 0 && !error && (
        <p className="font-mono text-[11px] text-success">Added {made} new questions.</p>
      )}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
