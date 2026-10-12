import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import type { AnyRoute } from "@tanstack/react-router";
import { TRACK_LIST } from "@/lib/tracks";

const BASE_URL = "https://pg-pre.learners-studio.com";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        // Track pages: every /$track/... route with only the track param, per track.
        for (const track of TRACK_LIST) {
          for (const route of Object.values(router.routesById) as AnyRoute[]) {
            const full = route.fullPath as string;
            if (!full.startsWith("/$track") || !isSitemapRouteIncluded(route)) continue;
            if (/[$*]/.test(full.replace("/$track", ""))) continue;
            const location = router.buildLocation({
              to: full,
              params: { track: track.slug },
              search: () => ({}),
              hash: "",
            } as never);
            const path = sitemapPathForLocation(router, location, route.id);
            if (path) entries.push({ path });
          }

          const subjectPages: [string, string[]][] = [
            ["/$track/learn/$subject", track.learn.map((m) => m.slug)],
            ["/$track/bank/$subject", track.subjects],
          ];
          for (const [routeId, subjects] of subjectPages) {
            const route = (router.routesById as unknown as Record<string, AnyRoute>)[routeId];
            if (!isSitemapRouteIncluded(route)) continue;
            for (const subject of subjects) {
              const location = router.buildLocation({
                to: routeId,
                params: { track: track.slug, subject },
                search: () => ({}),
                hash: "",
              } as never);
              const path = sitemapPathForLocation(router, location, routeId);
              if (path) entries.push({ path });
            }
          }
        }

        if (entries.length === 0) {
          return new Response(
            'No pages are included in this sitemap. Check route decisions and ancestor exclusions. Setting "exclude-subtree" on the root excludes the entire site.',
            { status: 404, headers: { "Cache-Control": "no-store" } },
          );
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
