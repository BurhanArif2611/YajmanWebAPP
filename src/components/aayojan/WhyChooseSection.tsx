import Image from "@/components/ui/AppImage";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const POINTS = [
  "Complete Event Planning",
  "Verified Spiritual Artists",
  "Customized Events",
  "Authentic Rituals",
];

export function WhyChooseSection() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-16">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2">
        <div className="relative h-72 w-full lg:h-auto">
          <Image
            src="/images/ayongan/image-2.png"
            alt="Pandits performing a havan ritual"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-8 bg-brand-navy p-8 md:p-12 md:py-24">
          <div>
            <span className="font-decorative text-lg text-brand-saffron-400 md:text-3xl">
              Why Choose Yajman
            </span>
            <h2 className="mt-2 font-sans text-3xl font-semibold text-white md:text-5xl">
              Why Families Choose Yajman for Devotional Events
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {POINTS.map((point) => (
              <div key={point} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="shrink-0 text-brand-saffron-400" />
                <span className="text-sm font-medium text-white">{point}</span>
              </div>
            ))}
          </div>

          <ButtonLink href="/contact" size="lg" className="self-start rounded-full">
            Contact Us Now
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
