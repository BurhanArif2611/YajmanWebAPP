import { apiFetch } from "@/lib/fetch";
import type { LegalPage, LegalPageListItem } from "@/types/api";

/** `GET /legal` — active legal pages, for the footer + sitemap. */
export function getLegalPages() {
  return apiFetch<LegalPageListItem[]>("/legal");
}

/** `GET /legal/:slug` — full page content. */
export function getLegalPage(slug: string) {
  return apiFetch<LegalPage>(`/legal/${slug}`);
}
