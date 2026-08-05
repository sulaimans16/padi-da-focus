import { useEffect, useMemo, useState } from "react";

export const PAGE_SIZE = 20;

/** Paginates any list once it exceeds 20 items. Resets to page 1 when the list changes. */
export function usePagination<T>(items: T[], pageSize = PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(1, Math.ceil(items.length / pageSize))));
  }, [items.length, pageSize]);

  const pageItems = useMemo(
    () => (items.length > pageSize ? items.slice((page - 1) * pageSize, page * pageSize) : items),
    [items, page, pageSize],
  );

  return {
    page,
    setPage,
    totalPages,
    pageItems,
    paginated: items.length > pageSize,
    offset: (page - 1) * pageSize,
  };
}

function pageWindow(page: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const out: (number | "gap")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  if (start > 2) out.push("gap");
  for (let i = start; i <= end; i += 1) out.push(i);
  if (end < totalPages - 1) out.push("gap");
  out.push(totalPages);
  return out;
}

export function Pagination({
  page,
  totalPages,
  onChange,
  totalItems,
  pageSize = PAGE_SIZE,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  totalItems: number;
  pageSize?: number;
}) {
  if (totalPages <= 1) return null;

  const go = (next: number) => {
    onChange(Math.min(totalPages, Math.max(1, next)));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(totalItems, page * pageSize);

  return (
    <nav
      aria-label="Pagination"
      className="card-surface mt-4 flex flex-wrap items-center justify-between gap-3 p-3"
    >
      <p className="px-1 text-xs text-muted-foreground">
        Showing {from}–{to} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => go(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="btn-base btn-ghost px-2 py-1.5 text-sm disabled:opacity-40"
        >
          <span aria-hidden className="material-symbols-outlined text-[18px]">
            chevron_left
          </span>
        </button>
        {pageWindow(page, totalPages).map((p, i) =>
          p === "gap" ? (
            <span key={`gap-${i}`} className="px-1 text-xs text-muted-foreground">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              aria-current={p === page ? "page" : undefined}
              className={`min-w-9 rounded-lg px-2.5 py-1.5 text-xs font-bold ${p === page ? "btn-primary" : "btn-ghost"}`}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => go(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="btn-base btn-ghost px-2 py-1.5 text-sm disabled:opacity-40"
        >
          <span aria-hidden className="material-symbols-outlined text-[18px]">
            chevron_right
          </span>
        </button>
      </div>
    </nav>
  );
}
