import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Aurora } from "@/components/Aurora";
import { BrandMark } from "@/components/BrandMark";

const field =
  "h-12 w-full rounded-full bg-white/5 px-5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none ring-1 ring-inset ring-glass-line transition-all duration-300 focus:bg-white/10 focus:ring-primary/50";

export const Route = createFileRoute("/auth_/reset")({
  staticData: { sitemap: false },
  ssr: false,
  head: () => ({ meta: [{ title: "Set a new password — Learners Studio" }] }),
  component: ResetPassword,
});

/**
 * Landing page for the "Forgot password?" email. The link signs the user in
 * with a short-lived recovery session; here they choose a new password.
 * Also how a Google-only account adds a password.
 */
function ResetPassword() {
  const navigate = useNavigate();
  const [ready, setReady] = useState<"checking" | "ok" | "expired">("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setReady("ok");
    });
    // The client exchanges the link's token on load; give it a moment.
    const t = window.setTimeout(() => {
      void supabase.auth.getSession().then(({ data }) => {
        setReady((r) => (r === "ok" || data.session ? "ok" : "expired"));
      });
    }, 1200);
    return () => {
      sub.subscription.unsubscribe();
      window.clearTimeout(t);
    };
  }, []);

  const save = async () => {
    setError(null);
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (err) return setError(err.message);
    setDone(true);
    window.setTimeout(() => void navigate({ to: "/", replace: true }), 1500);
  };

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Aurora intensity="full" />
      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-sm flex-col px-6 pb-10 pt-10 sm:pt-16">
        <div className="flex items-center gap-3">
          <BrandMark className="h-12 w-12" />
          <h1 className="text-3xl font-bold tracking-tight">New password</h1>
        </div>

        {ready === "checking" ? (
          <p className="mt-8 text-sm text-muted-foreground">Checking your link…</p>
        ) : ready === "expired" ? (
          <div className="mt-8 space-y-4">
            <p role="alert" className="text-sm text-destructive">
              This reset link has expired or was already used.
            </p>
            <Link to="/auth" className="btn-base btn-primary h-12 w-full text-sm">
              Back to sign in · request a new link
            </Link>
          </div>
        ) : done ? (
          <p role="status" className="mt-8 text-sm text-success">
            Password updated. Taking you to your dashboard…
          </p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
          >
            <p className="text-sm text-muted-foreground">
              Choose a new password. You can keep using Continue with Google as well.
            </p>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (8+ characters)"
              aria-label="New password"
              className={field}
            />
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat new password"
              aria-label="Repeat new password"
              className={field}
            />
            {error ? (
              <p role="alert" className="px-5 text-xs text-destructive">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={busy || !password || !confirm}
              className="btn-base btn-primary h-12 w-full text-sm disabled:opacity-50"
            >
              {busy ? "Saving…" : "Save password"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
