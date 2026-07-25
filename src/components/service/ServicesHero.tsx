import Image from "next/image";
import { Search } from "lucide-react";

export function ServicesHero({ title }: { title: string }) {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden md:min-h-[400px]">
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-navy/40" />

      <div className="relative z-10 mx-auto flex w-full max-w-narrow flex-col items-center gap-6 px-4 text-center">
        <h1 className="font-sans text-4xl font-semibold text-white md:text-6xl">
          {title}
        </h1>

        <div className="flex w-full max-w-2xl flex-col gap-2 rounded-full bg-white p-2 shadow-card-hover sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-light"
            />
            <input
              type="text"
              placeholder="Search for Puja, Festival & Rituals..."
              className="min-h-[44px] w-full rounded-full bg-transparent py-3 pl-11 pr-4 text-base font-medium text-text-primary outline-none"
            />
          </div>
          <button className="min-h-[44px] rounded-full bg-brand-saffron-400 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-saffron-500">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
