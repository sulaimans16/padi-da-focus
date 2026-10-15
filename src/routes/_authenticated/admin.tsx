import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useAccess } from "@/hooks/useAccess";
import { InstitutesPanel } from "@/components/admin/InstitutesPanel";
import { EngagementPanel } from "@/components/admin/EngagementPanel";
import { grantPlan, listMembers, revokePlan } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Admin console — PG Prep" },
      {
        name: "description",
        content: "PG Prep admin console: activate Pro plans, review members and manage AI access.",
      },
      { property: "og:title", content: "Admin console — PG Prep" },
      { property: "og:description", content: "Activate Pro plans and manage members." },
    ],
  }),
  component: AdminConsole,
});

type Member = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin: boolean;
  isPro: boolean;
  subscription: {
    id: string;
    plan: string;
    status: string;
    amount_inr: number;
    current_period_end: string;
  } | null;
};

function AdminConsole() {
  const { loading, isAdmin } = useAccess();
  const load = useServerFn(listMembers);
  const grant = useServerFn(grantPlan);
  const revoke = useServerFn(revokePlan);

  const [members, setMembers] = useState<Member[]>([]);
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"quarterly" | "yearly">("quarterly");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const res = await load({ data: undefined });
      setMembers(res.members as Member[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load members.");
    }
  }, [load]);

  useEffect(() => {
    if (!loading && isAdmin) void refresh();
  }, [loading, isAdmin, refresh]);

  if (loading)
    return <div className="px-4 py-8 text-sm text-muted-foreground">Checking access…</div>;

  if (!isAdmin) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-10">
        <h1 className="text-2xl font-extrabold">Admins only</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This console is restricted. Head back to your dashboard.
        </p>
        <Link to="/" className="btn-base btn-primary mt-4 h-9 px-3 text-xs">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const activate = async () => {
    setBusy(true);
    setMsg("");
    setError("");
    try {
      const res = await grant({ data: { email: email.trim(), plan } });
      setMsg(`Pro activated until ${new Date(res.until).toLocaleDateString()}.`);
      setEmail("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Activation failed.");
    } finally {
      setBusy(false);
    }
  };

  const cancel = async (subscriptionId: string) => {
    setBusy(true);
    setError("");
    try {
      await revoke({ data: { subscriptionId } });
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not cancel.");
    } finally {
      setBusy(false);
    }
  };

  const proCount = members.filter((m) => m.isPro).length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <p className="label-eyebrow">Admin console</p>
      <h1 className="text-3xl font-extrabold tracking-tight">Engagement, members & access</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {members.length} accounts · {proCount} with Pro access
      </p>

      <EngagementPanel />

      <InstitutesPanel />

      <section className="card-surface mt-5 p-4">
        <p className="text-sm font-bold">Activate a plan</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="member@example.com"
            className="min-w-56 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as "quarterly" | "yearly")}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="quarterly">3 months · ₹50</option>
            <option value="yearly">1 year · ₹100</option>
          </select>
          <button
            type="button"
            onClick={() => void activate()}
            disabled={busy || !email.includes("@")}
            className="btn-base btn-primary h-10 px-4 text-sm disabled:opacity-50"
          >
            {busy ? "Working…" : "Activate Pro"}
          </button>
        </div>
        {msg ? <p className="mt-2 text-xs font-semibold text-success">{msg}</p> : null}
        {error ? <p className="mt-2 text-xs font-semibold text-destructive">{error}</p> : null}
      </section>

      <section className="card-surface mt-5 overflow-x-auto p-0">
        <table className="w-full min-w-[42rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Access</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Until</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3">
                  <p className="font-semibold">{m.name || "—"}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </td>
                <td className="px-4 py-3 text-xs font-bold">
                  {m.isAdmin ? (
                    <span className="text-primary">Admin</span>
                  ) : m.isPro ? (
                    <span className="text-success">Pro</span>
                  ) : (
                    <span className="text-muted-foreground">Free</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">
                  {m.subscription
                    ? `${m.subscription.plan === "yearly" ? "1 year" : "3 months"} · ₹${m.subscription.amount_inr} · ${m.subscription.status}`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-xs">
                  {m.subscription
                    ? new Date(m.subscription.current_period_end).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  {m.subscription && m.subscription.status === "active" ? (
                    <button
                      type="button"
                      onClick={() => void cancel(m.subscription!.id)}
                      disabled={busy}
                      className="btn-base btn-ghost h-8 px-2 text-xs"
                    >
                      Cancel
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
