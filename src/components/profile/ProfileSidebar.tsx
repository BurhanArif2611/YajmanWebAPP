"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Bell, ChevronDown, Headphones, LogOut, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROFILE_USER } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";

const BOOKING_TABS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "cancelled" },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logout } = useAuth();
  const activeTab = searchParams.get("tab") ?? "active";

  const isPersonalData = pathname === "/profile";
  const isBookings = pathname.startsWith("/profile/bookings");
  const isNotifications = pathname === "/profile/notifications";
  const isSupport = pathname === "/profile/support";

  return (
    <aside className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-card">
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image
            src={PROFILE_USER.avatar}
            alt={PROFILE_USER.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-sans text-lg font-semibold text-text-primary">
            {PROFILE_USER.name}
          </p>
          <p className="text-sm text-text-muted">{PROFILE_USER.role}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <Link
          href="/profile"
          className={cn(
            "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors",
            isPersonalData
              ? "bg-surface-peach text-brand-saffron-400"
              : "text-text-primary hover:bg-surface-muted"
          )}
        >
          <User size={18} />
          Personal Data
        </Link>

        <div>
          <Link
            href="/profile/bookings"
            className={cn(
              "flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 text-base font-medium transition-colors",
              isBookings
                ? "bg-surface-peach text-brand-saffron-400"
                : "text-text-primary hover:bg-surface-muted"
            )}
          >
            <span className="flex items-center gap-3">
              <Ticket size={18} />
              Bookings
            </span>
            <ChevronDown
              size={16}
              className={cn("transition-transform", isBookings && "rotate-180")}
            />
          </Link>

          {isBookings && (
            <ul className="mt-1 flex flex-col gap-1 pl-11">
              {BOOKING_TABS.map((tab) => (
                <li key={tab.value}>
                  <Link
                    href={`/profile/bookings?tab=${tab.value}`}
                    className={cn(
                      "flex min-h-[36px] items-center border-l-2 pl-3 text-sm font-medium transition-colors",
                      activeTab === tab.value
                        ? "border-brand-saffron-400 text-brand-saffron-400"
                        : "border-transparent text-text-muted hover:text-text-secondary"
                    )}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href="/profile/notifications"
          className={cn(
            "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors",
            isNotifications
              ? "bg-surface-peach text-brand-saffron-400"
              : "text-text-primary hover:bg-surface-muted"
          )}
        >
          <Bell size={18} />
          Notifications
        </Link>

        <Link
          href="/profile/support"
          className={cn(
            "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors",
            isSupport
              ? "bg-surface-peach text-brand-saffron-400"
              : "text-text-primary hover:bg-surface-muted"
          )}
        >
          <Headphones size={18} />
          Support
        </Link>
      </nav>

      <div className="border-t border-border pt-6">
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="flex min-h-[44px] items-center gap-3 text-base font-medium text-error hover:text-error/80"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
