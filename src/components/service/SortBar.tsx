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
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-text-muted">
        Showing <span className="font-medium text-text-primary">{resultCount}</span>
        {typeof total === "number" && total !== resultCount && (
          <> of <span className="font-medium text-text-primary">{total}</span></>
        )}{" "}
        results
      </p>
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowUpDown size={16} />
        Sort by
        <Select
          value={currentSort}
          onChange={handleSortChange}
          options={SORT_OPTIONS}
          containerClassName="min-h-[44px] w-44"
        />
      </div>
    </div>
  );
}

export function SortBar(props: { resultCount: number; total?: number }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            Showing <span className="font-medium text-text-primary">{props.resultCount}</span>
            {typeof props.total === "number" && props.total !== props.resultCount && (
              <> of <span className="font-medium text-text-primary">{props.total}</span></>
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
