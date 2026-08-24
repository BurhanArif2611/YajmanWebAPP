"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

/** Custom date popup styled to match Input — use instead of a native <input type="date"> wherever the site's theme needs to own the calendar. */
export function DateField({
  selected,
  onSelect,
  minDate = new Date(),
  placeholder = "Select a date",
  containerClassName,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  minDate?: Date;
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex min-h-[56px] w-full items-center gap-3 rounded-md border border-border-dark bg-white px-4 text-left transition-colors",
          open && "border-brand-saffron-400",
          containerClassName
        )}
      >
        <CalendarIcon size={18} className="shrink-0 text-brand-saffron-400" />
        <span
          className={cn(
            "text-base font-medium",
            selected ? "text-text-primary" : "text-text-light"
          )}
        >
          {selected ? format(selected, "EEEE, MMM d, yyyy") : placeholder}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-2xl border border-border bg-white p-2 shadow-modal sm:p-3">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onSelect(date);
                setOpen(false);
              }
            }}
            disabled={{ before: minDate }}
            startMonth={minDate}
            classNames={{
              today: "text-brand-saffron-400 font-semibold",
              selected: "!bg-brand-saffron-400 !text-white rounded-full",
              day_button: "rounded-full",
            }}
            styles={{
              root: { margin: 0 },
            }}
          />
        </div>
      )}
    </div>
  );
}
