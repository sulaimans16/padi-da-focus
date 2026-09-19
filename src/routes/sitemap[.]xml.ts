import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import { SUBJECTS } from "@/lib/focus-session";
import { LEARN_MODULES } from "@/lib/learn";

const BASE_URL = "https://pg-pre.learners-studio.com";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const learnRouteId = "/learn/$subject";
        if (isSitemapRouteIncluded(router.routesById[learnRouteId])) {
          for (const mod of LEARN_MODULES) {
            const location = router.buildLocation({
              to: "/learn/$subject",
              params: { subject: mod.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, learnRouteId);
            if (path) entries.push({ path });
          }
        }

        const bankRouteId = "/bank/$subject";
        if (isSitemapRouteIncluded(router.routesById[bankRouteId])) {
          for (const subject of SUBJECTS) {
            const location = router.buildLocation({
              to: "/bank/$subject",
              params: { subject },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, bankRouteId);
            if (path) entries.push({ path });
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
