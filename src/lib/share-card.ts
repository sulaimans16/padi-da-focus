/**
 * Shareable achievement cards (level-ups, streaks), drawn on a canvas in the
 * browser. No server, no extra dependencies: the PNG goes to the native share
 * sheet when the device supports file sharing, otherwise it downloads.
 */

export type ShareStat = { label: string; value: string; color: string };

export type ShareCardOptions = {
  title: string;
  subtitle?: string | undefined;
  stats: ShareStat[];
  brand: { a: string; b: string };
  /** Accent for the glow and the title underline. */
  accent: string;
  /** Invite line printed at the foot of the card, e.g. "pg-pre.learners-studio.com/neet-pg". */
  invite?: string | undefined;
  /** The live mascot <svg> to copy onto the card; skipped if null or it fails to load. */
  mascotSvg?: SVGSVGElement | null;
};

// sRGB equivalents of the dark theme tokens in styles.css (canvas can't read CSS vars).
export const CARD_COLORS = {
  bg: "#071832",
  bg2: "#132946",
  primary: "#78beb7",
  xp: "#f7c243",
  streak: "#ff822a",
  gem: "#b48df4",
  text: "#eef3f8",
  muted: "#9fb0c4",
} as const;

const W = 1080;
const H = 1350;
const DISPLAY = '"Space Grotesk", "Inter", system-ui, sans-serif';
const SANS = '"Inter", system-ui, sans-serif';

