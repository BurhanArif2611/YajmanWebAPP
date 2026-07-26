import Link from "next/link";
import { CalendarCheck2, Search } from "lucide-react";

export function EmptyBookings() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <CalendarCheck2 size={56} className="text-brand-saffron-400" />
      <Link
        href="/services"
        className="flex items-center gap-2 rounded-full border border-border-dark bg-white px-5 py-2.5 text-sm font-medium text-text-primary shadow-card"
      >
        <Search size={16} />
        Start searching
      </Link>
      <div>
        <p className="font-sans text-xl font-bold text-text-primary">
          You haven&apos;t booked any yet.
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Discover and book your next getaway now!
        </p>
      </div>
    </div>
  );
}
