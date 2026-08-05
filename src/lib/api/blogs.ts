import { apiFetch, apiFetchPaginated } from "@/lib/fetch";
import type { Blog, BlogCategory, BlogDetail, BlogListFilters } from "@/types/api";

export function getBlogCategories() {
  return apiFetch<BlogCategory[]>("/blogs/categories");
}

export function getBlogs(filters: BlogListFilters = {}) {
  return apiFetchPaginated<Blog[]>("/blogs", {
    query: {
      page: filters.page,
      limit: filters.limit,
      category: filters.category,
      featured: filters.featured,
    },
  });
}

export function getBlogBySlug(slug: string) {
  return apiFetch<BlogDetail>(`/blogs/${slug}`, { auth: true });
}
