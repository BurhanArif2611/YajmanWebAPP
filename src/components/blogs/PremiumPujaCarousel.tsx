"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/service/ServiceCard";
import { SERVICES } from "@/lib/constants";

const VISIBLE = 4;

export function PremiumPujaCarousel() {
  const [offset, setOffset] = useState(0);
  const services = Array.from(
    { length: VISIBLE },
    (_, i) => SERVICES[(offset + i) % SERVICES.length]
  );

  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-decorative text-2xl text-brand-saffron-400 md:text-3xl">
            Discover
          </span>
          <h2 className="mt-1 font-sans text-3xl font-semibold text-text-primary">
            Premium Puja
          </h2>
        </div>
        <Link
          href="/services?category=premium-puja"
          className="text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          View More →
        </Link>
      </div>

      <div className="relative mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div key={`${service.slug}-${offset + i}`}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        <button
          aria-label="Previous"
          onClick={() => setOffset((o) => o - 1)}
          className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover lg:flex"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next"
          onClick={() => setOffset((o) => o + 1)}
          className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover lg:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
