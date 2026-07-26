import Image from "next/image";
import Link from "next/link";
import { SERVICES, BLOG_PROMO_CARDS } from "@/lib/constants";

export function PujaServicesSidebar() {
  const services = SERVICES.slice(0, 4);

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6  border border-gray-200">
        <h3 className="font-sans text-lg mb-2 font-semibold text-text-primary">
          Puja Services
        </h3>
        <ul className="mt-4 flex flex-col gap-6">
          {services.map((service) => (
            <li key={service.slug} className="flex gap-3">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-snug text-text-primary line-clamp-1">
                  {service.title}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    ₹{service.price}
                  </span>
                  <span className="text-xs text-text-light line-through">
                    ₹{service.originalPrice}
                  </span>
                  <span className="text-xs font-medium text-success">
                    -{service.discountPercent}%
                  </span>
                </div>
                <Link
                  href={`/services/${service.category}/${service.slug}`}
                  className="mt-1 inline-block rounded-full bg-brand-saffron-400 px-3 py-1 text-xs font-semibold text-white"
                >
                  Book Now
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {BLOG_PROMO_CARDS.map((card, i) => (
        <div key={i} className="relative h-80 w-full overflow-hidden rounded-2xl">
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
