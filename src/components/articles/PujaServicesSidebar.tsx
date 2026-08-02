"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";
import { Skeleton } from "@/components/ui/Skeleton";
import { BLOG_PROMO_CARDS } from "@/lib/constants";

const LIMIT = 4;

export function PujaServicesSidebar() {
  const bestsellersQuery = useQuery({
    queryKey: ["services", "bestseller", "sidebar"],
    queryFn: () => getServices({ is_bestseller: true, limit: LIMIT }),
    staleTime: 5 * 60_000,
  });

  const services = bestsellersQuery.data?.data.map(mapServiceToCard) ?? [];

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6  border border-gray-200">
        <h3 className="font-sans text-lg mb-2 font-semibold text-text-primary">
          Puja Services
        </h3>

        {bestsellersQuery.isLoading ? (
          <ul className="mt-4 flex flex-col gap-6">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <li key={i} className="flex gap-3">
                <Skeleton className="h-20 w-20 shrink-0 rounded-md" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </li>
            ))}
          </ul>
        ) : services.length ? (
          <ul className="mt-4 flex flex-col gap-6">
            {services.map((service) => (
              <li key={service.slug} className="flex gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-snug text-text-primary line-clamp-1">
                    {service.title}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-text-primary">
                      ₹{service.price}
                    </span>
                    <span className="text-xs text-text-light line-through">
                      ₹{service.originalPrice}
                    </span>
                    <span className="text-xs font-medium text-success">
                      -{service.discountPercent}%
                    </span>
                  </div>
                  <Link
                    href={`/services/${service.category}/${service.slug}`}
                    className="mt-1 inline-block rounded-full bg-brand-saffron-400 px-3 py-1 text-xs font-semibold text-white"
                  >
                    Book Now
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-text-muted">No bestsellers right now.</p>
        )}
      </div>

      {BLOG_PROMO_CARDS.map((card, i) => (
        <div key={i} className="relative h-80 w-full overflow-hidden rounded-2xl">
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="320px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 font-sans text-base font-semibold text-white">
            {card.title}
          </p>
        </div>
      ))}
    </aside>
  );
}
