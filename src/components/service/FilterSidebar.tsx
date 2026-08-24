"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal, X, RotateCcw, ArrowUpRight, ArrowRight } from "lucide-react";
import { getCategories, getTypes } from "@/lib/api/catalog";
import { getBlogs } from "@/lib/api/blogs";
import { resolveImageUrl } from "@/lib/mappers/service";
import { Checkbox } from "@/components/ui/Checkbox";
import { Skeleton } from "@/components/ui/Skeleton";
import { OPEN_SERVICE_FILTERS_EVENT } from "@/lib/serviceFilters";

const TOP_RATED_LIMIT = 4;

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-sans text-base font-semibold text-text-primary">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FilterSidebarInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  const currentCategory = searchParams.get("category");
  const currentTypes = (searchParams.get("type") ?? "").split(",").filter(Boolean);
  const maxPriceParam = searchParams.get("max_price");
  const [price, setPrice] = useState(maxPriceParam ? Number(maxPriceParam) : 2000);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onOpen = () => setMobileOpen(true);
    window.addEventListener(OPEN_SERVICE_FILTERS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SERVICE_FILTERS_EVENT, onOpen);
  }, []);

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleCategory = (id: string) => {
    setParam("category", currentCategory === id ? null : id);
  };

  const toggleType = (id: string) => {
    const next = currentTypes.includes(id)
      ? currentTypes.filter((t) => t !== id)
      : [...currentTypes, id];
    setParam("type", next.length ? next.join(",") : null);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("type");
    params.delete("max_price");
    params.delete("page");
    setPrice(2000);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeCount =
    (currentCategory ? 1 : 0) + currentTypes.length + (maxPriceParam ? 1 : 0);

  // Public, unauthenticated catalog data — skeleton while loading; hide lists if empty.
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });
  const typesQuery = useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
    staleTime: 5 * 60_000,
  });
  const blogsQuery = useQuery({
    queryKey: ["blogs", "sidebar-top-rated"],
    queryFn: () => getBlogs({ limit: TOP_RATED_LIMIT }),
    staleTime: 5 * 60_000,
  });
  const topRated = blogsQuery.data?.data ?? [];

  const categories = (categoriesQuery.data ?? [])
    .filter((c) => c.requires_payment === true)
    .map((c) => ({ id: c.id, label: c.name }));

  const types = (typesQuery.data ?? []).map((t) => ({ id: t.id, label: t.name }));

  const filterBlocks = (
    <>
      <FilterBlock title="Filter by Price">
        <input
          type="range"
          min={98}
          max={2000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          onMouseUp={() => setParam("max_price", String(price))}
          onTouchEnd={() => setParam("max_price", String(price))}
          className="w-full accent-brand-saffron-400"
        />
        <p className="mt-2 text-sm text-text-secondary">
          Price: ₹98 - ₹{price}
        </p>
      </FilterBlock>

      <FilterBlock title="Category">
        <ul className="flex flex-col gap-3">
          {categoriesQuery.isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-5 w-3/4" />
                </li>
              ))
            : categories.map((cat) => (
                <li key={cat.id}>
                  <Checkbox
                    checked={currentCategory === cat.id}
                    onChange={() => toggleCategory(cat.id)}
                    label={<span className="text-sm text-text-secondary">{cat.label}</span>}
                  />
                </li>
              ))}
        </ul>
      </FilterBlock>

      <FilterBlock title="Types">
        <ul className="flex flex-col gap-3">
          {typesQuery.isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-5 w-2/3" />
                </li>
              ))
            : types.map((type) => (
                <li key={type.id}>
                  <Checkbox
                    checked={currentTypes.includes(type.id)}
                    onChange={() => toggleType(type.id)}
                    label={<span className="text-sm text-text-secondary">{type.label}</span>}
                  />
                </li>
              ))}
        </ul>
      </FilterBlock>
    </>
  );

  return (
    <>
      {/* Mobile: active filter chips only (search + filter icon live in ServicesHero) */}
      {activeCount > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2 lg:hidden">
          {currentCategory && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-saffron-200 bg-brand-saffron-50 px-3 py-1 text-xs font-medium text-brand-saffron-400">
              Category:{" "}
              {categories.find((c) => c.id === currentCategory)?.label || currentCategory}
              <button
                onClick={() => toggleCategory(currentCategory)}
                aria-label="Remove category filter"
                className="hover:text-error"
              >
                <X size={13} />
              </button>
            </span>
          )}
          {currentTypes.map((tId) => (
            <span
              key={tId}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-saffron-200 bg-brand-saffron-50 px-3 py-1 text-xs font-medium text-brand-saffron-400"
            >
              {types.find((t) => t.id === tId)?.label || tId}
              <button
                onClick={() => toggleType(tId)}
                aria-label={`Remove type filter ${tId}`}
                className="hover:text-error"
              >
                <X size={13} />
              </button>
            </span>
          ))}
          {maxPriceParam && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-saffron-200 bg-brand-saffron-50 px-3 py-1 text-xs font-medium text-brand-saffron-400">
              Max ₹{maxPriceParam}
              <button
                onClick={() => setParam("max_price", null)}
                aria-label="Remove price filter"
                className="hover:text-error"
              >
                <X size={13} />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs font-medium text-error hover:underline"
          >
            <RotateCcw size={13} />
            Clear all
          </button>
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-overlay-in"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[85vh] flex-col rounded-t-[28px] bg-white shadow-modal animate-sheet-open">
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border-dark/40" />

            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={20} className="text-brand-saffron-400" />
                <h2 className="font-sans text-lg font-bold text-text-primary">
                  Filter Services
                </h2>
                {activeCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-saffron-400 px-1.5 text-xs font-bold text-white">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-text-primary hover:bg-border"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              {filterBlocks}
            </div>

            <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-white p-4 z-10">
              {activeCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="min-h-[44px] flex-1 rounded-full border border-border px-4 text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-colors"
                >
                  Reset All
                </button>
              )}
              <button
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] flex-[2] rounded-full bg-brand-saffron-400 px-6 text-sm font-semibold text-white shadow-sm hover:bg-brand-saffron-500 transition-colors"
              >
                Apply Filters {activeCount > 0 ? `(${activeCount})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:flex lg:flex-col gap-5">
        {filterBlocks}

        {(blogsQuery.isLoading || topRated.length > 0) && (
          <FilterBlock title="Top Rated News">
            <ul className="flex flex-col gap-4">
              {blogsQuery.isLoading
                ? Array.from({ length: TOP_RATED_LIMIT }).map((_, i) => (
                    <li key={i} className="flex gap-3">
                      <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="mt-2 h-3 w-1/3" />
                      </div>
                    </li>
                  ))
                : topRated.map((post) => (
                    <li key={post.id} className="flex gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={resolveImageUrl(post.feature_image_url)}
                          alt={post.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-snug text-text-primary line-clamp-2">
                          {post.title}
                        </p>
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="text-xs flex items-center gap-1 font-semibold text-brand-saffron-400"
                        >
                          Read More <ArrowRight size={18} className="ml-2" />
                        </Link>
                      </div>
                    </li>
                  ))}
            </ul>
          </FilterBlock>
        )}
      </aside>
    </>
  );
}

export function FilterSidebar() {
  return (
    <Suspense
      fallback={
        <aside className="flex flex-col gap-5">
          <div className="rounded-xl bg-white p-5 shadow-card">
            <Skeleton className="h-6 w-1/2" />
          </div>
        </aside>
      }
    >
      <FilterSidebarInner />
    </Suspense>
  );
}
