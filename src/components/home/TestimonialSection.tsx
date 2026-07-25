"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";

const ROW_SIZE = 6;
const AUTOPLAY_DELAY = 2200;

function buildRow(offset: number) {
  return Array.from({ length: ROW_SIZE }).map(
    (_, i) => TESTIMONIALS[(i + offset) % TESTIMONIALS.length]
  );
}

const ROW_1 = buildRow(0);
const ROW_2 = buildRow(1);

export function TestimonialSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-8">
        <SectionHeader
          eyebrow="Our Testimonial"
          heading="What our customers talk about us."
          headingClassName="lg:text-6xl"
        />
      </div>

      <div className="mt-14 flex flex-col gap-6">
        {/* left to right */}
        <MarqueeRow items={ROW_1} reverse />
        {/* right to left */}
        <MarqueeRow items={ROW_2} />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof TESTIMONIALS;
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
          <div key={i} className="min-w-0 shrink-0">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
}) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl bg-white p-6 shadow-card sm:w-[360px]">
      <div className="flex gap-1 text-brand-saffron-400">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <h3 className="font-sans text-lg font-bold text-text-primary">
        {testimonial.label}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="flex items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
            99
          </span>
          <div className="relative -ml-4 h-11 w-11 overflow-hidden rounded-full ring-2 ring-white">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-text-primary">
            {testimonial.name}
          </p>
          <p className="text-xs text-text-muted">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  );
}
