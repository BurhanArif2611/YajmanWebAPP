"use client";

import { X, Search } from "lucide-react";
import { useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/layout/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-overlay-in"
        onClick={onClose}
      />
      <div className="relative flex h-full w-80 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-white p-6 shadow-modal animate-drawer-open">
        <div className="flex items-center justify-between">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary hover:bg-surface-muted"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for Puja, Festival..."
            className="w-full rounded-full border border-border bg-surface-muted py-3 pl-4 pr-11 text-sm outline-none"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="min-h-[44px] rounded-lg px-3 py-3 text-base font-medium text-text-primary hover:bg-surface-muted"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-border pt-4">
          <a
            href="/login"
            className="flex min-h-[44px] items-center justify-center rounded-full bg-brand-navy px-5 text-sm font-medium text-white"
          >
            Login / Register
          </a>
          <div className="flex items-center justify-center gap-4 text-text-muted">
            <FacebookIcon size={18} />
            <TwitterIcon size={18} />
            <YoutubeIcon size={18} />
            <InstagramIcon size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
