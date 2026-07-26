import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_PROMO_CARDS, TOP_RATED_SERVICES } from "@/lib/constants";

export function BlogSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="font-sans mb-3c:\Users\Mfg\Downloads\Blog details.png text-lg font-semibold text-text-primary">
          Other Top Rated Services
        </h3>
        <ul className="mt-4 flex flex-col gap-8">
          {TOP_RATED_SERVICES.map((item) => (
            <li key={item.slug} className="flex gap-3 ">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-snug text-text-primary mb-2">
                  {item.title}
                </p>
                <Link
                  href="#"
                  className="flex items-center gap-1 text-xs font-semibold text-brand-saffron-400"
                >
                  Read More
                  <ArrowRight size={12} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {BLOG_PROMO_CARDS.map((card, i) => (
        <div
          key={i}
          className="relative h-80 w-full overflow-hidden rounded-2xl"
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="320px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p className="absolute bottom-4 left-4 right-4 font-sans text-base font-semibold text-white">
            {card.title}
          </p>
        </div>
      ))}
    </aside>
  );
}
