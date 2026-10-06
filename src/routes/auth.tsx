import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Aurora } from "@/components/Aurora";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Primitives";

/** Borderless, pill-shaped input — no boxed field outlines. */
const field =
  "h-12 w-full rounded-full bg-white/5 px-5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none ring-1 ring-inset ring-glass-line transition-all duration-300 focus:bg-white/10 focus:ring-primary/50";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Sign in — PG Prep NEET PG Tracker" },
      {
        name: "description",
        content:
          "Sign in to PG Prep to sync your NEET PG question attempts, accuracy trackers and focus sessions across devices.",
      },
      { property: "og:title", content: "Sign in — PG Prep" },
      {
        property: "og:description",
        content: "Your NEET PG progress, accuracy and focus streak — saved to your account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      if (data.session) void navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  // Admins and members can sign in with a bare username; it maps to the
  // account email under the app domain.
  const resolvedEmail = () => {
    const value = email.trim().toLowerCase();
    return value.includes("@") ? value : `${value}@padida.app`;
  };

  const submit = async () => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signup") {
        const username = name.trim();
        const { data, error: err } = await supabase.auth.signUp({
          email: resolvedEmail(),
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

        const { error: err } = await supabase.auth.signInWithPassword({
          email: resolvedEmail(),
          password,
        });
        if (err) throw err;
      }
      await navigate({ to: "/", replace: true });
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
    await navigate({ to: "/", replace: true });
  };

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Aurora intensity="full" />

      <main className="relative z-10 flex min-h-dvh flex-col px-6 pb-10 pt-10 sm:pt-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            ← Dashboard
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-6 flex items-center gap-3">
              <BrandMark className="h-14 w-14" />
              <h1 className="text-5xl font-bold tracking-tight">
                PG <span className="text-primary">Prep</span>
              </h1>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sign in so your attempts, accuracy and focus streak follow you everywhere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 space-y-4"
          >
            <button onClick={google} className="btn-base btn-ghost h-12 w-full text-sm">
              <Icon name="login" className="text-[18px]" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="fade-rule flex-1" /> or email <span className="fade-rule flex-1" />
            </div>

            {mode === "signup" && (
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username, e.g. Rahul"
                  maxLength={40}
                  className={field}
                />
                <p className="mt-1.5 px-5 text-[11px] text-muted-foreground">
                  We&apos;ll greet you as Dr. {name.trim() || "…"}
                </p>
              </div>
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              autoComplete="username"
              placeholder="you@example.com or username"
              className={field}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder="Password"
              className={field}
            />
            <button
              onClick={submit}
              disabled={
                busy || !email.trim() || password.length < 6 || (mode === "signup" && !name.trim())
              }
              className="btn-base btn-primary h-12 w-full text-sm disabled:opacity-50"
            >
              {busy ? "Working…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>

            {error && <p className="px-5 text-xs text-destructive">{error}</p>}
            {notice && <p className="px-5 text-xs text-success">{notice}</p>}

            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="w-full pt-2 text-center text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
            </button>

            <button
              onClick={() => void navigate({ to: "/", replace: true })}
              className="w-full text-center text-xs text-muted-foreground/80 transition-colors duration-300 hover:text-foreground"
            >
              Continue as guest →
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
