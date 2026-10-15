import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Aurora } from "@/components/Aurora";
import { Icon } from "@/components/Primitives";
import { MascotSays } from "@/components/mascot/Mascot";
import { AssignmentCreator } from "@/components/institute/AssignmentCreator";
import { PortalHeader } from "@/components/institute/PortalHeader";
import {
  AssignmentResultsView,
  BatchDashboardView,
} from "@/components/institute/BatchDashboardView";
import { useAuth } from "@/hooks/useAuth";
import {
  addStaff,
  createBatch,
  createInstitute,
  deleteAssignment,
  fetchAssignmentResults,
  fetchBatchDashboard,
  fetchStaffOverview,
  removeStaff,
  updateBatch,
  type StaffInstitute,
} from "@/lib/institute";
import type { TrackId } from "@/lib/track-state";
import { TRACKS, TRACK_LIST } from "@/lib/tracks";
import { cn } from "@/lib/utils";

type Search = { batch?: string | undefined; assignment?: string | undefined };

export const Route = createFileRoute("/institute")({
  staticData: { sitemap: false },
  ssr: false,
  head: () => ({ meta: [{ title: "Institute Portal — Learners Studio" }] }),
  validateSearch: (s: Record<string, unknown>): Search => ({
    batch: typeof s["batch"] === "string" ? s["batch"] : undefined,
    assignment: typeof s["assignment"] === "string" ? s["assignment"] : undefined,
  }),
  component: InstitutePortal,
});

function msg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong.";
}

const field =
  "w-full rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2.5 text-sm outline-none focus:border-primary";

function SetupInstitute({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="mx-auto max-w-lg">
      <MascotSays mood="happy" size={80}>
        Run your coaching batches here: invite students with a code, set assignments after class,
        and see who&apos;s falling behind before the next test.
      </MascotSays>
      <form
        className="card-pop mt-6 space-y-3 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setBusy(true);
          setError("");
          void createInstitute(name, city)
            .then(onDone)
            .catch((err: unknown) => setError(msg(err)))
            .finally(() => setBusy(false));
        }}
      >
        <h2 className="font-display text-xl font-bold">Set up your institute</h2>
        <label className="block text-xs font-semibold">
          Institute name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
            placeholder="e.g. Sunrise Medical Academy"
            className={cn(field, "mt-1")}
          />
        </label>
        <label className="block text-xs font-semibold">
          City
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={60}
            placeholder="e.g. Chennai"
            className={cn(field, "mt-1")}
          />
        </label>
        {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="btn-base btn-primary h-12 w-full text-base"
        >
          {busy ? "Creating…" : "Create institute"}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Everything works straight away. Once we verify your institute, batch codes can also unlock
          Pro for your students.{" "}
          <Link to="/institute/demo" className="font-semibold text-primary underline">
            See a demo dashboard first
          </Link>
          .
        </p>
      </form>
    </div>
  );
}

function NewBatchForm({ institute, onDone }: { institute: StaffInstitute; onDone: () => void }) {
  const [name, setName] = useState("");
  const [exam, setExam] = useState<TrackId>("neet_pg");
  const [proDays, setProDays] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      className="card-pop space-y-3 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        void createBatch(institute.id, name, exam, proDays)
          .then(() => {
            setName("");
            onDone();
          })
          .catch((err: unknown) => setError(msg(err)))
          .finally(() => setBusy(false));
      }}
    >
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        <Icon name="add_circle" filled className="text-[20px] text-primary" />
        New batch
      </h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={2}
        maxLength={60}
        placeholder="e.g. NEET PG 2026 · Morning"
        aria-label="Batch name"
        className={field}
      />
      <div className="grid grid-cols-2 gap-2">
        {TRACK_LIST.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setExam(t.id)}
            aria-pressed={exam === t.id}
            className={`btn-base h-10 text-sm ${exam === t.id ? "btn-primary" : "btn-ghost"}`}
          >
            {t.name}
          </button>
        ))}
      </div>
      <label className="block text-xs font-semibold">
        Pro for each student who joins
        <select
          value={proDays}
          onChange={(e) => setProDays(Number(e.target.value))}
          className={cn(field, "mt-1")}
        >
          {[0, 30, 90, 180, 365].map((d) => (
            <option key={d} value={d}>
              {d ? `${d} days` : "None"}
            </option>
          ))}
        </select>
        <span className="mt-1 block font-normal text-muted-foreground">
          {institute.verified
            ? "Applied once per student when they join."
            : "Takes effect after your institute is verified."}
        </span>
      </label>
      {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}
      <button type="submit" disabled={busy} className="btn-base btn-primary h-11 w-full text-sm">
        {busy ? "Creating…" : "Create batch"}
      </button>
    </form>
  );
}

