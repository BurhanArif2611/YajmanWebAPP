import { apiFetch } from "@/lib/fetch";
import type {
  AayojanContactPayload,
  AayojanEventDetail,
  AayojanPageData,
  ContactEntry,
} from "@/types/api";

export function getAayojanPage() {
  return apiFetch<AayojanPageData>("/aayojan");
}

export function getAayojanEventBySlug(slug: string) {
  return apiFetch<AayojanEventDetail>(`/aayojan/events/${slug}`, { auth: true });
}

export function submitAayojanContact(payload: AayojanContactPayload) {
  return apiFetch<ContactEntry>("/aayojan/contact", {
    method: "POST",
    body: payload,
  });
}
