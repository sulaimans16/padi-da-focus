import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Icon, Pill } from "@/components/Primitives";
import { QuizRunner, type QuizSummary } from "@/components/QuizRunner";
import { Reveal } from "@/components/motion/Reveal";
import { MascotSays } from "@/components/mascot/Mascot";
import { JoinBatchForm } from "@/components/institute/JoinBatchForm";
import { useTrack } from "@/hooks/useTrack";
import {
  fetchMyBatches,
  leaveBatch,
  submitAssignment,
  type BatchAssignment,
  type MyBatch,
} from "@/lib/institute";
import type { Question } from "@/lib/questions";
import { fetchQuestionsByIds } from "@/lib/quiz";
import { localizeHead } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$track/_authenticated/batch")({
  staticData: { sitemap: false },
  head: ({ params }) => localizeHead(params.track, { meta: [{ title: "My Batch — PG Prep" }] }),
  component: BatchPage,
});

function msg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong.";
}

function dueLabel(a: BatchAssignment) {
  if (!a.due_at) return "No due date";
  const ms = Date.parse(a.due_at) - Date.now();
  const days = Math.ceil(ms / 86_400_000);
  if (ms < 0) return "Past due";
  if (days <= 1) return "Due today";
  return `Due in ${days} days`;
}

function AssignmentRow({ a, onStart }: { a: BatchAssignment; onStart: () => void }) {
  const done = a.my_score != null;
  const overdue = !done && a.due_at != null && Date.parse(a.due_at) < Date.now();
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-surface-2/50 px-4 py-3">
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full",
          done ? "bg-success/15 text-success" : "bg-primary/15 text-primary",
        )}
      >
        <Icon name={done ? "task_alt" : "assignment"} filled className="text-[20px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{a.title}</p>
        <p className={cn("text-xs text-muted-foreground", overdue && "text-destructive")}>
          {a.total} questions ·{" "}
          {done
            ? `You scored ${a.my_score}/${a.total}${a.avg_score != null ? ` · batch avg ${a.avg_score}` : ""}`
            : dueLabel(a)}
        </p>
      </div>
      {done ? (
        <span className="font-display text-lg font-bold tabular-nums">
          {a.my_score}/{a.total}
        </span>
      ) : (
        <button type="button" onClick={onStart} className="btn-base btn-primary h-10 px-4 text-sm">
          Start
        </button>
      )}
    </li>
  );
}

