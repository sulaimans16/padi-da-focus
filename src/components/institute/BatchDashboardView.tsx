import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Icon } from "@/components/Primitives";
import {
  joinUrl,
  pct,
  relativeDay,
  type AssignmentResults,
  type BatchDashboard,
  type DashboardStudent,
} from "@/lib/institute";
import { TRACKS } from "@/lib/tracks";
import { cn } from "@/lib/utils";

/**
 * One batch for faculty: students, weak topics, activity, assignments and the
 * invite. Pure presentation — the portal passes live data and actions, the
 * demo passes sample data and no actions.
 */

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-glass-line)",
  borderRadius: 12,
  color: "var(--color-foreground)",
  fontSize: 12,
};

const fmtDay = (d: string) =>
  new Date(`${d.slice(0, 10)}T00:00:00Z`).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

type Tab = "students" | "topics" | "activity" | "assignments" | "invite";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "students", label: "Students", icon: "groups" },
  { id: "topics", label: "Weak topics", icon: "crisis_alert" },
  { id: "activity", label: "Activity", icon: "monitoring" },
  { id: "assignments", label: "Assignments", icon: "assignment" },
  { id: "invite", label: "Invite", icon: "person_add" },
];

/** Flags faculty should act on. */
function flagsFor(s: DashboardStudent) {
  const flags: { label: string; tone: "warn" | "bad" }[] = [];
  const idle = !s.last_active || Date.now() - Date.parse(s.last_active) > 7 * 86_400_000;
  if (idle) flags.push({ label: "Inactive 7d+", tone: "bad" });
  if (s.accuracy30 != null && s.q30 >= 20 && s.accuracy30 < 0.5)
    flags.push({ label: "Low accuracy", tone: "warn" });
  return flags;
}

type SortKey = "name" | "q7" | "accuracy30" | "streak" | "week_xp" | "last_active";

