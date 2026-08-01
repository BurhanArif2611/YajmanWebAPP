import { cn } from "@/lib/utils";
import type { BookingStatus } from "@/types/api";

const STATUS_INFO: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "border-warning text-warning bg-warning/10" },
  confirmed: { label: "Confirmed", className: "border-info text-info bg-info/10" },
  pandit_assigned: {
    label: "Pandit Assigned",
    className: "border-info text-info bg-info/10",
  },
  in_progress: { label: "In Progress", className: "border-info text-info bg-info/10" },
  completed: { label: "Completed", className: "border-success text-success bg-success/10" },
  cancelled: { label: "Cancelled", className: "border-error text-error bg-error/10" },
  refunded: { label: "Refunded", className: "border-error text-error bg-error/10" },
  payment_failed: {
    label: "Payment Failed",
    className: "border-error text-error bg-error/10",
  },
  refund_failed: {
    label: "Refund Failed",
    className: "border-error text-error bg-error/10",
  },
  disputed: { label: "Disputed", className: "border-error text-error bg-error/10" },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const info = STATUS_INFO[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        info.className
      )}
    >
      {info.label}
    </span>
  );
}
