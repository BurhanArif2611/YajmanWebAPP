"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "@/components/ui/AppImage";
import { Star } from "lucide-react";
import { FaqAccordion } from "@/components/service/FaqAccordion";
import { cn, formatRelativeTime } from "@/lib/utils";
import { looksLikeHtml, RICH_TEXT_PROSE_CLASS } from "@/lib/richText";
import { resolveImageUrl } from "@/lib/mappers/service";
import type { PujaProcess, ServiceReview } from "@/types/api";

const TABS = [
  "Key Features",
  "Temple Details",
  "Process",
  "Photos",
  "Reviews",
  "FAQ's",
] as const;

type Tab = (typeof TABS)[number];

const TAB_IDS: Record<Tab, string> = {
  "Key Features": "key-features",
  "Temple Details": "temple-details",
  Process: "process",
  Photos: "photos",
  Reviews: "reviews",
  "FAQ's": "faqs",
};

export type DetailTabsProps = {
  keyFeatures?: string[];
  templeName?: string | null;
  templeDescription?: string | null;
  pujaProcess?: PujaProcess | null;
  photos: string[];
  faqs?: { question: string; answer: string }[];
  reviews?: ServiceReview[];
};

export function DetailTabs({
  keyFeatures,
  templeName,
  templeDescription,
  pujaProcess,
  photos,
  faqs,
  reviews,
}: DetailTabsProps) {
  const hasTemple = Boolean(templeName?.trim() || templeDescription?.trim());
  const features = keyFeatures?.filter((f) => f.trim()) ?? [];
  const faqItems = faqs?.filter((f) => f.question?.trim()) ?? [];
  const reviewItems = reviews ?? [];
  const hasPhotos = photos.length > 0;
  const processSteps = useMemo(
    () =>
      [...(pujaProcess?.steps ?? [])].sort((a, b) => a.display_order - b.display_order),
    [pujaProcess]
  );
  const hasPujaProcess = Boolean(pujaProcess);

  const tabs = useMemo(() => {
    return TABS.filter((tab) => {
      if (tab === "Temple Details") return hasTemple;
      if (tab === "Key Features") return features.length > 0;
      if (tab === "Photos") return hasPhotos;
      if (tab === "Reviews") return reviewItems.length > 0;
      if (tab === "FAQ's") return faqItems.length > 0;
      if (tab === "Process") return hasPujaProcess;
      return true;
    });
  }, [hasTemple, features.length, hasPhotos, reviewItems.length, faqItems.length, hasPujaProcess]);

  const [active, setActive] = useState<Tab>(tabs[0] ?? "Key Features");
  const sectionRefs = useRef<Partial<Record<Tab, HTMLDivElement | null>>>({});
  const isClickScrolling = useRef(false);

  useEffect(() => {
    if (tabs.length && !tabs.includes(active)) {
      setActive(tabs[0]);
    }
  }, [tabs, active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.getAttribute("data-tab") as Tab;
          if (id) setActive(id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 }
    );

    tabs.forEach((tab) => {
      const el = sectionRefs.current[tab];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tabs]);

  const handleTabClick = (tab: Tab) => {
    setActive(tab);
    isClickScrolling.current = true;
    sectionRefs.current[tab]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  if (!tabs.length) return null;

  return (
    <section className="flex flex-col gap-8 sm:gap-10 lg:gap-14">
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-white sm:top-[7.3rem] md:-mx-8 lg:-mx-16">
        <div className="flex gap-5 overflow-x-auto px-4 sm:gap-8 md:px-8 lg:px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "min-h-[44px] shrink-0 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors sm:text-base lg:text-base",
                active === tab
                  ? "border-brand-saffron-400 text-text-primary"
                  : "border-transparent text-text-light hover:text-text-secondary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {features.length > 0 && (
        <div
          id={TAB_IDS["Key Features"]}
          data-tab="Key Features"
          ref={(el) => {
            sectionRefs.current["Key Features"] = el;
          }}
          className="scroll-mt-36 sm:scroll-mt-40"
        >
          <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
            Key Features of the Ritual
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {features.map((feature, i) => (
              <li key={i} className="flex gap-2 text-sm text-text-muted">
                <span className="shrink-0 text-brand-saffron-400">•</span>
                <span className="break-words">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasTemple && (
        <div
          id={TAB_IDS["Temple Details"]}
          data-tab="Temple Details"
          ref={(el) => {
            sectionRefs.current["Temple Details"] = el;
          }}
          className="scroll-mt-36 sm:scroll-mt-40"
        >
          {templeName?.trim() && (
            <h2 className="font-sans text-xl font-semibold break-words text-text-primary sm:text-2xl">
              {templeName.trim()}
            </h2>
          )}
          {templeDescription?.trim() && (
            <div className={cn("flex flex-col gap-4", templeName?.trim() && "mt-4")}>
              <p className="text-sm leading-relaxed text-text-muted">
                {templeDescription.trim()}
              </p>
            </div>
          )}
        </div>
      )}

      {hasPujaProcess && (
        <div
          id={TAB_IDS.Process}
          data-tab="Process"
          ref={(el) => {
            sectionRefs.current["Process"] = el;
          }}
          className="scroll-mt-36 sm:scroll-mt-40"
        >
          <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
            {"Puja Process"}
          </h2>
          {pujaProcess?.description?.trim() &&
            (looksLikeHtml(pujaProcess.description) ? (
              <article
                className={`${RICH_TEXT_PROSE_CLASS} mt-3 max-w-2xl text-sm sm:text-base`}
                dangerouslySetInnerHTML={{ __html: pujaProcess.description.trim() }}
              />
            ) : (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
                {pujaProcess.description.trim()}
              </p>
            ))}
          <div
            className={cn(
              processSteps.length > 0 && "mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8",
              processSteps.length >= 3 && "md:grid-cols-3",
              processSteps.length >= 4 && "md:grid-cols-4"
            )}
          >
            {processSteps.map((step, index) => {
              const description = step.description?.trim() ?? "";
              return (
                <div key={step.id} className="flex flex-col gap-2 sm:gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-peach font-sans text-lg font-semibold text-brand-saffron-400 sm:h-12 sm:w-12 sm:text-xl">
                    {index + 1}
                  </span>
                  <h3 className="font-sans text-base font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  {description &&
                    (looksLikeHtml(description) ? (
                      <article
                        className={`${RICH_TEXT_PROSE_CLASS} text-sm`}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ) : (
                      <p className="text-sm text-text-muted">{description}</p>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {hasPhotos && (
        <div
          id={TAB_IDS.Photos}
          data-tab="Photos"
          ref={(el) => {
            sectionRefs.current["Photos"] = el;
          }}
          className="scroll-mt-36 sm:scroll-mt-40"
        >
          <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
            Pooja Photos
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {photos.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Pooja photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {reviewItems.length > 0 && (
        <div
          id={TAB_IDS.Reviews}
          data-tab="Reviews"
          ref={(el) => {
            sectionRefs.current["Reviews"] = el;
          }}
          className="scroll-mt-36 sm:scroll-mt-40"
        >
          <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
            Reviews &amp; Ratings
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            {reviewItems.map((review) => (
              <div key={review.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-muted">
                    {review.avatar_url ? (
                      <Image
                        src={resolveImageUrl(review.avatar_url)}
                        alt={review.customer_name || "Reviewer"}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-text-primary">
                      {review.customer_name || "Yajman customer"}
                    </p>
                    <p className="text-xs text-text-muted">
                      {formatRelativeTime(review.created_at)}
                    </p>
                  </div>
                </div>
                <p className="flex items-center gap-1 text-sm font-semibold text-brand-saffron-400">
                  <Star size={14} fill="currentColor" strokeWidth={0} />
                  {review.rating.toFixed(1)}
                </p>
                {review.title && (
                  <p className="font-sans text-sm font-semibold text-text-primary">
                    {review.title}
                  </p>
                )}
                {review.comment && (
                  <p className="text-sm text-text-muted">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {faqItems.length > 0 && (
        <div
          id={TAB_IDS["FAQ's"]}
          data-tab="FAQ's"
          ref={(el) => {
            sectionRefs.current["FAQ's"] = el;
          }}
          className="scroll-mt-36 sm:scroll-mt-40"
        >
          <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-4">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      )}
    </section>
  );
}
