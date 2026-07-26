import { notFound } from "next/navigation";
import { BookingDetailView } from "@/components/profile/BookingDetailView";
import { BOOKINGS } from "@/lib/constants";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = BOOKINGS[Number(id)];

  if (!booking) {
    notFound();
  }

  return <BookingDetailView booking={booking} />;
}
