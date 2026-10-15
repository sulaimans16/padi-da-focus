import { Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Primitives";

/** Slim header for the institute portal and its demo. */
export function PortalHeader({ subtitle }: { subtitle: string }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/institute" className="flex min-w-0 items-center gap-2">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="min-w-0 leading-none">
            <span className="block whitespace-nowrap font-display text-base font-bold">
              Learners <span className="text-primary">Studio</span>
            </span>
            <span className="mt-1 block truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {subtitle}
            </span>
          </span>
        </Link>
        <Link to="/" className="btn-base btn-ghost h-10 shrink-0 px-3 text-sm">
          <Icon name="arrow_back" className="text-[18px]" />
          <span className="hidden sm:inline">Back to app</span>
          <span className="sm:hidden">App</span>
        </Link>
      </div>
    </header>
  );
}
