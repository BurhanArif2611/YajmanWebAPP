"use client";

import { useEffect, useRef, useState } from "react";
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

const TEMPLE_PARAGRAPH =
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

const PHOTOS = [
  "/images/gallery/gallery-5.png",
  "/images/gallery/gallery-1.png",
  "/images/blog/blog-sidebar-1.png",
  "/images/blog/blog-sidebar-4.png",
  "/images/gallery/gallery-4.png",
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

export function DetailTabs() {
  const [active, setActive] = useState<Tab>(TABS[0]);
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

    TABS.forEach((tab) => {
      const el = sectionRefs.current[tab];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab: Tab) => {
    setActive(tab);
    isClickScrolling.current = true;
    sectionRefs.current[tab]?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  return (
    <section className="flex flex-col gap-14">
      <div className="sticky top-20 z-30 -mx-4 flex flex-wrap gap-8 border-b border-border bg-white px-4 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "min-h-[44px] border-b-2 pb-3 text-lg font-medium transition-colors",
              active === tab
                ? "border-brand-saffron-400 text-text-primary"
                : "border-transparent text-text-light hover:text-text-secondary"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        id={TAB_IDS["Key Features"]}
        data-tab="Key Features"
        ref={(el) => {
          sectionRefs.current["Key Features"] = el;
        }}
        className="scroll-mt-40"
      >
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Key Features of the Ritual
        </h2>
        <ul className="mt-4 flex flex-col gap-2">
          {KEY_FEATURES.map((feature, i) => (
            <li key={i} className="flex gap-2 text-sm text-text-muted">
              <span className="text-brand-saffron-400">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div
        id={TAB_IDS["Temple Details"]}
        data-tab="Temple Details"
        ref={(el) => {
          sectionRefs.current["Temple Details"] = el;
        }}
        className="scroll-mt-40"
      >
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Omkareshwar Temple
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-text-muted">{TEMPLE_PARAGRAPH}</p>
          <p className="text-sm leading-relaxed text-text-muted">{TEMPLE_PARAGRAPH}</p>
        </div>
      </div>

      <div
        id={TAB_IDS.Process}
        data-tab="Process"
        ref={(el) => {
          sectionRefs.current["Process"] = el;
        }}
        className="scroll-mt-40"
      >
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Puja Process
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
          {TEMPLE_PARAGRAPH}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-peach font-sans text-xl font-semibold text-brand-saffron-400">
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
        className="scroll-mt-40"
      >
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Pooja Photos
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PHOTOS.map((src, i) => (
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
        className="scroll-mt-40"
      >
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Reviews &amp; Ratings
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
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
        <Button variant="primary" className="mt-6 rounded-full">
          Show all reviews
        </Button>
      </div>

      <div
        id={TAB_IDS["FAQ's"]}
        data-tab="FAQ's"
        ref={(el) => {
          sectionRefs.current["FAQ's"] = el;
        }}
        className="scroll-mt-40"
      >
        <h2 className="font-sans text-2xl font-semibold text-text-primary">
          Frequently Asked Questions
        </h2>
        <div className="mt-4">
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
