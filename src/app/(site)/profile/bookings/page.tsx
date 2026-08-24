import { BookingCard } from "@/components/profile/BookingCard";
import { EmptyBookings } from "@/components/profile/EmptyBookings";
import { Pagination } from "@/components/ui/Pagination";
import { getBookings } from "@/lib/api/bookings";
import type { BookingStatusFilter } from "@/types/api";

export const metadata = {
  title: "Bookings | Yajman",
};

const PAGE_SIZE = 10;

const TAB_COPY: Record<string, { heading: string; subtitle: string; status?: BookingStatusFilter }> = {
  all: {
    heading: "All Bookings",
    subtitle: "View every puja you've booked with us.",
  },
  active: {
    heading: "Active Bookings",
    subtitle: "View and manage your current bookings here.",
    status: "upcoming",
  },
  completed: {
    heading: "Completed Bookings",
    subtitle: "Pujas that have already been performed.",
    status: "completed",
  },
  cancelled: {
    heading: "Canceled Bookings",
    subtitle: "Bookings you've cancelled.",
    status: "cancelled",
  },
};

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>;
}) {
  const { tab = "active", page: pageParam } = await searchParams;
  const copy = TAB_COPY[tab] ?? TAB_COPY.active;
  const page = Number(pageParam ?? 1) || 1;

  let bookings: Awaited<ReturnType<typeof getBookings>>["data"] = [];
  let pageCount = 1;
  let loadError = false;

  try {
    const result = await getBookings({ page, limit: PAGE_SIZE, status: copy.status });
    bookings = result.data;
    pageCount = result.pagination?.total_pages ?? 1;
  } catch {
    loadError = true;
  }

  return (
    <div className="rounded-2xl bg-surface-peach p-4 sm:p-6 md:p-10">
      <h1 className="font-sans text-xl font-bold text-text-primary sm:text-2xl md:text-3xl">
        {copy.heading}
      </h1>
      <p className="mt-1 text-sm text-text-muted">{copy.subtitle}</p>

      {loadError ? (
        <p className="mt-10 text-center text-text-muted">
          Unable to load your bookings right now. Please try again later.
        </p>
      ) : bookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <>
          <div className="mt-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
          <Pagination pageCount={pageCount} />
        </>
      )}
    </div>
  );
}
