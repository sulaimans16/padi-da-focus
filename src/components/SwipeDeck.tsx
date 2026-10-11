import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * On phones: a horizontal, snap-scrolling deck of cards. The next card peeks in, and
 * dots show where you are. From `md` up the per-card wrappers become `display: contents`,
 * so the children lay out exactly as before inside `desktopClassName` (grid spans and all).
 */
export function SwipeDeck({
  children,
  desktopClassName,
  itemWidth = "w-[86%]",
  dots = true,
  label,
  className,
}: {
  children: ReactNode;
  desktopClassName: string;
  itemWidth?: string;
  dots?: boolean;
  label?: string;
  className?: string;
}) {
  const items = Children.toArray(children).filter(Boolean);
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const frame = useRef(0);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      children.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const goTo = (i: number) => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div className={className}>
      {label ? (
        <div className="mb-3 flex items-center justify-between md:hidden">
          <p className="label-eyebrow">{label}</p>
          <p className="text-[11px] font-semibold text-muted-foreground">
            {active + 1} / {items.length}
          </p>
        </div>
      ) : null}
      <div
        ref={ref}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className={cn(
          // phone: swipe deck that bleeds to the screen edges
          "scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-3 pt-1 sm:-mx-8 sm:scroll-px-8 sm:px-8",
          // tablet / desktop: regular layout
          "md:mx-0 md:snap-none md:overflow-visible md:px-0 md:pb-0 md:pt-0",
          desktopClassName,
        )}
      >
        {items.map((child, i) => (
          <div key={i} className={cn(itemWidth, "shrink-0 snap-center [&>*]:h-full md:contents")}>
            {child}
          </div>
        ))}
      </div>
      {dots && items.length > 1 ? (
        <div className="mt-2 flex justify-center gap-1.5 md:hidden">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show card ${i + 1} of ${items.length}`}
              aria-current={i === active}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-primary" : "w-2 bg-muted-foreground/35",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
