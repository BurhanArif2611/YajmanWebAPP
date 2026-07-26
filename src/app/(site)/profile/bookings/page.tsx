import { BookingCard } from "@/components/profile/BookingCard";
import { EmptyBookings } from "@/components/profile/EmptyBookings";
import { Pagination } from "@/components/ui/Pagination";
import { BOOKINGS, CANCELLED_BOOKINGS } from "@/lib/constants";

export const metadata = {
  title: "Bookings | Yajman",
};

const TAB_COPY: Record<string, { heading: string; subtitle: string }> = {
  all: {
    heading: "All Bookings",
    subtitle: "View every puja you've booked with us.",
  },
  active: {
    heading: "Active Bookings",
    subtitle: "View and manage your current bookings here.",
  },
  completed: {
    heading: "Completed Bookings",
    subtitle: "Pujas that have already been performed.",
  },
  cancelled: {
    heading: "Canceled Bookings",
    subtitle: "Bookings you've cancelled.",
  },
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "active" } = await searchParams;
  const copy = TAB_COPY[tab] ?? TAB_COPY.active;

  const bookings =
    tab === "cancelled"
      ? CANCELLED_BOOKINGS
      : tab === "completed"
        ? BOOKINGS.filter((b) => b.status === "Completed")
        : tab === "all"
          ? [...BOOKINGS, ...CANCELLED_BOOKINGS]
          : BOOKINGS;

  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <h1 className="font-sans text-2xl font-bold text-text-primary md:text-3xl">
        {copy.heading}
      </h1>
      <p className="mt-1 text-sm text-text-muted">{copy.subtitle}</p>

      {bookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <>
          <div className="mt-6">
            {bookings.map((booking, i) => (
              <BookingCard key={`${booking.id}-${i}`} booking={booking} index={i} />
            ))}
          </div>
          <Pagination pageCount={2} />
        </>
      )}
    </div>
  );
}
