"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Astrology",
  "PanditJi At Home",
  "Premium Puja",
  "E-Puja",
  "Puja At Home",
  "Aarti & Katha",
];

const TYPES = ["Health", "Marriage", "Business", "Navgrah", "Festival"];

const TOP_RATED = Array.from({ length: 4 }).map((_, i) => ({
  slug: `top-rated-${i}`,
  title: "New York in 5 Days Guided Sightseeing",
  image: "/images/services/service-shivling.png",
}));

function FilterBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-card">
      <h3 className="font-sans text-base font-semibold text-text-primary">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function FilterSidebar() {
  const [price, setPrice] = useState(181);

  return (
    <aside className="flex flex-col gap-5">
      <FilterBlock title="Filter by Price">
        <input
          type="range"
          min={98}
          max={181}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-brand-saffron-400"
        />
        <p className="mt-2 text-sm text-text-secondary">
          Price: ₹98 - ₹{price}
        </p>
      </FilterBlock>

      <FilterBlock title="Category">
        <ul className="flex flex-col gap-3">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <label className="flex min-h-[24px] items-center gap-3 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border-dark accent-brand-saffron-400"
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </FilterBlock>

      <FilterBlock title="Reviews">
        <ul className="flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <label className="flex min-h-[24px] items-center gap-3 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border-dark accent-brand-saffron-400"
                />
                <span className="flex items-center gap-0.5 text-brand-gold-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < rating ? "currentColor" : "none"}
                      className={cn(i >= rating && "text-border-dark")}
                    />
                  ))}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterBlock>

      <FilterBlock title="Types">
        <ul className="flex flex-col gap-3">
          {TYPES.map((type) => (
            <li key={type}>
              <label className="flex min-h-[24px] items-center gap-3 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border-dark accent-brand-saffron-400"
                />
                {type}
              </label>
            </li>
          ))}
        </ul>
      </FilterBlock>

      <FilterBlock title="Top Rated News">
        <ul className="flex flex-col gap-4">
          {TOP_RATED.map((item) => (
            <li key={item.slug} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-snug text-text-primary">
                  {item.title}
                </p>
                <Link
                  href="#"
                  className="text-xs font-semibold text-brand-saffron-400"
                >
                  Read More →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </FilterBlock>
    </aside>
  );
}
