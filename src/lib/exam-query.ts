import { activeTrackId, type TrackId } from "./track-state";

/**
 * Track scoping for Supabase queries.
 *
 * Every per-exam table has an `exam` column (migration 0004_tracks). Until that
 * migration is applied the column doesn't exist: NEET PG then falls back to
 * the old unscoped query (all existing data is PG), and NEET UG gets nothing
 * from the server rather than PG's data — tracks never cross.
 */
let examColumnMissing = false;

function isMissingExam(error: { message: string } | null) {
  if (!error) return false;
  const m = error.message.toLowerCase();
  return (
    m.includes("exam") &&
    (m.includes("does not exist") || m.includes("schema cache") || m.includes("could not find"))
  );
}

/** The current track id, for query filters and inserts. */
export const currentExam = (): TrackId => activeTrackId();

/**
 * Runs `build(true)` (scoped to the exam), retrying once unscoped for NEET PG
 * if the database predates the exam column. Other tracks get an empty result
 * in that case.
 */
export async function scoped<R extends { error: { message: string } | null }>(
  build: (useExam: boolean) => PromiseLike<R>,
  exam: TrackId = currentExam(),
): Promise<R> {
  if (!examColumnMissing) {
    const res = await build(true);
    if (!isMissingExam(res.error)) return res;
    examColumnMissing = true;
  }
  if (exam !== "neet_pg") return { data: [], error: null, count: 0 } as unknown as R;
  return build(false);
}

/** True once we know the database has no `exam` column yet. */
export const examColumnKnownMissing = () => examColumnMissing;

let examRpcMissing = false;

function isMissingRpcArg(error: { message: string; code?: string } | null) {
  if (!error) return false;
  const m = error.message.toLowerCase();
  return (
    error.code === "PGRST202" ||
    (m.includes("function") && (m.includes("could not find") || m.includes("does not exist")))
  );
}

/**
 * Calls a game RPC with `_exam`. Before migration 0004 the functions take no
 * exam: NEET PG falls back to the old call, other tracks get `null` data (the
 * caller then uses its local mirror).
 */
export async function examRpc<R extends { error: { message: string; code?: string } | null }>(
  call: (withExam: boolean) => PromiseLike<R>,
  exam: TrackId = currentExam(),
): Promise<R> {
  if (!examRpcMissing) {
    const res = await call(true);
    if (!isMissingRpcArg(res.error)) return res;
    examRpcMissing = true;
  }
  if (exam !== "neet_pg") {
    return {
      data: null,
      error: { message: "track not available on the server yet" },
    } as unknown as R;
  }
  return call(false);
}
