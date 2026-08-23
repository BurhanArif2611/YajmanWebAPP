import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { MockService } from "@/lib/constants";

export function ArticleServiceCard({ service }: { service: MockService }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <Badge variant="peach" className="absolute left-3 top-3">
          {service.categoryLabel}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-sans text-lg font-bold text-text-primary">
          {service.title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2">
          {service.shortDescription || service.location}
        </p>
        <Link
          href={`/articles/${service.slug}`}
          className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-navy text-sm font-medium text-white transition-colors hover:bg-brand-navy-800"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
