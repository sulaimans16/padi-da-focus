import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { subjectColor } from "@/lib/questions";
import { fetchAttempts, subjectStats, topicStats } from "@/lib/tracker";
import { GlassCard, Icon, Pill, Badge } from "@/components/Primitives";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/_authenticated/weak-spots")({
  head: () => ({
    meta: [
      { title: "Weak Spots — PadiDa Accuracy Analyzer" },
      {
        name: "description",
        content:
          "See your lowest-accuracy NEET PG subjects and topics from Question Bank and PYQ attempts, and jump straight into targeted practice.",
      },
      { property: "og:title", content: "Weak Spots — PadiDa" },
      {
        property: "og:description",
        content: "Your weakest subjects and topics ranked by accuracy, with one-tap practice links.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeakSpots;
});

type SourceKey = "all" | "question_bank" | "pyq";

const SOURCES: { key: SourceKey; label: string }[] = [
  { key: "all", label: "All attempts" },
  { key: "question_bank", label: "QBank" },
  { key: "pyq", label: "PYQ Vault" },
];

function pct(v: number) {
  return `${Math.round(v * 100)}%`;
}

function tone(accuracy: number) {
  if (accuracy < 0.4) return { tone: "destructive" as const, label: "Critical" };
  if (accuracy < 0.6) return { tone: "warning" as const, label: "Weak" };
  if (accuracy < 0.75) return { tone: "muted" as const, label: "Fair" };
  return { tone: "success" as const, label: "Strong" };
}

function Bar({ accuracy, color }: { accuracy: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-3">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.max(3, accuracy * 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

function WeakSpots() {
  const attempts = useQuery({ queryKey: ["attempts"], queryFn: fetchAttempts });
  const [source, setSource] = useState<SourceKey>("all");
  const [minAttempts, setMinAttempts] = useState(3);

  const rows = useMemo(() => {
    const all = attempts.data ?? [];
    if (source === "all") return all.filter((r) => r.context === "question_bank" || r.context === "pyq");
    return all.filter((r) => r.context === source);
  }, [attempts.data, source]);

  const subjects = useMemo(
    () => subjectStats(rows).filter((s) => s.attempts >= minAttempts),
    [rows, minAttempts],
  );
  const topics = useMemo(
    () => topicStats(rows).filter((t) => t.attempts >= minAttempts),
    [rows, minAttempts],
  );

  const weakestSubject = subjects[0];
  const overall = rows.length ? rows.filter((r) => r.correct).length / rows.length : 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <Reveal>
        <p className="label-eyebrow">Diagnostics</p>
        <h1 className="text-3xl sm:text-4xl">Weak Spot Analyzer</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Ranked by accuracy across your Question Bank and PYQ Vault attempts. Start with whatever
          sits at the top — that is where marks are leaking.
        </p>
      </Reveal>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {SOURCES.map((s) => (
          <Pill
            key={s.key}
            variant={source === s.key ? "primary" : "ghost"}
            onClick={() => setSource(s.key)}
            className="text-xs"
          >
            {s.label}
          </Pill>
        ))}
        <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          Min attempts
          {[1, 3, 5, 10].map((n) => (
            <Pill
              key={n}
              variant={minAttempts === n ? "primary" : "ghost"}
              onClick={() => setMinAttempts(n)}
              className="h-8 px-3 text-xs"
            >
              {n}
            </Pill>
          ))}
        </span>
      </div>

      {attempts.isLoading && (
        <p className="mt-8 text-sm text-muted-foreground">Crunching your attempt history…</p>
      )}

      {!attempts.isLoading && rows.length === 0 && (
        <GlassCard className="mt-6">
          <div className="p-8 text-center">
            <Icon name="query_stats" className="text-[32px] text-primary" />
            <p className="mt-2 text-sm font-semibold">Nothing to analyze yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Answer questions in the{" "}
              <Link to="/bank" className="font-bold text-primary">
                Question Bank
              </Link>{" "}
              or{" "}
              <Link to="/pyq" className="font-bold text-primary">
                PYQ Vault
              </Link>{" "}
              and your weak spots appear here.
            </p>
          </div>
        </GlassCard>
      )}

      {rows.length > 0 && (
        <>
          <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <GlassCard interactive>
              <div className="p-5">
                <p className="label-eyebrow">Attempts analyzed</p>
                <p className="mt-1 font-mono text-3xl font-bold tabular-nums">{rows.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {pct(overall)} overall accuracy
                </p>
              </div>
            </GlassCard>
            <GlassCard interactive>
              <div className="p-5">
                <p className="label-eyebrow">Weakest subject</p>
                <p className="mt-1 truncate text-xl font-bold">
                  {weakestSubject ? weakestSubject.subject : "—"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {weakestSubject
                    ? `${pct(weakestSubject.accuracy)} · ${weakestSubject.correct}/${weakestSubject.attempts}`
                    : "Not enough attempts"}
                </p>
              </div>
            </GlassCard>
            <GlassCard interactive>
              <div className="p-5">
                <p className="label-eyebrow">Topics needing review</p>
                <p className="mt-1 font-mono text-3xl font-bold tabular-nums">
                  {topics.filter((t) => t.accuracy < 0.6).length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Below 60% accuracy</p>
              </div>
            </GlassCard>
          </section>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <GlassCard className="lg:col-span-5">
              <div className="card-head">
                <span className="label-eyebrow">Subjects · weakest first</span>
                <Icon name="donut_small" className="text-[20px] text-primary" />
              </div>
              <div className="divide-y divide-border/60">
                {subjects.length === 0 && (
                  <p className="p-5 text-sm text-muted-foreground">
                    No subject has {minAttempts}+ attempts yet.
                  </p>
                )}
                {subjects.map((s) => {
                  const t = tone(s.accuracy);
                  return (
                    <div key={s.subject} className="p-4">
                      <div className="flex items-center justify-between gap-3">
                        <Link
                          to="/bank/$subject"
                          params={{ subject: s.subject }}
                          className="truncate text-sm font-bold transition-colors duration-300 ease-out hover:text-primary"
                        >
                          {s.subject}
                        </Link>
                        <Badge tone={t.tone} tooltip={`${s.correct} correct of ${s.attempts}`}>
                          {pct(s.accuracy)} · {t.label}
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <Bar accuracy={s.accuracy} color={subjectColor(s.subject)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-7">
              <div className="card-head">
                <span className="label-eyebrow">Topics · weakest first</span>
                <Icon name="format_list_bulleted" className="text-[20px] text-primary" />
              </div>
              <div className="divide-y divide-border/60">
                {topics.length === 0 && (
                  <p className="p-5 text-sm text-muted-foreground">
                    No topic has {minAttempts}+ attempts yet. Lower the threshold to see more.
                  </p>
                )}
                {topics.slice(0, 40).map((t) => {
                  const b = tone(t.accuracy);
                  return (
                    <div key={`${t.subject}-${t.topic}`} className="flex items-center gap-4 p-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{t.topic}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {t.subject} · last seen{" "}
                          {new Date(t.lastAttemptAt).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                          <Bar accuracy={t.accuracy} color={subjectColor(t.subject)} />
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-mono text-sm font-bold tabular-nums">{pct(t.accuracy)}</p>
                        <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                          {t.correct}/{t.attempts}
                        </p>
                        <Badge tone={b.tone} className="mt-1">
                          {b.label}
                        </Badge>
                      </div>
                      <Link
                        to="/bank/$subject"
                        params={{ subject: t.subject }}
                        search={{ topic: t.topic }}
                        className="btn-base btn-ghost shrink-0 text-xs"
                      >
                        <Icon name="play_arrow" className="text-[16px]" />
                        Practice
                      </Link>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
}
