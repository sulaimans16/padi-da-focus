import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { subjectColor } from "@/lib/questions";
import {
  fetchAttempts,
  fetchBookmarkIds,
  fetchFocusSessions,
  streakDays,
  subjectStats,
} from "@/lib/tracker";

export const Route = createFileRoute("/_authenticated/tracker")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "My Tracker — PG Prep NEET PG Progress" },
      {
        name: "description",
        content:
          "Your personal NEET PG tracker: accuracy per subject, weakest topics, questions attempted today and total focus-lock minutes.",
      },
      { property: "og:title", content: "My Tracker — PG Prep" },
      {
        property: "og:description",
        content: "Subject-wise accuracy, weak areas and focus streak for your NEET PG prep.",
      },
    ],
  }),
  component: Tracker,
});

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function Kpi({
  label,
  icon,
  value,
  sub,
}: {
  label: string;
  icon: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="card-head">
        <span className="label-eyebrow">{label}</span>
        <Icon name={icon} className="text-[20px] text-primary" />
      </div>
      <div className="p-5">
        <p className="font-mono text-3xl font-bold tabular-nums">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function band(accuracy: number) {
  if (accuracy >= 0.75) return { label: "Strong", cls: "text-success" };
  if (accuracy >= 0.6) return { label: "Average", cls: "text-muted-foreground" };
  return { label: "Review", cls: "text-destructive" };
}

function Tracker() {
  const { displayName, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const attempts = useQuery({ queryKey: ["attempts"], queryFn: fetchAttempts });
  const sessions = useQuery({ queryKey: ["focus-sessions"], queryFn: fetchFocusSessions });
  const bookmarks = useQuery({ queryKey: ["bookmarks"], queryFn: fetchBookmarkIds });

  const rows = attempts.data ?? [];
  const today = new Date().toDateString();
  const todayRows = rows.filter((r) => new Date(r.created_at).toDateString() === today);
  const correct = rows.filter((r) => r.correct).length;
  const accuracy = rows.length ? Math.round((correct / rows.length) * 100) : 0;
  const stats = subjectStats(rows);
  const minutes = (sessions.data ?? []).reduce((a, s) => a + s.minutes, 0);

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-eyebrow">Performance dashboard</p>
          <h1 className="text-3xl sm:text-4xl">Analytics Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {displayName || user?.email} · everything below is saved to your account.
          </p>
        </div>
        <button onClick={signOut} className="btn-base btn-ghost text-xs">
          <Icon name="logout" className="text-[16px]" />
          Sign out
        </button>
      </div>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Attempted" icon="task_alt" value={rows.length} sub="Questions answered overall" />
        <Kpi label="Overall accuracy" icon="target" value={`${accuracy}%`} sub="Target benchmark: 72%" />
        <Kpi label="Today" icon="today" value={todayRows.length} sub="Questions attempted today" />
        <Kpi label="Streak" icon="local_fire_department" value={`${streakDays(rows)}d`} sub="Consecutive study days" />
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <section className="card-surface overflow-hidden lg:col-span-7">
          <div className="card-head">
            <span className="label-eyebrow">Subject performance · weakest first</span>
            <Link to="/weak-spots" className="text-xs font-bold text-primary">
              Weak spots →
            </Link>
          </div>
          {attempts.isLoading && (
            <p className="p-5 text-sm text-muted-foreground">Loading your history…</p>
          )}
          {!attempts.isLoading && stats.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No attempts yet. Answer a few questions in the{" "}
              <Link to="/bank" className="font-bold text-primary">
                Question Bank
              </Link>{" "}
              and this fills up.
            </p>
          )}
          {stats.length > 0 && (
            <table className="w-full text-left">
              <tbody>
                {stats.map((s) => {
                  const b = band(s.accuracy);
                  return (
                    <tr key={s.subject} className="border-b border-border/60 last:border-0">
                      <td className="px-5 py-4 text-sm font-bold">{s.subject}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.max(3, s.accuracy * 100)}%`,
                                backgroundColor: subjectColor(s.subject),
                              }}
                            />
                          </div>
                          <span className="w-20 text-right font-mono text-xs tabular-nums text-muted-foreground">
                            {s.correct}/{s.attempts}
                          </span>
                          <span className="w-10 text-right font-mono text-xs font-bold tabular-nums">
                            {Math.round(s.accuracy * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className={`chip ${b.cls}`}>{b.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        <section className="card-surface overflow-hidden lg:col-span-5">
          <div className="card-head">
            <span className="label-eyebrow">Discipline</span>
            <Icon name="lock_clock" className="text-[20px] text-primary" />
          </div>
          <div className="space-y-4 p-5">
            <div>
              <p className="font-mono text-3xl font-bold tabular-nums">{minutes} min</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {(sessions.data ?? []).length} focus-lock sessions recorded
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-4">
              <p className="text-sm font-bold">{(bookmarks.data ?? []).length} bookmarked</p>
              <p className="text-xs text-muted-foreground">Questions saved for revision.</p>
            </div>
            <Link to="/focus" className="btn-base btn-primary w-full text-sm">
              <Icon name="lock" className="text-[18px]" />
              Lock in now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
