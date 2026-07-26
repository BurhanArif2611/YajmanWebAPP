"use client";

import { X, Search } from "lucide-react";
import { useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { isLoggedIn, logout } = useAuth();

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
          <Image src="/images/logo/logo.svg" alt="logo" width={200} height={200} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary hover:bg-surface-muted"
          >
            <X size={22} />
          </button>
        </div>

        <Input
          variant="pill"
          type="text"
          placeholder="Search for Puja, Festival..."
          containerClassName="min-h-[44px] py-1"
          trailing={<Search size={18} className="text-text-muted" />}
        />

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
          {isLoggedIn ? (
            <>
              <ButtonLink
                href="/profile"
                variant="dark"
                className="rounded-full"
                onClick={onClose}
              >
                My Profile
              </ButtonLink>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="min-h-[44px] rounded-full border border-border-dark text-sm font-medium text-error"
              >
                Log out
              </button>
            </>
          ) : (
            <ButtonLink href="/login" variant="dark" className="rounded-full" onClick={onClose}>
              Login / Register
            </ButtonLink>
          )}
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
