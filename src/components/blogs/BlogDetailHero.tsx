"use client";

import { useState } from "react";
import Image from "@/components/ui/AppImage";
import { cn } from "@/lib/utils";

export function BlogDetailHero({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[420px]">
      <Image
        src={images[active]}
        alt={alt}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 1000px"
        className="object-cover"
      />

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Show image ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-white" : "w-2 bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
