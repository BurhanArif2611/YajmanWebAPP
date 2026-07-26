import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { AvatarCluster } from "@/components/aayojan/AvatarCluster";

export function AayojanHero() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden md:min-h-[640px]">
      <Image
        src="/images/ayongan/image-4.png"
        alt="Decorated devotional event mandap"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative mx-auto flex w-full max-w-site flex-col items-center gap-6 px-4 py-20 text-center md:px-8 lg:px-16">
        <h1 className="max-w-3xl font-sans text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl">
          Celebrate Every Sacred Occasion with Yajman
        </h1>
        <p className="max-w-2xl text-base text-white/85 md:text-lg">
          From intimate Bhajan Sandhya to grand spiritual gatherings, we plan
          and manage devotional events with authenticity, devotion, and
          perfection.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink
            href="/contact"
            size="lg"
            className="gap-2 rounded-full uppercase tracking-wide"
          >
            Plan Your Event
            <ArrowUpRight size={18} />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            size="lg"
            className="gap-2 rounded-full border-white uppercase tracking-wide text-white hover:bg-white/10"
          >
            Talk To Our Expert
            <ArrowUpRight size={18} />
          </ButtonLink>
        </div>

        <AvatarCluster count="10+" label="Speakers" labelClassName="text-white/90" />
      </div>
    </section>
  );
}
