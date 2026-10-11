import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  staticData: { sitemap: false },
  component: () => null,
});
