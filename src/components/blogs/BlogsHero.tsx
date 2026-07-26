import Image from "next/image";

export function BlogsHero() {
  return (
    <section className="relative flex min-h-[220px] items-center justify-center overflow-hidden md:min-h-[280px]">
      <Image
        src="/images/misc/serivce-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-navy/40" />

      <h1 className="relative z-10 font-sans text-4xl font-semibold text-white md:text-6xl">
        Blogs
      </h1>
    </section>
  );
}
