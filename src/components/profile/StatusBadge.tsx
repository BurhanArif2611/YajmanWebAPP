import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/lib/constants";

const STYLES: Record<BookingStatus, string> = {
  Completed: "border-success text-success bg-success/10",
  Upcoming: "border-info text-info bg-info/10",
  Pending: "border-warning text-warning bg-warning/10",
  Cancelled: "border-error text-error bg-error/10",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        STYLES[status]
      )}
    >
      {status}
    </span>
  );
}
