import { apiFetch, apiFetchPaginated } from "@/lib/fetch";
import type { AppNotification } from "@/types/api";

export function listNotifications(params: { page?: number; limit?: number; unreadOnly?: boolean } = {}) {
  return apiFetchPaginated<AppNotification[]>("/notifications", {
    auth: true,
    query: {
      page: params.page,
      limit: params.limit,
      unread_only: params.unreadOnly,
    },
  });
}

export function getUnreadCount() {
  return apiFetch<{ count: number }>("/notifications/unread-count", { auth: true });
}

export function getNotification(id: string) {
  return apiFetch<AppNotification>(`/notifications/${id}`, { auth: true });
}

export function markNotificationRead(id: string) {
  return apiFetch<AppNotification>(`/notifications/${id}/read`, {
    method: "POST",
    auth: true,
  });
}

export function markAllNotificationsRead() {
  return apiFetch<null>("/notifications/read-all", { method: "POST", auth: true });
}

export function recordNotificationClick(id: string) {
  return apiFetch<AppNotification>(`/notifications/${id}/click`, {
    method: "POST",
    auth: true,
  });
}

export function deleteNotification(id: string) {
  return apiFetch<null>(`/notifications/${id}`, { method: "DELETE", auth: true });
}

export function clearNotifications() {
  return apiFetch<null>("/notifications", { method: "DELETE", auth: true });
}
