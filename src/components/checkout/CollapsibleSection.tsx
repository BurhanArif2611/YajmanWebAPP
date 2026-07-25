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
        className="flex min-h-[44px] w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-sans text-lg font-semibold text-text-primary">
          {title}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "text-text-primary transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="border-b border-gray-200"></div>}
      {open && <div className="flex flex-col gap-5 px-6 pt-6 pb-6">{children}</div>}
    </div>
  );
}
