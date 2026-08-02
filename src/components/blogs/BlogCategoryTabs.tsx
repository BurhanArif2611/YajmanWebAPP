"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { getBlogCategories } from "@/lib/api/blogs";

export function BlogCategoryTabs() {
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
      <div className="flex flex-wrap items-center justify-center gap-8 border-b border-border pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-24" />
        ))}
      </div>
    );
  }

  const categories = categoriesQuery.data ?? [];

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 border-b border-border pb-4">
      <button
        onClick={() => selectCategory(null)}
        className={cn(
          "min-h-[44px] border-b-2 px-1 text-md font-medium transition-colors",
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
            "min-h-[44px] border-b-2 px-1 text-md font-medium transition-colors",
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
