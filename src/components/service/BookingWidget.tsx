"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarX2 } from "lucide-react";
import Image from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { DatePickerField } from "@/components/service/DatePickerField";
import {
  BOOKING_UNAVAILABLE_MESSAGE,
  getBookingDateConstraints,
  isBookingUnavailable,
  type BookingAvailability,
} from "@/lib/bookingDates";
import { hasDiscount } from "@/lib/utils";
import { looksLikeHtml, RICH_TEXT_PROSE_CLASS } from "@/lib/richText";
import { BOOKING_PREFERENCES, BOOKING_PREFERENCES_STORAGE_KEY, BOOKING_QUANTITY_STORAGE_KEY } from "@/lib/bookingPreferences";
import { QuantityStepper } from "@/components/service/QuantityStepper";
import type { MockService } from "@/lib/constants";

const PREFERENCE_ICONS: Record<(typeof BOOKING_PREFERENCES)[number]["key"], string> = {
  experienced_pandit: "🛕",
  shastriya_vidhi: "✨",
  full_video: "🎥",
};

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
  const [quantity, setQuantity] = useState(1);

  const allowQuantity = Boolean(service.allowQuantity);
  const maxQuantity = service.maxQuantity ?? 10;

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
      sessionStorage.removeItem(BOOKING_PREFERENCES_STORAGE_KEY);
      if (allowQuantity) {
        sessionStorage.setItem(BOOKING_QUANTITY_STORAGE_KEY, String(quantity));
      } else {
        sessionStorage.removeItem(BOOKING_QUANTITY_STORAGE_KEY);
      }
    } catch {
      // sessionStorage may be unavailable in private browsing modes.
    }
    const qtyQuery = allowQuantity && quantity > 1 ? `&qty=${quantity}` : "";
    router.push(`/checkout?slug=${service.slug}&date=${format(date, "yyyy-MM-dd")}${qtyQuery}`);
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
              <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <span aria-hidden="true" className="text-brand-gold-400">
                  ☆
                </span>
                Included with Your Puja
              </p>

              <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
                {BOOKING_PREFERENCES.map((preference) => (
                  <div
                    key={preference.key}
                    className="flex min-w-[72%] snap-start flex-col overflow-hidden rounded-xl border border-dashed border-brand-saffron-200 bg-[#fffdf8] sm:min-w-0"
                  >
                    <div className="flex min-h-28 flex-1 flex-col items-center justify-center px-3 py-4 text-center">
                      <span aria-hidden="true" className="text-2xl">
                        {PREFERENCE_ICONS[preference.key]}
                      </span>
                      <p className="mt-2 text-sm font-semibold leading-snug text-text-primary">
                        {preference.label}
                      </p>
                    </div>
                    <div className="bg-brand-navy px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-wider text-brand-saffron-200">
                      ✓ Included
                    </div>
                  </div>
                ))}
              </div>
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

            {allowQuantity && (
              <div className="mt-4">
                <QuantityStepper
                  value={quantity}
                  max={maxQuantity}
                  onChange={setQuantity}
                />
                <p className="mt-2 text-sm text-text-muted">
                  ₹{service.price} × {quantity} = ₹{service.price * quantity}
                </p>
              </div>
            )}

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
