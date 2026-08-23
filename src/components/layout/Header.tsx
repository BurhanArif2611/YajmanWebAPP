"use client";

import { Suspense, useState } from "react";
import { Bell, ChevronDown, Menu, User } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useUnreadCount } from "@/hooks/useUnreadCount";
import { useNavLinks } from "@/hooks/useNavLinks";

/** Query-string links (e.g. /services?category=x) only count as active when every one of their params matches the current URL — otherwise every category link would light up together on /services. */
function isNavLinkActive(href: string, pathname: string, searchParams: URLSearchParams) {
  if (href === "/") return pathname === "/";

  const [linkPath, linkQuery] = href.split("?");
  if (pathname !== linkPath) return false;
  if (!linkQuery) return true;

  const linkParams = new URLSearchParams(linkQuery);
  return Array.from(linkParams.entries()).every(([key, value]) => searchParams.get(key) === value);
}

function NavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navLinks = useNavLinks();

  return (
    <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
      {navLinks.map((link) => {
        const isActive = isNavLinkActive(link.href, pathname, searchParams);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-saffron-400 xl:text-sm ${
              isActive ? "text-brand-saffron-400" : "text-text-primary"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function NavLinksFallback() {
  const pathname = usePathname();
  const navLinks = useNavLinks();

  return (
    <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
      {navLinks.map((link) => {
        const [linkPath] = link.href.split("?");
        const isActive = pathname === linkPath;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-saffron-400 xl:text-sm ${
              isActive ? "text-brand-saffron-400" : "text-text-primary"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { data: unread } = useUnreadCount();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <TopBar />
      <div className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-6 px-4 md:px-8 lg:px-16">
          <Link href="/" aria-label="Yajman home" className="shrink-0">
            <Image src="/images/logo/logo.svg" alt="Yajman" width={200} height={200} />
          </Link>

          <Suspense fallback={<NavLinksFallback />}>
            <NavLinks />
          </Suspense>

          <div className="hidden items-center gap-5 lg:flex">
            <button className="flex items-center gap-1 text-sm font-medium text-text-primary">
              English
              <ChevronDown size={14} />
            </button>
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile/notifications"
                  aria-label="Notifications"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-muted"
                >
                  <Bell size={20} />
                  {Boolean(unread?.count) && (
                    <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-brand-magenta ring-2 ring-white" />
                  )}
                </Link>
                <Link
                  href="/profile"
                  aria-label="My profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-navy-800"
                >
                  <User size={18} />
                </Link>
              </>
            ) : (
              <ButtonLink href="/login" variant="dark" className="gap-2 rounded-full">
                <User size={16} />
                Login / Register
              </ButtonLink>
            )}
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
