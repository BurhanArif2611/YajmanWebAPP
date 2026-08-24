"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar as CalendarIcon, ChevronDown, Info } from "lucide-react";
import { DayPicker, type Matcher } from "react-day-picker";
import "react-day-picker/style.css";
import { format, isSameDay } from "date-fns";

export function DatePickerField({
  selected,
  onSelect,
  minDate = new Date(),
  maxDate,
  availableDates,
}: {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
  minDate?: Date;
  /** Latest bookable date — e.g. the service's availability_end_date. */
  maxDate?: Date;
  /** If set, only these exact dates are bookable (overrides minDate/maxDate for disabling). */
  availableDates?: Date[];
}) {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const hasFixedDates = Boolean(availableDates?.length);

  const disabled: Matcher[] = hasFixedDates
    ? [(date) => !availableDates!.some((d) => isSameDay(d, date))]
    : [{ before: minDate }, ...(maxDate ? [{ after: maxDate }] : [])];

  const infoMessage = hasFixedDates
    ? `This puja is only performed on fixed dates set by the temple/pandit's schedule: ${availableDates!
        .map((d) => format(d, "MMM d, yyyy"))
        .join(", ")}.`
    : maxDate
      ? `Bookings are open from ${format(minDate, "MMM d, yyyy")} to ${format(maxDate, "MMM d, yyyy")}, based on the pandit/temple's availability for this puja.`
      : `Bookings open from ${format(minDate, "MMM d, yyyy")} onward, to allow enough time to prepare for this puja.`;

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-[48px] min-w-0 flex-1 items-center justify-between gap-2 rounded-xl border border-border-dark px-3 text-sm font-medium text-text-primary sm:min-h-[56px] sm:px-4"
        >
          <span className="flex min-w-0 items-center gap-2">
            <CalendarIcon size={18} className="shrink-0 text-brand-saffron-400" />
            <span className="truncate">
              {selected ? format(selected, "EEE, MMM d, yyyy") : "Select a date"}
            </span>
          </span>
          <ChevronDown size={16} className="shrink-0 text-text-muted" />
        </button>

        <button
          type="button"
          aria-label="Why are only these dates available?"
          onClick={() => setInfoOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-muted hover:bg-surface-muted"
        >
          <Info size={18} />
        </button>
      </div>

      {infoOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-border bg-white p-4 text-sm text-text-muted shadow-modal">
          {infoMessage}
        </div>
      )}

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 max-w-[calc(100vw-2rem)] overflow-x-auto rounded-2xl border border-border bg-white p-2 shadow-modal sm:p-3">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onSelect(date);
                setOpen(false);
              }
            }}
            disabled={disabled}
            startMonth={hasFixedDates ? availableDates![0] : minDate}
            endMonth={hasFixedDates ? availableDates![availableDates!.length - 1] : maxDate}
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
