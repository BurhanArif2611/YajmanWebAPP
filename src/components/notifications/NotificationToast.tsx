"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, X } from "lucide-react";
import { recordNotificationClick } from "@/lib/api/notifications";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { PushToast } from "@/components/notifications/NotificationToastProvider";
import {
  navigateNotificationHref,
  resolveNotificationHref,
} from "@/components/notifications/resolveNotificationHref";

export function NotificationToast({
  notification,
  autoDismissMs,
  onDismiss,
}: {
  notification: PushToast;
  autoDismissMs: number;
  onDismiss: () => void;
}) {
  const router = useRouter();
  const remainingMs = useRef(autoDismissMs);
  const startedAt = useRef(Date.now());
  const timerId = useRef<number | undefined>(undefined);

  const clearTimer = () => {
    if (timerId.current !== undefined) {
      window.clearTimeout(timerId.current);
      timerId.current = undefined;
    }
  };

  const startTimer = () => {
    if (notification.leaving) return;
    clearTimer();
    startedAt.current = Date.now();
    timerId.current = window.setTimeout(() => {
      onDismiss();
    }, Math.max(0, remainingMs.current));
  };

  const pauseTimer = () => {
    if (notification.leaving) return;
    clearTimer();
    remainingMs.current -= Date.now() - startedAt.current;
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
    // Auto-dismiss is owned by this toast instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification.id]);

  const href = resolveNotificationHref(notification);
  const timeLabel = formatRelativeTime(notification.receivedAt);
  const timeText = timeLabel === "just now" ? "Just now" : timeLabel;

  const handleOpen = () => {
    if (notification.notificationId) {
      void recordNotificationClick(notification.notificationId).catch(() => {});
    }
    onDismiss();
    navigateNotificationHref(href, (path) => router.push(path));
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      onFocus={pauseTimer}
      onBlur={startTimer}
      className={cn(
        "pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-modal",
        notification.leaving
          ? "animate-toast-out motion-reduce:animate-none"
          : "animate-toast-in motion-reduce:animate-none",
      )}
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDismiss();
        }}
        aria-label="Dismiss notification"
        className="absolute right-3 top-3 rounded-full p-1 text-text-muted transition-colors hover:bg-surface-muted hover:text-text-primary"
      >
        <X size={16} />
      </button>

      <button
        type="button"
        onClick={handleOpen}
        className="flex w-full gap-3 pr-7 text-left"
        aria-label={`Open notification: ${notification.title}`}
      >
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
          <Bell size={18} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium uppercase tracking-wide text-brand-saffron-400">
            Notification
          </span>
          <span className="mt-1 block truncate font-sans text-sm font-semibold text-text-primary">
            {notification.title}
          </span>
          {notification.body ? (
            <span className="mt-1 line-clamp-3 block text-sm text-text-muted">
              {notification.body}
            </span>
          ) : null}
          <span className="mt-2 block text-xs text-text-light">{timeText}</span>
        </span>
      </button>
    </div>
  );
}
