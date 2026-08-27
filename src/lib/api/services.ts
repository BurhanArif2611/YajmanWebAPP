import { apiFetch, apiFetchPaginated } from "@/lib/fetch";
import type {
  ContactEntry,
  Service,
  ServiceDetail,
  ServiceInquiryPayload,
  ServiceListFilters,
  ServiceReview,
} from "@/types/api";

export type PriceRange = { min: number; max: number };

const FALLBACK_PRICE_RANGE: PriceRange = { min: 98, max: 50_000 };

export function getServices(filters: ServiceListFilters = {}) {
  return apiFetchPaginated<Service[]>("/services", {
    query: {
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      category: filters.category,
      type: filters.type,
      tag: filters.tag,
      min_price: filters.min_price,
      max_price: filters.max_price,
      rating: filters.rating,
      sort: filters.sort,
      is_featured: filters.is_featured,
      is_bestseller: filters.is_bestseller,
      requires_payment: filters.requires_payment,
    },
  });
}

/** Prefer dedicated catalog endpoint; otherwise derive from cheapest/dearest paid services. */
export async function getPriceRange(): Promise<PriceRange> {
  try {
    const range = await apiFetch<PriceRange>("/catalog/price-range");
    const min = Number(range.min);
    const max = Number(range.max);
    if (Number.isFinite(min) && Number.isFinite(max) && max >= min) {
      return { min, max };
    }
  } catch {
    // Endpoint may not exist yet — fall through to derived range.
  }

  try {
    const [cheapest, dearest] = await Promise.all([
      getServices({ sort: "price_asc", limit: 1, requires_payment: true }),
      getServices({ sort: "price_desc", limit: 1, requires_payment: true }),
    ]);
    const min = Number(cheapest.data[0]?.price);
    const max = Number(dearest.data[0]?.price);
    if (Number.isFinite(min) && Number.isFinite(max)) {
      return {
        min: Math.max(0, Math.min(min, max)),
        max: Math.max(min, max, FALLBACK_PRICE_RANGE.min),
      };
    }
  } catch {
    // keep fallback
  }

  return FALLBACK_PRICE_RANGE;
}

export function getServiceBySlug(slug: string) {
  return apiFetch<ServiceDetail>(`/services/${slug}`, { auth: true });
}

export function getServiceReviews(serviceIdOrSlug: string) {
  return apiFetch<ServiceReview[]>(`/services/${serviceIdOrSlug}/reviews`).catch(
    () => [] as ServiceReview[]
  );
}

export function submitServiceInquiry(serviceId: string, payload: ServiceInquiryPayload) {
  return apiFetch<ContactEntry>(`/services/${serviceId}/inquiry`, {
    method: "POST",
    body: payload,
  });
}
