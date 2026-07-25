"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, ChevronRight, MapPin, Ticket, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CouponSuccessModal } from "@/components/checkout/CouponSuccessModal";
import { CHECKOUT_ITEM, COUPONS, type Coupon } from "@/lib/constants";

export function OrderSummary() {
  const [browsing, setBrowsing] = useState(false);
  const [applied, setApplied] = useState<Coupon | null>(null);
  const [pendingCoupon, setPendingCoupon] = useState<Coupon | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const subtotal = CHECKOUT_ITEM.price;
  const discount = 100;
  const total = subtotal - discount;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg bg-white p-6  border border-gray-200">
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Your order summary
        </h2>

        <div className="mt-5 flex gap-4 border-b border-border pb-5">
          <div className="relative h-[90px] w-[99px] shrink-0 overflow-hidden rounded-lg">
            <Image
              src={CHECKOUT_ITEM.image}
              alt={CHECKOUT_ITEM.title}
              fill
              sizes="99px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-sans text-base font-bold leading-snug text-text-primary">
                {CHECKOUT_ITEM.title}
              </h3>
              <span className="whitespace-nowrap font-sans text-base font-semibold text-text-primary">
                ₹{CHECKOUT_ITEM.price}
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin size={14} className="text-brand-saffron-400" />
              {CHECKOUT_ITEM.location}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-text-muted">
              <Calendar size={14} className="text-brand-saffron-400" />
              {CHECKOUT_ITEM.date}
            </p>
          </div>
        </div>

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
                placeholder="Enter Coupon Code"
                onFocus={() => setBrowsing(true)}
                className="min-h-[44px] w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-light"
              />
              <button
                onClick={() => setBrowsing((v) => !v)}
                className="whitespace-nowrap text-sm font-bold text-brand-saffron-400"
              >
                Apply
              </button>
            </div>
          )}

          {browsing && !applied && (
            <div className="mt-3 overflow-hidden rounded-lg border border-border">
              {COUPONS.map((coupon, i) => (
                <button
                  key={i}
                  onClick={() => setPendingCoupon(coupon)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted ${i !== COUPONS.length - 1 ? "border-b border-border" : ""
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
                        {coupon.description}
                      </span>
                    </span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-text-light" />
                </button>
              ))}
              <button className="flex min-h-[44px] w-full items-center justify-center text-sm font-medium text-text-secondary hover:bg-surface-muted">
                Show All
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between text-text-secondary">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-text-secondary">
            <span>Discount (10%)</span>
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

      <Button size="lg" className="w-full justify-center rounded-full">
        Pay ₹{total.toFixed(2)}
      </Button>

      {pendingCoupon && (
        <CouponSuccessModal
          coupon={pendingCoupon}
          onClose={() => setPendingCoupon(null)}
          onConfirm={() => {
            setApplied(pendingCoupon);
            setPendingCoupon(null);
            setBrowsing(false);
          }}
        />
      )}
    </div>
  );
}