function BatchCard({
  b,
  onStart,
  onLeave,
}: {
  b: MyBatch;
  onStart: (a: BatchAssignment) => void;
  onLeave: () => void;
}) {
  const [confirmLeave, setConfirmLeave] = useState(false);
  const pending = b.assignments.filter((a) => a.my_score == null);
  return (
    <section className="card-pop p-5" aria-label={`${b.name} batch`}>
      <div className="flex flex-wrap items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Icon name="school" filled className="text-[26px]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 font-display text-lg font-bold">
            {b.name}
            {b.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                <Icon name="verified" filled className="text-[13px]" />
                Verified partner
              </span>
            ) : null}
          </p>
          <p className="text-sm text-muted-foreground">
            {b.institute}
            {b.city ? `, ${b.city}` : ""} · {b.members} student{b.members === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <h3 className="mt-5 flex items-center gap-2 text-sm font-bold">
        Assignments
        {pending.length ? (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
            {pending.length} to do
          </span>
        ) : null}
      </h3>
      {b.assignments.length ? (
        <ul className="mt-2 space-y-2">
          {b.assignments.map((a) => (
            <AssignmentRow key={a.id} a={a} onStart={() => onStart(a)} />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          No assignments yet. Your faculty will post them here.
        </p>
      )}

      <h3 className="mt-5 text-sm font-bold">This week in your batch</h3>
      {b.leaderboard.length ? (
        <ol className="mt-2 space-y-1">
          {b.leaderboard.map((r) => (
            <li
              key={`${r.rank}-${r.name}`}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
                r.is_me ? "bg-primary/15 font-bold" : "bg-surface-2/40",
              )}
            >
              <span className="w-6 text-center font-mono text-xs text-muted-foreground">
                {r.rank}
              </span>
              <span className="min-w-0 flex-1 truncate">
                {r.name}
                {r.is_me ? " (you)" : ""}
              </span>
              <span className="font-mono text-xs tabular-nums text-xp">{r.xp} XP</span>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="mt-5 border-t-2 border-glass-line pt-3 text-xs text-muted-foreground">
        Your faculty can see your progress on this exam (accuracy, activity, streak and assignment
        scores).{" "}
        {confirmLeave ? (
          <span className="inline-flex flex-wrap items-center gap-2">
            Leave {b.name}?
            <button type="button" onClick={onLeave} className="font-bold text-destructive">
              Yes, leave
            </button>
            <button type="button" onClick={() => setConfirmLeave(false)} className="font-bold">
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmLeave(true)}
            className="font-semibold underline hover:text-destructive"
          >
            Leave batch
          </button>
        )}
      </div>
    </section>
  );
}

function BatchPage() {
  const track = useTrack();
  const qc = useQueryClient();
  const batches = useQuery({
    queryKey: ["my-batches", track.id],
    queryFn: () => fetchMyBatches(track.id),
  });
  const [playing, setPlaying] = useState<{ a: BatchAssignment; questions: Question[] } | null>(
    null,
  );
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const refresh = () => void qc.invalidateQueries({ queryKey: ["my-batches"] });

  const start = async (a: BatchAssignment) => {
    setError("");
    setResult("");
    try {
      const questions = await fetchQuestionsByIds(a.question_ids);
      if (!questions.length) throw new Error("Couldn't load these questions. Try again.");
      setPlaying({ a, questions });
    } catch (e) {
      setError(msg(e));
    }
  };

  const finish = (s: QuizSummary) => {
    if (!playing) return;
    void submitAssignment(playing.a.id, s.answers, s.seconds)
      .then((r) => setResult(`Submitted: ${r.score}/${r.total}. Your faculty can see your score.`))
      .catch((e: unknown) => setResult(msg(e)))
      .finally(refresh);
  };

  if (playing) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="min-w-0 truncate font-display text-xl font-bold">{playing.a.title}</h1>
          <Pill className="ml-auto shrink-0" onClick={() => setPlaying(null)}>
            <Icon name="arrow_back" className="text-[18px]" />
            My batch
          </Pill>
        </div>
        {result ? (
          <p
            className="mb-4 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold"
            role="status"
          >
            {result}
          </p>
        ) : null}
        <QuizRunner
          questions={playing.questions}
          context="batch_assignment"
          reveal="onSubmit"
          onFinish={finish}
        />
      </div>
    );
  }

  const list = batches.data ?? [];
  const todo = list.reduce((n, b) => n + b.assignments.filter((a) => a.my_score == null).length, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="label-eyebrow">Your coaching institute</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          My <span className="text-primary">batch</span>
        </h1>
        <MascotSays mood={todo ? "fire" : "happy"} size={72} className="mt-4">
          {list.length
            ? todo
              ? `You have ${todo} assignment${todo > 1 ? "s" : ""} from your faculty. Let's finish ${todo > 1 ? "them" : "it"}!`
              : "All assignments done. Keep practising; your faculty sees your progress."
            : "Studying at a coaching institute? Enter the batch code your faculty shared to join your class here."}
        </MascotSays>
      </Reveal>

      {error ? (
        <p
          className="mt-4 rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-6 space-y-5">
        {list.map((b) => (
          <BatchCard
            key={b.id}
            b={b}
            onStart={(a) => void start(a)}
            onLeave={() =>
              void leaveBatch(b.id)
                .then(refresh)
                .catch((e: unknown) => setError(msg(e)))
            }
          />
        ))}

        <section className="card-pop p-5" aria-label="Join a batch">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Icon name="group_add" filled className="text-[20px] text-primary" />
            {list.length ? "Join another batch" : "Join your batch"}
          </h2>
          <JoinBatchForm className="mt-3" onJoined={refresh} />
        </section>
      </div>
    </div>
  );
}
