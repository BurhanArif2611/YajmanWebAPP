"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pagination({ pageCount = 2 }: { pageCount?: number }) {
  const [page, setPage] = useState(1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: pageCount }).map((_, i) => {
        const num = i + 1;
        return (
          <button
            key={num}
            onClick={() => setPage(num)}
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
        onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        aria-label="Next page"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-text-secondary hover:bg-surface-muted"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
