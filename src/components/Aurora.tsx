/**
 * Living ocean background — slow-drifting blurred colour fields.
 * Purely decorative; sits behind all content and ignores pointer events.
 */
export function Aurora({ intensity = "ambient" }: { intensity?: "ambient" | "full" }) {
  const full = intensity === "full";
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/25 to-background" />
      <div
        className={`animate-drift-a absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw] rounded-full bg-accent/30 blur-[140px] ${
          full ? "opacity-100" : "opacity-70"
        }`}
      />
      <div
        className={`animate-drift-b absolute -bottom-[25%] -right-[10%] h-[65vh] w-[60vw] rounded-full bg-primary/20 blur-[150px] ${
          full ? "opacity-100" : "opacity-70"
        }`}
      />
      {full && (
        <div className="animate-breathe absolute left-[35%] top-[30%] h-[45vh] w-[45vw] rounded-full bg-primary/12 blur-[160px]" />
      )}
    </div>
  );
}
