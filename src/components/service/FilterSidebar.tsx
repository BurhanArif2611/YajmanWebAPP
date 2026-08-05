"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getTypes } from "@/lib/api/catalog";
import { getBlogs } from "@/lib/api/blogs";
import { resolveImageUrl } from "@/lib/mappers/service";
import { Checkbox } from "@/components/ui/Checkbox";
import { Skeleton } from "@/components/ui/Skeleton";

// Payment-required categories only — payment-free ones (e.g. Astrology) live under Articles.
const FALLBACK_CATEGORIES = [
  "PanditJi At Home",
  "Premium Puja",
  "E-Puja",
  "Puja At Home",
  "Aarti & Katha",
];

const FALLBACK_TYPES = ["Health", "Marriage", "Business", "Navgrah", "Festival"];

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

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentTypes = (searchParams.get("type") ?? "").split(",").filter(Boolean);
  const maxPriceParam = searchParams.get("max_price");
  const [price, setPrice] = useState(maxPriceParam ? Number(maxPriceParam) : 2000);

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

  // Public, unauthenticated catalog data — fall back to the static lists
  // while loading or if the API call fails, so filters never disappear.
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

  const categories = categoriesQuery.data?.length
    ? categoriesQuery.data
        .filter((c) => c.requires_payment === true)
        .map((c) => ({ id: c.id, label: c.name }))
    : FALLBACK_CATEGORIES.map((label) => ({ id: label, label }));

  const types = typesQuery.data?.length
    ? typesQuery.data.map((t) => ({ id: t.id, label: t.name }))
    : FALLBACK_TYPES.map((label) => ({ id: label, label }));

  return (
    <aside className="flex flex-col gap-5">
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

      {/* <FilterBlock title="Reviews">
        <ul className="flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <Checkbox
                label={
                  <span className="flex items-center gap-0.5 text-brand-gold-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < rating ? "currentColor" : "none"}
                        className={cn(i >= rating && "text-border-dark")}
                      />
                    ))}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      </FilterBlock> */}

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
                      className="text-xs font-semibold text-brand-saffron-400"
                    >
                      Read More →
                    </Link>
                  </div>
                </li>
              ))}
        </ul>
      </FilterBlock>
    </aside>
  );
}
