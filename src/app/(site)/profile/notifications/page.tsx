import { Bell } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/constants";

export const metadata = {
  title: "Notifications | Yajman",
};

export default function NotificationsPage() {
  return (
    <div className="rounded-2xl bg-surface-peach p-6 md:p-10">
      <h1 className="font-sans text-2xl font-bold text-text-primary md:text-3xl">
        Notifications
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Stay updated on your bookings and puja reminders.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {NOTIFICATIONS.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-peach text-brand-saffron-400">
              <Bell size={18} />
              {notification.unread && (
                <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-brand-magenta ring-2 ring-white" />
              )}
            </span>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="font-sans text-base font-semibold text-text-primary">
                  {notification.title}
                </p>
                <span className="shrink-0 text-xs text-text-light">
                  {notification.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-text-muted">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
