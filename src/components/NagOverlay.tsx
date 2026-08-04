import { useEffect, useRef, useState } from "react";
import padiDaVideo from "@/assets/padi-da.mp4.asset.json";
import { playSiren } from "@/lib/sfx";

const LINES = [
  "Aiyayo! Timer running-a irukku da!",
  "Enna panra? Onnum vela illa-ya? PADI!",
  "Moonu vatti aachu da... seriously?",
];

export function NagOverlay({ attempts, onDismiss }: { attempts: number; onDismiss: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoBlocked, setVideoBlocked] = useState(false);
  const escalated = attempts >= 3;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.volume = 1;
    el.currentTime = 0;
    const attempt = el.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        setVideoBlocked(true);
        playSiren(escalated ? 4 : 2.5);
      });
    }
  }, [escalated]);

  const line = LINES[Math.min(attempts, LINES.length) - 1] ?? LINES[0];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-background/98 px-4 py-6">
      <div className="animate-nag text-center">
        <h2 className="text-5xl font-black tracking-tight text-destructive sm:text-6xl">PADI DA! 😤</h2>
        <p className="mt-2 text-base text-foreground sm:text-lg">{line}</p>
      </div>

      <div className="w-full max-w-sm overflow-hidden rounded-lg border border-destructive/60 bg-surface">
        {videoBlocked ? (
          <div className="flex aspect-square flex-col items-center justify-center gap-3 bg-surface-2 p-6 text-center">
            <span className="text-7xl">🙅‍♂️📚</span>
            <p className="font-display text-2xl text-foreground">Timer-a mudi, apdi thaan!</p>
            <p className="text-xs text-muted-foreground">
              Video autoplay blocked — siren mode activated instead.
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={padiDaVideo.url}
            className="h-auto w-full"
            playsInline
            loop={escalated}
            controls={false}
          />
        )}
      </div>

      <button onClick={onDismiss} className="btn-base btn-primary w-full max-w-sm text-base">
        Sari, padikaren 🙏
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Escape attempts this session: <span className="font-mono text-destructive">{attempts}</span>
        {escalated ? " — nag escalated. Sit down." : ""}
      </p>
    </div>
  );
}
