import type { BlogSidebarItem } from "@/components/blogs/BlogSidebar";
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
  };
}
