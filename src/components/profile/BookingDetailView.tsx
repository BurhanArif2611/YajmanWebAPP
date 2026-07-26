"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/profile/StatusBadge";
import { RateExperienceModal } from "@/components/profile/RateExperienceModal";
import type { Booking } from "@/lib/constants";

export function BookingDetailView({ booking }: { booking: Booking }) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [month, year] = booking.date.split(" ").slice(1);
  const day = booking.date.split(" ")[0];

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
              src={booking.image}
              alt={booking.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-sans text-xl font-semibold text-text-primary">
              {booking.title}
            </h1>
            <p className="mt-1 text-sm text-text-muted">{booking.excerpt}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-success">
              <CheckCircle2 size={13} />
              Pandit: {booking.panditAssigned ? "Assigned" : "To be assigned"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
          <StatusBadge status={booking.status} />
          <p className="font-sans text-3xl font-semibold text-text-primary">{day}</p>
          <p className="text-base font-medium text-text-muted">
            {month} {year}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-text-muted">
            <Clock size={14} />
            {booking.time}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-sans text-xl font-semibold text-text-primary">
          About this puja
        </h2>
        <p className="mt-2 text-sm text-text-muted">{booking.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-6 text-sm text-text-secondary">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-success" />
            1 Pandit, 1.5 hour duration
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-success" />
            All puja samagri
          </span>
        </div>

        {booking.status === "Completed" && booking.pandit && (
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={booking.pandit.avatar}
                  alt={booking.pandit.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-sans text-base font-semibold text-text-primary">
                  {booking.pandit.name}
                </p>
                <p className="text-sm text-text-muted line-clamp-1">
                  {booking.excerpt}
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold text-text-primary">
              {booking.pandit.experience}
            </span>
          </div>
        )}

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-sans text-lg font-bold text-text-primary">Price</h3>
          <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
            <span>Puja Fees</span>
            <span>₹{booking.price.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-brand-saffron-400">
            <span>Discount ({booking.discountPercent}%)</span>
            <span>
              - ₹{((booking.price * booking.discountPercent) / 100).toFixed(2)}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-sans text-base font-bold text-text-primary">
              Total Price
            </span>
            <span className="font-sans text-base font-bold text-text-primary">
              ₹
              {(
                booking.price -
                (booking.price * booking.discountPercent) / 100
              ).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="font-sans text-lg font-bold text-text-primary">
            Booking Details
          </h3>
          <div className="mt-3 flex flex-col gap-3 text-sm">
            <Row label="Booking ID" value={booking.bookingId} />
            <Row label="Date" value={booking.isoDate} />
            <Row label="Time" value={booking.time} />
            <Row label="Address" value={booking.address} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
          {booking.status === "Completed" ? (
            <button
              onClick={() => setReviewOpen(true)}
              className="min-h-[44px] rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted"
            >
              Write a review
            </button>
          ) : (
            <button className="min-h-[44px] rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted">
              Cancel Booking
            </button>
          )}
          <Button
            variant="outline"
            className="gap-2 rounded-full"
          >
            <Download size={16} />
            Download Invoice
          </Button>
        </div>
      </div>

      {reviewOpen && (
        <RateExperienceModal
          booking={booking}
          onClose={() => setReviewOpen(false)}
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
