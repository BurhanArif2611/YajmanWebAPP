import { notFound } from "next/navigation";
import { AssignmentDetailView } from "@/components/profile/AssignmentDetailView";
import { getAssignmentById } from "@/lib/api/panditAssignments";
import { ApiError } from "@/lib/apiError";
import type { PanditAssignmentDetail } from "@/types/api";

export default async function AssignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let assignment: PanditAssignmentDetail | null = null;
  let loadError = false;

  try {
    assignment = await getAssignmentById(id);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 403)) {
      notFound();
    }
    loadError = true;
  }

  if (loadError || !assignment) {
    return (
      <div className="rounded-2xl bg-surface-peach p-10 text-center text-text-muted">
        Unable to load this assignment right now. Please try again later.
      </div>
    );
  }

  return <AssignmentDetailView assignment={assignment} />;
}
