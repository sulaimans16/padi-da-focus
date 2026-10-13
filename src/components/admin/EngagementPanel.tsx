import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Day = {
  day: string;
  active: number;
  active_pg: number;
  active_ug: number;
  signups: number;
  attempts: number;
};
type Engagement = {
  days: number;
  series: Day[];
  totals: {
    users: number;
    dau: number;
    wau: number;
    mau: number;
    signups: number;
    pro: number;
    referrals_invited: number;
    referrals_qualified: number;
    onboarded: number;
  };
  retention: { d1: number | null; d7: number | null; d30: number | null; cohort: number };
  contexts: { context: string; attempts: number }[];
};

const CONTEXT_LABEL: Record<string, string> = {
  question_bank: "QBank",
  pyq: "PYQ Vault",
  mock_test: "Mock tests",
  daily_challenge: "Daily",
  mistake_review: "Fix mistakes",
  smart_practice: "Smart Practice",
  speed_round: "Speed rounds",
  image_practice: "Image Qs",
  friend_challenge: "Challenges",
};

async function fetchEngagement(days: number): Promise<Engagement> {
  const { data, error } = await supabase.rpc("admin_engagement", { _days: days });
  if (error) throw new Error(error.message);
  return data as unknown as Engagement;
}

const fmtDay = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString(undefined, { day: "numeric", month: "short" });

const pct = (v: number | null) => (v == null ? "—" : `${v}%`);

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-glass-line)",
  borderRadius: 12,
  color: "var(--color-foreground)",
  fontSize: 12,
};

/** Admin-only engagement report: activity, signups, retention, referrals, feature mix. */
export function EngagementPanel() {
  const [days, setDays] = useState(30);
  const [track, setTrack] = useState<"all" | "pg" | "ug">("all");
  const q = useQuery({
    queryKey: ["admin-engagement", days],
    queryFn: () => fetchEngagement(days),
  });
  const e = q.data;

  const tiles = e
    ? [
        {
          label: "Learners",
          value: e.totals.users.toLocaleString(),
          note: `${e.totals.signups} new in ${e.days}d`,
        },
        {
          label: "Active today",
          value: e.totals.dau,
          note: `WAU ${e.totals.wau} · MAU ${e.totals.mau}`,
        },
        {
          label: "Pro access",
          value: e.totals.pro,
          note: `${e.totals.users ? Math.round((100 * e.totals.pro) / e.totals.users) : 0}% of learners`,
        },
        {
          label: "Retention D1 / D7",
          value: `${pct(e.retention.d1)} / ${pct(e.retention.d7)}`,
          note: `D30 ${pct(e.retention.d30)} · cohort ${e.retention.cohort}`,
        },
        {
          label: "Referrals",
          value: `${e.totals.referrals_qualified}/${e.totals.referrals_invited}`,
          note: "qualified / joined",
        },
        {
          label: "Onboarded",
          value: e.totals.onboarded,
          note: `of ${e.totals.signups} new sign-ups`,
        },
      ]
    : [];

  const activeKey = track === "pg" ? "active_pg" : track === "ug" ? "active_ug" : "active";
  const contexts = (e?.contexts ?? []).map((c) => ({
    ...c,
    label: CONTEXT_LABEL[c.context] ?? c.context,
  }));

  return (
    <section className="card-surface mt-5 p-4" aria-label="Engagement">
      <div className="flex flex-wrap items-center gap-2">
        <p className="mr-auto text-sm font-bold">Engagement</p>
        {(["all", "pg", "ug"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTrack(t)}
            aria-pressed={track === t}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold",
              track === t
                ? "border-primary bg-primary/15 text-primary"
                : "border-glass-line text-muted-foreground",
            )}
          >
            {t === "all" ? "All tracks" : t === "pg" ? "NEET PG" : "NEET UG"}
          </button>
        ))}
        <select
          value={days}
          onChange={(ev) => setDays(Number(ev.target.value))}
          aria-label="Date range"
          className="rounded-full border border-glass-line bg-transparent px-3 py-1 text-xs"
        >
          {[14, 30, 90].map((d) => (
            <option key={d} value={d}>
              Last {d} days
            </option>
          ))}
        </select>
      </div>

      {q.isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Crunching numbers…</p>
      ) : q.error || !e ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Engagement metrics switch on once migration 0018 is applied.
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-2xl border border-glass-line p-3">
                <p className="label-eyebrow">{t.label}</p>
                <p className="mt-1 font-display text-2xl font-bold tabular-nums">{t.value}</p>
                <p className="text-[11px] text-muted-foreground">{t.note}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs font-semibold text-muted-foreground">
            Daily active learners and sign-ups
          </p>
          <div className="mt-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={e.series} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid
                  stroke="var(--color-glass-line)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tickFormatter={fmtDay}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={(l) => fmtDay(String(l))} />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  formatter={(v: string) => (
                    <span style={{ color: "var(--color-foreground)" }}>{v}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey={activeKey}
                  name="Active learners"
                  stroke="var(--chart-series-1)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="signups"
                  name="Sign-ups"
                  stroke="var(--chart-series-2)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-6 text-xs font-semibold text-muted-foreground">
            Answers by feature · last {e.days} days
          </p>
          {contexts.length ? (
            <div className="mt-2 w-full" style={{ height: Math.max(120, contexts.length * 34) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contexts}
                  layout="vertical"
                  margin={{ top: 0, right: 24, left: 8, bottom: 0 }}
                >
                  <XAxis type="number" allowDecimals={false} hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={110}
                    tick={{ fontSize: 12, fill: "var(--color-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: "var(--color-glass-line)" }}
                  />
                  <Bar
                    dataKey="attempts"
                    name="Answers"
                    fill="var(--chart-series-1)"
                    radius={[0, 4, 4, 0]}
                    barSize={18}
                    label={{
                      position: "right",
                      fontSize: 11,
                      fill: "var(--color-muted-foreground)",
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">No answers in this period yet.</p>
          )}
        </>
      )}
    </section>
  );
}
