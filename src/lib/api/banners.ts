import { apiFetch } from "@/lib/fetch";
import type { Banner, BannerPosition } from "@/types/api";

export function getBanners(position: BannerPosition) {
  return apiFetch<Banner[]>("/banners", { query: { type: position } });
}
