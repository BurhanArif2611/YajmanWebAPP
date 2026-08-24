"use client";

import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNavLinks } from "@/hooks/useNavLinks";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import Image from "next/image";
import Link from "next/link";
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
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const navLinks = useNavLinks();
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  if (!open) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    const href = query
      ? `/services?search=${encodeURIComponent(query)}`
      : "/services";
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-overlay-in"
        onClick={onClose}
      />
      <div className="relative flex h-full w-80 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-white p-6 shadow-modal animate-drawer-open">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Yajman home" onClick={onClose} className="shrink-0">
            <Image
              src="/images/logo/logo.svg"
              alt="Yajman"
              width={200}
              height={200}
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-text-primary hover:bg-surface-muted"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSearch}>
          <Input
            variant="pill"
            type="search"
            enterKeyHint="search"
            placeholder="Search for Puja, Festival..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="min-h-[44px] py-1"
            trailing={
              <button
                type="submit"
                aria-label="Search services"
                className="flex items-center justify-center text-text-muted hover:text-brand-saffron-400"
              >
                <Search size={18} />
              </button>
            }
          />
        </form>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
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
