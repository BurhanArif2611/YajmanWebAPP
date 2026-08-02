import { apiFetch } from "@/lib/fetch";
import type { ContactEntry, ContactPayload } from "@/types/api";

export function submitContact(payload: ContactPayload) {
  return apiFetch<ContactEntry>("/contact", {
    method: "POST",
    body: payload,
  });
}
