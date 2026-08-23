"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { getCategories } from "@/lib/api/catalog";
import { getServices } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";
import { normalizeName } from "@/lib/utils";

const VISIBLE = 4;
const FETCH_LIMIT = 8;
const CATEGORY_NAME = "Premium Puja";

function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-card">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="mt-2 h-10 w-full rounded-full" />
    </div>
  );
}

export function PremiumPujaCarousel() {
  const [offset, setOffset] = useState(0);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  const category = categoriesQuery.data?.find(
    (c) => normalizeName(c.name) === normalizeName(CATEGORY_NAME)
  );

  const servicesQuery = useQuery({
    queryKey: ["services", "premium-puja-carousel", category?.id],
    queryFn: () => getServices({ category: category?.id, limit: FETCH_LIMIT }),
    enabled: !!category,
    staleTime: 5 * 60_000,
  });

  const pool = servicesQuery.data?.data.map(mapServiceToCard) ?? [];
  const isLoading =
    categoriesQuery.isLoading || (!!category && servicesQuery.isLoading);

  const services = pool.length
    ? Array.from(
        { length: Math.min(VISIBLE, pool.length) },
        (_, i) => pool[(((offset + i) % pool.length) + pool.length) % pool.length]
      )
    : [];

  if (!isLoading && !services.length) return null;

  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-decorative text-2xl text-brand-saffron-400 md:text-3xl">
            Discover
          </span>
          <h2 className="mt-1 font-sans text-3xl font-semibold text-text-primary">
            Premium Puja
          </h2>
        </div>
        <Link
          href={category ? `/services?category=${category.id}` : "/services"}
          className="text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          View More →
        </Link>
      </div>

      <div className="relative mt-10">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: VISIBLE }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, i) => (
                <div key={`${service.slug}-${offset + i}`}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            {pool.length > VISIBLE && (
              <>
                <button
                  aria-label="Previous"
                  onClick={() => setOffset((o) => o - 1)}
                  className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover lg:flex"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  aria-label="Next"
                  onClick={() => setOffset((o) => o + 1)}
                  className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover lg:flex"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
