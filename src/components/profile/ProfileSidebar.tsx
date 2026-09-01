"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Bell,
  Check,
  ChevronDown,
  ClipboardList,
  Headphones,
  LogOut,
  Ticket,
  User,
} from "lucide-react";
import { LogoutConfirmModal } from "@/components/auth/LogoutConfirmModal";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentUser } from "@/hooks/useProfile";
import { useUnreadCount } from "@/hooks/useUnreadCount";

const BOOKING_TABS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "cancelled" },
];

type NavKey = "personal" | "bookings" | "assignments" | "notifications" | "support";

function useActiveNavKey() {
  const pathname = usePathname();
  if (pathname.startsWith("/profile/bookings")) return "bookings" as const;
  if (pathname.startsWith("/profile/assignments")) return "assignments" as const;
  if (pathname === "/profile/notifications") return "notifications" as const;
  if (pathname === "/profile/support") return "support" as const;
  return "personal" as const;
}

function useNavItems() {
  const user = useCurrentUser();
  const isPandit = user?.role === "pandit";

  return useMemo(() => {
    const items: { key: NavKey; label: string; href: string; icon: typeof User }[] = [
      { key: "personal", label: "Personal Data", href: "/profile", icon: User },
      { key: "bookings", label: "Bookings", href: "/profile/bookings", icon: Ticket },
    ];
    if (isPandit) {
      items.push({
        key: "assignments",
        label: "Assignments",
        href: "/profile/assignments",
        icon: ClipboardList,
      });
    }
    items.push(
      {
        key: "notifications",
        label: "Notifications",
        href: "/profile/notifications",
        icon: Bell,
      },
      { key: "support", label: "Support", href: "/profile/support", icon: Headphones }
    );
    return items;
  }, [isPandit]);
}

function BookingTabChips({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "active";

  return (
    <div className={cn("-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar", className)}>
      {BOOKING_TABS.map((tab) => (
        <Link
          key={tab.value}
          href={`/profile/bookings?tab=${tab.value}`}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            activeTab === tab.value
              ? "bg-brand-saffron-400 text-white"
              : "bg-white text-text-secondary shadow-card hover:text-brand-saffron-400"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

function DesktopBookingSubnav() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "active";

  return (
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
  );
}

function ProfileMobileNav({ onLogoutClick }: { onLogoutClick: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();
  const { data: unread } = useUnreadCount();
  const navItems = useNavItems();
  const activeKey = useActiveNavKey();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItem = navItems.find((item) => item.key === activeKey) ?? navItems[0];
  const ActiveIcon = activeItem.icon;
  const isBookings = pathname.startsWith("/profile/bookings");

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div className="flex flex-col gap-3 lg:hidden">
      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-muted">
          {/* <Image
            src={user?.avatar_url || "/images/testimonials/avatar-3.png"}
            alt={user?.name ?? "Profile photo"}
            fill
            sizes="48px"
            className="object-cover"
          /> */}
          <img
            src={user?.avatar_url || "/images/testimonials/avatar-3.png"}
            className="object-cover h-full w-full"
            alt={user?.name || "Profile photo"}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-base font-semibold text-text-primary">
            {user?.name || "Your Account"}
          </p>
          <p className="truncate text-sm text-text-muted">{user?.phone}</p>
        </div>
        <button
          type="button"
          onClick={onLogoutClick}
          aria-label="Log out"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-error hover:bg-error/10"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div ref={containerRef} className="relative z-20">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border border-border-dark bg-white px-4 text-left shadow-card"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <ActiveIcon size={18} className="shrink-0 text-brand-saffron-400" />
            <span className="truncate text-sm font-semibold text-text-primary">
              {activeItem.label}
            </span>
            {activeKey === "notifications" && Boolean(unread?.count) && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-magenta px-1.5 text-xs font-semibold text-white">
                {unread!.count > 9 ? "9+" : unread!.count}
              </span>
            )}
          </span>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 text-text-muted transition-transform",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-modal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const selected = item.key === activeKey;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    router.push(item.href);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    selected
                      ? "bg-surface-peach text-brand-saffron-400"
                      : "text-text-primary hover:bg-surface-muted"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={18} />
                    {item.label}
                    {item.key === "notifications" && Boolean(unread?.count) && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-magenta px-1.5 text-xs font-semibold text-white">
                        {unread!.count > 9 ? "9+" : unread!.count}
                      </span>
                    )}
                  </span>
                  {selected && <Check size={16} className="text-brand-saffron-400" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isBookings && (
        <Suspense
          fallback={
            <div className="flex gap-2">
              {BOOKING_TABS.map((tab) => (
                <div key={tab.value} className="h-9 w-20 shrink-0 rounded-full bg-surface-muted" />
              ))}
            </div>
          }
        >
          <BookingTabChips />
        </Suspense>
      )}
    </div>
  );
}

function ProfileDesktopSidebar({ onLogoutClick }: { onLogoutClick: () => void }) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const { data: unread } = useUnreadCount();
  const activeKey = useActiveNavKey();
  const isBookings = pathname.startsWith("/profile/bookings");
  const isPandit = user?.role === "pandit";

  return (
    <aside className="hidden flex-col gap-6 rounded-2xl bg-white p-6 shadow-card lg:flex">
      <div className="flex items-center gap-3 border-b border-border pb-6">
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-surface-muted">
          <Image
            src={user?.avatar_url || "/images/testimonials/avatar-3.png"}
            alt={user?.name ?? "Profile photo"}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-sans text-lg font-semibold text-text-primary">
            {user?.name || "Your Account"}
          </p>
          <p className="text-sm text-text-muted">{user?.phone}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <Link
          href="/profile"
          className={cn(
            "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors",
            activeKey === "personal"
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
            <Suspense fallback={null}>
              <DesktopBookingSubnav />
            </Suspense>
          )}
        </div>

        {isPandit && (
          <Link
            href="/profile/assignments"
            className={cn(
              "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors",
              activeKey === "assignments"
                ? "bg-surface-peach text-brand-saffron-400"
                : "text-text-primary hover:bg-surface-muted"
            )}
          >
            <ClipboardList size={18} />
            Assignments
          </Link>
        )}

        <Link
          href="/profile/notifications"
          className={cn(
            "flex min-h-[44px] items-center justify-between gap-3 rounded-lg px-3 text-base font-medium transition-colors",
            activeKey === "notifications"
              ? "bg-surface-peach text-brand-saffron-400"
              : "text-text-primary hover:bg-surface-muted"
          )}
        >
          <span className="flex items-center gap-3">
            <Bell size={18} />
            Notifications
          </span>
          {Boolean(unread?.count) && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-magenta px-1.5 text-xs font-semibold text-white">
              {unread!.count > 9 ? "9+" : unread!.count}
            </span>
          )}
        </Link>

        <Link
          href="/profile/support"
          className={cn(
            "flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors",
            activeKey === "support"
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
          type="button"
          onClick={onLogoutClick}
          className="flex min-h-[44px] items-center gap-3 text-base font-medium text-error hover:text-error/80"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}

export function ProfileSidebar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setLogoutOpen(false);
    router.push("/");
  };

  return (
    <div className="min-w-0 w-full">
      <ProfileMobileNav onLogoutClick={() => setLogoutOpen(true)} />
      <ProfileDesktopSidebar onLogoutClick={() => setLogoutOpen(true)} />
      {logoutOpen && (
        <LogoutConfirmModal
          onClose={() => setLogoutOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </div>
  );
}
