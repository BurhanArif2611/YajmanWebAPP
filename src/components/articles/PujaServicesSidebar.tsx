"use client";

import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getServicePlacements } from "@/lib/api/servicePlacements";
import {
  getPlacementHeading,
  mapPlacementToSidebarCard,
  sortPlacements,
} from "@/lib/mappers/servicePlacement";
import { Skeleton } from "@/components/ui/Skeleton";
import { hasDiscount } from "@/lib/utils";

const LIMIT = 5;

export function PujaServicesSidebar() {
  const placementsQuery = useQuery({
    queryKey: ["service-placements", "articles", "sidebar", LIMIT],
    queryFn: async () =>
      sortPlacements(
        await getServicePlacements({ page: "articles", section: "sidebar", limit: LIMIT })
      ),
    staleTime: 5 * 60_000,
  });

  const placements = placementsQuery.data ?? [];
  const services = placements.map(mapPlacementToSidebarCard);
  const heading = getPlacementHeading(placements, "Puja Services");

  if (!placementsQuery.isLoading && !services.length) return null;

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-2 font-sans text-lg font-semibold text-text-primary">
          {heading}
        </h3>

        {placementsQuery.isLoading ? (
          <ul className="mt-4 flex flex-col gap-6">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <li key={i} className="flex gap-3">
                <Skeleton className="h-20 w-20 shrink-0 rounded-md" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-4 flex flex-col gap-6">
            {services.map((service) => {
              const showDiscount = hasDiscount(
                service.price,
                service.originalPrice,
                service.discountPercent
              );
              return (
                <li key={service.id} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-text-primary">
                      {service.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-sm font-semibold text-text-primary">
                        ₹{service.price}
                      </span>
                      {showDiscount && (
                        <>
                          <span className="text-xs text-text-light line-through">
                            ₹{service.originalPrice}
                          </span>
                          {service.discountPercent > 0 && (
                            <span className="text-xs font-medium text-success">
                              -{service.discountPercent}%
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <Link
                      href={`/services/${service.category}/${service.slug}`}
                      className="mt-1 inline-block rounded-full bg-brand-saffron-400 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {service.ctaText}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
