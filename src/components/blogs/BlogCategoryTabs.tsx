"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { getBlogCategories } from "@/lib/api/blogs";

function BlogCategoryTabsInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  const categoriesQuery = useQuery({
    queryKey: ["blog-categories"],
    queryFn: getBlogCategories,
    staleTime: 5 * 60_000,
  });

  const selectCategory = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("category", id);
    else params.delete("category");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (categoriesQuery.isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto border-b border-border pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:overflow-visible">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-24 shrink-0" />
        ))}
      </div>
    );
  }

  const categories = categoriesQuery.data ?? [];

  return (
    <div className="flex gap-4 overflow-x-auto border-b border-border pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:overflow-visible">
      <button
        onClick={() => selectCategory(null)}
        className={cn(
          "min-h-[44px] shrink-0 border-b-2 px-1 text-sm font-medium whitespace-nowrap transition-colors sm:text-md",
          !activeCategory
            ? "border-brand-saffron-400 text-text-primary"
            : "border-transparent text-text-light hover:text-text-secondary"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => selectCategory(cat.id)}
          className={cn(
            "min-h-[44px] shrink-0 border-b-2 px-1 text-sm font-medium whitespace-nowrap transition-colors sm:text-md",
            activeCategory === cat.id
              ? "border-brand-saffron-400 text-text-primary"
              : "border-transparent text-text-light hover:text-text-secondary"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export function BlogCategoryTabs() {
  return (
    <Suspense
      fallback={
        <div className="flex gap-4 overflow-x-auto border-b border-border pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:overflow-visible">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-24 shrink-0" />
          ))}
        </div>
      }
    >
      <BlogCategoryTabsInner />
    </Suspense>
  );
}
