import Image from "next/image";

const IMAGES = [
  "/images/ayongan/image-1.png",
  "/images/ayongan/image-2.png",
  "/images/ayongan/image-3.png",
  "/images/ayongan/image-4.png",
  "/images/ayongan/image-4.png",
];

export function AayojanGalleryStrip() {
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
    // <section className="mx-auto max-w-site px-4 pb-16 md:px-8 lg:px-16">
    //   <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
    //     {IMAGES.map((src, i) => (
    //       <div key={src} className="relative aspect-video overflow-hidden rounded-2xl">
    //         <Image
    //           src={src}
    //           alt="Yajman devotional event moments"
    //           fill
    //           sizes="(max-width: 1024px) 50vw, 25vw"
    //           className="object-cover"
    //           priority={i === 0}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </section>
  );
}
