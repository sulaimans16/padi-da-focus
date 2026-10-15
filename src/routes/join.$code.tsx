import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Aurora } from "@/components/Aurora";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Primitives";
import { MascotSays } from "@/components/mascot/Mascot";
import { CONSENT, JoinBatchForm } from "@/components/institute/JoinBatchForm";
import { useAuth } from "@/hooks/useAuth";
import { captureJoinCode, normaliseCode, previewBatch } from "@/lib/institute";
import { TRACKS } from "@/lib/tracks";

export const Route = createFileRoute("/join/$code")({
  staticData: { sitemap: false },
  head: () => ({ meta: [{ title: "Join your batch — Learners Studio" }] }),
  component: JoinPage,
});

/** Landing page for a batch invite link (https://…/join/K7M2QX9P). */
function JoinPage() {
  const { code: raw } = Route.useParams();
  const code = normaliseCode(raw);
  const { user, loading } = useAuth();
  const preview = useQuery({
    queryKey: ["batch-preview", code],
    queryFn: () => previewBatch(code),
    retry: false,
  });

  // Signed out: remember the code so it's joined right after sign-in.
  useEffect(() => {
    if (!loading && !user) captureJoinCode(code);
  }, [loading, user, code]);

  const p = preview.data;

  return (
    <div className="relative min-h-screen">
      <Aurora />
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-4 py-6 sm:px-6">
        <Link to="/welcome" className="flex items-center gap-2 font-display text-lg font-bold">
          <BrandMark className="h-9 w-9" />
          Learners <span className="text-primary">Studio</span>
        </Link>

        <main className="mt-10 flex-1">
          {preview.isLoading || loading ? (
            <p className="text-sm text-muted-foreground">Loading your batch…</p>
          ) : !p ? (
            <MascotSays mood="sad" size={80}>
              This batch link isn&apos;t active any more. Ask your faculty for a new code, or enter
              it on the My Batch page.
            </MascotSays>
          ) : (
            <>
              <MascotSays mood="happy" size={80}>
                {p.institute} invited you to join <b>{p.batch}</b> on Learners Studio.
              </MascotSays>

              {user ? (
                <section className="card-pop mt-6 p-5">
                  <JoinBatchForm initialCode={code} />
                </section>
              ) : (
                <section className="card-pop mt-6 p-5">
                  <p className="flex flex-wrap items-center gap-2 font-display text-lg font-bold">
                    {p.batch}
                    {p.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                        <Icon name="verified" filled className="text-[13px]" />
                        Verified partner
                      </span>
                    ) : null}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {p.institute}
                    {p.city ? `, ${p.city}` : ""} · {TRACKS[p.exam].name}
                  </p>
                  {p.pro_days ? (
                    <p className="mt-3 rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
                      Includes {p.pro_days} days of Pro: Dr. Pulse AI and every premium tool.
                    </p>
                  ) : null}
                  <ul className="mt-4 space-y-2 text-sm">
                    {[
                      "Assignments from your faculty",
                      "Lessons, question bank, PYQs and mocks",
                      "Flashcards, Smart Practice and Focus Lock",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Icon name="check_circle" className="text-[18px] text-primary" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{CONSENT}</p>
                  <Link to="/auth" className="btn-base btn-primary mt-4 h-12 w-full text-base">
                    Sign in to join
                  </Link>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    New here? Create a free account. You&apos;ll join the batch automatically.
                  </p>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
