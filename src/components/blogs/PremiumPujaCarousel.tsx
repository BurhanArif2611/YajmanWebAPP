"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { getCategories } from "@/lib/api/catalog";
import { getServices } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";
import { normalizeName } from "@/lib/utils";

const FETCH_LIMIT = 12;
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

  const services = servicesQuery.data?.data.map(mapServiceToCard) ?? [];
  const isLoading =
    categoriesQuery.isLoading || (!!category && servicesQuery.isLoading);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: services.length > 4,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrows = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateArrows();
    emblaApi.on("select", updateArrows);
    emblaApi.on("reInit", updateArrows);
    emblaApi.on("resize", updateArrows);
    return () => {
      emblaApi.off("select", updateArrows);
      emblaApi.off("reInit", updateArrows);
      emblaApi.off("resize", updateArrows);
    };
  }, [emblaApi, updateArrows, services.length]);

  if (!isLoading && !services.length) return null;

  const showArrows = !isLoading && (canScrollPrev || canScrollNext);

  return (
    <section className="mx-auto max-w-site px-4 py-12 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-decorative text-2xl text-brand-saffron-400 md:text-3xl">
            Discover
          </span>
          <h2 className="mt-1 font-sans text-2xl font-semibold text-text-primary sm:text-3xl">
            Premium Puja
          </h2>
        </div>
        <Link
          href={category ? `/services?category=${category.id}` : "/services"}
          className="shrink-0 text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          View More
        </Link>
      </div>

      <div className="relative mt-8 sm:mt-10">
        {isLoading ? (
          <div className="-ml-4 flex sm:-ml-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_48%] sm:pl-5 lg:flex-[0_0_25%]"
              >
                <ServiceCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            {showArrows && (
              <button
                aria-label="Previous"
                type="button"
                disabled={!canScrollPrev}
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover disabled:opacity-40 lg:flex"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div ref={emblaRef} className="overflow-hidden">
              <div className="-ml-4 flex sm:-ml-5">
                {services.map((service) => (
                  <div
                    key={service.slug}
                    className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_48%] sm:pl-5 lg:flex-[0_0_25%]"
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>

            {showArrows && (
              <button
                aria-label="Next"
                type="button"
                disabled={!canScrollNext}
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover disabled:opacity-40 lg:flex"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
