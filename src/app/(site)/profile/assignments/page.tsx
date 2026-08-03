import { AssignmentCard } from "@/components/profile/AssignmentCard";
import { EmptyAssignments } from "@/components/profile/EmptyAssignments";
import { Pagination } from "@/components/ui/Pagination";
import { getAssignments } from "@/lib/api/panditAssignments";
import type { PanditAssignmentStatus } from "@/types/api";

export const metadata = {
  title: "Assignments | Yajman",
};

const PAGE_SIZE = 10;

const TAB_COPY: Record<string, { heading: string; subtitle: string; status?: PanditAssignmentStatus }> = {
  all: {
    heading: "All Assignments",
    subtitle: "Every puja assignment sent to you.",
  },
  pending: {
    heading: "Pending Assignments",
    subtitle: "Assignments waiting on your response.",
    status: "pending",
  },
  accepted: {
    heading: "Accepted Assignments",
    subtitle: "Assignments you've accepted.",
    status: "accepted",
  },
  completed: {
    heading: "Completed Assignments",
    subtitle: "Pujas you've already performed.",
    status: "completed",
  },
  rejected: {
    heading: "Rejected Assignments",
    subtitle: "Assignments you've rejected or withdrawn from.",
    status: "rejected",
  },
};

export default async function AssignmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; page?: string }>;
}) {
  const { tab = "pending", page: pageParam } = await searchParams;
  const copy = TAB_COPY[tab] ?? TAB_COPY.pending;
  const page = Number(pageParam ?? 1) || 1;

  let assignments: Awaited<ReturnType<typeof getAssignments>>["data"] = [];
  let pageCount = 1;
  let loadError = false;

  try {
    const result = await getAssignments({ page, limit: PAGE_SIZE, status: copy.status });
    assignments = result.data;
    pageCount = result.pagination?.total_pages ?? 1;
  } catch {
    loadError = true;
  }

  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <h1 className="font-sans text-2xl font-bold text-text-primary md:text-3xl">
        {copy.heading}
      </h1>
      <p className="mt-1 text-sm text-text-muted">{copy.subtitle}</p>

      {loadError ? (
        <p className="mt-10 text-center text-text-muted">
          Unable to load your assignments right now. Please try again later.
        </p>
      ) : assignments.length === 0 ? (
        <EmptyAssignments />
      ) : (
        <>
          <div className="mt-6">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
          <Pagination pageCount={pageCount} />
        </>
      )}
    </div>
  );
}
