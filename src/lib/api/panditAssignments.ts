import { apiFetch, apiFetchPaginated } from "@/lib/fetch";
import type {
  PanditAssignment,
  PanditAssignmentDetail,
  PanditAssignmentListFilters,
} from "@/types/api";

export function getAssignments(filters: PanditAssignmentListFilters = {}) {
  return apiFetchPaginated<PanditAssignment[]>("/pandit/assignments", {
    auth: true,
    query: {
      status: filters.status,
      page: filters.page,
      limit: filters.limit,
    },
  });
}

export function getAssignmentById(id: string) {
  return apiFetch<PanditAssignmentDetail>(`/pandit/assignments/${id}`, { auth: true });
}

export function acceptAssignment(id: string, notes?: string) {
  return apiFetch<PanditAssignment>(`/pandit/assignments/${id}/accept`, {
    method: "PATCH",
    auth: true,
    body: notes ? { notes } : {},
  });
}

export function rejectAssignment(id: string, reason: string) {
  return apiFetch<PanditAssignment>(`/pandit/assignments/${id}/reject`, {
    method: "PATCH",
    auth: true,
    body: { reason },
  });
}

export function withdrawAssignment(id: string, reason: string) {
  return apiFetch<PanditAssignment>(`/pandit/assignments/${id}/withdraw`, {
    method: "PATCH",
    auth: true,
    body: { reason },
  });
}
