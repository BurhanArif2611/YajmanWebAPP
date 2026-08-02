"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ArticleServiceCard } from "@/components/articles/ArticleServiceCard";
import { PujaServicesSidebar } from "@/components/articles/PujaServicesSidebar";
import { Pagination } from "@/components/ui/Pagination";
import { Skeleton } from "@/components/ui/Skeleton";
import { getCategories } from "@/lib/api/catalog";
import { getServices } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

function ArticleServiceCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <Skeleton className="h-64 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-2 h-10 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CategoryServicesSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1) || 1;

  const [activeId, setActiveId] = useState<string | null>(null);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  // Only categories that don't require online payment show up as tabs here.
  const freeCategories = categoriesQuery.data?.filter((c) => c.requires_payment === false) ?? [];
  const activeCategoryId = activeId ?? freeCategories[0]?.id ?? null;

  const servicesQuery = useQuery({
    queryKey: ["services", "articles-category", activeCategoryId, page],
    queryFn: () => getServices({ category: activeCategoryId!, page, limit: PAGE_SIZE }),
    enabled: !!activeCategoryId,
    staleTime: 5 * 60_000,
  });

  const selectTab = (id: string) => {
    setActiveId(id);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const services = servicesQuery.data?.data.map(mapServiceToCard) ?? [];
  const pageCount = servicesQuery.data?.pagination?.total_pages ?? 1;

  return (
    <>
      {categoriesQuery.isLoading ? (
        <div className="flex flex-wrap items-center justify-center gap-8 border-b border-border pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-24" />
          ))}
        </div>
      ) : freeCategories.length ? (
        <div className="flex flex-wrap items-center justify-center gap-8 border-b border-border pb-4">
          {freeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectTab(cat.id)}
              className={cn(
                "min-h-[44px] border-b-2 px-1 text-lg font-medium transition-colors",
                activeCategoryId === cat.id
                  ? "border-brand-saffron-400 text-text-primary"
                  : "border-transparent text-text-light hover:text-text-secondary"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="border-b border-border pb-4 text-center text-text-muted">
          No categories available right now.
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          {servicesQuery.isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <ArticleServiceCardSkeleton key={i} />
              ))}
            </div>
          ) : services.length ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ArticleServiceCard key={service.slug} service={service} />
                ))}
              </div>
              <Pagination pageCount={pageCount} />
            </>
          ) : (
            <p className="text-center text-text-muted">No services in this category yet.</p>
          )}
        </div>

        <PujaServicesSidebar />
      </div>
    </>
  );
}
