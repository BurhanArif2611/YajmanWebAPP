"use client";

import { useQuery } from "@tanstack/react-query";
import { PujaServicesSidebar } from "@/components/articles/PujaServicesSidebar";
import { getServicePlacements } from "@/lib/api/servicePlacements";
import { sortPlacements } from "@/lib/mappers/servicePlacement";

/** Home sidebar placements only — recommended carousel lives after Best Sellers. */
export function HomeCatalogPlacements() {
  const sidebarQuery = useQuery({
    queryKey: ["service-placements", "home", "sidebar", 5],
    queryFn: async () =>
      sortPlacements(
        await getServicePlacements({ page: "home", section: "sidebar", limit: 5 })
      ),
    staleTime: 5 * 60_000,
  });

  if (!sidebarQuery.isLoading && !(sidebarQuery.data?.length ?? 0)) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-4 py-8 md:px-8 md:py-10 lg:px-16">
        <div className="lg:ml-auto lg:max-w-[340px]">
          <PujaServicesSidebar page="home" />
        </div>
      </div>
    </section>
  );
}
