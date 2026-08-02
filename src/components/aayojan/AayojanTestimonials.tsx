import { Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AayojanTestimonial } from "@/types/api";

export function AayojanTestimonials({
  testimonials,
}: {
  testimonials: AayojanTestimonial[];
}) {
  if (!testimonials.length) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
        <SectionHeader
          eyebrow="Our Testimonial"
          heading="What families say about our events."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col gap-4 rounded-2xl bg-surface-peach p-6 shadow-card"
            >
              <div className="flex gap-1 text-brand-saffron-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    strokeWidth={i < testimonial.rating ? 0 : 1.5}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                &ldquo;{testimonial.message}&rdquo;
              </p>
              <p className="font-sans text-sm font-semibold text-text-primary">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
