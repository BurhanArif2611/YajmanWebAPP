import { apiFetch } from "@/lib/fetch";
import type {
  ServicePlacement,
  ServicePlacementPage,
  ServicePlacementSection,
} from "@/types/api";

export type ServicePlacementFilters = {
  page: ServicePlacementPage;
  section: ServicePlacementSection;
  limit?: number;
};

export function getServicePlacements(filters: ServicePlacementFilters) {
  return apiFetch<ServicePlacement[]>("/service-placements", {
    query: {
      page: filters.page,
      section: filters.section,
      limit: filters.limit,
    },
  });
}
