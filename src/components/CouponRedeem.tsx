import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/Primitives";
import { Mascot } from "@/components/mascot/Mascot";
import { supabase } from "@/integrations/supabase/client";
import { notifyAccessChanged, useAccess } from "@/hooks/useAccess";
import { emitGameEvent } from "@/lib/gamification";
import { cn } from "@/lib/utils";

type RedeemResult = { ok: boolean; error?: string; expires_at?: string; already?: boolean };

/** Coupon code field. A valid promo coupon unlocks Pro for the signed-in user. */
export function CouponRedeem({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const { signedIn, couponUntil } = useAccess();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(!compact);

  if (couponUntil) {
    return (
      <p className={cn("flex items-center gap-2 text-xs font-semibold text-success", className)}>
        <Icon name="confirmation_number" filled className="text-[18px]" />
        Coupon active · Pro unlocked until {new Date(couponUntil).toLocaleDateString()}
      </p>
    );
  }

  if (!signedIn) {
    return (
      <p className={cn("text-xs text-muted-foreground", className)}>
        Have a coupon?{" "}
        <Link to="/auth" className="font-semibold text-primary">
          Sign in to redeem it →
        </Link>
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("text-xs font-semibold text-primary hover:underline", className)}
      >
        Have a coupon code?
      </button>
    );
  }

  const redeem = async () => {
    if (!code.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const { data, error: rpcError } = await supabase.rpc("redeem_coupon", { _code: code });
      if (rpcError) throw new Error("Coupons aren't switched on yet. Try again soon.");
      const r = data as unknown as RedeemResult;
      if (!r.ok) {
        setError(r.error ?? "That coupon code isn't valid.");
        return;
      }
      notifyAccessChanged();
      emitGameEvent({
        type: "celebrate",
        kind: "badge",
        title: "Pro unlocked!",
        subtitle: `Every AI tool is yours until ${new Date(r.expires_at!).toLocaleDateString()}. Let's make it count.`,
        icon: "workspace_premium",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't redeem that code.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void redeem();
      }}
      className={cn("flex flex-col gap-2", className)}
    >
      {!compact ? (
        <div className="flex items-center gap-3">
          <Mascot mood={error ? "sad" : "happy"} size={52} />
          <p className="text-sm font-semibold">Got a coupon? Pop it in and I'll unlock Pro.</p>
        </div>
      ) : null}
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
          }}
          placeholder="COUPON CODE"
          aria-label="Coupon code"
          autoCapitalize="characters"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-full border-2 border-glass-line bg-surface-2 px-4 py-2 font-mono text-sm uppercase tracking-wider outline-none transition-colors focus:border-primary"
        />
        <button
          type="submit"
          disabled={busy || !code.trim()}
          className="btn-base btn-primary h-10 px-4 text-sm"
        >
          {busy ? "Checking…" : "Redeem"}
        </button>
      </div>
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="animate-nag text-xs font-semibold text-destructive"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
