"use client";

import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ArticleServiceCard } from "@/components/articles/ArticleServiceCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { getCategories } from "@/lib/api/catalog";
import { getServices } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";

const LIMIT = 4;

function RelatedServiceSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

/** Shown at the bottom of an article detail page — pulls services from categories that don't require online payment. */
export function RelatedServices({ excludeSlug }: { excludeSlug?: string }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  const freeCategory = categoriesQuery.data?.find((c) => c.requires_payment === false);

  const servicesQuery = useQuery({
    queryKey: ["services", "related-articles", freeCategory?.id],
    queryFn: () =>
      getServices({ category: freeCategory?.id, limit: LIMIT + 1, requires_payment: false }),
    enabled: !!freeCategory,
    staleTime: 5 * 60_000,
  });

  const isLoading = categoriesQuery.isLoading || servicesQuery.isLoading;
  const services = (servicesQuery.data?.data ?? [])
    .filter((s) => s.slug !== excludeSlug)
    .slice(0, LIMIT)
    .map(mapServiceToCard);

  if (!isLoading && !services.length) return null;

  return (
    <section className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
      <div className="relative rounded-2xl bg-surface-peach p-6 md:p-16">
        <Image
          src="/images/decor/side-deco.png"
          alt="decoration"
          width={300}
          height={300}
          className="absolute top-0 left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10"
        />
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-sans text-2xl font-semibold text-text-primary md:text-3xl">
            Related Articles
          </h2>
          <Link
            href="/articles"
            className="flex items-center gap-1 text-sm font-semibold text-brand-saffron-400"
          >
            View More
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: LIMIT }).map((_, i) => <RelatedServiceSkeleton key={i} />)
            : services.map((service) => (
                <ArticleServiceCard key={service.slug} service={service} />
              ))}
        </div>
      </div>
    </section>
  );
}
