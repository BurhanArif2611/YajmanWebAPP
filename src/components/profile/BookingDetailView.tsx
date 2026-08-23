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
  console.log('booking', booking)
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
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <Link
        href="/profile/bookings"
        className="flex w-fit items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-saffron-400"
      >
        <ChevronLeft size={16} />
        Back to bookings
      </Link>

      <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={resolveImageUrl(booking.service_image)}
              alt={booking.service_title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-sans text-xl font-semibold text-text-primary">
              {booking.service_title}
            </h1>
            <p className="mt-1 text-sm text-text-muted">Order {booking.order_number}</p>
            {booking.pandit ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-success">
                <CheckCircle2 size={13} />
                Pandit: {booking.pandit.display_name}
              </p>
            ) : (
              <p className="mt-2 text-xs text-text-muted">Pandit: To be assigned</p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
          <StatusBadge status={booking.status} />
          <p className="font-sans text-3xl font-semibold text-text-primary">
            {format(datetime, "d")}
          </p>
          <p className="text-base font-medium text-text-muted">{format(datetime, "MMM yyyy")}</p>
          <p className="flex items-center gap-1.5 text-sm text-text-muted">
            <Clock size={14} />
            {format(datetime, "h:mm a")}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-sans text-xl font-semibold text-text-primary">
          About this booking
        </h2>
        <div className="mt-3 flex flex-wrap gap-6 text-sm text-text-secondary">
          {Boolean(booking.service_duration_minutes) && (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-success" />
              {booking.service_duration_minutes} min duration
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-success" />
            {booking.members.length} member{booking.members.length === 1 ? "" : "s"}:{" "}
            {booking.members.join(", ")}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-success" />
            Gotra: {booking.gotra_unknown ? "Not known" : booking.gotra || "Not provided"}
          </span>
        </div>

        {booking.pandit && (
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={resolveImageUrl(booking.pandit.photo_url)}
                  alt={booking.pandit.display_name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-sans text-base font-semibold text-text-primary">
                  {booking.pandit.display_name}
                </p>
                <p className="text-sm text-text-muted">{booking.pandit.phone}</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold capitalize text-text-primary">
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
              <p className="mt-2 font-sans text-sm font-semibold text-text-primary">
                {booking.review.title}
              </p>
            )}
            {booking.review.comment && (
              <p className="mt-1 text-sm text-text-muted">{booking.review.comment}</p>
            )}
          </div>
        )}

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-sans text-lg font-bold text-text-primary">Price</h3>
          <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
            <span>Puja Fees</span>
            <span>{formatPrice(basePrice)}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm text-text-secondary">
              <span>Add-ons</span>
              <span>{formatPrice(addonsTotal)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm text-brand-saffron-400">
              <span>Discount{booking.coupon_code ? ` (${booking.coupon_code})` : ""}</span>
              <span>- {formatPrice(discountAmount)}</span>
            </div>
          )}
          {convenienceFee > 0 && (
            <div className="mt-2 flex items-center justify-between text-sm text-text-secondary">
              <span>Convenience Fee</span>
              <span>{formatPrice(convenienceFee)}</span>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-sans text-base font-bold text-text-primary">Total Price</span>
            <span className="font-sans text-base font-bold text-text-primary">
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

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6">
          {booking.status === "completed" && !booking.review && (
            <button
              onClick={() => setReviewOpen(true)}
              className="min-h-[44px] rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted"
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
              className="min-h-[44px] rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel Booking
            </button>
          )}
          {isCancellable && isTooLateToCancel && (
            <p className="text-xs text-text-muted">
              Can&apos;t cancel less than 24 hours before the booking.
            </p>
          )}

          <Button
            variant="outline"
            className="gap-2 rounded-full"
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
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0">
      <span className="text-text-muted">{label}</span>
      <span className="text-right font-medium text-text-primary">{value}</span>
    </div>
  );
}
