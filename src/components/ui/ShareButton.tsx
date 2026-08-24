"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, MoreHorizontal, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  title: string;
  text?: string;
  /** Absolute or site-relative path; defaults to current page URL. */
  url?: string;
  className?: string;
  align?: "left" | "right";
};

type Platform = {
  id: string;
  label: string;
  icon: string;
  onClick: () => void | Promise<void>;
};

function resolveShareUrl(url?: string) {
  if (typeof window === "undefined") return url ?? "";
  if (!url) return window.location.href;
  if (url.startsWith("http")) return url;
  return `${window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
}

export function ShareButton({
  title,
  text,
  url,
  className,
  align = "right",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [instagramHint, setInstagramHint] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied && !instagramHint) return;
    const id = window.setTimeout(() => {
      setCopied(false);
      setInstagramHint(false);
    }, 2200);
    return () => window.clearTimeout(id);
  }, [copied, instagramHint]);

  const getUrl = () => resolveShareUrl(url);
  const shareText = text?.trim() || title;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const openWindow = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=560");
    setOpen(false);
  };

  const platforms: Platform[] = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: "/images/share/whatsapp.svg",
      onClick: () =>
        openWindow(
          `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${getUrl()}`)}`
        ),
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: "/images/share/facebook.svg",
      onClick: () =>
        openWindow(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`
        ),
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: "/images/share/instagram.svg",
      onClick: async () => {
        await copyLink();
        setInstagramHint(true);
      },
    },
    {
      id: "x",
      label: "X",
      icon: "/images/share/x.svg",
      onClick: () =>
        openWindow(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(getUrl())}`
        ),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: "/images/share/linkedin.svg",
      onClick: () =>
        openWindow(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`
        ),
    },
    {
      id: "telegram",
      label: "Telegram",
      icon: "/images/share/telegram.svg",
      onClick: () =>
        openWindow(
          `https://t.me/share/url?url=${encodeURIComponent(getUrl())}&text=${encodeURIComponent(shareText)}`
        ),
    },
    {
      id: "email",
      label: "Email",
      icon: "/images/share/gmail.svg",
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${getUrl()}`)}`;
        setOpen(false);
      },
    },
    {
      id: "copy",
      label: copied ? "Copied" : "Copy link",
      icon: "/images/share/copy.svg",
      onClick: async () => {
        await copyLink();
      },
    },
  ];

  const handleNativeShare = async () => {
    const shareUrl = getUrl();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        setOpen(false);
      } catch {
        // User cancelled or share failed — keep menu open.
      }
    }
  };

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-saffron-400"
      >
        <Share2 size={16} />
        Share
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Share options"
          className={cn(
            "absolute top-[calc(100%+10px)] z-50 w-[min(19.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-modal",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-sans text-sm font-semibold text-text-primary">Share via</p>
            {(copied || instagramHint) && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                <Check size={12} />
                {instagramHint ? "Link copied for Instagram" : "Link copied"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={platform.onClick}
                className="flex flex-col items-center gap-1.5 rounded-xl px-1 py-2 transition-colors hover:bg-surface-muted"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted ring-1 ring-border/60">
                  <Image
                    src={platform.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                    unoptimized
                  />
                </span>
                <span className="text-[11px] font-medium text-text-muted">{platform.label}</span>
              </button>
            ))}
          </div>

          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border-dark text-sm font-medium text-text-primary transition-colors hover:bg-surface-muted"
            >
              <MoreHorizontal size={16} />
              More options
            </button>
          )}
        </div>
      )}
    </div>
  );
}
