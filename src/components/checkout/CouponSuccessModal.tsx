"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CONFETTI_COLORS = ["#fb6000", "#10b981", "#e32682", "#facc15", "#4d40ca"];

export function CouponSuccessModal({
  coupon,
  onClose,
  onConfirm,
}: {
  coupon: { code: string; discountLabel: string };
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={280}
          recycle={false}
          gravity={0.25}
          colors={CONFETTI_COLORS}
          style={{ position: "fixed", inset: 0, zIndex: 60 }}
        />
      )}

      <div
        className="absolute inset-0 bg-black/40 animate-overlay-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-modal animate-scale-in">
        {/* <div className="h-24 w-full bg-surface-peach" /> */}

        <div className="flex flex-col items-center gap-2 px-8 pb-8 pt-2 text-center">
          <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-brand-saffron-400 text-white shadow-card-hover mb-4">
            <Gift size={28} />
          </span>
          <p className="font-sans text-xl font-semibold text-text-primary">
            Coupon Applied Successfuly
          </p>
          <p className="font-sans text-4xl font-bold text-brand-saffron-400">
            {coupon.discountLabel}
          </p>
          <p className="font-sans text-lg font-semibold text-text-primary">
            Entire Purchase
          </p>

          <div className="mt-4 flex w-full items-center justify-between rounded-xl border border-dashed border-border-dark px-4 py-3">
            <span className="text-sm text-text-light">Your coupon code</span>
            <span className="font-sans text-base font-bold text-text-primary">
              {coupon.code}
            </span>
          </div>

          <Button
            size="lg"
            className="mt-4 w-full justify-center rounded-full"
            onClick={onConfirm}
          >
            Redeem Coupon
          </Button>
        </div>
      </div>
    </div>
  );
}
