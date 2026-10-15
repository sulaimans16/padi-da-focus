import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdminInstitutes, verifyInstitute } from "@/lib/institute";
import { cn } from "@/lib/utils";

/** Admin: coaching institutes on the platform, and verifying them (which lets batch codes grant Pro). */
export function InstitutesPanel() {
  const qc = useQueryClient();
  const [error, setError] = useState("");
  const q = useQuery({ queryKey: ["admin-institutes"], queryFn: fetchAdminInstitutes });
  const list = q.data ?? [];

  return (
    <section className="card-surface mt-5 p-4" aria-label="Institutes">
      <div className="flex items-center gap-2">
        <p className="mr-auto text-sm font-bold">Institutes</p>
        <span className="text-xs text-muted-foreground">
          {list.filter((i) => i.verified).length} verified · {list.length} total
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Verifying an institute lets its batch codes unlock Pro for students who join.
      </p>
      {error ? <p className="mt-2 text-xs font-semibold text-destructive">{error}</p> : null}
      {q.isLoading ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Loading…</p>
      ) : list.length ? (
        <ul className="mt-3 space-y-2">
          {list.map((i) => (
            <li
              key={i.id}
              className="flex flex-wrap items-center gap-3 rounded-xl bg-surface-2/50 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {i.name}
                  {i.city ? (
                    <span className="font-normal text-muted-foreground"> · {i.city}</span>
                  ) : null}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {i.owner ?? "Owner"}
                  {i.owner_email ? ` (${i.owner_email})` : ""} · {i.batches} batches · {i.students}{" "}
                  students
                </p>
              </div>
              <button
                type="button"
                aria-pressed={i.verified}
                onClick={() => {
                  setError("");
                  void verifyInstitute(i.id, !i.verified)
                    .then(() => qc.invalidateQueries({ queryKey: ["admin-institutes"] }))
                    .catch((e: unknown) => setError(e instanceof Error ? e.message : "Failed."));
                }}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  i.verified
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-glass-line text-muted-foreground hover:text-foreground",
                )}
              >
                {i.verified ? "Verified" : "Verify"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-6 text-center text-sm text-muted-foreground">No institutes yet.</p>
      )}
    </section>
  );
}
