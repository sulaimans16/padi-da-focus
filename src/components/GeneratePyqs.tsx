import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateQuestionBatch } from "@/lib/questions-ai.functions";
import { useTrack } from "@/hooks/useTrack";

const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];
const BATCH = 10;

export function GeneratePyqs({
  existingStems,
  onDone,
}: {
  existingStems: string[];
  onDone: () => void | Promise<void>;
}) {
  const track = useTrack();
  const generate = useServerFn(generateQuestionBatch);
  const [subject, setSubject] = useState("Medicine");
  const [year, setYear] = useState<string>("mixed");
  const [want, setWant] = useState(20);
  const [tricky, setTricky] = useState(false);
  const [busy, setBusy] = useState(false);
  const [made, setMade] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const field =
    "w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-ring";

  const run = async () => {
    setBusy(true);
    setError(null);
    setMade(0);
    let produced = 0;
    try {
      while (produced < want) {
        const res = await generate({
          data: {
            subject,
            topic: "all",
            count: Math.min(BATCH, want - produced),
            avoid: existingStems.slice(0, 60),
            pyqOnly: true,
            tricky,
            year: year === "mixed" ? null : Number(year),
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

  return (
    <section className="card-surface mt-4 overflow-hidden">
      <div className="card-head">
        <span className="label-eyebrow">Grow the vault</span>
        <span className="label-eyebrow">AI + web research</span>
      </div>
      <div className="space-y-3 p-5">
        <p className="text-[11px] leading-snug text-muted-foreground">
          Adds previous-year style questions with explanations, distractor breakdowns and high-yield
          lines. Always cross-check against a standard text.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={field}
            disabled={busy}
          >
            {track.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={field}
            disabled={busy}
          >
            <option value="mixed">Mixed years</option>
            {YEARS.map((y) => (
              <option key={y} value={String(y)}>
                {track.name} {y}
              </option>
            ))}
          </select>
          <select
            value={String(want)}
            onChange={(e) => setWant(Number(e.target.value))}
            className={field}
            disabled={busy}
          >
            {[10, 20, 30, 50].map((n) => (
              <option key={n} value={String(n)}>
                Add {n} PYQs
              </option>
            ))}
          </select>
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
              — exam traps with four near-identical options decided by one detail.
            </span>
          </span>
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void run()}
            disabled={busy}
            className="btn-base btn-primary text-sm disabled:opacity-60"
          >
            <span aria-hidden className="material-symbols-outlined text-[18px]">
              {busy ? "hourglass_top" : "auto_awesome"}
            </span>
            {busy ? `Writing… ${made}/${want}` : "Generate PYQs"}
          </button>
          {made > 0 && !busy ? (
            <span className="text-xs font-semibold text-primary">Added {made} questions</span>
          ) : null}
          {error ? <span className="text-xs font-semibold text-destructive">{error}</span> : null}
        </div>
      </div>
    </section>
  );
}
