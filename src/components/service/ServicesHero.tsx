import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ServicesHero({ title }: { title: string }) {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden md:min-h-[300px]">
      <Image
        src="/images/misc/serivce-banner.png"
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
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex w-full max-w-2xl -translate-x-1/2 flex-col gap-2 rounded-full bg-white p-2 shadow-card-hover sm:flex-row">
        <Input
          variant="pill"
          type="text"
          placeholder="Search for Puja, Festival & Rituals..."
          containerClassName="min-h-[44px] flex-1 bg-transparent"
          leading={<Search size={20} />}
        />
        <Button size="md" className="rounded-full px-8">
          Search
        </Button>
      </div>
    </section>
  );
}
