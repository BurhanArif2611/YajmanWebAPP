"use client";

export function StickyBookBar({
  price,
  originalPrice,
  discountPercent,
}: {
  price: number;
  originalPrice: number;
  discountPercent: number;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-white p-4 shadow-modal lg:hidden">
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold text-text-primary">
          ₹{price}
        </span>
        <span className="text-xs text-text-light line-through">
          ₹{originalPrice}
        </span>
        <span className="text-xs font-medium text-success">
          -{discountPercent}%
        </span>
      </div>

      <button
        onClick={() =>
          document
            .getElementById("booking-widget")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        className="min-h-[44px] rounded-full bg-brand-saffron-400 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-saffron-500"
      >
        Select Date &amp; Book Now
      </button>
    </div>
  );
}
