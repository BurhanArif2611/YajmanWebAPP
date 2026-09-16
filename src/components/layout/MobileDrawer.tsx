"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useArticleNavCategories, useNavLinks } from "@/hooks/useNavLinks";
import { SocialLinks } from "@/components/layout/SocialLinks";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { ButtonLink } from "@/components/ui/Button";
import { LogoutConfirmModal } from "@/components/auth/LogoutConfirmModal";
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
  const articleCategories = useArticleNavCategories();
  const [search, setSearch] = useState("");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setArticlesOpen(false);
    }
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
      <div className="relative flex h-full w-[min(22rem,90vw)] flex-col gap-5 overflow-x-hidden overflow-y-auto bg-white p-4 shadow-modal animate-drawer-open sm:gap-6 sm:p-6">
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
          {navLinks.map((link) => {
            if (link.label === "Articles" && articleCategories.length) {
              return (
                <div key={link.href}>
                  <button
                    type="button"
                    onClick={() => setArticlesOpen((value) => !value)}
                    aria-expanded={articlesOpen}
                    className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-medium text-text-primary hover:bg-surface-muted"
                  >
                    Articles
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${articlesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {articlesOpen && (
                    <div className="ml-3 flex max-h-64 flex-col overflow-y-auto border-l border-border bg-surface-muted/30 pl-2">
                      <Link
                        href="/articles"
                        onClick={onClose}
                        className="flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-muted"
                      >
                        All Articles
                      </Link>
                      {articleCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/articles?category=${category.id}`}
                          onClick={onClose}
                          className="flex min-h-[44px] items-center break-words rounded-lg px-3 py-2.5 text-sm font-medium leading-snug text-text-secondary hover:bg-surface-muted"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="min-h-[44px] rounded-lg px-3 py-3 text-base font-medium text-text-primary hover:bg-surface-muted"
              >
                {link.label}
              </Link>
            );
          })}
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
                onClick={() => setLogoutOpen(true)}
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
          <SocialLinks className="justify-center" iconClassName="text-text-muted" />
        </div>
      </div>

      {logoutOpen && (
        <LogoutConfirmModal
          onClose={() => setLogoutOpen(false)}
          onConfirm={() => {
            logout();
            setLogoutOpen(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}
