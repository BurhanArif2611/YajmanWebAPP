import { cn } from "@/lib/utils";
import type { PanditAssignmentStatus } from "@/types/api";

const STATUS_INFO: Record<PanditAssignmentStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "border-warning text-warning bg-warning/10" },
  accepted: { label: "Accepted", className: "border-success text-success bg-success/10" },
  rejected: { label: "Rejected", className: "border-error text-error bg-error/10" },
  expired: { label: "Expired", className: "border-text-light text-text-muted bg-surface-muted" },
  completed: { label: "Completed", className: "border-success text-success bg-success/10" },
};

export function AssignmentStatusBadge({ status }: { status: PanditAssignmentStatus }) {
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
