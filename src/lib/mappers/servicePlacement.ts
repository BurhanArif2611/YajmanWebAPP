import type { BlogSidebarItem } from "@/components/blogs/BlogSidebar";
import type { MockService } from "@/lib/constants";
import { resolveImageUrl } from "@/lib/image";
import type { ServicePlacement } from "@/types/api";

function discountPercent(price: number, originalPrice: number) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function sortPlacements(placements: ServicePlacement[]) {
  return [...placements].sort((a, b) => a.display_order - b.display_order);
}

export function getPlacementHeading(placements: ServicePlacement[], fallback: string) {
  return placements.find((placement) => placement.label?.trim())?.label?.trim() ?? fallback;
}

export function mapPlacementToBlogSidebarItem(placement: ServicePlacement): BlogSidebarItem {
  const service = placement.service;
  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
    image: resolveImageUrl(service.feature_image_url),
    price: Number(service.price),
    category: service.category_slug,
    ctaText: placement.cta_text ?? undefined,
  };
}

export type PlacementSidebarCard = {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: string;
  ctaText: string;
  href: string;
};

export function mapPlacementToSidebarCard(placement: ServicePlacement): PlacementSidebarCard {
  const service = placement.service;
  const price = Number(service.price);
  const originalPrice = Number(service.original_price) || 0;

  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    image: resolveImageUrl(service.feature_image_url),
    price,
    originalPrice,
    discountPercent: discountPercent(price, originalPrice),
    category: service.category_slug,
    ctaText: placement.cta_text?.trim() || "Book Now",
    href: placementServiceHref(placement),
  };
}

export function mapPlacementToMockService(placement: ServicePlacement): MockService {
  const service = placement.service;
  const price = Number(service.price);
  const originalPrice = Number(service.original_price) || 0;
  const image = resolveImageUrl(service.feature_image_url);

  return {
    id: service.id,
    slug: service.slug,
    category: service.category_slug,
    categoryLabel: service.category_name ?? "",
    requiresPayment: service.requires_payment !== false,
    title: service.title,
    location: "",
    shortDescription: service.short_description ?? undefined,
    image,
    gallery: [image],
    price,
    originalPrice,
    discountPercent:
      Number(service.discount_percent) || discountPercent(price, originalPrice),
    featured: false,
    tags: [],
    benefits: [],
    detailTags: [],
    rating: Math.round(Number(service.rating_avg) || 0),
    reviewCount: 0,
  };
}

export function placementServiceHref(placement: ServicePlacement) {
  const service = placement.service;
  if (service.requires_payment === false) {
    return `/articles/${service.slug}`;
  }
  return `/services/${service.category_slug}/${service.slug}`;
}
