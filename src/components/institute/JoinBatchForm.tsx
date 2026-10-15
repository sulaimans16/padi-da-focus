import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Primitives";
import {
  CODE_RE,
  joinBatch,
  normaliseCode,
  previewBatch,
  type BatchPreview,
} from "@/lib/institute";
import { activeTrackId, setActiveTrack, slugOf } from "@/lib/track-state";
import { TRACKS } from "@/lib/tracks";
import { cn } from "@/lib/utils";

export const CONSENT =
  "Your institute's faculty will see your progress on this exam: accuracy, activity, streak and assignment scores. Nothing else. You can leave the batch any time.";

/** Enter a batch code, see which institute it is, then join. */
export function JoinBatchForm({
  initialCode = "",
  onJoined,
  className,
}: {
  initialCode?: string;
  onJoined?: () => void;
  className?: string;
}) {
  const navigate = useNavigate();
  const [code, setCode] = useState(normaliseCode(initialCode));
  const [preview, setPreview] = useState<BatchPreview | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  useEffect(() => {
    setPreview(undefined);
    if (!CODE_RE.test(code)) return;
    let live = true;
    void previewBatch(code).then((p) => {
      if (live) setPreview(p);
    });
    return () => {
      live = false;
    };
  }, [code]);

  const join = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await joinBatch(code);
      setDone(
        res.pro_days
          ? `You're in! Your institute unlocked ${res.pro_days} days of Pro for you.`
          : res.joined
            ? "You're in! Assignments from your faculty will appear here."
            : "You're already in this batch.",
      );
      setCode("");
      onJoined?.();
      // Batches belong to one exam: switch track if needed.
      if (res.exam !== activeTrackId()) {
        setActiveTrack(res.exam);
        void navigate({ to: "/$track/batch", params: { track: slugOf(res.exam) } });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't join.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => {
            setDone("");
            setError("");
            setCode(normaliseCode(e.target.value));
          }}
          placeholder="Batch code, e.g. K7M2QX9P"
          aria-label="Batch code"
          autoCapitalize="characters"
          className="min-w-0 flex-1 rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2.5 font-mono text-base uppercase tracking-[0.2em] outline-none focus:border-primary"
        />
      </div>

      {preview ? (
        <div className="mt-3 rounded-2xl bg-surface-2/50 p-4">
          <p className="flex flex-wrap items-center gap-2 font-bold">
            {preview.batch}
            {preview.verified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                <Icon name="verified" filled className="text-[13px]" />
                Verified partner
              </span>
            ) : null}
          </p>
          <p className="text-sm text-muted-foreground">
            {preview.institute}
            {preview.city ? `, ${preview.city}` : ""} · {TRACKS[preview.exam].name}
            {preview.pro_days ? ` · includes ${preview.pro_days} days of Pro` : ""}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{CONSENT}</p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void join()}
            className="btn-base btn-primary mt-3 h-11 w-full text-sm"
          >
            {busy ? "Joining…" : `Join ${preview.batch}`}
          </button>
        </div>
      ) : CODE_RE.test(code) && preview === null ? (
        <p className="mt-2 text-xs font-semibold text-destructive">
          No active batch has that code. Check it with your faculty.
        </p>
      ) : null}

      {error ? (
        <p className="mt-2 text-xs font-semibold text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {done ? (
        <p
          className={cn(
            "mt-3 rounded-2xl bg-success/10 px-4 py-3 text-sm font-semibold text-success",
          )}
          role="status"
        >
          {done}
        </p>
      ) : null}
    </div>
  );
}
