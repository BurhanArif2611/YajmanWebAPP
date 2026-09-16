"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function ScrollableBenefitBadges({ benefits }: { benefits: string[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateOverflow = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) return;

    const hasOverflow = element.scrollWidth > element.clientWidth + 1;
    setOverflowing(hasOverflow);
    setCanScrollLeft(hasOverflow && element.scrollLeft > 1);
    setCanScrollRight(
      hasOverflow &&
        element.scrollLeft + element.clientWidth < element.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    const element = scrollerRef.current;
    if (!element) return;

    updateOverflow();
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(element);
    return () => observer.disconnect();
  }, [benefits, updateOverflow]);

  const scroll = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 140,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-w-0">
      <div
        ref={scrollerRef}
        onScroll={updateOverflow}
        className={`flex gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          overflowing ? "px-4 sm:px-5" : ""
        }`}
      >
        {benefits.map((benefit, index) => (
          <Badge
            key={`${benefit}-${index}`}
            variant="peach"
            className="shrink-0 px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs"
          >
            {benefit}
          </Badge>
        ))}
      </div>

      {overflowing && (
        <>
          <button
            type="button"
            aria-label="Scroll benefits left"
            disabled={!canScrollLeft}
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-brand-saffron-400 disabled:cursor-default disabled:opacity-20"
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-[17px] sm:w-[17px]" />
          </button>
          <button
            type="button"
            aria-label="Scroll benefits right"
            disabled={!canScrollRight}
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-brand-saffron-400 disabled:cursor-default disabled:opacity-20"
          >
            <ChevronRight className="h-3.5 w-3.5 sm:h-[17px] sm:w-[17px]" />
          </button>
        </>
      )}
    </div>
  );
}
