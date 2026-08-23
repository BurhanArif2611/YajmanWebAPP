"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "@/components/ui/AppImage";
import { addDays, format, isAfter, parseISO } from "date-fns";
import { Button } from "@/components/ui/Button";
import { DatePickerField } from "@/components/service/DatePickerField";
import type { MockService } from "@/lib/constants";

const DEFAULT_ABOUT =
  "Discover the perfect escape with our carefully curated travel packages. Whether you're seeking adventure, relaxation, or cultural discovery, our tours are designed to offer unforgettable experiences. Explore breath-taking landscapes, meet friendly locals, and create lasting memories in some of the world's most stunning destinations.";

export function BookingWidget({
  service,
  about,
  minAdvanceDays = 0,
  availabilityStart,
  availabilityEnd,
  availableDates,
}: {
  service: MockService;
  about?: string | null;
  minAdvanceDays?: number;
  /** Earliest date this puja can be scheduled for, e.g. availability_start_date. */
  availabilityStart?: string | null;
  /** Latest date this puja can be scheduled for, e.g. availability_end_date. */
  availabilityEnd?: string | null;
  /** If set, only these exact dates are bookable (fixed-schedule pujas). */
  availableDates?: string[];
}) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState(false);

  const earliestBookable = addDays(new Date(), minAdvanceDays);
  const availabilityStartDate = availabilityStart ? parseISO(availabilityStart) : undefined;
  const minDate =
    availabilityStartDate && isAfter(availabilityStartDate, earliestBookable)
      ? availabilityStartDate
      : earliestBookable;
  const maxDate = availabilityEnd ? parseISO(availabilityEnd) : undefined;
  const fixedDates = availableDates?.length ? availableDates.map((d) => parseISO(d)) : undefined;

  const handleBookNow = () => {
    if (!date) {
      setDateError(true);
      return;
    }
    router.push(`/checkout?slug=${service.slug}&date=${format(date, "yyyy-MM-dd")}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          About this Puja
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {about ?? DEFAULT_ABOUT}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-text-primary">
            ₹{service.price}
          </span>
          <span className="text-sm text-text-light line-through">
            ₹{service.originalPrice}
          </span>
          <span className="text-sm font-medium text-success">
            -{service.discountPercent}%
          </span>
        </div>

        <div className="mt-4">
          <DatePickerField
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setDateError(false);
            }}
            minDate={minDate}
            maxDate={maxDate}
            availableDates={fixedDates}
          />
          {dateError && (
            <p className="mt-2 text-sm font-medium text-error">Please select a date first.</p>
          )}
        </div>

        <Button size="lg" className="mt-4 w-full justify-center rounded-full" onClick={handleBookNow}>
          Select Date &amp; Book Now
        </Button>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-text-light">
        <span className="h-px flex-1 bg-border" />
        Or
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col items-center gap-2 rounded-2xl bg-surface-peach p-6 text-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-card">
          <Image
            src="/images/logo/logo.svg"
            alt="Yajman"
            fill
            sizes="48px"
            className="object-contain p-1.5"
          />
        </div>
        <p className="font-sans text-lg font-semibold text-text-primary">
          Yajman Support
        </p>
        <p className="text-sm text-text-muted">
          Need help? Talk to an expert.
        </p>
        <a
          href="https://wa.me/910255456235"
          className="flex items-center gap-2 font-sans text-xl font-semibold text-text-primary"
        >
          <Image
            src="/images/misc/whatsapp-icon.png"
            alt="WhatsApp"
            width={20}
            height={20}
          />
          + 0255 456 235
        </a>
      </div>
    </div>
  );
}
