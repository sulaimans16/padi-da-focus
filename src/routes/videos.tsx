import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAccess } from "@/hooks/useAccess";
import {
  TOTAL_VIDEO_LESSONS,
  VIDEO_MODULES,
  videoEmbedUrl,
  videoThumb,
  videoWatchUrl,
  type VideoLesson,
} from "@/lib/videos";

export const Route = createFileRoute("/videos")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Video Modules — Medical Lecture Library | PG Prep" },
      {
        name: "description",
        content:
          "Curated NEET PG video lectures for anatomy, physiology, biochemistry, pharmacology, pathology and medicine — organised subject by subject inside PG Prep Pro.",
      },
      { property: "og:title", content: "Video Modules — PG Prep" },
      {
        property: "og:description",
        content: "Subject-wise medical lecture videos, curated for NEET PG revision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoModules,
});

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span aria-hidden className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

function LessonCard({ lesson, unlocked }: { lesson: VideoLesson; unlocked: boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="card-surface overflow-hidden">
      <div className="relative aspect-video bg-surface-2">
        {unlocked && playing ? (
          <iframe
            src={videoEmbedUrl(lesson.id)}
            title={lesson.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <>
            <img
              src={videoThumb(lesson.id)}
              alt={`${lesson.title} lecture thumbnail`}
              loading="lazy"
              className={`h-full w-full object-cover ${unlocked ? "" : "blur-[3px] brightness-75"}`}
            />
            {unlocked ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${lesson.title}`}
                className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/40"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon name="play_arrow" className="text-[30px]" />
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-primary">
                  <Icon name="lock" className="text-[22px]" />
                </span>
                <span className="text-xs font-bold text-white">Pro members only</span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="border-t border-border p-4">
        <p className="label-eyebrow">
          {lesson.topic} · {lesson.minutes} min
        </p>
        <h3 className="mt-1 text-sm font-bold leading-snug">{lesson.title}</h3>
        <p className="mt-1 text-xs leading-snug text-muted-foreground">{lesson.blurb}</p>
        <p className="mt-3 flex items-center justify-between gap-2">
          <span className="label-eyebrow text-primary">{lesson.channel}</span>
          {unlocked ? (
            <span className="flex items-center gap-3">
              <a
                href={videoWatchUrl(lesson.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="label-eyebrow text-muted-foreground hover:text-primary"
              >
                Open on YouTube ↗
              </a>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(videoWatchUrl(lesson.id));
                }}
                className="label-eyebrow text-muted-foreground hover:text-primary"
                title="Copy the video link"
              >
                Copy link
              </button>
            </span>
          ) : null}


        </p>
      </div>
    </article>
  );
}

function VideoModules() {
  const { isPro, isAdmin, signedIn, loading } = useAccess();
  const [active, setActive] = useState(VIDEO_MODULES[0]!.slug);
  const mod = VIDEO_MODULES.find((m) => m.slug === active)!;
  const unlocked = isPro;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <p className="label-eyebrow">Learn</p>
      <h1 className="text-3xl sm:text-4xl">Video modules</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        {TOTAL_VIDEO_LESSONS} curated lecture videos across {VIDEO_MODULES.length} subjects — the same
        concepts as the reading modules, taught on the whiteboard by respected medical educators.
      </p>

      {!loading && !unlocked ? (
        <section className="card-surface mt-4 flex flex-col gap-2 p-4">
          <p className="flex items-center gap-2 text-sm font-bold">
            <Icon name="workspace_premium" className="text-[18px] text-primary" />
            Video modules are part of PG Prep Pro
          </p>
          <p className="text-xs text-muted-foreground">
            Browse the full curriculum below. Playback unlocks with Pro — ₹50 for 3 months or ₹100 for a
            year. Reading modules stay free forever.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to="/pricing" className="btn-base btn-primary h-9 px-3 text-xs">
              See plans
            </Link>
            {!signedIn ? (
              <Link to="/auth" className="btn-base btn-ghost h-9 px-3 text-xs">
                Sign in
              </Link>
            ) : null}
            <Link to="/learn" className="btn-base btn-ghost h-9 px-3 text-xs">
              Free reading modules
            </Link>
          </div>
        </section>
      ) : null}

      {!loading && unlocked ? (
        <p className="mt-3 text-xs font-bold text-success">
          {isAdmin ? "Admin access — every video module unlocked." : "Pro active — all videos unlocked."}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {VIDEO_MODULES.map((m) => (
          <button
            key={m.slug}
            type="button"
            onClick={() => setActive(m.slug)}
            className={`chip ${m.slug === active ? "border-primary text-primary" : ""}`}
          >
            <Icon name={m.icon} className="text-[16px]" />
            {m.subject}
            <span className="text-muted-foreground">{m.lessons.length}</span>
          </button>
        ))}
      </div>

      <section className="mt-4">
        <h2 className="text-xl font-extrabold tracking-tight">{mod.subject} lectures</h2>
        <p className="mt-1 text-sm text-muted-foreground">{mod.blurb}</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mod.lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} unlocked={unlocked} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/learn/$subject"
            params={{ subject: mod.slug }}
            className="btn-base btn-ghost text-xs"
          >
            <Icon name="menu_book" className="text-[16px]" />
            Read the {mod.subject} notes
          </Link>
          <Link to="/bank/$subject" params={{ subject: mod.subject }} className="btn-base btn-ghost text-xs">
            <Icon name="quiz" className="text-[16px]" />
            Practise {mod.subject} questions
          </Link>
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        Videos are hosted on YouTube by their original creators and embedded here for study. All credit
        stays with the channels named on each card.
      </p>
    </div>
  );
}
