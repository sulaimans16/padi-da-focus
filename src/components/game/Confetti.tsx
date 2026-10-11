import { useEffect, useRef } from "react";

const TOKENS = ["--primary", "--xp", "--streak", "--gem", "--success", "--accent"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: 0 | 1;
};

/** Full-screen confetti burst. Bump `fire` to launch another one. */
export function ConfettiBurst({ fire }: { fire: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fire) return;
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const colors = TOKENS.map((t) => styles.getPropertyValue(t).trim()).filter(Boolean);

    const particles: Particle[] = Array.from({ length: 150 }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const angle = (fromLeft ? -60 : -120) * (Math.PI / 180) + (Math.random() - 0.5) * 0.9;
      const speed = 9 + Math.random() * 9;
      return {
        x: fromLeft ? w * 0.15 : w * 0.85,
        y: h * 0.75,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 6 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[i % colors.length] ?? "gold",
        shape: Math.random() > 0.5 ? 1 : 0,
      };
    });

    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.vy += 0.32;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - frame / 150);
        ctx.fillStyle = p.color;
        if (p.shape) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (frame < 150) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [fire]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] h-full w-full"
    />
  );
}
