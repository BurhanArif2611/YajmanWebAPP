"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

/** Custom dropdown styled to match Input — use instead of a native <select> wherever the site's theme needs to own the popup. */
export function Select({
  value,
  onChange,
  options,
  placeholder = "Select",
  containerClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-[56px] w-full items-center justify-between gap-3 rounded-md border border-border-dark bg-white px-4 text-left transition-colors",
          open && "border-brand-saffron-400",
          containerClassName
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-base font-medium",
            selected ? "text-text-primary" : "text-text-light"
          )}
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-text-muted transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-full overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-modal">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-text-primary hover:bg-surface-muted"
            >
              {option.label}
              {option.value === value && <Check size={16} className="text-brand-saffron-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
