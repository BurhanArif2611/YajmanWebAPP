"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, ChevronRight, MapPin, Ticket, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { CouponSuccessModal } from "@/components/checkout/CouponSuccessModal";
import { getCoupons, validateCoupon } from "@/lib/api/coupons";
import { createOrder, verifyPayment } from "@/lib/api/checkout";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/apiError";
import { formatDate } from "@/lib/utils";
import { resolveImageUrl } from "@/lib/mappers/service";
import type { MockService } from "@/lib/constants";
import type { Coupon, ServiceAddon } from "@/types/api";

export type BookingInfo = {
  name: string;
  callingNumber: string;
  useDifferentNumber: boolean;
  members: string[];
  gotra: string;
  gotraUnknown: boolean;
};

const TIME_SLOTS = [
  { value: "06:00", label: "6:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "18:00", label: "6:00 PM" },
];

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "").slice(-10);
}

type PendingCoupon = {
  coupon: Coupon;
  discountAmount: number;
};

type AppliedCoupon = {
  code: string;
  discountLabel: string;
  discountAmount: number;
};

export function OrderSummary({
  service,
  date,
  addons,
  bookingInfo,
}: {
  service: MockService;
  date?: string;
  addons: ServiceAddon[];
  bookingInfo: BookingInfo;
}) {
  const router = useRouter();
  const { isLoggedIn, phone } = useAuth();
  const [browsing, setBrowsing] = useState(false);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [pending, setPending] = useState<PendingCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);
  const [bookingTime, setBookingTime] = useState("");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((current) =>
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id]
    );
  };

  const couponsQuery = useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons,
    enabled: isLoggedIn,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setBrowsing(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const subtotal = service.price;
  const discount = applied?.discountAmount ?? 0;
  const addonsTotal = addons
    .filter((addon) => selectedAddonIds.includes(addon.id))
    .reduce((sum, addon) => sum + Number(addon.price), 0);
  const total = subtotal - discount + addonsTotal;

  const applyCode = async (couponCode: string, coupon?: Coupon) => {
    if (!couponCode.trim()) return;
    setCouponError(null);
    setValidating(true);
    try {
      const result = await validateCoupon(couponCode.trim(), subtotal, service.id);
      if (result.valid) {
        setPending({
          coupon: coupon ?? {
            id: result.coupon.id,
            code: result.coupon.code,
            title: result.coupon.title,
            discount_type: "fixed",
            discount_value: String(result.discount_amount),
            valid_from: "",
            valid_until: "",
            applicable_categories: [],
            applicable_services: [],
          },
          discountAmount: result.discount_amount,
        });
        setBrowsing(false);
      } else {
        setCouponError(result.message);
      }
    } catch {
      setCouponError("Couldn't validate this coupon. Try again.");
    } finally {
      setValidating(false);
    }
  };

  const handlePay = async () => {
    if (!isLoggedIn || !phone) return;
    if (!date) {
      setPayError("Select a date on the service page first.");
      return;
    }
    if (!bookingTime) {
      setPayError("Select a time slot.");
      return;
    }
    if (!bookingInfo.name.trim()) {
      setPayError("Enter your name in Contact Details.");
      return;
    }
    const members = bookingInfo.members.map((m) => m.trim()).filter(Boolean);
    if (!members.length) {
      setPayError("Add at least one member name.");
      return;
    }
    if (!service.id) {
      setPayError("This service can't be booked right now.");
      return;
    }

    setPayError(null);
    setPaying(true);
    try {
      const phoneDigits = digitsOnly(phone);
      const result = await createOrder({
        service_id: service.id,
        booking_date: date,
        booking_time: bookingTime,
        customer_name: bookingInfo.name.trim(),
        customer_phone: phoneDigits,
        customer_whatsapp: phoneDigits,
        customer_calling_number:
          bookingInfo.useDifferentNumber && bookingInfo.callingNumber
            ? digitsOnly(bookingInfo.callingNumber)
            : undefined,
        members,
        addon_ids: selectedAddonIds.length ? selectedAddonIds : undefined,
        gotra: bookingInfo.gotraUnknown ? undefined : bookingInfo.gotra.trim() || undefined,
        gotra_unknown: bookingInfo.gotraUnknown,
        coupon_code: applied?.code,
      });

      if (result.payment_required && result.razorpay) {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          setPayError("Couldn't load the payment gateway. Try again.");
          setPaying(false);
          return;
        }

        const razorpay = result.razorpay;
        const rzp = new window.Razorpay({
          key: razorpay.key_id,
          amount: razorpay.amount,
          currency: razorpay.currency,
          order_id: razorpay.order_id,
          name: "Yajman",
          description: service.title,
          prefill: { name: bookingInfo.name.trim(), contact: phoneDigits },
          handler: async (response) => {
            try {
              await verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              router.push("/profile/bookings?created=1");
            } catch {
              setPayError(
                "Payment succeeded but verification failed. Contact support if amount was deducted."
              );
              setPaying(false);
            }
          },
          modal: {
            ondismiss: () => setPaying(false),
          },
        });
        rzp.on("payment.failed", () => {
          setPayError("Payment failed. Please try again.");
          setPaying(false);
        });
        rzp.open();
      } else {
        router.push("/profile/bookings?created=1");
      }
    } catch (err) {
      setPayError(err instanceof ApiError ? err.message : "Couldn't create the order. Try again.");
      setPaying(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg bg-white p-6  border border-gray-200">
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Your order summary
        </h2>

        <div className="mt-5 flex gap-4 border-b border-border pb-5">
          <div className="relative h-[90px] w-[99px] shrink-0 overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="99px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-sans text-base font-bold leading-snug text-text-primary">
                {service.title}
              </h3>
              <span className="whitespace-nowrap font-sans text-base font-semibold text-text-primary">
                ₹{service.price}
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin size={14} className="text-brand-saffron-400" />
              {service.location}
            </p>
            {date && (
              <p className="flex items-center gap-1.5 text-sm text-text-muted">
                <Calendar size={14} className="text-brand-saffron-400" />
                {formatDate(date)}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-text-primary">
            Puja Time
          </p>
          <select
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            className="min-h-[44px] w-full rounded-md border border-border-dark bg-white px-4 text-sm font-medium text-text-primary outline-none focus:border-brand-saffron-400"
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>

        {addons.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-text-primary">
              Add-ons
            </p>
            <div className="flex flex-col gap-2">
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md border border-border-dark px-3 py-2.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedAddonIds.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="h-4 w-4 accent-brand-saffron-400"
                  />
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={resolveImageUrl(addon.image_url)}
                      alt={addon.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium text-text-primary">
                    {addon.name}
                  </span>
                  <span className="text-sm font-semibold text-text-primary">
                    + ₹{Number(addon.price).toFixed(2)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div ref={containerRef} className="relative mt-5">
          <p className="mb-2 text-sm font-semibold text-text-primary">
            Discount Code
          </p>

          {applied ? (
            <div className="flex items-center justify-between rounded-xl bg-brand-saffron-100 px-4 py-3">
              <span className="flex items-center gap-2 font-sans text-sm font-bold text-text-primary">
                <Ticket size={16} className="text-brand-saffron-400" />
                {applied.code}
              </span>
              <button
                onClick={() => setApplied(null)}
                className="flex items-center gap-1 text-sm font-semibold text-success"
              >
                Applied
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-md bg-brand-saffron-100/50 border border-orange-400 px-4 py-1">
              <input
                type="text"
                value={code}
                placeholder="Enter Coupon Code"
                onFocus={() => setBrowsing(true)}
                onChange={(e) => {
                  setCode(e.target.value);
                  setCouponError(null);
                }}
                className="min-h-[44px] w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-light"
              />
              <button
                onClick={() => applyCode(code)}
                disabled={validating || !code.trim()}
                className="whitespace-nowrap text-sm font-bold text-brand-saffron-400 disabled:text-text-light"
              >
                {validating ? "Checking..." : "Apply"}
              </button>
            </div>
          )}

          {couponError && !applied && (
            <p className="mt-2 text-sm font-medium text-error">{couponError}</p>
          )}

          {browsing && !applied && couponsQuery.isLoading && (
            <div className="mt-3 flex flex-col gap-3 rounded-lg border border-border p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>
          )}

          {browsing && !applied && Boolean(couponsQuery.data?.length) && (
            <div className="mt-3 overflow-hidden rounded-lg border border-border">
              {couponsQuery.data!.map((coupon, i) => (
                <button
                  key={coupon.id}
                  onClick={() => applyCode(coupon.code, coupon)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted ${i !== couponsQuery.data!.length - 1 ? "border-b border-border" : ""
                    }`}
                >
                  <span className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-muted">
                      <Ticket size={16} />
                    </span>
                    <span>
                      <span className="block font-sans text-sm font-bold text-text-primary">
                        {coupon.code}
                      </span>
                      <span className="block text-xs text-text-muted">
                        {coupon.description ?? coupon.title}
                      </span>
                    </span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-text-light" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between text-text-secondary">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="flex items-center justify-between text-text-secondary">
              <span>Add-ons</span>
              <span>₹{addonsTotal.toFixed(2)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-text-secondary">
            <span>Discount</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-sans text-base font-bold text-text-primary">
            Total
          </span>
          <span className="font-sans text-base font-bold text-text-primary">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>

      {payError && <p className="text-center text-sm font-medium text-error">{payError}</p>}

      <Button
        size="lg"
        className="w-full justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!isLoggedIn || paying}
        onClick={handlePay}
      >
        {paying ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
      </Button>
      {!isLoggedIn && (
        <p className="text-center text-sm text-text-muted">
          Verify your WhatsApp number in Contact Details to continue.
        </p>
      )}

      {pending && (
        <CouponSuccessModal
          coupon={{
            code: pending.coupon.code,
            discountLabel: `₹${pending.discountAmount} OFF`,
          }}
          onClose={() => setPending(null)}
          onConfirm={() => {
            setApplied({
              code: pending.coupon.code,
              discountLabel: `₹${pending.discountAmount} OFF`,
              discountAmount: pending.discountAmount,
            });
            setPending(null);
            setBrowsing(false);
          }}
        />
      )}
    </div>
  );
}
