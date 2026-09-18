"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "@/components/ui/AppImage";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/lib/api/banners";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import type { Banner, BannerPosition } from "@/types/api";

const SLIDE_INTERVAL = 6000;

type Variant = "category" | "middle" | "offer";

type CmsBannerStripProps = {
  position: Exclude<BannerPosition, "hero_slider">;
  variant: Variant;
};

function bannerHref(url: string | null | undefined) {
  const trimmed = url?.trim();
  return trimmed || null;
}

function BannerSlide({
  banner,
  variant,
  isActive,
  isPriority,
}: {
  banner: Banner;
  variant: Variant;
  isActive: boolean;
  isPriority: boolean;
}) {
  const href = bannerHref(banner.link_url);
  const mobileSrc = banner.mobile_image_url || banner.image_url;
  const desktopSrc = banner.image_url;
  const showCopy = variant === "offer" && Boolean(banner.title || banner.subtitle);

  const frame = (
    <>
      <Image
        src={mobileSrc}
        alt={banner.title || ""}
        fill
        priority={isPriority}
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-700 md:hidden",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />
      <Image
        src={desktopSrc}
        alt={banner.title || ""}
        fill
        priority={isPriority}
        sizes="100vw"
        className={cn(
          "hidden object-cover transition-opacity duration-700 md:block",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />
      {showCopy && isActive && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-black/20 to-transparent">
          <div className="mx-auto w-full max-w-site px-4 pb-8 md:px-8 md:pb-12 lg:px-16">
            {banner.title && (
              <h2 className="max-w-xl font-sans text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                {banner.title}
              </h2>
            )}
            {banner.subtitle && (
              <p className="mt-2 max-w-lg text-sm text-white/85 sm:text-base">{banner.subtitle}</p>
            )}
          </div>
        </div>
      )}
    </>
  );

  const className = "absolute inset-0";

  if (!href) {
    return <div className={className}>{frame}</div>;
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {frame}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {frame}
    </Link>
  );
}

export function CmsBannerStrip({ position, variant }: CmsBannerStripProps) {
  const bannersQuery = useQuery({
    queryKey: ["banners", position],
    queryFn: () => getBanners(position),
    staleTime: 5 * 60_000,
  });

  const banners = [...(bannersQuery.data ?? [])].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    queueMicrotask(() => setActive(0));
    if (banners.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % banners.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(id);
  }, [banners.length]);

  if (!bannersQuery.isLoading && !banners.length) return null;

  const frameClass =
    variant === "offer"
      ? "relative min-h-[220px] overflow-hidden sm:min-h-[280px] md:min-h-[360px]"
      : variant === "middle"
        ? "relative aspect-[16/6] overflow-hidden rounded-2xl sm:aspect-[21/6]"
        : "relative aspect-[16/5] overflow-hidden rounded-2xl sm:aspect-[21/5]";

  const inner = (
    <>
      {bannersQuery.isLoading ? (
        <Skeleton className="absolute inset-0 rounded-none" />
      ) : (
        banners.map((banner, i) => (
          <BannerSlide
            key={banner.id}
            banner={banner}
            variant={variant}
            isActive={i === active}
            isPriority={i === 0}
          />
        ))
      )}
    </>
  );

  if (variant === "offer") {
    return <section className={frameClass}>{inner}</section>;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-4 py-6 md:px-8 md:py-8 lg:px-16">
        <div className={cn(frameClass, "bg-surface-peach shadow-card")}>{inner}</div>
      </div>
    </section>
  );
}
