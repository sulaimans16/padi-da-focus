import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Aurora } from "@/components/Aurora";
import { Icon } from "@/components/Primitives";
import {
  AssignmentResultsView,
  BatchDashboardView,
} from "@/components/institute/BatchDashboardView";
import { PortalHeader } from "@/components/institute/PortalHeader";
import { demoDashboard, demoResults } from "@/lib/institute-demo";

export const Route = createFileRoute("/institute_/demo")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Institute dashboard demo — Learners Studio" },
      {
        name: "description",
        content:
          "See what coaching institutes get on Learners Studio: batch progress, weak topics, activity and server-graded assignments.",
      },
    ],
  }),
  component: InstituteDemo,
});

/** The faculty dashboard with sample data, for showing institutes before they sign up. */
function InstituteDemo() {
  const data = useMemo(() => demoDashboard(), []);
  const results = useMemo(() => demoResults(data), [data]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Aurora />
      <PortalHeader subtitle="Institute Portal · Demo" />
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-primary/10 px-4 py-3 text-sm ring-1 ring-inset ring-primary/25">
          <Icon name="science" className="text-[20px] text-primary" />
          <span className="min-w-0 flex-1">
            <b>Sample data.</b> This is what faculty see for a batch of 24 students. Open an
            assignment for its results.
          </span>
          <Link to="/institute" className="btn-base btn-primary h-9 shrink-0 px-4 text-xs">
            Set up your institute
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold tracking-tight">{data.batch.name}</h1>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold">
            NEET PG
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
            <Icon name="verified" filled className="text-[16px]" />
            Verified partner
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Demo Medical Academy, Chennai</p>

        <div className="mt-5">
          <BatchDashboardView data={data} demo onOpenAssignment={() => setOpen(true)} />
        </div>

        {open ? (
          <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-background/70 p-3 backdrop-blur-sm sm:items-center"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Assignment results"
              onClick={(e) => e.stopPropagation()}
              className="card-pop max-h-[90vh] w-full max-w-2xl overflow-y-auto !bg-surface p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <h2 className="mr-auto font-display text-xl font-bold">{results.title}</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-muted-foreground"
                >
                  <Icon name="close" className="text-[22px]" />
                </button>
              </div>
              <AssignmentResultsView r={results} />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
