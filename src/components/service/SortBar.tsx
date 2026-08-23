"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { Select } from "@/components/ui/Select";
import type { ServiceSortOption } from "@/types/api";

const SORT_OPTIONS: { value: ServiceSortOption; label: string }[] = [
  { value: "title", label: "Title" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
];

function SortBarInner({
  resultCount,
  total,
}: {
  resultCount: number;
  total?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "title";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("sort", value);
    else params.delete("sort");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="shrink-0 text-sm text-text-muted">
        Showing <span className="font-medium text-text-primary">{resultCount}</span>
        {typeof total === "number" && total !== resultCount && (
          <>
            {" "}
            of <span className="font-medium text-text-primary">{total}</span>
          </>
        )}{" "}
        results
      </p>
      <div className="flex min-w-0 w-full items-center gap-2 text-sm text-text-secondary sm:w-auto">
        <ArrowUpDown size={16} className="shrink-0" />
        <span className="shrink-0 whitespace-nowrap">Sort by</span>
        <div className="min-w-0 flex-1 sm:w-48 sm:flex-none">
          <Select
            value={currentSort}
            onChange={handleSortChange}
            options={SORT_OPTIONS}
            containerClassName="min-h-[44px] w-full px-3 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export function SortBar(props: { resultCount: number; total?: number }) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            Showing{" "}
            <span className="font-medium text-text-primary">{props.resultCount}</span>
            {typeof props.total === "number" && props.total !== props.resultCount && (
              <>
                {" "}
                of <span className="font-medium text-text-primary">{props.total}</span>
              </>
            )}{" "}
            results
          </p>
        </div>
      }
    >
      <SortBarInner {...props} />
    </Suspense>
  );
}
