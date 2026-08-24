"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg bg-surface-warm border border-gray-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="min-w-0 pr-2 font-sans text-base font-semibold text-text-primary sm:text-lg">
          {title}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-text-primary transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="border-b border-gray-200"></div>}
      {open && (
        <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 sm:pb-6 sm:pt-6">{children}</div>
      )}
    </div>
  );
}
