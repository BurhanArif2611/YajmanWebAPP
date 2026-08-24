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
    <div className="my-3 flex flex-col gap-4 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:rounded-none sm:border-0 sm:border-b sm:border-border-dark/20 sm:px-5 sm:py-6 sm:last:border-b-0">
      <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-24">
          <Image
            src={resolveImageUrl(booking.service_image)}
            alt={booking.service_title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-sans text-base font-semibold text-text-primary sm:text-lg">
            {booking.service_title}
          </h3>
          <div className="mt-1.5 flex flex-col gap-1.5 text-xs text-text-muted sm:mt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="shrink-0 text-brand-saffron-400" />
              <span>
                {format(datetime, "EEE, d MMM yyyy")} · {format(datetime, "h:mm a")}
              </span>
            </span>
            <span className="flex items-start gap-1.5">
              <MapPin size={13} className="mt-0.5 shrink-0 text-brand-saffron-400" />
              <span className="break-words">
                {location}
                {PANDIT_ASSIGNED_STATUSES.has(booking.status) ? "" : " · Pandit to be assigned"}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-border pt-3 sm:border-0 sm:pt-0 sm:items-end">
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <StatusBadge status={booking.status} />
          <span className="text-xs text-text-muted">{booking.order_number}</span>
        </div>
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-start">
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
    </div>
  );
}
