import type { ShareStatus } from "@/lib/share-card";

/** One-line outcome under a Share button (only when the share sheet wasn't used). */
export function ShareNote({ status }: { status: ShareStatus }) {
  const text =
    status === "downloaded+copied"
      ? "Card saved to your downloads, and the invite link is copied. Paste it with the image."
      : status === "downloaded"
        ? "Card saved to your downloads."
        : status === "error"
          ? "Couldn't make the card on this device."
          : null;
  if (!text) return null;
  return (
    <p className="mt-2 text-xs text-muted-foreground" role="status">
      {text}
    </p>
  );
}
