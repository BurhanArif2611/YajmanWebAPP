"use client";

import { ArrowUpDown } from "lucide-react";

export function SortBar({ resultCount }: { resultCount: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-text-muted">
        Showing <span className="font-medium text-text-primary">{resultCount}</span>{" "}
        results
      </p>
      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowUpDown size={16} />
        Sort by
        <select className="min-h-[44px] rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary outline-none">
          <option>Title</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Rating</option>
        </select>
      </label>
    </div>
  );
}
