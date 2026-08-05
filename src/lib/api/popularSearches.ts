import { apiFetch } from "@/lib/fetch";
import type { PopularSearch } from "@/types/api";

export function getPopularSearches() {
  return apiFetch<PopularSearch[]>("/popular-searches");
}
