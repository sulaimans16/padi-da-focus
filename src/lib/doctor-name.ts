/** Formats a stored username as "Dr. Rahul". Falls back to "Doctor" when unknown. */
export function doctorName(displayName?: string | null, email?: string | null): string {
  const raw = (displayName ?? "").trim() || (email?.split("@")[0] ?? "").trim();
  if (!raw) return "Doctor";
  const first = raw.split(/\s+/)[0] ?? raw;
  const clean = first.replace(/^dr\.?\s*/i, "");
  if (!clean) return "Doctor";
  return `Dr. ${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}
