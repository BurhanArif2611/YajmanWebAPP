"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, isPast, parseISO } from "date-fns";
import { ChevronLeft, Clock, MapPin, Phone, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AssignmentStatusBadge } from "@/components/profile/AssignmentStatusBadge";
import { AssignmentActionModal } from "@/components/profile/AssignmentActionModal";
import { formatPrice } from "@/lib/utils";
import type { PanditAssignmentDetail } from "@/types/api";

export function AssignmentDetailView({ assignment }: { assignment: PanditAssignmentDetail }) {
  const router = useRouter();
  const [modal, setModal] = useState<"accept" | "reject" | "withdraw" | null>(null);

  const datetime = parseISO(`${assignment.booking_date}T${assignment.booking_time}`);
  const respondByPassed = assignment.respond_by ? isPast(parseISO(assignment.respond_by)) : false;

  const canAccept = assignment.status === "pending" && !respondByPassed;
  const canReject = assignment.status === "pending" && !respondByPassed;
  const canWithdraw = assignment.status === "accepted";

  const handleDone = () => {
    setModal(null);
    router.refresh();
  };

  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <Link
        href="/profile/assignments"
        className="flex w-fit items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-saffron-400"
      >
        <ChevronLeft size={16} />
        Back to assignments
      </Link>

      <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-xl font-semibold text-text-primary">
            {assignment.service_title}
          </h1>
          <p className="mt-1 text-sm text-text-muted">Order {assignment.order_number}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
          <AssignmentStatusBadge status={assignment.status} />
          <p className="font-sans text-3xl font-semibold text-text-primary">
            {format(datetime, "d")}
          </p>
          <p className="text-base font-medium text-text-muted">{format(datetime, "MMM yyyy")}</p>
          <p className="flex items-center gap-1.5 text-sm text-text-muted">
            <Clock size={14} />
            {format(datetime, "h:mm a")}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-card">
        <h2 className="font-sans text-xl font-semibold text-text-primary">Customer Details</h2>
        <div className="mt-3 flex flex-col gap-3 text-sm">
          <Row icon={<UserIcon size={15} />} label="Name" value={assignment.customer_name} />
          <Row icon={<Phone size={15} />} label="Phone" value={assignment.customer_phone} />
          <Row
            icon={<MapPin size={15} />}
            label="Address"
            value={
              [assignment.address, assignment.city, assignment.pincode].filter(Boolean).join(", ") ||
              "Not provided"
            }
          />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
          <span className="font-sans text-base font-bold text-text-primary">Total Amount</span>
          <span className="font-sans text-base font-bold text-text-primary">
            {formatPrice(Number(assignment.total_amount))}
          </span>
        </div>

        {assignment.notes && (
          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-sans text-lg font-bold text-text-primary">Your Notes</h3>
            <p className="mt-1 text-sm text-text-muted">{assignment.notes}</p>
          </div>
        )}

        {assignment.reason && (
          <div className="mt-6 border-t border-border pt-6">
            <h3 className="font-sans text-lg font-bold text-text-primary">Reason</h3>
            <p className="mt-1 text-sm text-text-muted">{assignment.reason}</p>
          </div>
        )}

        {assignment.status === "pending" && respondByPassed && (
          <p className="mt-6 text-sm font-medium text-error">
            The response window for this assignment has passed.
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6">
          {canAccept && (
            <Button
              variant="primary"
              className="rounded-full"
              onClick={() => setModal("accept")}
            >
              Accept
            </Button>
          )}
          {canReject && (
            <button
              onClick={() => setModal("reject")}
              className="min-h-[44px] rounded-full border border-border-dark px-6 text-sm font-medium text-text-primary hover:bg-surface-muted"
            >
              Reject
            </button>
          )}
          {canWithdraw && (
            <button
              onClick={() => setModal("withdraw")}
              className="min-h-[44px] rounded-full border border-error px-6 text-sm font-medium text-error hover:bg-error/10"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>

      {modal && (
        <AssignmentActionModal
          assignmentId={assignment.id}
          mode={modal}
          onClose={() => setModal(null)}
          onDone={handleDone}
        />
      )}
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-b-0">
      <span className="flex items-center gap-1.5 text-text-muted">
        {icon}
        {label}
      </span>
      <span className="text-right font-medium text-text-primary">{value}</span>
    </div>
  );
}
