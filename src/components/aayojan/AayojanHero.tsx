"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { AvatarCluster } from "@/components/aayojan/AvatarCluster";
import type { AayojanBanner } from "@/types/api";

const FALLBACK_BG = "/images/ayongan/image-4.png";
const SLIDE_INTERVAL = 6000;

export function AayojanHero({ banners = [] }: { banners?: AayojanBanner[] }) {
  const apiSlides = [...banners]
    .sort((a, b) => a.display_order - b.display_order)
    .map((b) => b.image_url)
    .filter(Boolean);
  const slides = apiSlides.length ? apiSlides : [FALLBACK_BG];

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative flex min-h-[420px] items-center overflow-hidden bg-surface-peach sm:min-h-[520px] md:min-h-[640px]">
      {slides.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt="Decorated devotional event mandap"
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative mx-auto flex w-full max-w-site flex-col items-center gap-5 px-4 py-14 text-center sm:gap-6 sm:py-20 md:px-8 lg:px-16">
        <h1 className="max-w-3xl font-sans text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-7xl">
          Celebrate Every Sacred Occasion with Yajman
        </h1>
        <p className="max-w-2xl text-sm text-white/85 sm:text-base md:text-lg">
          From intimate Bhajan Sandhya to grand spiritual gatherings, we plan
          and manage devotional events with authenticity, devotion, and
          perfection.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <ButtonLink href="#contact" size="lg" className="w-full rounded-full sm:w-auto">
            Plan Your Event <ArrowUpRight size={18} />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="w-full gap-2 rounded-full border-white uppercase tracking-wide text-white hover:bg-white/10 sm:w-auto"
          >
            Talk To Our Expert
            <ArrowUpRight size={18} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
