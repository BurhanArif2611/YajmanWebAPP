import { apiFetch } from "@/lib/fetch";
import type { Testimonial, TestimonialPage } from "@/types/api";

export function getTestimonials(page?: TestimonialPage) {
  return apiFetch<Testimonial[]>("/testimonials", {
    query: { page },
  });
}
