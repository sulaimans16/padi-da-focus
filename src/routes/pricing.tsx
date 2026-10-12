import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAccess } from "@/hooks/useAccess";
import { CouponRedeem } from "@/components/CouponRedeem";
import { useAuth } from "@/hooks/useAuth";
import { usePaddleCheckout } from "@/hooks/usePaddleCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

export const Route = createFileRoute("/pricing")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "PG Prep Pro — ₹50 for 3 months, ₹100 a year" },
      {
        name: "description",
        content:
          "Unlock Pro AI tools for NEET UG and NEET PG: the doubt solver, AI question generation and the PYQ vault builder. ₹50 for 3 months or ₹100 for a full year.",
      },
      { property: "og:title", content: "PG Prep Pro pricing" },
      {
        property: "og:description",
        content: "AI doubt solver, AI question generation and PYQ vault builder from ₹50.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    id: "quarterly",
    priceId: "padida_pro_quarterly",
    name: "3 months",
    price: "₹50",
    per: "≈ ₹17 / month",
    blurb: "Perfect for a focused revision block.",
  },
  {
    id: "yearly",
    priceId: "padida_pro_yearly",
    name: "1 year",
    price: "₹100",
    per: "≈ ₹8 / month",
    blurb: "Best value — covers the whole prep cycle.",
    featured: true,
  },
];

const PRO_FEATURES = [
  "Video modules — curated lecture videos for every subject",
  "AI doubt solver (the floating brain button)",
  "AI question generation in every subject",
  "PYQ vault builder with web-researched vignettes",
  "Bulk “Fill the Bank” runs",
  "Every AI tool we add later",
];

const FREE_FEATURES = [
  "Full Learn modules and concept notes",
  "Every question already in the bank and PYQ vault",
  "Focus Lock with tab-switch guard",
  "Analytics, bookmarks and personal countdown",
];

function Pricing() {
  const { isPro, isAdmin, subscription, couponUntil, signedIn, refresh } = useAccess();
  const { user } = useAuth();
  const { openCheckout, loadingPrice, error } = usePaddleCheckout();

  // Coming back from a completed checkout: poll briefly so the new plan shows
  // up as soon as the payment is recorded.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!new URLSearchParams(window.location.search).has("checkout")) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      void refresh();
      if (tries >= 6) window.clearInterval(timer);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [refresh]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <PaymentTestModeBanner />
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">PG Prep Pro</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Everything you study stays free. The AI tools — doubt solving and question generation — cost
        real money to run, so they sit behind a small subscription.
      </p>

      {isPro ? (
        <div className="card-surface mt-5 p-4">
          <p className="text-sm font-bold text-success">
            {isAdmin
              ? "Admin access — all Pro tools unlocked."
              : !subscription && couponUntil
                ? "Coupon applied — all Pro tools unlocked."
                : "You're on PG Prep Pro."}
          </p>
          {subscription ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {subscription.plan === "yearly" ? "Yearly plan" : "3-month plan"} · active until{" "}
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          ) : !isAdmin && couponUntil ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Coupon access until {new Date(couponUntil).toLocaleDateString()}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="card-pop mt-5 p-5">
          <CouponRedeem />
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {PLANS.map((plan) => (
          <section
            key={plan.id}
            className={`card-surface p-5 ${plan.featured ? "border-primary" : ""}`}
          >
            <p className="label-eyebrow">{plan.featured ? "Most popular" : "Starter"}</p>
            <h2 className="mt-1 text-xl font-extrabold">{plan.name}</h2>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">{plan.price}</p>
            <p className="text-xs text-muted-foreground">{plan.per}</p>
            <p className="mt-3 text-sm">{plan.blurb}</p>
            {signedIn && user ? (
              <button
                type="button"
                disabled={loadingPrice !== null}
                onClick={() =>
                  void openCheckout({
                    priceId: plan.priceId,
                    userId: user.id,
                    customerEmail: user.email ?? undefined,
                  })
                }
                className={`btn-base mt-4 h-10 w-full justify-center text-sm ${plan.featured ? "btn-primary" : "btn-ghost"}`}
              >
                {loadingPrice === plan.priceId ? "Opening checkout…" : `Get ${plan.name}`}
              </button>
            ) : (
              <Link
                to="/auth"
                className={`btn-base mt-4 h-10 w-full justify-center text-sm ${plan.featured ? "btn-primary" : "btn-ghost"}`}
              >
                Sign in to upgrade
              </Link>
            )}
          </section>
        ))}
      </div>

      {error ? <p className="mt-3 text-xs font-semibold text-destructive">{error}</p> : null}

      <p className="mt-3 text-xs text-muted-foreground">
        Secure card and wallet checkout — Pro switches on automatically the moment your payment goes
        through. One-time payment, no auto-renewal.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="card-surface p-5">
          <p className="label-eyebrow">In Pro</p>
          <ul className="mt-2 space-y-2 text-sm">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden className="material-symbols-outlined text-[18px] text-primary">
                  check_circle
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section className="card-surface p-5">
          <p className="label-eyebrow">Always free</p>
          <ul className="mt-2 space-y-2 text-sm">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex gap-2">
                <span
                  aria-hidden
                  className="material-symbols-outlined text-[18px] text-muted-foreground"
                >
                  check
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
