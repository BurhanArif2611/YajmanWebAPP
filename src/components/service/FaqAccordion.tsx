"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border border-border bg-white"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-text-primary sm:px-5 sm:text-base"
            >
              {item.question}
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-text-muted transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm text-text-muted">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