function StaffCard({ institute, onChange }: { institute: StaffInstitute; onChange: () => void }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const owner = institute.role === "owner";
  return (
    <section className="card-pop p-5">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        <Icon name="badge" filled className="text-[20px] text-primary" />
        Faculty
      </h2>
      <ul className="mt-3 space-y-1.5">
        {institute.staff.map((s) => (
          <li
            key={s.user_id}
            className="flex items-center gap-2 rounded-xl bg-surface-2/50 px-3 py-2 text-sm"
          >
            <span className="min-w-0 flex-1 truncate">
              {s.name}
              {s.username ? <span className="text-muted-foreground"> @{s.username}</span> : null}
            </span>
            <span className="text-[11px] font-semibold capitalize text-muted-foreground">
              {s.role}
            </span>
            {owner && s.role === "faculty" ? (
              <button
                type="button"
                aria-label={`Remove ${s.name}`}
                onClick={() =>
                  void removeStaff(institute.id, s.user_id)
                    .then(onChange)
                    .catch((e: unknown) => setError(msg(e)))
                }
                className="text-muted-foreground hover:text-destructive"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
      {owner ? (
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            void addStaff(institute.id, username)
              .then(() => {
                setUsername("");
                onChange();
              })
              .catch((err: unknown) => setError(msg(err)));
          }}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username of a colleague"
            aria-label="Faculty username"
            className={cn(field, "py-2")}
          />
          <button type="submit" className="btn-base btn-ghost h-10 shrink-0 px-4 text-sm">
            Add
          </button>
        </form>
      ) : null}
      {error ? <p className="mt-2 text-xs font-semibold text-destructive">{error}</p> : null}
      {owner ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Faculty can see every batch, set assignments and invite students. They need an account
          with a @username.
        </p>
      ) : null}
    </section>
  );
}

function InstituteHome({
  institute,
  onChange,
}: {
  institute: StaffInstitute;
  onChange: () => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight">{institute.name}</h1>
        {institute.verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
            <Icon name="verified" filled className="text-[16px]" />
            Verified partner
          </span>
        ) : (
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            Verification pending
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {institute.city ? `${institute.city} · ` : ""}
        {institute.batches.length} batch{institute.batches.length === 1 ? "" : "es"} ·{" "}
        {institute.batches.reduce((n, b) => n + b.members, 0)} students
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-3">
          {institute.batches.length ? (
            institute.batches.map((b) => (
              <Link
                key={b.id}
                to="/institute"
                search={{ batch: b.id }}
                className="card-pop flex items-center gap-4 p-5 transition-colors hover:ring-2 hover:ring-primary/30"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Icon name="groups" filled className="text-[24px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 font-display text-lg font-bold">
                    {b.name}
                    {!b.active ? (
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        Joining closed
                      </span>
                    ) : null}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {TRACKS[b.exam].name} · {b.members} student{b.members === 1 ? "" : "s"} ·{" "}
                    {b.assignments} assignment{b.assignments === 1 ? "" : "s"} · code{" "}
                    <span className="font-mono">{b.join_code}</span>
                  </span>
                </span>
                <Icon name="chevron_right" className="text-[22px] text-muted-foreground" />
              </Link>
            ))
          ) : (
            <div className="rounded-[1.75rem] border-2 border-dashed border-glass-line p-6 text-sm text-muted-foreground">
              No batches yet. Create one for each class group, then share its code with the
              students.
            </div>
          )}
        </div>
        <div className="space-y-5">
          <NewBatchForm institute={institute} onDone={onChange} />
          <StaffCard institute={institute} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function BatchScreen({
  batchId,
  assignmentId,
}: {
  batchId: string;
  assignmentId?: string | undefined;
}) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const dash = useQuery({
    queryKey: ["batch-dashboard", batchId],
    queryFn: () => fetchBatchDashboard(batchId),
  });
  const results = useQuery({
    queryKey: ["assignment-results", assignmentId],
    queryFn: () => fetchAssignmentResults(assignmentId!),
    enabled: Boolean(assignmentId),
  });
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["batch-dashboard", batchId] });
    void qc.invalidateQueries({ queryKey: ["staff-overview"] });
  };
  const run = (p: Promise<unknown>) => void p.then(refresh).catch((e: unknown) => setError(msg(e)));

  if (dash.isLoading) return <p className="text-sm text-muted-foreground">Loading batch…</p>;
  if (dash.isError || !dash.data)
    return (
      <p className="text-sm text-destructive">
        {dash.error ? msg(dash.error) : "Couldn't load this batch."}
      </p>
    );
  const d = dash.data;

  return (
    <div>
      <Link
        to="/institute"
        className="text-xs font-semibold text-muted-foreground hover:text-primary"
      >
        ← All batches
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight">{d.batch.name}</h1>
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold">
          {TRACKS[d.batch.exam].name}
        </span>
      </div>
      {error ? (
        <p className="mt-3 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <div className="mt-5">
        <BatchDashboardView
          data={d}
          onNewAssignment={() => setCreating(true)}
          onOpenAssignment={(id) =>
            void navigate({ to: "/institute", search: { batch: batchId, assignment: id } })
          }
          onDeleteAssignment={(id) => {
            if (window.confirm("Delete this assignment and its submissions?"))
              run(deleteAssignment(id));
          }}
          onRotateCode={() => {
            if (window.confirm("Make a new code? The old link stops working."))
              run(updateBatch(batchId, null, true));
          }}
          onToggleActive={() => run(updateBatch(batchId, !d.batch.active))}
        />
      </div>

      {creating ? (
        <AssignmentCreator
          batchId={batchId}
          exam={d.batch.exam}
          onClose={() => setCreating(false)}
          onCreated={() => {
            setCreating(false);
            refresh();
          }}
        />
      ) : null}

      {assignmentId ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-background/70 p-3 backdrop-blur-sm sm:items-center"
          onClick={() => void navigate({ to: "/institute", search: { batch: batchId } })}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Assignment results"
            onClick={(e) => e.stopPropagation()}
            className="card-pop max-h-[90vh] w-full max-w-2xl overflow-y-auto !bg-surface p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <h2 className="mr-auto font-display text-xl font-bold">
                {results.data?.title ?? "Results"}
              </h2>
              <Link
                to="/institute"
                search={{ batch: batchId }}
                aria-label="Close"
                className="text-muted-foreground"
              >
                <Icon name="close" className="text-[22px]" />
              </Link>
            </div>
            {results.data ? (
              <AssignmentResultsView r={results.data} />
            ) : results.isError ? (
              <p className="text-sm text-destructive">{msg(results.error)}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Loading…</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InstitutePortal() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const qc = useQueryClient();
  const overview = useQuery({
    queryKey: ["staff-overview"],
    queryFn: fetchStaffOverview,
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (!loading && !user) void navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  const refresh = () => void qc.invalidateQueries({ queryKey: ["staff-overview"] });
  const institute = overview.data?.[0];

  return (
    <div className="relative min-h-screen">
      <Aurora />
      <PortalHeader
        subtitle={institute ? `Institute Portal · ${institute.name}` : "Institute Portal"}
      />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
        {loading || !user || overview.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : overview.data === null ? (
          <p className="text-sm text-destructive">
            The institute portal isn&apos;t available yet. Please try again later.
          </p>
        ) : search.batch ? (
          <BatchScreen batchId={search.batch} assignmentId={search.assignment} />
        ) : institute ? (
          <InstituteHome institute={institute} onChange={refresh} />
        ) : (
          <SetupInstitute onDone={refresh} />
        )}
      </main>
    </div>
  );
}
