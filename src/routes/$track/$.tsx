import { createFileRoute, notFound } from "@tanstack/react-router";

// Catches deep legacy paths (e.g. /learn/anatomy) so the $track layout can
// redirect them; anything else under a real track is a 404.
export const Route = createFileRoute("/$track/$")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw notFound();
  },
});
