import { notFound } from "next/navigation";
import { BookingDetailView } from "@/components/profile/BookingDetailView";
import { getBookingById } from "@/lib/api/bookings";
import { ApiError } from "@/lib/apiError";
import type { BookingDetail } from "@/types/api";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let booking: BookingDetail | null = null;
  let loadError = false;

  try {
    booking = await getBookingById(id);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 403)) {
      notFound();
    }
    loadError = true;
  }

  if (loadError || !booking) {
    return (
      <div className="rounded-2xl bg-surface-peach p-10 text-center text-text-muted">
        Unable to load this booking right now. Please try again later.
      </div>
    );
  }
  return <BookingDetailView booking={booking} />;
}
