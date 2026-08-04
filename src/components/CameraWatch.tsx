import { useEffect, useRef, useState } from "react";
import { startGazeWatch, type WatchStatus } from "@/lib/gaze-watch";

const LABELS: Record<WatchStatus, string> = {
  idle: "Camera off",
  requesting: "Asking for camera…",
  calibrating: "Calibrating — sit still, look at the screen",
  watching: "Eyes on screen 👀",
  away: "Kanna enga paakura?! 😤",
  error: "Camera blocked",
};

export function CameraWatch({
  sensitivity,
  onLookAway,
}: {
  sensitivity: number;
  onLookAway: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const awayRef = useRef(onLookAway);
  const [status, setStatus] = useState<WatchStatus>("idle");
  const [detail, setDetail] = useState<string | null>(null);

  awayRef.current = onLookAway;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const stop = startGazeWatch({
      video: el,
      sensitivity,
      onStatus: (s, d) => {
        setStatus(s);
        setDetail(d ?? null);
      },
      onLookAway: () => awayRef.current(),
    });
    return stop;
  }, [sensitivity]);

  const tone =
    status === "away"
      ? "border-destructive/70 text-destructive"
      : status === "error"
        ? "border-border text-muted-foreground"
        : status === "watching"
          ? "border-success/60 text-success"
          : "border-border text-muted-foreground";

  return (
    <div className={`card-surface flex items-center gap-3 border p-2.5 ${tone}`}>
      <video
        ref={videoRef}
        playsInline
        muted
        className="h-14 w-20 shrink-0 rounded-md bg-surface-2 object-cover [transform:scaleX(-1)]"
      />
      <div className="min-w-0">
        <p className="text-xs font-semibold">{LABELS[status]}</p>
        <p className="truncate text-[11px] text-muted-foreground">
          {status === "error"
            ? (detail ?? "Allow camera access to use eye watch.")
            : "Video stays on this device — nothing is uploaded."}
        </p>
      </div>
    </div>
  );
}
