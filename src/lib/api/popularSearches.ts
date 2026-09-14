import { apiFetch } from "@/lib/fetch";
import type { PopularSearch, Service } from "@/types/api";

export function getPopularSearches() {
  return apiFetch<PopularSearch[]>("/popular-searches");
}

export function getPopularSearchServices(id: string) {
  return apiFetch<Service[]>(`/popular-searches/${id}/services`);
}
