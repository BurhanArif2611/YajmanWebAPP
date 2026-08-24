"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/service/FaqAccordion";
import { cn } from "@/lib/utils";

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

const KEY_FEATURES = Array.from({ length: 5 }).map(
  () => "Abhishek of the Shivling with milk, curd, ghee, honey, sugar, and holy water."
);

const PROCESS_INTRO =
  "Discover the perfect escape with our carefully curated travel packages. Whether you're seeking adventure, relaxation, or cultural discovery, our tours are designed to offer unforgettable experiences. Explore breath-taking landscapes, meet friendly locals, and create lasting memories in some of the world's most stunning destinations. Every journey is crafted with comfort.";

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Choose Puja",
    description: "Enter your Name and Gotra for the Sankalp.",
  },
  {
    number: "2",
    title: "Provide Sankalp details",
    description: "Enter your Name and Gotra for the Sankalp.",
  },
  {
    number: "3",
    title: "Puja Day Updates",
    description:
      "Our experienced pandits perform the sacred puja. You will receive real-time updates of the puja on your registered WhatsApp number.",
  },
  {
    number: "4",
    title: "Puja Video",
    description: "Get the puja video within 3-4 days on WhatsApp.",
  },
];

const REVIEWS = [
  { name: "Eleanor Fanta", date: "06 March, 2025", avatar: "/images/testimonials/avatar-1.png" },
  { name: "Duc Trung", date: "06 March, 2025", avatar: "/images/testimonials/avatar-2.png" },
  { name: "Mohaymina", date: "06 March, 2025", avatar: "/images/testimonials/avatar-3.png" },
  { name: "Mauro", date: "06 March, 2025", avatar: "/images/testimonials/avatar-1.png" },
].map((r) => ({
  ...r,
  score: "9.5 Super",
  text: "Our trip with Crown Tours was absolutely amazing! Every detail, from flights to hotels and local activities, was perfectly planned guides were knowledgeable and friendly, making our journey smooth and unforgettable.",
}));

const FAQS = Array.from({ length: 4 }).map(() => ({
  question: "I don't know my Gotra, what should I do?",
  answer:
    "If you don't know your Gotra, our Pandit ji can help identify a common Gotra during the puja, or you may check with family elders beforehand.",
}));

export type DetailTabsProps = {
  keyFeatures?: string[];
  templeName?: string | null;
  templeDescription?: string | null;
  photos: string[];
  faqs?: { question: string; answer: string }[];
};

export function DetailTabs({
  keyFeatures,
  templeName,
  templeDescription,
  photos,
  faqs,
}: DetailTabsProps) {
  const hasTemple = Boolean(templeName?.trim() || templeDescription?.trim());
  const tabs = useMemo(
    () => (hasTemple ? [...TABS] : TABS.filter((tab) => tab !== "Temple Details")),
    [hasTemple]
  );

  const [active, setActive] = useState<Tab>(tabs[0]);
  const features = keyFeatures?.length ? keyFeatures : KEY_FEATURES;
  const faqItems = faqs?.length ? faqs : FAQS;
  const sectionRefs = useRef<Partial<Record<Tab, HTMLDivElement | null>>>({});
  const isClickScrolling = useRef(false);

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

      <div
        id={TAB_IDS.Process}
        data-tab="Process"
        ref={(el) => {
          sectionRefs.current["Process"] = el;
        }}
        className="scroll-mt-36 sm:scroll-mt-40"
      >
        <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">
          Puja Process
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
          {PROCESS_INTRO}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-2 sm:gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-peach font-sans text-lg font-semibold text-brand-saffron-400 sm:h-12 sm:w-12 sm:text-xl">
                {step.number}
              </span>
              <h3 className="font-sans text-base font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

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
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-text-primary">
                    {review.name}
                  </p>
                  <p className="text-xs text-text-muted">{review.date}</p>
                </div>
              </div>
              <p className="flex items-center gap-1 text-sm font-semibold text-brand-saffron-400">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                {review.score}
              </p>
              <p className="text-sm text-text-muted">{review.text}</p>
            </div>
          ))}
        </div>
        <Button variant="primary" className="mt-6 w-full rounded-full sm:w-auto">
          Show all reviews
        </Button>
      </div>

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
    </section>
  );
}
