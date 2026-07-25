"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";

export function DatePickerField({
  defaultDate,
}: {
  defaultDate?: Date;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    defaultDate ?? new Date(2026, 5, 9)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[56px] w-full items-center justify-between rounded-xl border border-border-dark px-4 text-sm font-medium text-text-primary"
      >
        <span className="flex items-center gap-2">
          <CalendarIcon size={18} className="text-brand-saffron-400" />
          {selected ? format(selected, "EEEE. MMM d, yyyy") : "Select a date"}
        </span>
        <ChevronDown size={16} className="text-text-muted" />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 rounded-2xl border border-border bg-white p-3 shadow-modal">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                setSelected(date);
                setOpen(false);
              }
            }}
            disabled={{ before: new Date() }}
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
