import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ServiceLocationLine } from "@/components/service/ServiceLocationLine";
import { ScrollableBenefitBadges } from "@/components/service/ScrollableBenefitBadges";
import { hasDiscount } from "@/lib/utils";
import type { MockService } from "@/lib/constants";

export function ServiceCard({ service }: { service: MockService }) {
  const showDiscount = hasDiscount(
    service.price,
    service.originalPrice,
    service.discountPercent
  );

  const href =
    service.requiresPayment === false
      ? `/articles/${service.slug}`
      : `/services/${service.category}/${service.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <Link href={href} className="relative block aspect-square w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {service.featured && (
          <Badge className="absolute left-3 top-3">Featured</Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4 sm:px-5">
        {service.benefits.length > 0 && (
          <ScrollableBenefitBadges benefits={service.benefits} />
        )}

        <Link href={href} className="flex flex-col gap-0.5">
          <h3 className="font-sans text-sm font-semibold leading-snug text-text-primary line-clamp-2 sm:text-lg">
            {service.title}
          </h3>
          <ServiceLocationLine
            address={service.location}
            categoryLabel={service.categoryLabel}
            truncate
          />
        </Link>

        <div className="border-t border-border" />

        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm font-semibold text-text-primary sm:text-lg">
            ₹{service.price}
          </span>
          {showDiscount && (
            <>
              <span className="text-[11px] text-text-light line-through sm:text-xs">
                ₹{service.originalPrice}
              </span>
              {service.discountPercent > 0 && (
                <span className="text-[11px] font-medium text-success sm:text-xs">
                  -{service.discountPercent}%
                </span>
              )}
            </>
          )}
        </div>

        <Link href={href} className="mt-1 inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full bg-brand-navy px-3 py-2 text-xs font-medium text-white transition-colors duration-200 group-hover:bg-brand-navy-800 sm:min-h-[44px] sm:gap-2 sm:px-5 sm:py-3 sm:text-sm">
          Book Now <ArrowRight size={14} className="sm:hidden" />
          <ArrowRight size={16} className="hidden sm:block" />
        </Link>
      </div>
    </article>
  );
}

// TODO
