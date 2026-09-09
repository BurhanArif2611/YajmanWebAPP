import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { AssignmentStatusBadge } from "@/components/profile/AssignmentStatusBadge";
import type { PanditAssignment } from "@/types/api";

export function AssignmentCard({ assignment }: { assignment: PanditAssignment }) {
  const datetime = parseISO(assignment.booking_datetime);
  const location = [assignment.address, assignment.city].filter(Boolean).join(", ") || "Address not provided";

  return (
    <div className="my-3 flex flex-col gap-4 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:rounded-none sm:border-0 sm:border-b sm:border-border-dark/20 sm:px-5 sm:py-6 sm:last:border-b-0">
      <div className="min-w-0 flex-1">
        <h3 className="font-sans text-base font-semibold break-words text-text-primary sm:text-lg">
          {assignment.service_title}
        </h3>
        <p className="text-sm text-text-secondary">{assignment.customer_name}</p>
        <div className="mt-1.5 flex flex-col gap-1.5 text-xs text-text-muted sm:mt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="shrink-0 text-brand-saffron-400" />
            {format(datetime, "EEE, d MMM yyyy")}
            {assignment.requires_booking_time ? ` · ${format(datetime, "h:mm a")}` : ""}
          </span>
          <span className="flex min-w-0 items-start gap-1.5">
            <MapPin size={13} className="mt-0.5 shrink-0 text-brand-saffron-400" />
            <span className="break-words">{location}</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-border pt-3 sm:items-end sm:border-0 sm:pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <AssignmentStatusBadge status={assignment.status} />
          <span className="text-xs text-text-muted">{assignment.order_number}</span>
        </div>
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
