import { createFileRoute, Link } from "@tanstack/react-router";
import { useAccess } from "@/hooks/useAccess";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "PadiDa Pro — ₹50 for 3 months, ₹100 a year" },
      {
        name: "description",
        content:
          "Unlock PadiDa Pro AI tools: the doubt solver, AI question generation and the PYQ vault builder. ₹50 for 3 months or ₹100 for a full year.",
      },
      { property: "og:title", content: "PadiDa Pro pricing" },
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
    name: "3 months",
    price: "₹50",
    per: "≈ ₹17 / month",
    blurb: "Perfect for a focused revision block.",
  },
  {
    id: "yearly",
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
  "Focus Lock with camera gaze watch",
  "Analytics, bookmarks and personal countdown",
];

function Pricing() {
  const { isPro, isAdmin, subscription, signedIn } = useAccess();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold tracking-tight">PadiDa Pro</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        Everything you study stays free. The AI tools — doubt solving and question generation —
        cost real money to run, so they sit behind a small subscription.
      </p>

      {isPro ? (
        <div className="card-surface mt-5 p-4">
          <p className="text-sm font-bold text-success">
            {isAdmin ? "Admin access — all Pro tools unlocked." : "You're on PadiDa Pro."}
          </p>
          {subscription ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {subscription.plan === "yearly" ? "Yearly plan" : "3-month plan"} · active until{" "}
              {new Date(subscription.current_period_end).toLocaleDateString()}
            </p>
          ) : null}
        </div>
      ) : null}

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
            {signedIn ? (
              <a
                href="mailto:sulaiman@padida.app?subject=PadiDa%20Pro%20activation"
                className={`btn-base mt-4 h-10 w-full justify-center text-sm ${plan.featured ? "btn-primary" : "btn-ghost"}`}
              >
                Get {plan.name}
              </a>
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

      <p className="mt-3 text-xs text-muted-foreground">
        Payments are handled manually for now: pay ₹50 or ₹100 over UPI, message us with the
        account email, and Pro is switched on the same day. Automated checkout is coming next.
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
                <span aria-hidden className="material-symbols-outlined text-[18px] text-muted-foreground">
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
