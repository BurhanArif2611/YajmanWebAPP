"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarX2 } from "lucide-react";
import Image from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { DatePickerField } from "@/components/service/DatePickerField";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  BOOKING_UNAVAILABLE_MESSAGE,
  getBookingDateConstraints,
  isBookingUnavailable,
  type BookingAvailability,
} from "@/lib/bookingDates";
import { hasDiscount } from "@/lib/utils";
import { looksLikeHtml, RICH_TEXT_PROSE_CLASS } from "@/lib/richText";
import { BOOKING_PREFERENCES, BOOKING_PREFERENCES_STORAGE_KEY } from "@/lib/bookingPreferences";
import type { MockService } from "@/lib/constants";

export function BookingWidget({
  service,
  about,
  bookingAvailability,
}: {
  service: MockService;
  about?: string | null;
  bookingAvailability: BookingAvailability;
}) {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);

  const togglePreference = (key: string) => {
    setPreferences((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const bookingUnavailable = isBookingUnavailable(bookingAvailability);
  const { minDate, maxDate, fixedDates } = getBookingDateConstraints(bookingAvailability);
  const showDiscount = hasDiscount(
    service.price,
    service.originalPrice,
    service.discountPercent
  );
  const aboutText = about?.trim() || "";

  const handleBookNow = () => {
    if (bookingUnavailable) return;
    if (!date) {
      setDateError(true);
      return;
    }
    try {
      sessionStorage.setItem(BOOKING_PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // sessionStorage unavailable (private mode etc.) — checkout just won't prefill preferences
    }
    router.push(`/checkout?slug=${service.slug}&date=${format(date, "yyyy-MM-dd")}`);
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="rounded-2xl bg-white p-4 shadow-card sm:p-6">
        <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
          About this Puja
        </h2>
        {aboutText ? (
          looksLikeHtml(aboutText) ? (
            <article
              className={`${RICH_TEXT_PROSE_CLASS} mt-3 text-sm sm:text-base`}
              dangerouslySetInnerHTML={{ __html: aboutText }}
            />
          ) : (
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-text-muted">
              {aboutText}
            </p>
          )
        ) : null}

        <div className="mt-5 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-semibold text-text-primary sm:text-2xl">
            ₹{service.price}
          </span>
          {showDiscount && (
            <>
              <span className="text-sm text-text-light line-through">
                ₹{service.originalPrice}
              </span>
              {service.discountPercent > 0 && (
                <span className="text-sm font-medium text-success">
                  -{service.discountPercent}%
                </span>
              )}
            </>
          )}
        </div>

        {bookingUnavailable ? (
          <div
            role="status"
            className="mt-4 flex items-start gap-3 rounded-xl border border-error/20 bg-error/5 px-4 py-3"
          >
            <CalendarX2 size={20} className="mt-0.5 shrink-0 text-error" />
            <p className="text-sm font-medium leading-relaxed text-error">
              {BOOKING_UNAVAILABLE_MESSAGE}
            </p>
          </div>
        ) : (
          <>
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

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {BOOKING_PREFERENCES.map((pref) => (
                <div
                  key={pref.key}
                  className="flex items-center rounded-xl border border-border bg-white px-3 py-2.5 transition-colors hover:border-brand-saffron-300"
                >
                  <Checkbox
                    checked={preferences.includes(pref.key)}
                    onChange={() => togglePreference(pref.key)}
                    label={pref.label}
                    containerClassName="gap-2 text-sm font-medium"
                  />
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="mt-4 w-full justify-center rounded-full"
              onClick={handleBookNow}
            >
              Select Date &amp; Book Now
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-text-light">
        <span className="h-px flex-1 bg-border" />
        Or
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col items-center gap-2 rounded-2xl bg-surface-peach p-4 text-center sm:p-6">
        <p className="text-sm text-text-muted">Need help? Talk to an expert.</p>
        <a
          href="https://wa.me/918109181057"
          className="flex flex-wrap items-center justify-center gap-2 font-sans text-lg font-semibold text-text-primary sm:text-xl"
        >
          <Image
            src="/images/share/whatsapp.svg"
            alt="WhatsApp"
            width={20}
            height={20}
          />
          +91 81091 81057
        </a>
      </div>
    </div>
  );
}
