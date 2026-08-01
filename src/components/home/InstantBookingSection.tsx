import Image from "next/image";
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
    <section className=" relative mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute top-0 left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-between rounded-2xl bg-surface-muted p-6">
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-saffron-400">
              Who we are
            </span>
            <p className="mt-8 font-sans text-lg font-semibold leading-snug text-text-primary">
              Lorem Ipsum is simply dummy text of the printing and typesetting
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#fc400e] p-6 text-white ">
            <Image
              src="/images/misc/promo-items.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="relative flex items-start gap-1">
              <div className="flex flex-col text-xs font-bold uppercase leading-tight">
                <span>Get</span>
                <span>Up</span>
                <span>To</span>
              </div>
              <div className="-mt-2 flex items-start">
                <span className="font-sans text-6xl font-bold leading-none">50</span>
                <span className="mt-1 text-2xl font-bold">%</span>
              </div>
            </div>
            <span className="relative mt-2 block font-sans text-lg font-semibold">
              Off
            </span>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl md:col-span-2">
            <Image
              src="/images/blog/blog-sidebar-3.png"
              alt="Puja samagri and sacred texts"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover h-full"
            />
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
            <p className="mt-4  text-base text-text-muted">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since 1966, when designers at Letraset and James
              Mosley, the librarian at St Bride Printing Library in London
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col items-start gap-5">

                <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-brand-saffron-400 font-sans text-xl font-semibold text-white">
                  {step.number}
                </div>
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

          <ButtonLink href="/services" variant="dark" size="lg" className="self-start w-full rounded-full">
            Book Now <ArrowRight size={16} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
