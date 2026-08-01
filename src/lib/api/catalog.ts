import { apiFetch } from "@/lib/fetch";
import type { Category, Tag, Type } from "@/types/api";

export function getCategories() {
  return apiFetch<Category[]>("/categories");
}

export function getTypes() {
  return apiFetch<Type[]>("/types");
}

export function getTags() {
  return apiFetch<Tag[]>("/tags");
}
