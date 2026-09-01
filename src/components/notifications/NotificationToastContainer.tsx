"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { NotificationToast } from "@/components/notifications/NotificationToast";
import type { PushToast } from "@/components/notifications/NotificationToastProvider";

function hasSiteHeader(pathname: string | null) {
  if (!pathname) return true;
  return pathname !== "/login" && !pathname.startsWith("/verify-otp");
}

export function NotificationToastContainer({
  notifications,
  autoDismissMs,
  onDismiss,
}: {
  notifications: PushToast[];
  autoDismissMs: number;
  onDismiss: (id: string) => void;
}) {
  const pathname = usePathname();
  const offsetBelowHeader = hasSiteHeader(pathname);

  useEffect(() => {
    if (notifications.length === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const top = notifications.find((item) => !item.leaving);
      if (top) onDismiss(top.id);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [notifications, onDismiss]);

  if (notifications.length === 0) return null;

  return (
    <div
      className={
        offsetBelowHeader
          ? "pointer-events-none fixed left-4 right-4 z-[60] flex max-h-[min(70vh,calc(100vh-9rem))] flex-col gap-3 overflow-y-auto top-[8.25rem] sm:left-auto sm:right-5 sm:w-[min(24rem,calc(100vw-2.5rem))] md:right-6 lg:right-8"
          : "pointer-events-none fixed left-4 right-4 z-[60] flex max-h-[min(70vh,calc(100vh-2.5rem))] flex-col gap-3 overflow-y-auto top-5 sm:left-auto sm:right-5 sm:w-[min(24rem,calc(100vw-2.5rem))] md:right-6 lg:right-8"
      }
      aria-label="Notifications"
    >
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          autoDismissMs={autoDismissMs}
          onDismiss={() => onDismiss(notification.id)}
        />
      ))}
    </div>
  );
}
