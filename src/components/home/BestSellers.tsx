"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/service/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TABS = ["E-puja", "Puja At Home", "Premium Puja"];

const VISIBLE = 4;

export function BestSellers() {
  const [activeTab, setActiveTab] = useState(0);
  const [offset, setOffset] = useState(0);
  const start = activeTab * 3 + offset;
  const services = Array.from(
    { length: VISIBLE },
    (_, i) => SERVICES[(start + i) % SERVICES.length]
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Discover"
            heading="Best Sellers"
            align="left"
            className="items-center text-center sm:items-start sm:text-left"
          />

          <div className="flex flex-wrap items-center justify-center gap-8">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(i);
                  setOffset(0);
                }}
                className={cn(
                  "min-h-[44px] border-b-2 px-1 text-lg font-medium transition-colors",
                  activeTab === i
                    ? "border-brand-saffron-400 text-text-primary"
                    : "border-transparent text-text-light hover:text-text-secondary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <div
                key={`${service.slug}-${start + i}`}
                className="animate-stagger-in opacity-0"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

          <button
            aria-label="Previous services"
            onClick={() => setOffset((o) => o - 1)}
            className="absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Next services"
            onClick={() => setOffset((o) => o + 1)}
            className="absolute right-0 top-1/2 hidden h-11 w-11 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover lg:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
