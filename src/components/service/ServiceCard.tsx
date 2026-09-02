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

      <div className="flex flex-1 flex-col gap-3 p-5">
        {service.benefits.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <Badge key={i} variant="peach">
                {benefit}
              </Badge>
            ))}
          </div>
        )}

        <h3 className="font-sans text-lg font-semibold leading-snug text-text-primary line-clamp-2">
          {service.title}
        </h3>
        <ServiceLocationLine
          address={service.location}
          categoryLabel={service.categoryLabel}
          truncate
        />

        <div className="border-t border-border" />

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-text-primary">
            ₹{service.price}
          </span>
          {showDiscount && (
            <>
              <span className="text-xs text-text-light line-through">
                ₹{service.originalPrice}
              </span>
              {service.discountPercent > 0 && (
                <span className="text-xs font-medium text-success">
                  -{service.discountPercent}%
                </span>
              )}
            </>
          )}
        </div>

        <Link
          href={`/services/${service.category}/${service.slug}`}
          className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-navy-800"
        >
          Book Now <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// TODO
