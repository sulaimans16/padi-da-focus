import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@/components/Primitives";
import { createAssignment, fetchBankTopics, pickAssignmentQuestions } from "@/lib/institute";
import type { TrackId } from "@/lib/track-state";
import { TRACKS } from "@/lib/tracks";

const COUNTS = [10, 20, 30, 50];

const toInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Pick questions by subject / topic / PYQ year and send them to the batch. */
export function AssignmentCreator({
  batchId,
  exam,
  onClose,
  onCreated,
}: {
  batchId: string;
  exam: TrackId;
  onClose: () => void;
  onCreated: () => void;
}) {
  const track = TRACKS[exam];
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [pyqOnly, setPyqOnly] = useState(false);
  const [year, setYear] = useState("");
  const [count, setCount] = useState(10);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState(() => toInput(new Date(Date.now() + 3 * 86_400_000)));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const topics = useQuery({
    queryKey: ["bank-topics", exam, subject],
    queryFn: () => fetchBankTopics(exam, subject),
    enabled: Boolean(subject),
    staleTime: 10 * 60_000,
  });

  const autoTitle =
    [subject || "Mixed", topic, pyqOnly && year ? `PYQ ${year}` : pyqOnly ? "PYQs" : ""]
      .filter(Boolean)
      .join(" · ") + ` (${count} Qs)`;

  const create = async () => {
    setBusy(true);
    setError("");
    try {
      const ids = await pickAssignmentQuestions({
        exam,
        count,
        subject: subject || undefined,
        topic: topic || undefined,
        pyqYear: pyqOnly && year ? Number(year) : undefined,
      });
      if (ids.length < 5)
        throw new Error(`Only ${ids.length} matching questions in the bank. Widen the filters.`);
      await createAssignment(
        batchId,
        title.trim() || autoTitle,
        ids,
        due ? new Date(`${due}T23:59:00`) : null,
      );
      onCreated();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't create the assignment.");
    } finally {
      setBusy(false);
    }
  };

  const field =
    "mt-1 w-full rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-background/70 p-3 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New assignment"
        onClick={(e) => e.stopPropagation()}
        className="card-pop max-h-[90vh] w-full max-w-lg overflow-y-auto !bg-surface p-5"
      >
        <div className="flex items-center gap-2">
          <h2 className="mr-auto font-display text-xl font-bold">New assignment</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground"
          >
            <Icon name="close" className="text-[22px]" />
          </button>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Random questions from the {track.name} bank matching your filters. Students get the same
          set and it&apos;s graded on the server.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-semibold">
            Subject
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setTopic("");
              }}
              className={field}
            >
              <option value="">All subjects (mixed)</option>
              {track.subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-semibold">
            Topic
            <select
              value={topic}
              disabled={!subject || topics.isLoading}
              onChange={(e) => setTopic(e.target.value)}
              className={field}
            >
              <option value="">{subject ? "All topics" : "Pick a subject first"}</option>
              {(topics.data ?? []).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={pyqOnly}
              onChange={(e) => setPyqOnly(e.target.checked)}
            />
            Previous-year questions only
          </label>
          {pyqOnly ? (
            <input
              value={year}
              onChange={(e) => setYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric"
              placeholder="Year (any)"
              aria-label="PYQ year"
              className="w-28 rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-1.5 text-sm outline-none focus:border-primary"
            />
          ) : null}
        </div>

        <p className="mt-4 text-xs font-semibold">Questions</p>
        <div className="mt-1 grid grid-cols-4 gap-2">
          {COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              aria-pressed={count === n}
              className={`btn-base h-10 text-sm ${count === n ? "btn-primary" : "btn-ghost"}`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block text-xs font-semibold">
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={autoTitle}
              maxLength={80}
              className={field}
            />
          </label>
          <label className="block text-xs font-semibold">
            Due
            <input
              type="date"
              value={due}
              min={toInput(new Date())}
              onChange={(e) => setDue(e.target.value)}
              className={field}
            />
          </label>
        </div>

        {error ? (
          <p className="mt-3 text-sm font-semibold text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={() => void create()}
          className="btn-base btn-primary mt-5 h-12 w-full text-base"
        >
          {busy ? "Picking questions…" : "Send to batch"}
        </button>
      </div>
    </div>
  );
}
