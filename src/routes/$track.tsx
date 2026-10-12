import { createFileRoute, notFound, Outlet, redirect } from "@tanstack/react-router";
import { idOfSlug, setActiveTrack } from "@/lib/track-state";

/** Feature paths that lived at the site root before tracks existed (all NEET PG). */
const LEGACY = new Set([
  "learn",
  "bank",
  "daily",
  "flashcards",
  "focus",
  "mock",
  "papers",
  "pyq",
  "roadmap",
  "videos",
  "leagues",
  "profile",
  "review",
  "tracker",
  "weak-spots",
]);

export const Route = createFileRoute("/$track")({
  staticData: { sitemap: true },
  beforeLoad: ({ params, location }) => {
    const id = idOfSlug(params.track);
    if (id) {
      setActiveTrack(id);
      return { trackId: id };
    }
    // Old bookmarks and search results: /learn/anatomy → /neet-pg/learn/anatomy
    if (LEGACY.has(params.track)) {
      throw redirect({ href: `/neet-pg${location.href}`, statusCode: 301 });
    }
    throw notFound();
  },
  component: () => <Outlet />,
});
