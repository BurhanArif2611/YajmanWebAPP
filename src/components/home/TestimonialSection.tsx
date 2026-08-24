"use client";

import { useEffect, useRef } from "react";
import Image from "@/components/ui/AppImage";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { getTestimonials } from "@/lib/api/testimonials";
import type { Testimonial } from "@/types/api";

const ROW_SIZE = 6;
const AUTOPLAY_DELAY = 2200;
const FALLBACK_AVATAR = "/images/testimonials/avatar-1.png";

function buildRow(testimonials: Testimonial[], offset: number) {
  if (!testimonials.length) return [];
  return Array.from(
    { length: ROW_SIZE },
    (_, i) => testimonials[(i + offset) % testimonials.length]
  );
}

export function TestimonialSection() {
  const testimonialsQuery = useQuery({
    queryKey: ["testimonials", "home"],
    queryFn: () => getTestimonials("home"),
    staleTime: 5 * 60_000,
  });

  const testimonials = testimonialsQuery.data ?? [];
  if (!testimonialsQuery.isLoading && !testimonials.length) return null;

  const row1 = buildRow(testimonials, 0);
  const row2 = buildRow(testimonials, 1);

  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-site px-4 py-10 md:px-8 md:py-16 lg:px-16 lg:py-8">
        <SectionHeader
          eyebrow="Our Testimonial"
          heading="What our customers talk about us."
          headingClassName="lg:text-6xl"
        />
      </div>

      {testimonialsQuery.isLoading ? (
        <div className="mt-8 flex flex-col gap-4 px-4 sm:mt-10 sm:gap-6 md:mt-14 md:px-8 lg:px-16">
          <div className="flex gap-4 overflow-hidden sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-[280px] shrink-0 rounded-2xl sm:w-[360px]" />
            ))}
          </div>
          <div className="flex gap-4 overflow-hidden sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-[280px] shrink-0 rounded-2xl sm:w-[360px]" />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:gap-6 md:mt-14">
          <MarqueeRow items={row1} reverse />
          <MarqueeRow items={row2} />
        </div>
      )}
    </section>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    skipSnaps: true,
  });
  const isHovering = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;

    const tick = () => {
      if (isHovering.current) return;
      if (reverse) {
        emblaApi.scrollPrev();
      } else {
        emblaApi.scrollNext();
      }
    };

    const id = setInterval(tick, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [emblaApi, reverse]);

  return (
    <div
      ref={emblaRef}
      onMouseEnter={() => {
        isHovering.current = true;
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
      className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
    >
      <div className="flex gap-6 pl-4 md:pl-8 lg:pl-16">
        {items.map((testimonial, i) => (
          <div key={`${testimonial.id}-${i}`} className="min-w-0 shrink-0">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl bg-white p-6 shadow-card sm:w-[360px]">
      <div className="flex gap-1 text-brand-saffron-400">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star
            key={s}
            size={16}
            fill={s < testimonial.rating ? "currentColor" : "none"}
            strokeWidth={s < testimonial.rating ? 0 : 1.5}
          />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="flex items-center">
          {/* <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
            99
          </span> */}
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-white">
            <Image
              src={testimonial.author_avatar_url || FALLBACK_AVATAR}
              alt={testimonial.author_name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-text-primary">
            {testimonial.author_name}
          </p>
          {testimonial.author_designation && (
            <p className="text-xs text-text-muted">{testimonial.author_designation}</p>
          )}
        </div>
      </div>
    </div>
  );
}
