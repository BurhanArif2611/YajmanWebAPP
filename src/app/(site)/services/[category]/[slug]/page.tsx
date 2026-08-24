import { notFound } from "next/navigation";
import { MapPin, Star } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImageGallery } from "@/components/service/ImageGallery";
import { BookingWidget } from "@/components/service/BookingWidget";
import { DetailTabs } from "@/components/service/DetailTabs";
import { StickyBookBar } from "@/components/service/StickyBookBar";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { getServiceBySlug } from "@/lib/api/services";
import { mapServiceToCard } from "@/lib/mappers/service";

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
      <div className="hidden sm:block">
        <Breadcrumb
          items={[
            { label: service.categoryLabel, href: `/services?category=${service.category}` },
            { label: service.title },
          ]}
        />
      </div>

      <div className="mx-auto max-w-site px-4 pb-28 pt-4 sm:pt-0 md:px-8 lg:px-16 lg:pb-24">
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:gap-4 sm:pb-6">
          <h1 className="font-sans text-2xl font-bold break-words text-text-primary sm:text-3xl md:text-4xl">
            {service.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {service.detailTags.length > 0 && (
              <p className="text-xs text-text-muted sm:text-sm">
                {service.detailTags.join(" / ")}
              </p>
            )}
            <Badge variant="peach">{service.categoryLabel}</Badge>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
              <span className="flex min-w-0 items-start gap-1.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-saffron-400" />
                <span className="break-words">{service.location}</span>
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
                <span className="whitespace-nowrap">
                  ({String(service.reviewCount).padStart(2, "0")} Reviews)
                </span>
              </span>
            </div>

            <ShareButton
              title={service.title}
              text={`Check out ${service.title} on Yajman`}
              url={`/services/${service.category}/${service.slug}`}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div className="flex flex-col gap-5 sm:gap-8">
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

        <div className="mt-8 sm:mt-12 lg:mt-16">
          <DetailTabs
            keyFeatures={detail.key_features}
            templeName={temple?.name}
            photos={service.gallery}
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
