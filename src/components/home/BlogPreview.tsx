"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TopoDoodle } from "@/components/ui/TopoDoodle";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  {
    title: "What to pack for a 1 week summer road trip",
    excerpt:
      "I've created a road trip packing list for based off my California coast road trip!",
    image: "/images/misc/promo-items.png",
  },
  {
    title: "10 safest destinations for solo travelers",
    excerpt:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/images/blog/blog-sidebar-1.png",
  },
  {
    title: "The best cities to travel alone",
    excerpt:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/images/blog/blog-sidebar-2.png",
  },
];

const FEATURED = {
  category: "Destinations",
  date: "July 23, 2024",
  author: "admin",
  title: "It is a long established fact that a reader will be distracted",
  excerpt:
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's.....",
  image: "/images/blog/blog-sidebar-1.png",
};

const SIDEBAR = [
  {
    title: "10 Safest Destinations for Solo Female Travelers",
    date: "July 23, 2024",
    image: "/images/blog/blog-sidebar-1.png",
  },
  {
    title: "The Best Cities to Travel Alone",
    date: "July 23, 2024",
    image: "/images/blog/blog-sidebar-2.png",
  },
  {
    title: "Tips for planning a winter road trip",
    date: "July 23, 2024",
    image: "/images/blog/blog-sidebar-3.png",
  },
  {
    title: "The ultimate southwest USA road trip itinerary",
    date: "July 23, 2024",
    image: "/images/blog/blog-sidebar-4.png",
  },
];

export function BlogPreview() {
  const [active, setActive] = useState(0);
  const highlight = HIGHLIGHTS[active];

  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="relative overflow-hidden rounded-[32px] bg-surface-muted p-6 md:p-10 lg:p-14">
        <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute top-0 left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10" />
        <SectionHeader
          eyebrow="Recent News & Blogs"
          heading="News & views from Yajman"
        />

        <div className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1fr_0.85fr]">
          {/* Mini carousel card */}
          <div className="flex flex-col gap-5 rounded-2xl bg-[#1f1f1f] p-6 text-white">
            <div>
              <h3 className="font-sans text-xl font-semibold leading-snug">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{highlight.excerpt}</p>
            </div>

            <div className="relative mt-auto aspect-[4/3] w-full">
              <div className="absolute inset-0 -rotate-3 rounded-xl bg-white/10" />
              <div className="absolute inset-0 rotate-2 overflow-hidden rounded-xl shadow-modal">
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              {HIGHLIGHTS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show highlight ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-brand-saffron-400" : "w-2 bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Featured card */}
          <Link
            href="/blogs/it-is-a-long-established-fact"
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
          >
            <div className="relative h-56 w-full overflow-hidden lg:h-64">
              <Image
                src={FEATURED.image}
                alt={FEATURED.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <p className="flex items-center gap-2 text-xs font-medium text-text-muted">
                <span className="font-semibold text-brand-saffron-400">
                  • {FEATURED.category}
                </span>
                {FEATURED.date} · By {FEATURED.author}
              </p>
              <h3 className="font-sans text-xl font-semibold text-text-primary">
                {FEATURED.title}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2">
                {FEATURED.excerpt}
              </p>
              <span className="mt-auto flex items-center gap-2 text-sm font-medium text-brand-saffron-400">
                <ArrowRight size={16} /> Read More
              </span>
            </div>
          </Link>

          {/* Sidebar list */}
          <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-card">
            {SIDEBAR.map((item, i) => (
              <Link
                key={item.title}
                href="/blogs"
                className={cn(
                  "flex gap-4",
                  i !== SIDEBAR.length - 1 && "border-b border-border pb-5"
                )}
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold leading-snug text-text-primary line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-text-muted">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
