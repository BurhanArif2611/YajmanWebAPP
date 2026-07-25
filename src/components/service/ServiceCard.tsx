import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { MockService } from "@/lib/constants";

export function ServiceCard({ service }: { service: MockService }) {
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
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag, i) => (
            <Badge key={i} variant="peach">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-sans text-lg font-semibold leading-snug text-text-primary line-clamp-2">
          {service.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-text-muted">
          <MapPin size={14} className="text-brand-saffron-400" />
          {service.location}
        </p>

        <div className="border-t border-border" />

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-text-primary">
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
          href={`/services/${service.slug}`}
          className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-navy-800"
        >
          Book Now →
        </Link>
      </div>
    </div>
  );
}
