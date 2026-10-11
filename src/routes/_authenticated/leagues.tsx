import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/leagues")({
  staticData: { sitemap: false },
  component: () => null,
});