function StudentsTable({ data }: { data: BatchDashboard }) {
  const [sort, setSort] = useState<SortKey>("q7");
  const [asc, setAsc] = useState(false);
  const rows = useMemo(() => {
    const val = (s: DashboardStudent): number | string => {
      if (sort === "name") return s.name.toLowerCase();
      if (sort === "last_active") return s.last_active ? Date.parse(s.last_active) : 0;
      return (s[sort] as number | null) ?? -1;
    };
    return [...data.students].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      const c = x < y ? -1 : x > y ? 1 : 0;
      return asc ? c : -c;
    });
  }, [data.students, sort, asc]);

  const th = (key: SortKey, label: string, className = "") => (
    <th scope="col" className={cn("px-3 py-2 font-semibold", className)}>
      <button
        type="button"
        onClick={() => {
          if (sort === key) setAsc((v) => !v);
          else {
            setSort(key);
            setAsc(key === "name");
          }
        }}
        className={cn(
          "inline-flex items-center gap-0.5 hover:text-foreground",
          sort === key && "text-primary",
        )}
      >
        {label}
        {sort === key ? (
          <Icon name={asc ? "arrow_upward" : "arrow_downward"} className="text-[14px]" />
        ) : null}
      </button>
    </th>
  );

  if (!data.students.length)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No students yet. Share the invite link from the Invite tab.
      </p>
    );

  const flagged = data.students.filter((s) => flagsFor(s).length).length;

  return (
    <>
      {flagged ? (
        <p className="mb-3 flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
          <Icon name="flag" filled className="text-[16px]" />
          {flagged} student{flagged > 1 ? "s need" : " needs"} attention: inactive for a week or
          below 50% accuracy.
        </p>
      ) : null}
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="text-xs text-muted-foreground">
            <tr>
              {th("name", "Student")}
              {th("last_active", "Last active")}
              {th("q7", "Qs 7d", "text-right")}
              {th("accuracy30", "Accuracy 30d", "text-right")}
              {th("streak", "Streak", "text-right")}
              {th("week_xp", "XP this week", "text-right")}
              <th scope="col" className="px-3 py-2 text-right font-semibold">
                Assignments
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => {
              const flags = flagsFor(s);
              return (
                <tr key={s.user_id} className="border-t border-glass-line">
                  <td className="px-3 py-2.5">
                    <p className="font-semibold">{s.name}</p>
                    <p className="flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
                      {s.username ? `@${s.username}` : "no username"}
                      {flags.map((f) => (
                        <span
                          key={f.label}
                          className={cn(
                            "rounded-full px-1.5 py-px text-[10px] font-bold",
                            f.tone === "bad"
                              ? "bg-destructive/15 text-destructive"
                              : "bg-warning/15 text-warning",
                          )}
                        >
                          {f.label}
                        </span>
                      ))}
                    </p>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">
                    {relativeDay(s.last_active)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{s.q7}</td>
                  <td
                    className={cn(
                      "px-3 py-2.5 text-right font-semibold tabular-nums",
                      s.accuracy30 != null && s.accuracy30 < 0.5 && "text-destructive",
                      s.accuracy30 != null && s.accuracy30 >= 0.75 && "text-success",
                    )}
                  >
                    {pct(s.accuracy30)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {s.streak ? `🔥 ${s.streak}` : "–"}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{s.week_xp}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">
                    {s.assignments_done}/{data.assignments_total}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function TopicsPanel({ data }: { data: BatchDashboard }) {
  const topics = data.weak_topics.map((t) => ({
    ...t,
    label: `${t.topic} · ${t.subject}`,
    pct: Math.round(t.accuracy * 100),
  }));
  const subjects = data.subjects.map((s) => ({ ...s, pct: Math.round(s.accuracy * 100) }));
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-muted-foreground">
          Weakest topics across the batch · last 60 days (topics with 10+ answers)
        </p>
        {topics.length ? (
          <div className="mt-2 w-full" style={{ height: Math.max(140, topics.length * 36) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topics}
                layout="vertical"
                margin={{ top: 0, right: 40, left: 8, bottom: 0 }}
              >
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={170}
                  tick={{ fontSize: 11, fill: "var(--color-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "var(--color-glass-line)" }}
                  formatter={(v, _n, item) => [
                    `${String(v)}% correct · ${(item.payload as { attempts: number }).attempts} answers by ${(item.payload as { students: number }).students} students`,
                    "Accuracy",
                  ]}
                />
                <Bar
                  dataKey="pct"
                  name="Accuracy"
                  fill="var(--chart-series-2)"
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                  label={{
                    position: "right",
                    fontSize: 11,
                    fill: "var(--color-muted-foreground)",
                    formatter: (v: unknown) => `${String(v)}%`,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Not enough answers yet. Topics appear once the batch has answered 10+ questions on them.
          </p>
        )}
      </div>
      {subjects.length ? (
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Accuracy by subject</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {subjects.map((s) => (
              <li key={s.subject} className="rounded-xl bg-surface-2/50 px-3 py-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{s.subject}</span>
                  <span className="font-semibold tabular-nums">{s.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-glass-line">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${s.pct}%`, background: "var(--chart-series-1)" }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{s.attempts} answers</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ActivityPanel({ data }: { data: BatchDashboard }) {
  const total = data.students.length;
  const today = data.activity.at(-1)?.active ?? 0;
  const week = data.students.filter(
    (s) => s.last_active && Date.now() - Date.parse(s.last_active) <= 7 * 86_400_000,
  ).length;
  const q30 = data.activity.reduce((n, d) => n + d.questions, 0);
  const tiles = [
    { label: "Active today", value: `${today}/${total}` },
    { label: "Active this week", value: `${week}/${total}` },
    { label: "Questions, 30 days", value: q30.toLocaleString() },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-xl bg-surface-2/50 px-3 py-2.5">
            <p className="text-[11px] text-muted-foreground">{t.label}</p>
            <p className="font-display text-xl font-bold tabular-nums">{t.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs font-semibold text-muted-foreground">Students active per day</p>
      <div className="mt-2 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.activity} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-glass-line)" vertical={false} />
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
            <Line
              type="monotone"
              dataKey="active"
              name="Active students"
              stroke="var(--chart-series-1)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AssignmentResultsView({ r }: { r: AssignmentResults }) {
  const done = r.students.filter((s) => s.score != null);
  const avg = done.length ? done.reduce((n, s) => n + (s.score ?? 0), 0) / done.length : null;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Submitted", value: `${done.length}/${r.students.length}` },
          { label: "Average", value: avg == null ? "–" : `${avg.toFixed(1)}/${r.total}` },
          {
            label: "Due",
            value: r.due_at
              ? new Date(r.due_at).toLocaleDateString(undefined, { day: "numeric", month: "short" })
              : "–",
          },
        ].map((t) => (
          <div key={t.label} className="rounded-xl bg-surface-2/50 px-3 py-2.5">
            <p className="text-[11px] text-muted-foreground">{t.label}</p>
            <p className="font-display text-xl font-bold tabular-nums">{t.value}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">Question by question</p>
        <ol className="mt-2 space-y-1.5">
          {r.questions.map((q, i) => {
            const rate = q.answered ? q.correct / q.answered : null;
            return (
              <li
                key={q.id}
                className="flex items-center gap-3 rounded-xl bg-surface-2/50 px-3 py-2"
              >
                <span className="w-6 shrink-0 text-center font-mono text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-1 text-sm">{q.stem}</span>
                  <span className="text-[11px] text-muted-foreground">{q.topic}</span>
                </span>
                <span
                  className={cn(
                    "shrink-0 text-sm font-bold tabular-nums",
                    rate != null && rate < 0.5 && "text-destructive",
                    rate != null && rate >= 0.75 && "text-success",
                  )}
                >
                  {rate == null ? "–" : `${Math.round(rate * 100)}%`}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">Students</p>
        <ul className="mt-2 space-y-1">
          {r.students.map((s) => (
            <li
              key={s.user_id}
              className="flex items-center gap-3 rounded-xl bg-surface-2/40 px-3 py-2 text-sm"
            >
              <span className="min-w-0 flex-1 truncate">{s.name}</span>
              <span className="text-xs text-muted-foreground">
                {s.seconds != null ? `${Math.round(s.seconds / 60)} min` : ""}
              </span>
              <span
                className={cn(
                  "w-14 text-right font-semibold tabular-nums",
                  s.score == null && "text-muted-foreground",
                )}
              >
                {s.score == null ? "Pending" : `${s.score}/${r.total}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function BatchDashboardView({
  data,
  demo = false,
  onNewAssignment,
  onOpenAssignment,
  onDeleteAssignment,
  onRotateCode,
  onToggleActive,
}: {
  data: BatchDashboard;
  demo?: boolean;
  onNewAssignment?: () => void;
  onOpenAssignment?: (id: string) => void;
  onDeleteAssignment?: (id: string) => void;
  onRotateCode?: () => void;
  onToggleActive?: () => void;
}) {
  const [tab, setTab] = useState<Tab>("students");
  const [copied, setCopied] = useState(false);
  const link = joinUrl(data.batch.join_code);
  const avgAcc = (() => {
    const xs = data.students.map((s) => s.accuracy30).filter((x): x is number => x != null);
    return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
  })();
  const activeWeek = data.students.filter(
    (s) => s.last_active && Date.now() - Date.parse(s.last_active) <= 7 * 86_400_000,
  ).length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "Students", value: data.students.length },
          { label: "Active this week", value: activeWeek },
          { label: "Avg accuracy (30d)", value: pct(avgAcc) },
          { label: "Assignments", value: data.assignments_total },
        ].map((t) => (
          <div key={t.label} className="card-surface px-4 py-3">
            <p className="text-[11px] text-muted-foreground">{t.label}</p>
            <p className="font-display text-2xl font-bold tabular-nums">{t.value}</p>
          </div>
        ))}
      </div>

      <div
        role="tablist"
        aria-label="Batch sections"
        className="mt-5 flex gap-1 overflow-x-auto pb-1"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              tab === t.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
            )}
          >
            <Icon name={t.icon} className="text-[16px]" />
            {t.label}
          </button>
        ))}
      </div>

      <section className="card-surface mt-3 p-4" role="tabpanel">
        {tab === "students" ? <StudentsTable data={data} /> : null}
        {tab === "topics" ? <TopicsPanel data={data} /> : null}
        {tab === "activity" ? <ActivityPanel data={data} /> : null}
        {tab === "assignments" ? (
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="mr-auto text-sm text-muted-foreground">
                Server-graded question sets from the {TRACKS[data.batch.exam].name} bank.
              </p>
              <button
                type="button"
                disabled={demo || !onNewAssignment}
                onClick={onNewAssignment}
                className="btn-base btn-primary h-10 px-4 text-sm"
              >
                <Icon name="add" className="text-[18px]" />
                New assignment
              </button>
            </div>
            {data.assignments.length ? (
              <ul className="mt-4 space-y-2">
                {data.assignments.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-3 rounded-2xl bg-surface-2/50 px-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() => onOpenAssignment?.(a.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="truncate text-sm font-bold hover:text-primary">{a.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {a.total} questions · {a.submissions}/{data.students.length} submitted
                        {a.avg_score != null ? ` · avg ${a.avg_score}/${a.total}` : ""}
                        {a.due_at
                          ? ` · due ${new Date(a.due_at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}`
                          : ""}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenAssignment?.(a.id)}
                      className="btn-base btn-ghost h-9 px-3 text-xs"
                    >
                      Results
                    </button>
                    {onDeleteAssignment && !demo ? (
                      <button
                        type="button"
                        aria-label={`Delete ${a.title}`}
                        onClick={() => onDeleteAssignment(a.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="delete" className="text-[18px]" />
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                No assignments yet. Set one after today&apos;s class: pick a subject or topic and a
                question count.
              </p>
            )}
          </div>
        ) : null}
        {tab === "invite" ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Batch code</p>
              <p className="mt-1 font-mono text-3xl font-bold tracking-[0.25em]">
                {data.batch.join_code}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Invite link</p>
              <div className="mt-1 flex gap-2">
                <input
                  readOnly
                  value={link}
                  aria-label="Invite link"
                  onFocus={(e) => e.currentTarget.select()}
                  className="min-w-0 flex-1 rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard?.writeText(link).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1800);
                    });
                  }}
                  className="btn-base btn-primary h-10 shrink-0 px-4 text-sm"
                >
                  <Icon name={copied ? "check" : "content_copy"} className="text-[18px]" />
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Share it in your batch WhatsApp group. Students sign in and join in one tap.
                {data.batch.pro_days
                  ? ` Each student gets ${data.batch.pro_days} days of Pro (once your institute is verified).`
                  : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 border-t-2 border-glass-line pt-4">
              <button
                type="button"
                disabled={demo || !onRotateCode}
                onClick={onRotateCode}
                className="btn-base btn-ghost h-10 px-4 text-sm"
              >
                <Icon name="autorenew" className="text-[18px]" />
                New code
              </button>
              <button
                type="button"
                disabled={demo || !onToggleActive}
                onClick={onToggleActive}
                className="btn-base btn-ghost h-10 px-4 text-sm"
              >
                <Icon name={data.batch.active ? "lock" : "lock_open"} className="text-[18px]" />
                {data.batch.active ? "Close joining" : "Reopen joining"}
              </button>
              <p className="w-full text-xs text-muted-foreground">
                A new code stops the old link working. Closing joining keeps current students.
              </p>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
