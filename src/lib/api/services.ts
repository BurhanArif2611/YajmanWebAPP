import { apiFetch, apiFetchPaginated } from "@/lib/fetch";
import type { Service, ServiceDetail, ServiceListFilters } from "@/types/api";

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
    },
  });
}

export function getServiceBySlug(slug: string) {
  return apiFetch<ServiceDetail>(`/services/${slug}`);
}
