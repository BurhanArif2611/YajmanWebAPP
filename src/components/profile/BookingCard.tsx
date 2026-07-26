import Image from "next/image";
import Link from "next/link";
import { Calendar, UserCheck } from "lucide-react";
import { StatusBadge } from "@/components/profile/StatusBadge";
import type { Booking } from "@/lib/constants";

export function BookingCard({
  booking,
  index,
}: {
  booking: Booking;
  index: number;
}) {
  return (
    <div className="flex flex-col bg-white rounded-lg my-3 px-5 gap-4 border-b border-border-dark/20 py-6 last:border-b-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={booking.image}
          alt={booking.title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-sans text-lg font-semibold text-text-primary">
          {booking.title}...
        </h3>
        <p className="text-sm text-text-muted line-clamp-1">{booking.excerpt}</p>
        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-saffron-400" />
            {booking.isoDate} · {booking.time}
          </span>
          <span className="flex items-center gap-1.5">
            <UserCheck size={13} className="text-brand-saffron-400" />
            Pandit: {booking.panditAssigned ? "Assigned" : "To be assigned"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
        <span className="flex items-center gap-2">
          <StatusBadge status={booking.status} />
          <span className="text-xs text-text-muted">ID {booking.id}</span>
        </span>
        <Link
          href={`/profile/bookings/${index}`}
          className="text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          Check Details
        </Link>
      </div>
    </div>
  );
}
