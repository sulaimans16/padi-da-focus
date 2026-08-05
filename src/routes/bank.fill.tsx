import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SUBJECTS } from "@/lib/focus-session";
import { subjectColor } from "@/lib/questions";
import { fetchRemoteCounts } from "@/lib/remote-questions";
import { generateQuestionBatch } from "@/lib/questions-ai.functions";

export const Route = createFileRoute("/bank/fill")({
  head: () => ({
    meta: [
      { title: "Fill the Bank — PadiDa NEET PG" },
      {
        name: "description",
        content:
          "Auto-fill every NEET PG subject with web-researched, NBE-style questions until each subject hits your target count.",
      },
      { property: "og:title", content: "Fill the Bank — PadiDa" },
      {
        property: "og:description",
        content: "Grow every subject to 50 or 100 questions in one run, grounded in web research.",
      },
    ],
  }),
  component: FillBank,
});

const BATCH = 10;

function FillBank() {
  const generate = useServerFn(generateQuestionBatch);
  const [counts, setCounts] = useState<Map<string, number>>(new Map());
  const [target, setTarget] = useState(50);
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const stop = useRef(false);

  const refresh = useCallback(async () => {
    try {
      setCounts(await fetchRemoteCounts());
    } catch {
      /* offline */
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const run = async () => {
    stop.current = false;
    setRunning(true);
    setLog([]);
    try {
      for (const subject of SUBJECTS) {
        if (stop.current) break;
        setActive(subject);
        let have = counts.get(subject) ?? 0;
        let guard = 0;
        while (have < target && guard < 20 && !stop.current) {
          guard += 1;
          try {
            const res = await generate({
              data: {
                subject,
                topic: "all",
                count: Math.min(BATCH, target - have),
                avoid: [],
              },
            });
            if (!res.inserted) break;
            have += res.inserted;
            setCounts((prev) => new Map(prev).set(subject, have));
          } catch (e) {
            setLog((l) => [
              `${subject}: ${e instanceof Error ? e.message : "failed"}`,
              ...l,
            ]);
            break;
          }
        }
        setLog((l) => [`${subject}: ${have} questions`, ...l]);
      }
    } finally {
      setActive(null);
      setRunning(false);
      await refresh();
    }
  };

  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  const done = SUBJECTS.filter((s) => (counts.get(s) ?? 0) >= target).length;

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <Link to="/bank" className="text-xs text-muted-foreground underline underline-offset-4">
        ← Question Bank
      </Link>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Fill every topic</h1>
      <p className="text-sm text-muted-foreground">
        Scouts the web for current NEET PG material per subject, then writes NBE-style questions with
        explanations into your cloud bank. {total} questions stored · {done}/{SUBJECTS.length}{" "}
        subjects at target.
      </p>

      <div className="card-surface mt-4 space-y-3 p-4">
        <div className="flex gap-2">
          {[50, 100].map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              disabled={running}
              className={`btn-base flex-1 text-xs ${target === t ? "btn-primary" : "btn-ghost"}`}
            >
              Target {t} / subject
            </button>
          ))}
        </div>
        {running ? (
          <button
            onClick={() => {
              stop.current = true;
            }}
            className="btn-base btn-ghost w-full text-sm"
          >
            Stop after current batch
          </button>
        ) : (
          <button onClick={run} className="btn-base btn-primary w-full text-sm">
            Start filling all {SUBJECTS.length} subjects
          </button>
        )}
        <p className="text-[11px] leading-snug text-muted-foreground">
          {running
            ? `Working on ${active ?? "…"}. Keep this tab open — it can take a while.`
            : "Runs subject by subject. Every question is badged as AI-written from web research — verify facts against a standard text."}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SUBJECTS.map((s) => {
          const have = counts.get(s) ?? 0;
          return (
            <div
              key={s}
              className={`card-surface p-3 ${active === s ? "ring-1 ring-primary" : ""}`}
              style={{ borderLeft: `3px solid ${subjectColor(s)}` }}
            >
              <p className="text-sm font-semibold leading-tight">{s}</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                {have}/{target} {have >= target ? "✓" : ""}
              </p>
            </div>
          );
        })}
      </div>

      {log.length > 0 && (
        <ul className="mt-4 space-y-1 font-mono text-[11px] text-muted-foreground">
          {log.slice(0, 25).map((line, i) => (
            <li key={`${line}-${i}`}>{line}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
