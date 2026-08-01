"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { getCategories } from "@/lib/api/catalog";

export function CategorySection() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60_000,
  });

  // Fall back to the local pixel-matched set while loading or if the API
  // is empty/unavailable, so this section never renders broken or blank.
  const categories = categoriesQuery.data?.length
    ? categoriesQuery.data.map((c) => ({
      slug: c.slug,
      name: c.name,
      image: c.image_url || "",
    }))
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    queueMicrotask(update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section className="relative mx-auto max-w-site px-4 pb-16 pt-28 md:px-8 md:pt-32 lg:px-16 lg:py-36 lg:pb-0">
      <SectionHeader
        eyebrow="Sacred Services"
        heading="Explore by Category"
        subtitle="This service has taken my business to a whole new level. The design & functionality are both outstanding and user friendly."
      />

      {categoriesQuery.isLoading ? (
        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
      <>
      <div className="relative mt-14">
        <button
          aria-label="Previous categories"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-0 top-[40%] z-10 hidden h-11 w-11 -translate-x-5 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover transition-transform duration-200 hover:scale-105 lg:flex"
        >
          <ArrowLeft size={18} />
        </button>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-5 flex">
            {[...categories].map((category, i) => (
              <div
                key={`${category.slug}-${i}`}
                className="flex-[0_0_45%] pl-5 sm:flex-[0_0_31%] lg:flex-[0_0_19%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                >
                  <Link
                    href={`/services?category=${category.slug}`}
                    className="group flex flex-col items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-peach"
                    >
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 20vw"
                        className="object-cover"
                      />
                    </motion.div>
                    <span className="font-sans text-lg font-semibold text-text-primary transition-colors group-hover:text-brand-saffron-400">
                      {category.name}
                    </span>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Next categories"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-0 top-[40%] z-10 hidden h-11 w-11 translate-x-5 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover transition-transform duration-200 hover:scale-105 lg:flex"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className="relative flex h-2.5 w-6 items-center justify-center"
          >
            <span className="h-2.5 w-2.5 rounded-full border border-border-dark" />
            {i === selectedIndex && (
              <motion.span
                layoutId="category-dot"
                className="absolute inset-0 rounded-full bg-brand-saffron-400"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      </>
      )}
    </section>
  );
}
