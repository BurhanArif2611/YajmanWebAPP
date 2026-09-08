"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { getBanners } from "@/lib/api/banners";
import { getTypes } from "@/lib/api/catalog";
import { getPopularSearches } from "@/lib/api/popularSearches";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import type { Type } from "@/types/api";

const POPULAR_SEARCH_ROW = 1;
const SLIDE_INTERVAL = 6000;

function TypesStrip({ types, isLoading }: { types: Type[]; isLoading: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
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
    // Re-measure after images/fonts settle
    const id = requestAnimationFrame(updateArrows);
    return () => {
      cancelAnimationFrame(id);
      emblaApi.off("select", updateArrows);
      emblaApi.off("reInit", updateArrows);
      emblaApi.off("resize", updateArrows);
    };
  }, [emblaApi, updateArrows, types.length]);

  const showArrows = canScrollPrev || canScrollNext;

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden sm:gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex w-[84px] shrink-0 flex-col items-center gap-2 sm:w-[100px] md:w-[112px]"
          >
            <Skeleton className="h-11 w-11 rounded-full sm:h-12 sm:w-12" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {showArrows && (
        <button
          type="button"
          aria-label="Previous types"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className={cn(
            "absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover transition-opacity sm:h-9 sm:w-9 md:h-10 md:w-10",
            !canScrollPrev && "pointer-events-none opacity-40"
          )}
        >
          <ChevronLeft size={18} />
        </button>
      )}

      <div
        ref={emblaRef}
        className={cn("overflow-hidden", showArrows && "mx-4 sm:mx-5 md:mx-6")}
      >
        <div className="flex sm:justify-center">
          {types.map((type) => {
            const iconSrc = type.icon_url || type.image_url;
            return (
              <div
                key={type.id}
                className="min-w-0 shrink-0 grow-0 basis-[84px] px-2 sm:basis-[104px] sm:px-3 md:basis-[120px] md:px-4"
              >
                <Link
                  href={`/services?type=${type.id}`}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400 sm:h-12 sm:w-12">
                    {iconSrc ? (
                      <Image
                        src={iconSrc}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain p-2.5 sm:p-3"
                      />
                    ) : null}
                  </span>
                  <span className="line-clamp-1 w-full text-xs font-semibold leading-tight text-text-secondary sm:text-sm">
                    {type.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <button
          type="button"
          aria-label="Next types"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className={cn(
            "absolute right-0 top-1/2 z-10 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover transition-opacity sm:h-9 sm:w-9 md:h-10 md:w-10",
            !canScrollNext && "pointer-events-none opacity-40"
          )}
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

export function HeroSection() {
  const bannersQuery = useQuery({
    queryKey: ["banners", "hero_slider"],
    queryFn: () => getBanners("hero_slider"),
    staleTime: 5 * 60_000,
  });

  const typesQuery = useQuery({
    queryKey: ["types"],
    queryFn: getTypes,
    staleTime: 5 * 60_000,
  });

  const popularSearchesQuery = useQuery({
    queryKey: ["popular-searches"],
    queryFn: getPopularSearches,
    staleTime: 5 * 60_000,
  });

  const popularSearches = (popularSearchesQuery.data ?? [])
    .filter((s) => s.row_number === POPULAR_SEARCH_ROW)
    .sort((a, b) => a.display_order - b.display_order);

  const types = typesQuery.data ?? [];
  const banners = bannersQuery.data ?? [];
  const showTypes = typesQuery.isLoading || types.length > 0;

  const [active, setActive] = useState(0);

  useEffect(() => {
    queueMicrotask(() => setActive(0));
    if (banners.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % banners.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [banners.length]);

  return (
    <>
    <section className={`relative aspect-[3/4] bg-surface-peach sm:aspect-auto ${showTypes ? "pb-20 sm:pb-24" : ""}`}>
      {bannersQuery.isLoading ? (
        <Skeleton className="absolute inset-0 rounded-none" />
      ) : (
        banners.map((banner, i) => {
          const mobileSrc = banner.mobile_image_url || banner.image_url;
          const desktopSrc = banner.image_url;
          const isActive = i === active;
          return (
            <div key={banner.id} className="absolute inset-0">
              <Image
                src={mobileSrc}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover transition-opacity duration-1000 md:hidden ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <Image
                src={desktopSrc}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`hidden object-cover transition-opacity duration-1000 md:block ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          );
        })
      )}

      <div className="relative mx-auto max-w-site px-4 pb-10 pt-10 md:px-8 md:pb-16 md:pt-14 lg:px-16 lg:pb-28 lg:pt-16">
        <div className="flex max-w-3xl flex-col gap-3 text-left sm:gap-4 md:gap-6 lg:pl-[100px] xl:pl-[150px]">
          <h1 className="font-sans text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl lg:text-7xl lg:leading-[1.1] xl:text-9xl">
            Connect With{" "}
            <span className="text-brand-saffron-400">Divinity.</span> Book Puja
            In Minutes
          </h1>
          <p className="text-sm font-medium text-text-secondary sm:text-base md:text-lg">
            Verified Pandit | Authentic Rituals | Peace Of Mind
          </p>

          {popularSearchesQuery.isLoading ? (
            <div className="hidden flex-wrap items-center gap-2 sm:flex">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-28 rounded-full" />
              ))}
            </div>
          ) : (
            popularSearches.length > 0 && (
              <div className="mt-1 hidden flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:flex">
                <span className="text-sm font-medium text-text-muted">
                  Popular Search :
                </span>
                {popularSearches.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link_url}
                    className="rounded-full border border-brand-saffron-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-saffron-500 shadow-sm transition-colors hover:border-brand-saffron-400 hover:bg-brand-saffron-400 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {showTypes && (
        <div className="absolute bottom-0 left-1/2 z-30 w-[calc(100%-2rem)] max-w-site -translate-x-1/2 translate-y-1/2 sm:w-[90%] lg:w-[75%]">
          <div className="w-full rounded-2xl bg-white px-2 py-3 shadow-card-hover sm:px-3 sm:py-4 md:px-4 md:py-6">
            <TypesStrip types={types} isLoading={typesQuery.isLoading} />
          </div>
        </div>
      )}
    </section>

    {popularSearchesQuery.isLoading ? (
      <div className="flex flex-wrap items-center gap-2 px-4 pt-4 sm:hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-28 rounded-full" />
        ))}
      </div>
    ) : (
      popularSearches.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 pt-4 text-sm sm:hidden">
          <span className="text-sm font-medium text-text-muted">
            Popular Search :
          </span>
          {popularSearches.map((item) => (
            <Link
              key={item.id}
              href={item.link_url}
              className="rounded-full border border-brand-saffron-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-saffron-500 shadow-sm transition-colors hover:border-brand-saffron-400 hover:bg-brand-saffron-400 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )
    )}
    </>
  );
}
