"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ARTICLE_TABS } from "@/lib/constants";

export function ArticleCategoryTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 border-b border-border pb-4">
      {ARTICLE_TABS.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={cn(
            "min-h-[44px] border-b-2 px-1 text-lg font-medium transition-colors",
            active === i
              ? "border-brand-saffron-400 text-text-primary"
              : "border-transparent text-text-light hover:text-text-secondary"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
