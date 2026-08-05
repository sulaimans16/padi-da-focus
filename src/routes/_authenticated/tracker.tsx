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
  head: () => ({
    meta: [
      { title: "My Tracker — PadiDa NEET PG Progress" },
      {
        name: "description",
        content:
          "Your personal NEET PG tracker: accuracy per subject, weakest topics, questions attempted today and total focus-lock minutes.",
      },
      { property: "og:title", content: "My Tracker — PadiDa" },
      {
        property: "og:description",
        content: "Subject-wise accuracy, weak areas and focus streak for your NEET PG prep.",
      },
    ],
  }),
  component: Tracker,
});

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
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xs text-muted-foreground underline underline-offset-4">
          ← Dashboard
        </Link>
        <button
          onClick={signOut}
          className="text-xs text-muted-foreground underline underline-offset-4"
        >
          Sign out
        </button>
      </div>

      <h1 className="mt-2 text-3xl font-bold tracking-tight">My Tracker</h1>
      <p className="text-sm text-muted-foreground">
        {displayName || user?.email} · everything below is saved to your account.
      </p>

      <section className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Attempted", rows.length],
          ["Accuracy", `${accuracy}%`],
          ["Today", todayRows.length],
          ["Streak", `${streakDays(rows)}d`],
        ].map(([label, value]) => (
          <div key={String(label)} className="card-surface p-3">
            <p className="font-mono text-2xl font-bold tabular-nums text-primary">{value}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="card-surface mt-3 flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-semibold">Focus lock</p>
          <p className="text-[11px] text-muted-foreground">
            {(sessions.data ?? []).length} sessions · {minutes} min locked in
          </p>
        </div>
        <Link to="/focus" className="btn-base btn-primary text-xs">
          Lock in 🔒
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
          Weakest first · subject accuracy
        </h2>
        {attempts.isLoading && (
          <p className="mt-2 text-sm text-muted-foreground">Loading your history…</p>
        )}
        {!attempts.isLoading && stats.length === 0 && (
          <p className="card-surface mt-2 p-5 text-center text-sm text-muted-foreground">
            No attempts yet. Answer a few questions in the{" "}
            <Link to="/bank" className="text-primary underline underline-offset-4">
              Question Bank
            </Link>{" "}
            and this fills up.
          </p>
        )}
        <ul className="mt-2 space-y-1.5">
          {stats.map((s) => (
            <li key={s.subject} className="card-surface p-3">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold" style={{ color: subjectColor(s.subject) }}>
                  {s.subject}
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {s.correct}/{s.attempts} · {Math.round(s.accuracy * 100)}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(3, s.accuracy * 100)}%`,
                    backgroundColor: subjectColor(s.subject),
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-[11px] text-muted-foreground">
        {(bookmarks.data ?? []).length} questions bookmarked for revision.
      </p>
    </main>
  );
}
