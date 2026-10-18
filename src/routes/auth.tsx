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
      { title: "Sign in — NEET UG & NEET PG Prep" },
      {
        name: "description",
        content:
          "Sign in to sync your NEET UG or NEET PG question attempts, accuracy trackers and focus sessions across devices.",
      },
      { property: "og:title", content: "Sign in — Learners Studio Prep" },
      {
        property: "og:description",
        content:
          "Your NEET UG and NEET PG progress, accuracy and focus streak — saved to your account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

/** Plain-language messages for auth failures (never a fake success). */
function friendlyAuthError(e: unknown) {
  const message =
    e instanceof Error ? e.message : String((e as { message?: string })?.message ?? "");
  if (/rate limit|too many|429|for security purposes/i.test(message))
    return "Too many emails were requested. Please wait a few minutes and try again.";
  if (/password should be at least/i.test(message))
    return "Use a password of at least 6 characters.";
  if (/invalid email|unable to validate email/i.test(message))
    return "That email address doesn't look right.";
  if (/sending|smtp|email.*(fail|error)/i.test(message))
    return "We couldn't send the email right now. Please try again in a few minutes, or use Continue with Google.";
  return message || "Something went wrong.";
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  // Address a confirmation email can be re-sent to, and the resend cooldown.
  const [resendTo, setResendTo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

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
    setResendTo(null);
    setShowReset(false);
    const address = resolvedEmail();
    try {
      if (mode === "signup") {
        const username = name.trim();
        const { data, error: err } = await supabase.auth.signUp({
          email: address,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: username },
          },
        });
        if (err) throw err;
        // An existing address comes back as a user with no identities and no email is
        // sent (Supabase hides which addresses are registered). Don't claim one was.
        if (data.user && !data.session && (data.user.identities?.length ?? 0) === 0) {
          setMode("signin");
          setPassword("");
          setError(
            "An account with this email already exists. Sign in instead — if you joined with Google, use Continue with Google.",
          );
          setShowReset(true);
          return;
        }
        if (!data.session) {
          setNotice(
            `We sent a confirmation link to ${address}. Open it, then sign in. Not there? Check Spam and Promotions.`,
          );
          setResendTo(address);
          setCooldown(60);
          return;
        }
        if (data.user && username) {
          await supabase
            .from("profiles")
            .upsert({ id: data.user.id, display_name: username }, { onConflict: "id" });
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: address,
          password,
        });
        if (err) {
          if (/not confirmed/i.test(err.message)) {
            setError("Please confirm your email first. We can send the link again.");
            setResendTo(address);
            return;
          }
          if (/invalid login credentials/i.test(err.message)) {
            setError(
              "Wrong email or password. If you signed up with Google, use Continue with Google — or reset your password to add one.",
            );
            setShowReset(true);
            return;
          }
          throw err;
        }
      }
      await navigate({ to: "/", replace: true });
    } catch (e) {
      setError(friendlyAuthError(e));
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (!resendTo || cooldown > 0) return;
    setError(null);
    const { error: err } = await supabase.auth.resend({
      type: "signup",
      email: resendTo,
      options: { emailRedirectTo: window.location.origin },
    });
    if (err) {
      setError(friendlyAuthError(err));
      return;
    }
    setNotice(`Sent again to ${resendTo}. It can take a minute; check Spam and Promotions too.`);
    setCooldown(60);
  };

  const forgot = async () => {
    setError(null);
    setNotice(null);
    const address = resolvedEmail();
    if (!email.trim()) {
      setError("Enter your email above, then tap Forgot password.");
      return;
    }
    if (address.endsWith("@padida.app")) {
      setError("Username accounts can't receive email. Ask an admin to reset your password.");
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(address, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });
    setBusy(false);
    if (err) {
      setError(friendlyAuthError(err));
      return;
    }
    setShowReset(false);
    setNotice(
      `If an account exists for ${address}, we've sent a link to set a new password. Check Spam and Promotions too.`,
    );
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

            {mode === "signin" ? (
              <button
                type="button"
                onClick={() => void forgot()}
                disabled={busy}
                className={`w-full text-right text-xs transition-colors duration-300 hover:text-primary ${
                  showReset ? "font-semibold text-primary" : "text-muted-foreground"
                }`}
              >
                Forgot password?
              </button>
            ) : null}

            {error && (
              <p role="alert" className="px-5 text-xs text-destructive">
                {error}
              </p>
            )}
            {notice && (
              <p role="status" className="px-5 text-xs text-success">
                {notice}
              </p>
            )}
            {resendTo ? (
              <button
                type="button"
                onClick={() => void resend()}
                disabled={cooldown > 0}
                className="btn-base btn-ghost h-10 w-full text-xs disabled:opacity-60"
              >
                {cooldown > 0 ? `Resend email in ${cooldown}s` : "Resend confirmation email"}
              </button>
            ) : null}

            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setNotice(null);
                setResendTo(null);
                setShowReset(false);
              }}
              className="w-full pt-2 text-center text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {mode === "signin"
                ? "New here? Create an account"
                : "Already have an account? Sign in"}
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
