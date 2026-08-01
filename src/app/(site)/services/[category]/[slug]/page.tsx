import { notFound } from "next/navigation";
import { MapPin, Share2, Star } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImageGallery } from "@/components/service/ImageGallery";
import { BookingWidget } from "@/components/service/BookingWidget";
import { DetailTabs } from "@/components/service/DetailTabs";
import { StickyBookBar } from "@/components/service/StickyBookBar";
import { Badge } from "@/components/ui/Badge";
import { getServiceBySlug } from "@/lib/api/services";
import { mapServiceToCard, resolveImageUrl } from "@/lib/mappers/service";

type Params = Promise<{ category: string; slug: string }>;

async function fetchService(slug: string) {
  try {
    return await getServiceBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = await fetchService(slug);
  if (!detail) return {};

  return {
    title: detail.meta_title || `${detail.title} | Yajman`,
    description: detail.meta_description || detail.short_description || undefined,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { category, slug } = await params;
  const detail = await fetchService(slug);
  if (!detail || detail.category_slug !== category) {
    notFound();
  }

  const service = mapServiceToCard(detail);
  const temple = detail.temples?.[0];

  return (
    <>
      <Breadcrumb
        items={[
          { label: service.categoryLabel, href: `/services?category=${service.category}` },
          { label: service.title },
        ]}
      />

      <div className="mx-auto max-w-site px-4 pb-28 md:px-8 lg:px-16 lg:pb-24">
        <div className="flex flex-col gap-4 border-b border-border pb-6">
          <h1 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
            {service.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-text-muted">
              {service.detailTags.join(" / ")}
            </p>
            <Badge variant="peach">{service.categoryLabel}</Badge>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <MapPin size={16} className="text-brand-saffron-400" />
                {service.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="flex gap-0.5 text-brand-gold-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < service.rating ? "currentColor" : "none"}
                    />
                  ))}
                </span>
                ( {String(service.reviewCount).padStart(2, "0")} Reviews )
              </span>
            </div>

            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-saffron-400">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-8">
            <ImageGallery images={service.gallery} alt={service.title} />

            {(detail.description || detail.short_description) && (
              <p className="text-sm leading-relaxed text-text-muted">
                {detail.description || detail.short_description}
              </p>
            )}
          </div>

          <div id="booking-widget" className="scroll-mt-24">
            <BookingWidget
              service={service}
              about={detail.about_puja || detail.short_description}
              minAdvanceDays={detail.advance_booking_days ?? 0}
              availabilityStart={detail.availability_start_date}
              availabilityEnd={detail.availability_end_date}
              availableDates={detail.available_dates}
            />
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <DetailTabs
            keyFeatures={detail.key_features}
            templeName={temple?.name}
            photos={detail.images?.length ? detail.images.map((img) => resolveImageUrl(img.url)) : undefined}
            faqs={detail.faqs?.length ? detail.faqs : undefined}
          />
        </div>
      </div>

      <StickyBookBar
        price={service.price}
        originalPrice={service.originalPrice}
        discountPercent={service.discountPercent}
      />
    </>
  );
}
