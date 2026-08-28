"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { getBlogCategories } from "@/lib/api/blogs";

const SCROLL_STEP = 160;

function CategoryTabsScroller({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateScrollButtons);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateScrollButtons, children]);

  const scroll = (direction: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-text-primary shadow-card transition-opacity disabled:pointer-events-none disabled:opacity-30 sm:hidden"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className={cn(
          "flex gap-4 overflow-x-auto border-b border-border px-10 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0",
          className
        )}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Scroll categories right"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-text-primary shadow-card transition-opacity disabled:pointer-events-none disabled:opacity-30 sm:hidden"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function TabsSkeleton() {
  return (
    <CategoryTabsScroller>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-24 shrink-0" />
      ))}
    </CategoryTabsScroller>
  );
}

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
    return <TabsSkeleton />;
  }

  const categories = categoriesQuery.data ?? [];

  return (
    <CategoryTabsScroller>
      <button
        type="button"
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
          type="button"
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
    </CategoryTabsScroller>
  );
}

export function BlogCategoryTabs() {
  return (
    <Suspense fallback={<TabsSkeleton />}>
      <BlogCategoryTabsInner />
    </Suspense>
  );
}
