import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { AssignmentStatusBadge } from "@/components/profile/AssignmentStatusBadge";
import type { PanditAssignment } from "@/types/api";

export function AssignmentCard({ assignment }: { assignment: PanditAssignment }) {
  const datetime = parseISO(`${assignment.booking_date}T${assignment.booking_time}`);
  const location = [assignment.address, assignment.city].filter(Boolean).join(", ") || "Address not provided";

  return (
    <div className="flex flex-col bg-white rounded-lg my-3 px-5 gap-4 border-b border-border-dark/20 py-6 last:border-b-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-sans text-lg font-semibold text-text-primary">
          {assignment.service_title}
        </h3>
        <p className="text-sm text-text-secondary">{assignment.customer_name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-saffron-400" />
            {format(datetime, "EEE, d MMM yyyy")} · {format(datetime, "h:mm a")}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brand-saffron-400" />
            {location}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
        <span className="flex items-center gap-2">
          <AssignmentStatusBadge status={assignment.status} />
          <span className="text-xs text-text-muted">{assignment.order_number}</span>
        </span>
        <Link
          href={`/profile/assignments/${assignment.id}`}
          className="text-sm font-semibold text-brand-saffron-400 hover:text-brand-saffron-500"
        >
          Check Details
        </Link>
      </div>
    </div>
  );
}
