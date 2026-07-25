import Image from "next/image";

const IMAGES = [
  "/images/gallery/gallery-5.png",
  "/images/gallery/gallery-1.png",
  "/images/blog/blog-sidebar-1.png",
  "/images/blog/blog-sidebar-4.png",
  "/images/gallery/gallery-4.png",
];

export function GalleryStrip() {
  return (
    <section className="mx-auto max-w-site px-4 pb-16 md:px-8 lg:px-16 lg:py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[1/1] overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt="Yajman puja moments"
              fill
              sizes="(max-width: 1024px) 50vw, 20vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
