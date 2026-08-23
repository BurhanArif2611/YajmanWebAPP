import Image from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "1",
    title: "Choose Puja",
    description:
      "Since our journey began, we've inspired countless travelers to explore breathtaking destinations.",
  },
  {
    number: "2",
    title: "Select Time & Date",
    description:
      "Since our journey began, we've inspired countless travelers to explore breathtaking destinations.",
  },
  {
    number: "3",
    title: "Book & Pay",
    description:
      "Since our journey began, we've inspired countless travelers to explore breathtaking destinations.",
  },
];

export function InstantBookingSection() {
  return (
    <section className="relative mx-auto max-w-site px-4 py-10 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <Image
        src="/images/decor/side-deco.png"
        alt=""
        width={300}
        height={300}
        className="absolute left-0 top-0 z-0 opacity-10"
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Desktop: who-we-are card; mobile: first image */}
          <div className="hidden flex-col justify-between rounded-2xl bg-surface-muted p-6 sm:flex">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-saffron-400">
              Who we are
            </span>
            <p className="mt-8 font-sans text-lg font-semibold leading-snug text-text-primary">
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#fc400e] sm:aspect-auto sm:min-h-[200px]">
            <Image
              src="/images/misc/promo-items.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="relative flex items-start gap-1 p-4 sm:p-6">
              <div className="flex flex-col text-[10px] font-bold uppercase leading-tight text-white sm:text-xs">
                <span>Get</span>
                <span>Up</span>
                <span>To</span>
              </div>
              <div className="-mt-1 flex items-start text-white sm:-mt-2">
                <span className="font-sans text-4xl font-bold leading-none sm:text-6xl">50</span>
                <span className="mt-0.5 text-lg font-bold sm:mt-1 sm:text-2xl">%</span>
              </div>
            </div>
            <span className="relative block px-4 pb-4 font-sans text-base font-semibold text-white sm:mt-2 sm:px-6 sm:pb-6 sm:text-lg">
              Off
            </span>
          </div>

          {/* Mobile: second image beside promo; desktop: full-width under both */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:col-span-2 sm:aspect-auto sm:h-[400px]">
            <Image
              src="/images/blog/blog-sidebar-3.png"
              alt="Puja samagri and sacred texts"
              fill
              sizes="(max-width: 1024px) 50vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div>
            <span className="font-decorative text-2xl text-brand-saffron-400 md:text-3xl">
              Book In Minutes
            </span>
            <h2 className="mt-2 font-sans text-2xl font-semibold text-text-primary md:text-4xl lg:text-5xl">
              Instant Booking
            </h2>
            <p className="mt-3 text-sm text-text-muted sm:mt-4 sm:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since 1966, when designers at Letraset and James
              Mosley, the librarian at St Bride Printing Library in London
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-start gap-4 sm:flex-col sm:gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-saffron-400 font-sans text-lg font-semibold text-white sm:h-12 sm:w-12 sm:text-xl">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-text-primary sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <ButtonLink
            href="/services"
            variant="dark"
            size="lg"
            className="w-full self-start rounded-full"
          >
            Book Now <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
