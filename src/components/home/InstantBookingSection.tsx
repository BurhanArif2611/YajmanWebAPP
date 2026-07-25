import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

const STEPS = [
  {
    number: "1",
    title: "Choose Puja",
    description:
      "Since our journey began, we've inspired countless devotees to explore authentic, meaningful rituals.",
  },
  {
    number: "2",
    title: "Select Time & Date",
    description:
      "Pick a convenient slot and our verified Pandit confirms your booking within minutes.",
  },
  {
    number: "3",
    title: "Book & Pay",
    description:
      "Secure your Puja with simple, safe payments and get instant confirmation.",
  },
];

export function InstantBookingSection() {
  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-2xl bg-brand-saffron-900 p-8 md:p-10">
          <span className="absolute right-6 top-6 z-10 rounded-full bg-error px-4 py-2 text-sm font-semibold text-white">
            -50%
          </span>
          <p className="max-w-[220px] text-sm text-white/80">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <div className="relative mt-8 flex items-end gap-4">
            <div className="relative h-52 w-3/5 overflow-hidden rounded-xl shadow-modal md:h-64">
              <Image
                src="/images/misc/promo-e-puja.png"
                alt="Live E-Puja streaming"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-36 w-2/5 overflow-hidden rounded-xl shadow-modal md:h-44">
              <Image
                src="/images/misc/promo-items.png"
                alt="Puja samagri and sacred texts"
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <span className="font-decorative text-2xl text-brand-saffron-400 md:text-3xl">
              Book In Minutes
            </span>
            <h2 className="mt-2 font-sans text-3xl font-semibold text-text-primary md:text-4xl lg:text-5xl">
              Instant Booking
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-peach font-sans text-xl font-semibold text-brand-saffron-400">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-sans text-xl font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-base text-text-muted">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ButtonLink href="/services" variant="dark" size="lg" className="self-start">
            Book Now →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
