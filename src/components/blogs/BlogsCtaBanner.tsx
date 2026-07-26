import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function BlogsCtaBanner() {
  return (
    <section className="relative flex min-h-[320px] items-center overflow-hidden md:min-h-[380px]">
      <Image
        src="/images/ayongan/image-4.png"
        alt="Devotional event celebration"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative mx-auto flex w-full max-w-site flex-col gap-5 px-4 py-16 md:px-8 lg:px-16">
        <h2 className="max-w-lg font-sans text-3xl font-semibold text-white md:text-6xl">
          Planning a Devotional Event?
        </h2>
        <p className="max-w-lg text-base text-white/85">
          Let us help you organize a memorable spiritual gathering with
          experienced pandits, devotional artists, and complete event
          management.
        </p>
        <ButtonLink
          href="/aayojan"
          size="lg"
          className="w-fit gap-2 rounded-full  tracking-wide"
        >
          Learn More
          <ArrowUpRight size={18} />
        </ButtonLink>
      </div>
    </section>
  );
}
