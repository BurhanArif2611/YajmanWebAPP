import { addDays, isAfter, isBefore, parseISO, startOfDay } from "date-fns";

export type BookingAvailability = {
  minAdvanceDays?: number;
  availabilityStart?: string | null;
  availabilityEnd?: string | null;
  availableDates?: string[];
};

export const BOOKING_UNAVAILABLE_MESSAGE =
  "Bookings are not available as the scheduled dates for this puja have passed.";

export function getBookingDateConstraints({
  minAdvanceDays = 0,
  availabilityStart,
  availabilityEnd,
  availableDates,
}: BookingAvailability) {
  const earliestBookable = addDays(new Date(), minAdvanceDays);
  const availabilityStartDate = availabilityStart ? parseISO(availabilityStart) : undefined;
  const minDate =
    availabilityStartDate && isAfter(availabilityStartDate, earliestBookable)
      ? availabilityStartDate
      : earliestBookable;
  const maxDate = availabilityEnd ? parseISO(availabilityEnd) : undefined;
  const fixedDates = availableDates?.length
    ? availableDates.map((d) => parseISO(d))
    : undefined;

  return { minDate, maxDate, fixedDates };
}

/** True when the end date has passed or every fixed schedule date is in the past. */
export function isBookingUnavailable(availability: BookingAvailability): boolean {
  const today = startOfDay(new Date());
  const { maxDate, fixedDates } = getBookingDateConstraints(availability);

  if (fixedDates?.length) {
    return !fixedDates.some((date) => !isBefore(startOfDay(date), today));
  }

  if (maxDate && isBefore(startOfDay(maxDate), today)) {
    return true;
  }

  return false;
}
