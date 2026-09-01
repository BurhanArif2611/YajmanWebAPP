import type { MockService } from "@/lib/constants";
import type { Service, ServiceDetail } from "@/types/api";
import { resolveImageUrl } from "@/lib/image";

export { resolveImageUrl };

function formatServiceAddress(service: Service) {
  return [service.address, service.city]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");
}

/**
 * Maps the real API's Service shape onto the MockService shape that
 * ServiceCard / BookingWidget / etc. were originally built against, so
 * those components don't need to change to consume live data.
 */
export function mapServiceToCard(service: Service): MockService {
  const detail = service as Partial<ServiceDetail>;
  const image = resolveImageUrl(service.feature_image_url);

  return {
    id: service.id,
    slug: service.slug,
    category: service.category_slug,
    categoryLabel: service.category_name,
    title: service.title,
    location: formatServiceAddress(service),
    shortDescription: service.short_description ?? undefined,
    image,
    gallery: detail.images?.length
      ? detail.images
          .slice()
          .sort((a, b) => a.display_order - b.display_order)
          .map((img) => resolveImageUrl(img.url))
      : [image],
    price: Number(service.price),
    originalPrice: Number(service.original_price) || 0,
    discountPercent: Number(service.discount_percent) || 0,
    featured: service.is_featured,
    tags: detail.tags?.length ? detail.tags.map((t) => t.name) : [],
    benefits: service.benefits?.length ? service.benefits : [],
    detailTags: detail.types?.length ? detail.types.map((t) => t.name) : [],
    rating: Math.round(Number(service.rating_avg)),
    reviewCount: service.total_reviews,
  };
}
