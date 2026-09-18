"use client";

import { useQuery } from "@tanstack/react-query";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { ServiceCard } from "@/components/service/ServiceCard";
import { PujaServicesSidebar } from "@/components/articles/PujaServicesSidebar";
import { getServicePlacements } from "@/lib/api/servicePlacements";
import {
  getPlacementHeading,
  mapPlacementToMockService,
  sortPlacements,
} from "@/lib/mappers/servicePlacement";

export function HomeCatalogPlacements() {
  const recommendedQuery = useQuery({
    queryKey: ["service-placements", "home", "recommended"],
    queryFn: async () =>
      sortPlacements(
        await getServicePlacements({ page: "home", section: "recommended", limit: 10 })
      ),
    staleTime: 5 * 60_000,
  });

  const sidebarQuery = useQuery({
    queryKey: ["service-placements", "home", "sidebar", 5],
    queryFn: async () =>
      sortPlacements(
        await getServicePlacements({ page: "home", section: "sidebar", limit: 5 })
      ),
    staleTime: 5 * 60_000,
  });

  const recommended = recommendedQuery.data ?? [];
  const sidebar = sidebarQuery.data ?? [];
  const isLoading = recommendedQuery.isLoading || sidebarQuery.isLoading;

  if (!isLoading && !recommended.length && !sidebar.length) return null;

  const heading = getPlacementHeading(recommended, "Recommended for You");
  const services = recommended.map(mapPlacementToMockService);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-4 py-10 md:px-8 md:py-16 lg:px-16 lg:py-20">
        {(isLoading || recommended.length > 0) && (
          <SectionHeader
            eyebrow="Handpicked"
            heading={isLoading ? "Recommended for You" : heading}
            align="left"
            className="items-center text-center sm:items-start sm:text-left"
          />
        )}

        <div
          className={
            (sidebar.length || sidebarQuery.isLoading) &&
            (recommended.length || recommendedQuery.isLoading)
              ? "mt-6 grid grid-cols-1 gap-10 sm:mt-8 md:mt-10 lg:grid-cols-[minmax(0,1fr)_340px]"
              : "mt-6 sm:mt-8 md:mt-10"
          }
        >
          {recommendedQuery.isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-card">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="mt-2 h-10 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : services.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id ?? service.slug} service={service} />
              ))}
            </div>
          ) : null}

          {(sidebarQuery.isLoading || sidebar.length > 0) && (
            <div className={!recommended.length && !recommendedQuery.isLoading ? "lg:ml-auto lg:max-w-[340px]" : ""}>
              <PujaServicesSidebar page="home" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
