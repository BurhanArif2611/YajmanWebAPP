/** Fixed set of puja preference checkboxes shown on the service detail page
 * booking widget, carried through checkout, and shown back on booking detail
 * views (customer profile + pandit assignment detail + admin). Keys must
 * match checkout.schema.ts's `preferences` enum on the backend. */
export const BOOKING_PREFERENCES = [
  { key: "experienced_pandit", label: "Experienced Pandit Ji" },
  { key: "shastriya_vidhi", label: "Shastriya Vidhi Anusaar" },
  { key: "full_video", label: "Receive Full Video" },
] as const;

export type BookingPreferenceKey = (typeof BOOKING_PREFERENCES)[number]["key"];

/** sessionStorage key BookingWidget writes to on "Book Now" and the checkout
 * flow reads from — one-shot handoff between the service page and /checkout. */
export const BOOKING_PREFERENCES_STORAGE_KEY = "yajman:booking-preferences";

export function bookingPreferenceLabel(key: string): string {
  return BOOKING_PREFERENCES.find((p) => p.key === key)?.label ?? key;
}
