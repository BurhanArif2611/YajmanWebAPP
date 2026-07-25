"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const VISIBLE_THUMBS = 3;

export function ImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goPrev = () =>
    setActive((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority
        />

        <button
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-card-hover transition-colors hover:bg-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-card-hover transition-colors hover:bg-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {images.slice(0, VISIBLE_THUMBS).map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl ring-2 transition-colors ${
              active === i ? "ring-brand-saffron-400" : "ring-transparent"
            }`}
          >
            <Image
              src={src}
              alt={`${alt} thumbnail ${i + 1}`}
              fill
              sizes="112px"
              className="object-cover"
            />
          </button>
        ))}
        <button
          onClick={() => setLightboxOpen(true)}
          className="text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          View All
        </button>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={active}
        slides={images.map((src) => ({ src }))}
        on={{ view: ({ index }) => setActive(index) }}
      />
    </div>
  );
}
