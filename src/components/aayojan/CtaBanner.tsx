import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="relative flex min-h-[280px] items-center overflow-hidden sm:min-h-[360px] md:min-h-[480px]">
      <Image
        src="/images/ayongan/image-1.png"
        alt="Bhajan Sandhya devotional gathering"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12 sm:gap-5 sm:py-16 md:px-8 lg:px-16">
        <h2 className="max-w-xl font-sans text-3xl font-bold leading-tight text-white sm:text-4xl md:text-7xl">
          Planning a
          <br />
          Devotional Event?
        </h2>
        <p className="max-w-lg text-base text-white/85">
          Let us help you organize a memorable spiritual gathering with
          experienced pandits, devotional artists, and complete event
          management.
        </p>
        <ButtonLink
          href="/contact"
          size="lg"
          className="mt-2 w-fit gap-2 rounded-full  tracking-wide"
        >
          Contact Us Now
          <ArrowUpRight size={18} />
        </ButtonLink>
      </div>
    </section>
  );
}
