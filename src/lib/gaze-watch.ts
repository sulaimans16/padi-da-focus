// Lightweight, on-device "am I still looking at the screen?" detector.
// No ML model, no network: we downscale the webcam frame to a tiny grayscale
// grid, keep a slowly-adapting baseline of "sitting still, facing the screen",
// and flag a look-away when the frame deviates hard for a sustained window.
// Frames never leave the browser.

export type WatchStatus = "idle" | "requesting" | "calibrating" | "watching" | "away" | "error";

export type GazeWatchOptions = {
  video: HTMLVideoElement;
  onStatus: (status: WatchStatus, detail?: string) => void;
  onLookAway: () => void;
  /** 1 = lenient, 2 = normal, 3 = strict */
  sensitivity: number;
};

const GRID_W = 32;
const GRID_H = 24;
const FPS = 5;
const CALIBRATION_FRAMES = 15;

function thresholdFor(sensitivity: number) {
  // Mean absolute grayscale difference (0-255) that counts as "moved away".
  if (sensitivity >= 3) return 12;
  if (sensitivity <= 1) return 30;
  return 20;
}

function awayMsFor(sensitivity: number) {
  if (sensitivity >= 3) return 1500;
  if (sensitivity <= 1) return 4000;
  return 2500;
}

export function startGazeWatch(opts: GazeWatchOptions) {
  const { video, onStatus, onLookAway, sensitivity } = opts;
  let stream: MediaStream | null = null;
  let raf: ReturnType<typeof setInterval> | null = null;
  let stopped = false;
  let baseline: Float32Array | null = null;
  let calibrated = 0;
  let awaySince = 0;
  let lastFired = 0;

  const canvas = document.createElement("canvas");
  canvas.width = GRID_W;
  canvas.height = GRID_H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const grab = (): Float32Array | null => {
    if (!ctx || video.readyState < 2) return null;
    ctx.drawImage(video, 0, 0, GRID_W, GRID_H);
    const { data } = ctx.getImageData(0, 0, GRID_W, GRID_H);
    const out = new Float32Array(GRID_W * GRID_H);
    for (let i = 0; i < out.length; i++) {
      const p = i * 4;
      out[i] = 0.299 * data[p]! + 0.587 * data[p + 1]! + 0.114 * data[p + 2]!;
    }
    return out;
  };

  const tick = () => {
    if (stopped) return;
    const frame = grab();
    if (!frame) return;

    if (!baseline) {
      baseline = frame;
      calibrated = 1;
      onStatus("calibrating");
      return;
    }

    let sum = 0;
    for (let i = 0; i < frame.length; i++) sum += Math.abs(frame[i]! - baseline[i]!);
    const diff = sum / frame.length;

    if (calibrated < CALIBRATION_FRAMES) {
      // Blend the first couple of seconds into the "focused" reference.
      for (let i = 0; i < baseline.length; i++) {
        baseline[i] = baseline[i]! * 0.7 + frame[i]! * 0.3;
      }
      calibrated += 1;
      onStatus("calibrating");
      return;
    }

    if (diff > thresholdFor(sensitivity)) {
      if (!awaySince) awaySince = Date.now();
      const heldMs = Date.now() - awaySince;
      if (heldMs > awayMsFor(sensitivity)) {
        onStatus("away");
        if (Date.now() - lastFired > 8000) {
          lastFired = Date.now();
          onLookAway();
        }
        // Re-anchor so one nag doesn't loop forever on a new sitting position.
        awaySince = Date.now();
      }
    } else {
      awaySince = 0;
      onStatus("watching");
      // Slow drift adaptation for lighting changes / small posture shifts.
      for (let i = 0; i < baseline.length; i++) {
        baseline[i] = baseline[i]! * 0.97 + frame[i]! * 0.03;
      }
    }
  };

  const boot = async () => {
    onStatus("requesting");
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: "user" },
        audio: false,
      });
      if (stopped) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      video.srcObject = stream;
      video.muted = true;
      await video.play().catch(() => {});
      onStatus("calibrating");
      raf = setInterval(tick, Math.round(1000 / FPS));
    } catch (err) {
      onStatus("error", err instanceof Error ? err.message : "Camera unavailable");
    }
  };

  void boot();

  return () => {
    stopped = true;
    if (raf) clearInterval(raf);
    stream?.getTracks().forEach((t) => t.stop());
    video.srcObject = null;
    onStatus("idle");
  };
}
