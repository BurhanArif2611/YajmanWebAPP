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
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-white px-4 py-3 shadow-modal sm:gap-4 sm:p-4 lg:hidden">
      <div className="min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-base font-semibold text-text-primary sm:text-lg">
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
        className="min-h-[44px] shrink-0 rounded-full bg-brand-saffron-400 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-saffron-500 sm:px-6"
      >
        <span className="sm:hidden">Book Now</span>
        <span className="hidden sm:inline">Select Date &amp; Book Now</span>
      </button>
    </div>
  );
}
