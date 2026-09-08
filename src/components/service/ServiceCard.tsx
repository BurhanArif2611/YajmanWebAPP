import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ServiceLocationLine } from "@/components/service/ServiceLocationLine";
import { hasDiscount } from "@/lib/utils";
import type { MockService } from "@/lib/constants";

export function ServiceCard({ service }: { service: MockService }) {
  const showDiscount = hasDiscount(
    service.price,
    service.originalPrice,
    service.discountPercent
  );

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative aspect-square w-full overflow-hidden">
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
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-2.5 sm:gap-3 sm:p-5">
        {service.benefits.length > 0 && (
          <div className="hidden flex-wrap gap-2 sm:flex">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <Badge key={i} variant="peach">
                {benefit}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="font-sans text-sm font-semibold leading-snug text-text-primary line-clamp-2 sm:text-lg">
          {service.title}
        </h3>
        <ServiceLocationLine
          address={service.location}
          categoryLabel={service.categoryLabel}
          truncate
        />

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

        <Link
          href={`/services/${service.category}/${service.slug}`}
          className="mt-1 inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full bg-brand-navy px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-brand-navy-800 sm:min-h-[44px] sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
        >
          Book Now <ArrowRight size={14} className="sm:hidden" />
          <ArrowRight size={16} className="hidden sm:block" />
        </Link>
      </div>
    </div>
  );
}

// TODO
