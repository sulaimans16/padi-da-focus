import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — PadiDa NEET PG Tracker" },
      {
        name: "description",
        content:
          "Sign in to PadiDa to sync your NEET PG question attempts, accuracy trackers and focus sessions across devices.",
      },
      { property: "og:title", content: "Sign in — PadiDa" },
      {
        property: "og:description",
        content: "Your NEET PG progress, accuracy and focus streak — saved to your account.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/tracker", replace: true });
    });
  }, [navigate]);

  const submit = async () => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const username = name.trim();
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: username },
          },
        });
        if (err) throw err;
        if (!data.session) {
          setNotice("Check your email to confirm the account, then sign in.");
          return;
        }
        if (data.user && username) {
          await supabase
            .from("profiles")
            .upsert({ id: data.user.id, display_name: username }, { onConflict: "id" });
        }
      } else {

        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
      await navigate({ to: "/tracker", replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Try email instead.");
      return;
    }
    if (result.redirected) return;
    await navigate({ to: "/tracker", replace: true });
  };

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-10">
      <Link to="/" className="text-xs text-muted-foreground underline underline-offset-4">
        ← Dashboard
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Padi<span className="text-primary">Da</span>
      </h1>
      <p className="text-sm text-muted-foreground">
        Sign in so your attempts, accuracy and focus streak follow you everywhere.
      </p>

      <div className="card-surface mt-5 space-y-3 p-4">
        <button onClick={google} className="btn-base btn-ghost w-full text-sm">
          Continue with Google
        </button>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or email <span className="h-px flex-1 bg-border" />
        </div>

        {mode === "signup" && (
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username, e.g. Rahul"
              maxLength={40}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              We&apos;ll greet you as Dr. {name.trim() || "…"}
            </p>
          </div>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder="Password"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <button
          onClick={submit}
          disabled={busy || !email || password.length < 6}
          className="btn-base btn-primary w-full text-sm disabled:opacity-50"
        >
          {busy ? "Working…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>

        {error && <p className="text-xs text-destructive">{error}</p>}
        {notice && <p className="text-xs text-success">{notice}</p>}

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full text-center text-xs text-muted-foreground underline underline-offset-4"
        >
          {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </main>
  );
}
