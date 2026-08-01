"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: pageCount }).map((_, i) => {
        const num = i + 1;
        return (
          <button
            key={num}
            onClick={() => goTo(num)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-sm font-medium transition-colors",
              page === num
                ? "bg-brand-navy text-white"
                : "bg-white text-text-secondary hover:bg-surface-muted"
            )}
          >
            {num}
          </button>
        );
      })}
      <button
        onClick={() => goTo(Math.min(pageCount, page + 1))}
        aria-label="Next page"
        disabled={page >= pageCount}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-text-secondary hover:bg-surface-muted disabled:opacity-40"
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
