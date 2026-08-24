"use client";

import { useState } from "react";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { differenceInHours, format, parseISO } from "date-fns";
import { CheckCircle2, ChevronLeft, Clock, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/profile/StatusBadge";
import { RateExperienceModal } from "@/components/profile/RateExperienceModal";
import { CancelBookingModal } from "@/components/profile/CancelBookingModal";
import { getBookingInvoice } from "@/lib/api/bookings";
import { resolveImageUrl } from "@/lib/mappers/service";
import { formatPrice } from "@/lib/utils";
import { ApiError } from "@/lib/apiError";
import type { BookingDetail } from "@/types/api";

const CANCELLABLE_STATUSES = new Set(["pending", "confirmed", "pandit_assigned", "in_progress"]);
const CANCEL_CUTOFF_HOURS = 24;

export function BookingDetailView({ booking }: { booking: BookingDetail }) {
  const router = useRouter();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);
  const datetime = parseISO(booking.booking_datetime);
  const hoursUntilBooking = differenceInHours(datetime, new Date());
  const isCancellable = CANCELLABLE_STATUSES.has(booking.status);
  const isTooLateToCancel = hoursUntilBooking < CANCEL_CUTOFF_HOURS;

  const basePrice = Number(booking.base_price);
  const discountAmount = Number(booking.discount_amount);
  const convenienceFee = Number(booking.convenience_fee);
  const addonsTotal = booking.addons.reduce((sum, addon) => sum + Number(addon.price), 0);
  const totalAmount = Number(booking.total_amount);

  const handleDownloadInvoice = async () => {
    setInvoiceError(null);
    setInvoiceLoading(true);
    try {
      const invoice = await getBookingInvoice(booking.id);
      window.open(invoice.pdf_url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setInvoiceError(err instanceof ApiError ? err.message : "Couldn't generate the invoice.");
    } finally {
      setInvoiceLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-surface-peach p-4 sm:p-6 md:p-10">
      <Link
        href="/profile/bookings"
        className="flex w-fit items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-saffron-400"
      >
        <ChevronLeft size={16} />
        Back to bookings
      </Link>

      <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-card sm:mt-6 sm:gap-6 sm:p-6 sm:flex-row sm:items-center sm:justify-between">
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
          <div className="min-w-0">
            <h1 className="font-sans text-lg font-semibold break-words text-text-primary sm:text-xl">
              {booking.service_title}
            </h1>
            <p className="mt-1 text-sm text-text-muted">Order {booking.order_number}</p>
            {booking.pandit ? (
              <p className="mt-2 flex items-start gap-1.5 text-xs text-success">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
                <span className="break-words">Pandit: {booking.pandit.display_name}</span>
              </p>
            ) : (
              <p className="mt-2 text-xs text-text-muted">Pandit: To be assigned</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-border pt-4 sm:flex-col sm:items-end sm:justify-start sm:border-0 sm:pt-0">
          <StatusBadge status={booking.status} />
          <div className="text-right sm:text-right">
            <p className="font-sans text-2xl font-semibold text-text-primary sm:text-3xl">
              {format(datetime, "d")}
            </p>
            <p className="text-sm font-medium text-text-muted sm:text-base">
              {format(datetime, "MMM yyyy")}
            </p>
            <p className="mt-0.5 flex items-center justify-end gap-1.5 text-sm text-text-muted">
              <Clock size={14} />
              {format(datetime, "h:mm a")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white p-4 shadow-card sm:mt-6 sm:p-6">
        <h2 className="font-sans text-lg font-semibold text-text-primary sm:text-xl">
          About this booking
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-sm text-text-secondary sm:flex-row sm:flex-wrap sm:gap-6">
          {Boolean(booking.service_duration_minutes) && (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="shrink-0 text-success" />
              {booking.service_duration_minutes} min duration
            </span>
          )}
          <span className="flex items-start gap-1.5">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
            <span className="break-words">
              {booking.members.length} member{booking.members.length === 1 ? "" : "s"}:{" "}
              {booking.members.join(", ")}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="shrink-0 text-success" />
            Gotra: {booking.gotra_unknown ? "Not known" : booking.gotra || "Not provided"}
          </span>
        </div>

        {booking.pandit && (
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={resolveImageUrl(booking.pandit.photo_url)}
                  alt={booking.pandit.display_name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-sans text-base font-semibold break-words text-text-primary">
                  {booking.pandit.display_name}
                </p>
                <p className="text-sm text-text-muted">{booking.pandit.phone}</p>
              </div>
            </div>
            <span className="w-fit shrink-0 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold capitalize text-text-primary">
              {booking.pandit.status.replace(/_/g, " ")}
            </span>
          </div>
        )}

        {booking.review && (
          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-sans text-lg font-bold text-text-primary">Your review</h3>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < booking.review!.rating ? "text-brand-gold-400" : "text-border-dark"}
                  fill={i < booking.review!.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            {booking.review.title && (
              <p className="mt-2 font-sans text-sm font-semibold break-words text-text-primary">
                {booking.review.title}
              </p>
            )}
            {booking.review.comment && (
              <p className="mt-1 text-sm break-words text-text-muted">{booking.review.comment}</p>
            )}
          </div>
        )}

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-sans text-lg font-bold text-text-primary">Price</h3>
          <div className="mt-3 flex items-center justify-between gap-3 text-sm text-text-secondary">
            <span>Puja Fees</span>
            <span className="shrink-0">{formatPrice(basePrice)}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="mt-2 flex items-center justify-between gap-3 text-sm text-text-secondary">
              <span>Add-ons</span>
              <span className="shrink-0">{formatPrice(addonsTotal)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="mt-2 flex items-center justify-between gap-3 text-sm text-brand-saffron-400">
              <span className="min-w-0 break-words">
                Discount{booking.coupon_code ? ` (${booking.coupon_code})` : ""}
              </span>
              <span className="shrink-0">- {formatPrice(discountAmount)}</span>
            </div>
          )}
          {convenienceFee > 0 && (
            <div className="mt-2 flex items-center justify-between gap-3 text-sm text-text-secondary">
              <span>Convenience Fee</span>
              <span className="shrink-0">{formatPrice(convenienceFee)}</span>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
            <span className="font-sans text-base font-bold text-text-primary">Total Price</span>
            <span className="shrink-0 font-sans text-base font-bold text-text-primary">
              {formatPrice(totalAmount)}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-sans text-lg font-bold text-text-primary">Booking Details</h3>
          <div className="mt-3 flex flex-col gap-3 text-sm">
            <Row label="Booking ID" value={booking.order_number} />
            <Row label="Date" value={format(datetime, "EEE, d MMM yyyy")} />
            <Row label="Time" value={format(datetime, "h:mm a")} />
            <Row
              label="Address"
              value={
                [booking.address, booking.city, booking.pincode].filter(Boolean).join(", ") ||
                "Not provided"
              }
            />
            {booking.payment && (
              <Row
                label="Payment"
                value={`${booking?.payment?.method?.toUpperCase()} · ${booking?.payment?.status}`}
              />
            )}
            {booking.cancellation_reason && (
              <Row label="Cancellation Reason" value={booking.cancellation_reason} />
            )}
          </div>
        </div>

        {invoiceError && <p className="mt-4 text-sm font-medium text-error">{invoiceError}</p>}

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          {booking.status === "completed" && !booking.review && (
            <button
              onClick={() => setReviewOpen(true)}
              className="min-h-[44px] w-full rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted sm:w-auto"
            >
              Write a review
            </button>
          )}

          {isCancellable && (
            <button
              onClick={() => setCancelOpen(true)}
              disabled={isTooLateToCancel}
              title={
                isTooLateToCancel
                  ? "Bookings can't be cancelled less than 24 hours before the scheduled time."
                  : undefined
              }
              className="min-h-[44px] w-full rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Cancel Booking
            </button>
          )}
          {isCancellable && isTooLateToCancel && (
            <p className="text-xs text-text-muted sm:w-full">
              Can&apos;t cancel less than 24 hours before the booking.
            </p>
          )}

          <Button
            variant="outline"
            className="w-full gap-2 rounded-full sm:w-auto"
            onClick={handleDownloadInvoice}
            disabled={invoiceLoading}
          >
            <Download size={16} />
            {invoiceLoading ? "Generating..." : "Download Invoice"}
          </Button>
        </div>
      </div>

      {reviewOpen && (
        <RateExperienceModal
          booking={booking}
          onClose={() => setReviewOpen(false)}
          onSubmitted={() => {
            setReviewOpen(false);
            router.refresh();
          }}
        />
      )}

      {cancelOpen && (
        <CancelBookingModal
          bookingId={booking.id}
          onClose={() => setCancelOpen(false)}
          onCancelled={() => {
            setCancelOpen(false);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border pb-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="shrink-0 text-text-muted">{label}</span>
      <span className="break-words font-medium text-text-primary sm:text-right">{value}</span>
    </div>
  );
}
