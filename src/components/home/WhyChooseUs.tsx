import Image from "@/components/ui/AppImage";
import { MapPin, PiggyBank, ThumbsUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TopoDoodle } from "@/components/ui/TopoDoodle";

const FEATURES = [
  {
    icon: '/icons/package.svg',
    title: "Complete Package",
    description:
      "All items, flowers, and ritual materials included in a single price.",
  },
  {
    icon: '/icons/locate.png',

    title: "Live Ritual Coverage",
    description:
      "Stream ceremonies in real-time for families across the globe.",
  },
  {
    icon: "/icons/thumbs.svg",
    title: "Flexible Booking",
    description:
      "Reschedule freely with auspicious date suggestions from our priests.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-site px-4 py-10 md:px-8 md:py-16 lg:px-16 lg:py-24 lg:pt-4">
      <div className="relative overflow-hidden rounded-2xl bg-brand-saffron-100 p-6 md:p-10 lg:p-14 ">
        {/* <TopoDoodle className="-left-4 -top-4 text-black/10" /> */}
        {/* <TopoDoodle className="-bottom-6 -right-6 text-black/10" /> */}
        <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute top-0 left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10" />

        <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute bottom-0 right-0 z-0 bg-no-repeat rotate-180 bg-left-top bg-contain bg-[length:300px_auto] opacity-10" />
        <SectionHeader
          eyebrow="why choose us"
          heading="Why choose book Yajman?"
          className="relative"
          headingClassName="text-text-primary"
          eyebrowClassName="text-brand-saffron-700"
        />

        <div className="relative mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_1.15fr]">
          <div className="flex flex-col  bg-brand-saffron-400  rounded-lg">
            <div className="p-4">
              <p className="font-sans text-5xl font-extrabold text-white">10K+</p>
              <p className="mt-1 font-sans text-lg font-semibold text-white">
                Puja&apos;s Completed Worldwide
              </p>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl md:h-72">
              <Image
                src="/images/misc/promo-items.png"
                alt="Puja samagri and sacred texts"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover rounded-b-lg bottom-0"
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
                className="object-cover rounded-t-lg"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            {FEATURES.map(({ icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-card"
              >
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center text-text-primary">
                  <Image src={icon} alt="trust" width={32} height={32} className="" />
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
