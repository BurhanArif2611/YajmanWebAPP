"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  clearNotifications,
  deleteNotification,
  listNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/api/notifications";
import { ApiError } from "@/lib/apiError";
import { cn, formatRelativeTime } from "@/lib/utils";

export function NotificationsView() {
  const router = useRouter();
  const { isLoggedIn, ready } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      router.replace("/login");
    }
  }, [ready, isLoggedIn, router]);

  const listQuery = useQuery({
    queryKey: ["notifications", "list"],
    queryFn: () => listNotifications({ limit: 50 }),
    enabled: ready && isLoggedIn,
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const readMutation = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: invalidateAll,
  });

  const readAllMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: invalidateAll,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: invalidateAll,
  });

  const clearAllMutation = useMutation({
    mutationFn: clearNotifications,
    onSuccess: invalidateAll,
  });

  const notifications = listQuery.data?.data ?? [];
  const hasUnread = notifications.some((n) => !n.is_read);

  if (!ready || (ready && !isLoggedIn)) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-text-primary md:text-3xl">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Stay updated on your bookings and puja reminders.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => readAllMutation.mutate()}
              disabled={!hasUnread || readAllMutation.isPending}
              className="flex items-center gap-1.5 text-sm font-semibold text-brand-saffron-400 disabled:text-text-light"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
            <button
              onClick={() => clearAllMutation.mutate()}
              disabled={clearAllMutation.isPending}
              className="flex items-center gap-1.5 text-sm font-semibold text-error disabled:text-text-light"
            >
              <Trash2 size={16} />
              Clear all
            </button>
          </div>
        )}
      </div>

      {listQuery.isLoading && (
        <div className="mt-6 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="mt-2 h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {listQuery.isError && (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-white p-10 text-center shadow-card">
          <p className="text-sm text-error">
            {listQuery.error instanceof ApiError
              ? listQuery.error.message
              : "Couldn't load notifications."}
          </p>
          <Button size="sm" onClick={() => listQuery.refetch()}>
            Retry
          </Button>
        </div>
      )}

      {listQuery.isSuccess && notifications.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl bg-white p-10 text-center shadow-card">
          <Bell size={40} className="text-brand-saffron-400" />
          <p className="font-sans text-lg font-bold text-text-primary">
            You&apos;re all caught up.
          </p>
          <p className="text-sm text-text-muted">No notifications right now.</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex items-start gap-4 rounded-xl bg-white p-5 shadow-card transition-opacity",
              !notification.is_read && "ring-1 ring-brand-saffron-200"
            )}
          >
            <button
              onClick={() => !notification.is_read && readMutation.mutate(notification.id)}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400"
            >
              <Bell size={18} />
              {!notification.is_read && (
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-brand-magenta ring-2 ring-white" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 font-sans text-base font-semibold break-words text-text-primary">
                  {notification.title}
                </p>
                <span className="shrink-0 text-xs text-text-light">
                  {formatRelativeTime(notification.created_at)}
                </span>
              </div>
              <p className="mt-1 break-words text-sm text-text-muted">{notification.body}</p>
              {notification.image_url && (
                <img
                  src={notification.image_url}
                  alt=""
                  className="mt-3 max-h-40 w-full rounded-lg object-cover"
                />
              )}
            </div>
            <button
              onClick={() => deleteMutation.mutate(notification.id)}
              aria-label="Delete notification"
              className="shrink-0 text-text-light hover:text-error"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
//this one is added for texting.
