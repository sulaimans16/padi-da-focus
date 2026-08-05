const GATEWAY = "https://connector-gateway.lovable.dev/firecrawl/v2";

export type SourceSnippet = { title: string; url: string; text: string };

/**
 * Scouts the public web (Firecrawl) for recent NEET PG material on a subject/topic so
 * question generation is grounded in real published content instead of pure recall.
 * Returns [] whenever research is unavailable — generation must still work.
 */
export async function researchTopic(
  subject: string,
  topic: string,
  limit = 4,
): Promise<SourceSnippet[]> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const firecrawlKey = process.env["FIRECRAWL_API_KEY"];
  if (!lovableKey || !firecrawlKey) return [];

  const query =
    topic === "all"
      ? `NEET PG previous year questions high yield points ${subject}`
      : `NEET PG previous year questions high yield ${topic} ${subject}`;

  try {
    const res = await fetch(`${GATEWAY}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": firecrawlKey,
      },
      body: JSON.stringify({
        query,
        limit,
        scrapeOptions: { formats: ["markdown"] },
      }),
    });

    if (!res.ok) {
      console.error(`[research] firecrawl failed [${res.status}]: ${await res.text()}`);
      return [];
    }

    const json = (await res.json()) as {
      data?: { web?: unknown[] } | unknown[];
    };
    const raw = Array.isArray(json.data)
      ? json.data
      : Array.isArray((json.data as { web?: unknown[] } | undefined)?.web)
        ? ((json.data as { web?: unknown[] }).web as unknown[])
        : [];

    return raw
      .map((item) => {
        const r = item as { title?: string; url?: string; markdown?: string; description?: string };
        return {
          title: (r.title ?? "").slice(0, 140),
          url: r.url ?? "",
          text: (r.markdown ?? r.description ?? "").replace(/\s+/g, " ").slice(0, 4000),
        };
      })
      .filter((s) => s.text.length > 200);
  } catch (error) {
    console.error("[research] firecrawl error", error);
    return [];
  }
}
