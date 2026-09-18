"use client";

import { useEffect, useState } from "react";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getServicePlacements } from "@/lib/api/servicePlacements";
import {
  mapPlacementToSidebarCard,
  sortPlacements,
} from "@/lib/mappers/servicePlacement";
import { Skeleton } from "@/components/ui/Skeleton";
import { hasDiscount } from "@/lib/utils";
import type { ServicePlacementPage } from "@/types/api";

const ROTATION_INTERVAL = 5_000;

type PlacementInlineAdProps = {
  page: ServicePlacementPage;
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
};

function SectionIntro({
  eyebrow,
  heading,
  subtitle,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
}) {
  return (
    <div className="relative mb-6 grid gap-3 sm:mb-8 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,1.1fr)] md:items-end md:gap-10">
      <div>
        <span className="font-decorative text-xl text-brand-saffron-400 sm:text-2xl">
          {eyebrow}
        </span>
        <h2 className="mt-1 font-sans text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">
          {heading}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base md:justify-self-end">
        {subtitle}
      </p>
    </div>
  );
}

export function PlacementInlineAd({
  page,
  eyebrow = "Curated for You",
  heading = "Handpicked Puja Services",
  subtitle = "Thoughtfully selected services for peace, prosperity, and every sacred occasion.",
}: PlacementInlineAdProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const placementsQuery = useQuery({
    queryKey: ["service-placements", page, "inline_ad"],
    queryFn: async () =>
      sortPlacements(
        await getServicePlacements({
          page,
          section: "inline_ad",
        })
      ),
    staleTime: 5 * 60_000,
  });

  const placements = placementsQuery.data ?? [];
  const hasMultiple = placements.length > 1;

  useEffect(() => {
    if (!hasMultiple) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % placements.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [hasMultiple, placements.length]);

  if (placementsQuery.isLoading) {
    return (
      <section className="border-y border-brand-saffron-100 bg-[#fff8f2]">
        <div className="mx-auto max-w-site px-4 py-8 sm:py-10 md:px-8 md:py-12 lg:px-16">
          <SectionIntro eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-card sm:flex-row">
            <Skeleton className="h-52 w-full rounded-none sm:h-72 sm:w-[42%]" />
            <div className="flex flex-1 flex-col gap-4 p-5 sm:p-8">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-11 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!placements.length) return null;

  const safeIndex = activeIndex % placements.length;
  const placement = placements[safeIndex];
  const service = mapPlacementToSidebarCard(placement);
  const showDiscount = hasDiscount(
    service.price,
    service.originalPrice,
    service.discountPercent
  );

  const goTo = (index: number) => {
    setActiveIndex((index + placements.length) % placements.length);
  };

  return (
    <section className="border-y border-brand-saffron-100 bg-[#fff8f2]">
      <div className="mx-auto max-w-site px-4 py-8 sm:py-10 md:px-8 md:py-12 lg:px-16">
        <SectionIntro eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
        <div
          className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card"
          role={hasMultiple ? "region" : undefined}
          aria-roledescription={hasMultiple ? "carousel" : undefined}
          aria-label={hasMultiple ? heading : undefined}
        >
          <div key={placement.id} className="flex animate-stagger-in flex-col opacity-0 sm:flex-row">
            <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-72 sm:w-[42%]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, 42vw"
                className="object-cover"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-8 lg:p-10">
              <span className="w-fit rounded-full bg-surface-peach px-3 py-1 text-xs font-semibold text-brand-saffron-500">
                {placement.label?.trim() || "Featured Service"}
              </span>
              <h3 className="mt-3 break-words font-sans text-xl font-semibold text-text-primary sm:text-2xl lg:text-3xl">
                {service.title}
              </h3>
              {placement.service.short_description && (
                <p className="mt-0.5 line-clamp-3 text-sm leading-relaxed text-text-muted sm:text-base">
                  {placement.service.short_description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-baseline gap-2">
                <span className="text-xl font-bold text-text-primary">₹{service.price}</span>
                {showDiscount && (
                  <>
                    <span className="text-sm text-text-light line-through">
                      ₹{service.originalPrice}
                    </span>
                    {service.discountPercent > 0 && (
                      <span className="text-sm font-semibold text-success">
                        {service.discountPercent}% off
                      </span>
                    )}
                  </>
                )}
              </div>

              <Link
                href={service.href}
                className="mt-5 flex min-h-[44px] w-fit max-w-full items-center gap-2 rounded-full bg-brand-saffron-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-saffron-500"
              >
                <span className="truncate">{service.ctaText}</span>
                <ArrowRight size={16} className="shrink-0" />
              </Link>
            </div>
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous advertised service"
                onClick={() => goTo(safeIndex - 1)}
                className="absolute left-2 top-24 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-primary shadow-card sm:top-1/2 sm:-translate-y-1/2"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next advertised service"
                onClick={() => goTo(safeIndex + 1)}
                className="absolute right-2 top-24 flex h-10 w-10 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card sm:top-1/2 sm:-translate-y-1/2"
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute left-1/2 top-44 flex max-w-[calc(100%-7rem)] -translate-x-1/2 gap-2 overflow-x-auto px-1 py-1 sm:bottom-4 sm:left-auto sm:right-5 sm:top-auto sm:max-w-[45%] sm:translate-x-0">
                {placements.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show advertised service ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={`h-2 shrink-0 rounded-full transition-all ${
                      index === safeIndex
                        ? "w-6 bg-brand-saffron-400"
                        : "w-2 bg-white/80 ring-1 ring-border-dark sm:bg-border-dark"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
