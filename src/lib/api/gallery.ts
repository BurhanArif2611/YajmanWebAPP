import { apiFetch } from "@/lib/fetch";
import type { GalleryImage } from "@/types/api";

export function getGallery() {
  return apiFetch<GalleryImage[]>("/gallery");
}
