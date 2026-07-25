"use client";

import { useState } from "react";
import { ChevronDown, Menu, User } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Logo } from "@/components/layout/Logo";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { NAV_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white">
      <TopBar />
      <div className="border-b border-border">
        <div className="mx-auto flex h-20 max-w-site items-center justify-between gap-6 px-4 md:px-8 lg:px-16">
          <Logo />

          <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0]);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-saffron-400 xl:text-sm ${isActive ? "text-brand-saffron-400" : "text-text-primary"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <button className="flex items-center gap-1 text-sm font-medium text-text-primary">
              English
              <ChevronDown size={14} />
            </button>
            <a
              href="/login"
              className="flex min-h-[44px] items-center gap-2 rounded-full bg-brand-navy px-5 text-sm font-medium text-white transition-colors hover:bg-brand-navy-800"
            >
              <User size={16} />
              Login / Register
            </a>
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
