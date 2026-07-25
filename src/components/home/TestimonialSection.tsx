"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CARD_COUNT = 8;

export function TestimonialSection() {
  const [active, setActive] = useState(0);
  const cards = Array.from({ length: CARD_COUNT }).map(
    (_, i) => TESTIMONIALS[i % TESTIMONIALS.length]
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
        <SectionHeader
          eyebrow="Our Testimonial"
          heading="What our customers talk about us."
          headingClassName="lg:text-6xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((testimonial, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card"
            >
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
                  <p className="text-xs text-text-muted">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <button
              key={testimonial.label}
              onClick={() => setActive(i)}
              className={cn(
                "min-h-[44px] border-b-2 px-1 text-lg font-semibold transition-colors",
                active === i
                  ? "border-brand-saffron-400 text-text-primary"
                  : "border-transparent text-text-light hover:text-text-secondary"
              )}
            >
              {testimonial.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
