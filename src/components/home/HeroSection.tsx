"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Calendar,
  Clock,
  Flame,
  MoreHorizontal,
  Music,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { getBanners } from "@/lib/api/banners";
import { getTypes } from "@/lib/api/catalog";
import { Skeleton } from "@/components/ui/Skeleton";

const POPULAR_SEARCHES = [
  "Pandit ji at Home",
  "Brahmin Bhoj",
  "Puja at Pilgrimage",
  "Bhajan Sandhya",
];

const QUICK_LINKS = [
  { label: "Bhajan Lyrics", icon: Music },
  { label: "Festival", icon: PartyPopper },
  { label: "Tithi", icon: Calendar },
  { label: "Panchang", icon: BookOpen },
  { label: "Choghadiya", icon: Clock },
  { label: "Katha", icon: Sparkles },
  { label: "Aarti", icon: Flame },
  { label: "View More", icon: MoreHorizontal },
];

const FALLBACK_BG = "/images/hero-bg.png";
const SLIDE_INTERVAL = 6000;

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

  // Fall back to the static lucide-icon set while loading or if the API
  // is empty/unavailable, so the quick-links row is never blank.
  const quickLinks = typesQuery.data?.length
    ? typesQuery.data.map((t) => ({
        label: t.name,
        href: `/services?type=${t.id}`,
        iconUrl: t.icon_url || t.image_url,
      }))
    : QUICK_LINKS.map(({ label, icon: Icon }) => ({ label, href: "/services", Icon }));


  const slides = bannersQuery.data?.length
    ? bannersQuery.data.map((b) => b.image_url)
    : [FALLBACK_BG];

  const [active, setActive] = useState(0);

  useEffect(() => {
    queueMicrotask(() => setActive(0));
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative bg-surface-peach">
      {slides.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      <div className="relative mx-auto  max-w-site gap-10 px-4 pb-20 pt-12 md:px-8  lg:px-16 lg:pb-28 lg:pt-16">
        <div className="flex flex-col pt-10 pb-10 gap-6 pl-[150px]">
          <h1 className="max-w-3xl font-sans text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-9xl lg:leading-[1.1]">
            Connect With{" "}
            <span className="text-brand-saffron-400">Divinity.</span> Book
            Puja In Minutes
          </h1>
          <p className="text-md font-medium text-text-secondary md:text-lg">
            Verified Pandit | Authentic Rituals | Peace Of Mind
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-text-secondary">
              Popular Search:
            </span>
            {POPULAR_SEARCHES.map((tag) => (
              <a
                key={tag}
                href={`/services?search=${encodeURIComponent(tag)}`}
                className="rounded-full border border-border-dark px-3 py-1 text-text-secondary text-sm transition-colors hover:border-brand-saffron-400 hover:text-brand-saffron-400"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[-80px] left-0 w-[75%] right-0 mx-auto z-30">
        <div className="mx-auto w-full max-w-site rounded-2xl bg-white p-4 shadow-card-hover md:p-6">


          <div className=" grid grid-cols-4 gap-3  sm:grid-cols-8">
            {typesQuery.isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-11 w-11 rounded-full" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                ))
              : quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
                      {"iconUrl" in link && link.iconUrl ? (
                        <Image src={link.iconUrl} alt="" fill sizes="44px" className="object-contain p-2.5" />
                      ) : (
                        "Icon" in link && <link.Icon size={20} />
                      )}
                    </span>
                    <span className="text-xs font-semibold text-text-secondary md:text-sm">
                      {link.label}
                    </span>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
