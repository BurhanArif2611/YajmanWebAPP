import Image from "next/image";
import { MapPin, PiggyBank, ThumbsUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FEATURES = [
  {
    icon: PiggyBank,
    title: "Complete Package",
    description:
      "All items, flowers, and ritual materials included in a single price.",
  },
  {
    icon: MapPin,
    title: "Live Ritual Coverage",
    description:
      "Stream ceremonies in real-time for families across the globe.",
  },
  {
    icon: ThumbsUp,
    title: "Flexible Booking",
    description:
      "Reschedule freely with auspicious date suggestions from our priests.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl bg-brand-saffron-400 p-6 md:p-10 lg:p-14">
        <svg
          className="pointer-events-none absolute -left-4 -top-4 h-40 w-40 text-black/10 md:h-56 md:w-56"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path d="M-20 60C20 20 60 100 100 60S180 20 220 60" />
          <path d="M-20 90C20 50 60 130 100 90S180 50 220 90" />
          <path d="M-20 120C20 80 60 160 100 120S180 80 220 120" />
        </svg>
        <svg
          className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 text-black/10 md:h-56 md:w-56"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path d="M-20 60C20 20 60 100 100 60S180 20 220 60" />
          <path d="M-20 90C20 50 60 130 100 90S180 50 220 90" />
          <path d="M-20 120C20 80 60 160 100 120S180 80 220 120" />
        </svg>

        <SectionHeader
          eyebrow="why choose us"
          heading="Why choose book Yajman?"
          className="relative"
          headingClassName="text-text-primary"
          eyebrowClassName="text-white/50"
        />

        <div className="relative mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-sans text-5xl font-extrabold text-white">10K+</p>
              <p className="mt-1 font-sans text-lg font-semibold text-white">
                Puja&apos;s Completed Worldwide
              </p>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-56">
              <Image
                src="/images/misc/promo-items.png"
                alt="Puja samagri and sacred texts"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl bg-brand-navy">
            <div className="p-5">
              <p className="font-sans text-5xl font-extrabold text-white">250+</p>
              <p className="mt-1 font-sans text-lg font-semibold text-white">
                Connected Pandits
              </p>
            </div>
            <div className="relative h-48 w-full flex-1 md:h-56">
              <Image
                src="/images/misc/stat-pandits.png"
                alt="Pandit performing puja"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card-hover"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center text-text-primary">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
