"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import type { ServiceSortOption } from "@/types/api";

const SORT_OPTIONS: { value: ServiceSortOption; label: string }[] = [
  { value: "title", label: "Title" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
];

export function SortBar({
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
      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowUpDown size={16} />
        Sort by
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="min-h-[44px] rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
