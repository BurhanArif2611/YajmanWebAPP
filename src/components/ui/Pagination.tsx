"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getVisiblePages(page: number, pageCount: number): (number | "ellipsis")[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pageCount - 1, page + 1);

  if (start > 2) pages.push("ellipsis");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < pageCount - 1) pages.push("ellipsis");
  pages.push(pageCount);
  return pages;
}

function PaginationInner({ pageCount = 2 }: { pageCount?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.min(Math.max(1, Number(searchParams.get("page") ?? 1)), pageCount);

  const goTo = (num: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (num <= 1) params.delete("page");
    else params.set("page", String(num));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (pageCount <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5 overflow-x-auto sm:gap-2">
      <button
        onClick={() => goTo(Math.max(1, page - 1))}
        aria-label="Previous page"
        disabled={page <= 1}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-text-secondary hover:bg-surface-muted disabled:opacity-40 sm:h-11 sm:w-11"
      >
        <ChevronLeft size={18} />
      </button>
      {getVisiblePages(page, pageCount).map((item, i) =>
        item === "ellipsis" ? (
          <span
            key={`e-${i}`}
            className="flex h-10 w-8 shrink-0 items-center justify-center text-sm text-text-muted sm:h-11"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => goTo(item)}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors sm:h-11 sm:w-11",
              page === item
                ? "bg-brand-navy text-white"
                : "bg-white text-text-secondary hover:bg-surface-muted"
            )}
          >
            {item}
          </button>
        )
      )}
      <button
        onClick={() => goTo(Math.min(pageCount, page + 1))}
        aria-label="Next page"
        disabled={page >= pageCount}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-text-secondary hover:bg-surface-muted disabled:opacity-40 sm:h-11 sm:w-11"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export function Pagination(props: { pageCount?: number }) {
  return (
    <Suspense fallback={null}>
      <PaginationInner {...props} />
    </Suspense>
  );
}
