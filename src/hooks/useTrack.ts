import { useParams } from "@tanstack/react-router";
import { idOfSlug, lastTrack, setActiveTrack } from "@/lib/track-state";
import { trackById, type Track } from "@/lib/tracks";

/**
 * The exam track for the current screen: the `$track` URL segment when inside
 * a track, otherwise the last track the user entered (pricing, admin…).
 */
export function useTrack(): Track {
  const params = useParams({ strict: false }) as { track?: string };
  const fromUrl = idOfSlug(params.track);
  const id = fromUrl ?? lastTrack() ?? "neet_pg";
  // Keep non-React data modules (storage keys, queries) on the same track.
  if (fromUrl) setActiveTrack(fromUrl);
  return trackById(id);
}

/** Route params helper: `params={trackParams(track)}` for `/$track/...` links. */
export const trackParams = (track: Track) => ({ track: track.slug });
