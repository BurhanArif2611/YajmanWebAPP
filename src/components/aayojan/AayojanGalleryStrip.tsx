"use client";

import { useState } from "react";
import Image from "@/components/ui/AppImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { AayojanGallery } from "@/types/api";

export function AayojanGalleryStrip({ images }: { images: AayojanGallery[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const gallery = images
    .filter((img) => img.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  if (!gallery.length) return null;

  return (
    <section className="mx-auto max-w-site px-4 pb-16 md:px-8 lg:px-16 lg:py-16">
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full bg-white text-text-primary shadow-card-hover lg:flex"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="-ml-4 flex">
            {gallery.map((image, i) => (
              <div
                key={image.id}
                className="flex-[0_0_50%] pl-4 sm:flex-[0_0_33.333%] lg:flex-[0_0_20%]"
              >
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image.image_url}
                    alt="Yajman devotional event moment"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="Next"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-5 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover lg:flex"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        close={() => setLightboxIndex(null)}
        index={lightboxIndex ?? 0}
        slides={gallery.map((image) => ({ src: image.image_url }))}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </section>
  );
}
