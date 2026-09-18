"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { ServiceCard } from "@/components/service/ServiceCard";
import { getServicePlacements } from "@/lib/api/servicePlacements";
import {
  getPlacementHeading,
  mapPlacementToMockService,
  sortPlacements,
} from "@/lib/mappers/servicePlacement";
import { cn } from "@/lib/utils";
import type { ServicePlacementPage, ServicePlacementSection } from "@/types/api";

const VISIBLE = 4;

type PlacementServiceGridProps = {
  page: ServicePlacementPage;
  section: Extract<ServicePlacementSection, "recommended" | "related">;
  eyebrow?: string;
  heading?: string;
  compact?: boolean;
};

export function PlacementServiceGrid({
  page,
  section,
  eyebrow = "Discover",
  heading,
  compact = false,
}: PlacementServiceGridProps) {
  const [offset, setOffset] = useState(0);

  const placementsQuery = useQuery({
    queryKey: ["service-placements", page, section],
    queryFn: async () =>
      sortPlacements(await getServicePlacements({ page, section, limit: 12 })),
    staleTime: 5 * 60_000,
  });

  const placements = placementsQuery.data ?? [];
  const pool = placements.map(mapPlacementToMockService);
  const resolvedHeading =
    heading ??
    getPlacementHeading(
      placements,
      section === "related" ? "Related Services" : "Recommended for You"
    );

  const services = pool.length
    ? Array.from(
        { length: Math.min(VISIBLE, pool.length) },
        (_, i) => pool[(((offset + i) % pool.length) + pool.length) % pool.length]
      )
    : [];

  if (!placementsQuery.isLoading && !pool.length) return null;

  return (
    <section className="bg-white">
      <div
        className={cn(
          "mx-auto max-w-site px-4 md:px-8 lg:px-16",
          compact ? "py-8 md:py-10 lg:py-12" : "py-10 md:py-12 lg:py-16"
        )}
      >
        <SectionHeader
          eyebrow={eyebrow}
          heading={placementsQuery.isLoading ? heading ?? "Recommended for You" : resolvedHeading}
          align="left"
          className="items-center text-center sm:items-start sm:text-left"
        />

        <div className="relative mt-6 sm:mt-8 md:mt-10">
          {placementsQuery.isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {Array.from({ length: VISIBLE }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-card">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="mt-2 h-10 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : services.length ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {services.map((service, i) => (
                  <div
                    key={`${service.id ?? service.slug}-${offset + i}`}
                    className="animate-stagger-in opacity-0"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>

              {pool.length > VISIBLE && (
                <>
                  <button
                    type="button"
                    aria-label="Previous services"
                    onClick={() => setOffset((o) => o - 1)}
                    className="absolute left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-text-primary shadow-card-hover lg:left-0 lg:h-11 lg:w-11 lg:-translate-x-5"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next services"
                    onClick={() => setOffset((o) => o + 1)}
                    className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover lg:right-0 lg:h-11 lg:w-11 lg:translate-x-5"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
