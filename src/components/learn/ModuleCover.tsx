import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Primitives";
import { figureUrl, type LearnModule } from "@/lib/learn";
import { subjectColor } from "@/lib/questions";
import { cn } from "@/lib/utils";

/** Module cover: the Commons figure when there is one, otherwise a tinted subject tile. */
export function ModuleCover({
  mod,
  className,
  width = 900,
}: {
  mod: LearnModule;
  className?: string;
  width?: number;
}) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  // An image that failed before hydration never fires onError — check once mounted.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  const color = subjectColor(mod.subject);
  if (!mod.cover || failed) {
    return (
      <div
        className={cn("flex items-center justify-center", className)}
        style={{
          background: `radial-gradient(circle at 30% 20%, color-mix(in oklab, ${color} 35%, transparent), color-mix(in oklab, ${color} 10%, transparent))`,
        }}
        aria-hidden
      >
        <Icon name={mod.icon} filled className="text-[64px]" />
      </div>
    );
  }
  return (
    <img
      ref={img}
      src={figureUrl(mod.cover.file, width)}
      alt={mod.cover.caption}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("bg-white/95 object-contain p-3", className)}
    />
  );
}