function svgToImage(svg: SVGSVGElement, size: number): Promise<HTMLImageElement | null> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  // Colours set via CSS variables / currentColor don't survive serialisation; bake them in.
  const live = svg.querySelectorAll<SVGElement>("*");
  clone.querySelectorAll<SVGElement>("*").forEach((el, i) => {
    const src = live[i];
    if (!src) return;
    const cs = getComputedStyle(src);
    if (cs.fill && cs.fill !== "none") el.setAttribute("fill", cs.fill);
    if (cs.stroke && cs.stroke !== "none") el.setAttribute("stroke", cs.stroke);
  });
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", String(size));
  clone.setAttribute("height", String((size * 124) / 136));
  clone.removeAttribute("class");
  clone.style.removeProperty("transform");
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Greedy word wrap; returns at most `maxLines` lines, ellipsising the last. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width <= maxWidth || !line) line = next;
    else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${(kept[maxLines - 1] ?? "").replace(/\s+\S*$/, "")}…`;
    return kept;
  }
  return lines;
}

/** Fit a single line of display text into `maxWidth` by shrinking the font. */
function fitFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  start: number,
  min: number,
  maxWidth: number,
) {
  let size = start;
  ctx.font = `700 ${size}px ${DISPLAY}`;
  while (size > min && ctx.measureText(text).width > maxWidth) {
    size -= 4;
    ctx.font = `700 ${size}px ${DISPLAY}`;
  }
  return size;
}

export async function renderShareCard(opts: ShareCardOptions): Promise<Blob> {
  if (typeof document !== "undefined" && document.fonts?.ready) await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported on this device.");

  // Background: deep-ocean gradient with a soft accent glow behind the mascot.
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, CARD_COLORS.bg2);
  bg.addColorStop(1, CARD_COLORS.bg);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 470, 40, W / 2, 470, 520);
  glow.addColorStop(0, `${opts.accent}55`);
  glow.addColorStop(1, `${opts.accent}00`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Brand, top-left: "PG" + teal "Prep".
  ctx.textBaseline = "alphabetic";
  ctx.font = `700 54px ${DISPLAY}`;
  ctx.fillStyle = CARD_COLORS.text;
  ctx.fillText(opts.brand.a, 80, 130);
  const aw = ctx.measureText(`${opts.brand.a} `).width;
  ctx.fillStyle = CARD_COLORS.primary;
  ctx.fillText(opts.brand.b, 80 + aw, 130);

  // Mascot.
  const mascot = opts.mascotSvg ? await svgToImage(opts.mascotSvg, 420) : null;
  if (mascot) ctx.drawImage(mascot, (W - 420) / 2, 230, 420, (420 * 124) / 136);

  // Title and subtitle.
  ctx.textAlign = "center";
  ctx.fillStyle = CARD_COLORS.text;
  fitFont(ctx, opts.title, 104, 56, W - 160);
  const titleY = 760;
  ctx.fillText(opts.title, W / 2, titleY);
  ctx.fillStyle = opts.accent;
  roundRect(ctx, W / 2 - 70, titleY + 30, 140, 10, 5);
  ctx.fill();
  if (opts.subtitle) {
    ctx.font = `400 38px ${SANS}`;
    ctx.fillStyle = CARD_COLORS.muted;
    wrap(ctx, opts.subtitle, W - 200, 2).forEach((l, i) => {
      ctx.fillText(l, W / 2, titleY + 110 + i * 52);
    });
  }

  // Stat chips.
  const stats = opts.stats.slice(0, 3);
  const gap = 28;
  const chipW = (W - 160 - gap * (stats.length - 1)) / Math.max(1, stats.length);
  const chipY = 1000;
  stats.forEach((s, i) => {
    const x = 80 + i * (chipW + gap);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(ctx, x, chipY, chipW, 170, 32);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = s.color;
    fitFont(ctx, s.value, 60, 30, chipW - 40);
    ctx.fillText(s.value, x + chipW / 2, chipY + 88);
    ctx.font = `600 26px ${SANS}`;
    ctx.fillStyle = CARD_COLORS.muted;
    ctx.fillText(s.label.toUpperCase(), x + chipW / 2, chipY + 134);
  });

  // Footer: an invitation to join, with the link.
  if (opts.invite) {
    ctx.font = `700 34px ${DISPLAY}`;
    ctx.fillStyle = CARD_COLORS.primary;
    ctx.fillText(`Study with me on ${opts.brand.a} ${opts.brand.b}`, W / 2, H - 92);
    ctx.font = `500 28px ${SANS}`;
    ctx.fillStyle = CARD_COLORS.muted;
    ctx.fillText(opts.invite, W / 2, H - 48);
  } else {
    ctx.font = `500 30px ${SANS}`;
    ctx.fillStyle = CARD_COLORS.muted;
    ctx.fillText("Learners Studio Prep · learners-studio.com", W / 2, H - 70);
  }

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not create the image."))),
      "image/png",
    ),
  );
}

/**
 * Native share sheet with the image when supported; otherwise download it and
 * copy the caption (with the invite link) to the clipboard.
 */
export async function shareOrDownload(
  blob: Blob,
  { title, text, filename }: { title: string; text: string; filename: string },
): Promise<"shared" | "downloaded" | "downloaded+copied" | "cancelled"> {
  const file = new File([blob], filename, { type: "image/png" });
  const nav = typeof navigator !== "undefined" ? navigator : undefined;
  if (nav?.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title, text });
      return "shared";
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return "cancelled";
      // Fall through to download (e.g. NotAllowedError outside a user gesture).
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  try {
    await nav?.clipboard?.writeText(text);
    return "downloaded+copied";
  } catch {
    return "downloaded";
  }
}

// ---------- achievements ----------

export type ShareStatus = "idle" | "busy" | "downloaded" | "downloaded+copied" | "error";

export type AchievementShare = {
  /** level / streak come from celebrations; progress is the always-available profile share. */
  kind: "level" | "streak" | "progress";
  title: string;
  subtitle?: string | undefined;
  stats: { streak: number; level: number; rank: string; xpTotal: number };
  track: { slug: string; name: string; brand: { a: string; b: string } };
  mascotSvg?: SVGSVGElement | null;
};

/** The link a shared card invites friends to: this site's landing page for the track. */
export function inviteUrl(trackSlug: string) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://pg-pre.learners-studio.com";
  return `${origin}/${trackSlug}`;
}

/** Caption for the share sheet / clipboard, ending with the invite link. */
export function shareCaption(a: AchievementShare) {
  const brand = `${a.track.brand.a} ${a.track.brand.b}`;
  const tag = `#${a.track.name.replace(/\s+/g, "")}`;
  const { streak, level, rank, xpTotal } = a.stats;
  const line =
    a.kind === "streak"
      ? `I just hit a ${streak}-day study streak on ${brand} 🔥`
      : a.kind === "level"
        ? `Level ${level} (${rank}) on ${brand} ⚡`
        : `Level ${level} ${rank} · ${streak}-day streak · ${xpTotal.toLocaleString()} XP on ${brand} 📚`;
  return `${line} Join me and study for ${a.track.name} together: ${inviteUrl(a.track.slug)} ${tag}`;
}

/** Draw the card for an achievement and share (or download) it. */
export async function shareAchievement(a: AchievementShare): Promise<ShareStatus> {
  const { streak, level, rank, xpTotal } = a.stats;
  const blob = await renderShareCard({
    title: a.title,
    subtitle: a.subtitle,
    brand: a.track.brand,
    accent:
      a.kind === "streak"
        ? CARD_COLORS.streak
        : a.kind === "level"
          ? CARD_COLORS.gem
          : CARD_COLORS.primary,
    invite: inviteUrl(a.track.slug).replace(/^https?:\/\//, ""),
    mascotSvg: a.mascotSvg ?? null,
    stats: [
      { label: "Day streak", value: `🔥 ${streak}`, color: CARD_COLORS.streak },
      { label: rank, value: `Lv ${level}`, color: CARD_COLORS.gem },
      { label: "Total XP", value: xpTotal.toLocaleString(), color: CARD_COLORS.xp },
    ],
  });
  const result = await shareOrDownload(blob, {
    title: a.title,
    text: shareCaption(a),
    filename: `${a.track.brand.a.toLowerCase()}-prep-${a.kind}-${a.kind === "streak" ? streak : level}.png`,
  });
  return result === "shared" || result === "cancelled" ? "idle" : result;
}
