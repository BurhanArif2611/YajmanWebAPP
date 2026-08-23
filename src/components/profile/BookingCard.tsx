import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/profile/StatusBadge";
import { resolveImageUrl } from "@/lib/mappers/service";
import { formatPrice } from "@/lib/utils";
import type { Booking } from "@/types/api";

const PANDIT_ASSIGNED_STATUSES = new Set(["pandit_assigned", "in_progress", "completed"]);

export function BookingCard({ booking }: { booking: Booking }) {
  const datetime = parseISO(booking.booking_datetime);
  const location = booking.city || booking.address || "Address not provided";

  return (
    <div className="flex flex-col bg-white rounded-lg my-3 px-5 gap-4 border-b border-border-dark/20 py-6 last:border-b-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={resolveImageUrl(booking.service_image)}
          alt={booking.service_title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-sans text-lg font-semibold text-text-primary">
          {booking.service_title}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-saffron-400" />
            {format(datetime, "EEE, d MMM yyyy")} · {format(datetime, "h:mm a")}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brand-saffron-400" />
            {location}
            {PANDIT_ASSIGNED_STATUSES.has(booking.status) ? "" : " · Pandit to be assigned"}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
        <span className="flex items-center gap-2">
          <StatusBadge status={booking.status} />
          <span className="text-xs text-text-muted">{booking.order_number}</span>
        </span>
        <span className="text-sm font-semibold text-text-primary">
          {formatPrice(Number(booking.total_amount))}
        </span>
        <Link
          href={`/profile/bookings/${booking.id}`}
          className="text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          Check Details
        </Link>
      </div>
    </div>
  );
}
