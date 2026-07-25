import { notFound } from "next/navigation";
import { MapPin, Share2, Star } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ImageGallery } from "@/components/service/ImageGallery";
import { BookingWidget } from "@/components/service/BookingWidget";
import { DetailTabs } from "@/components/service/DetailTabs";
import { StickyBookBar } from "@/components/service/StickyBookBar";
import { Badge } from "@/components/ui/Badge";
import { getServiceBySlug } from "@/lib/constants";

type Params = Promise<{ category: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Yajman`,
    description: service.location,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { category, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.category !== category) {
    notFound();
  }

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

            <p className="text-sm leading-relaxed text-text-muted">
              Discover the perfect escape with our carefully curated travel
              packages. Whether you&apos;re seeking adventure, relaxation, or
              cultural discovery, our tours are designed to offer
              unforgettable experiences. Explore breath-taking landscapes,
              meet friendly locals, and create lasting memories in some of
              the world&apos;s most stunning destinations. Every journey is
              crafted with comfort, excitement, and authenticity in mind. Get
              ready for the journey of a lifetime! Our travel packages
              combine comfort, culture, and adventure to ensure you enjoy
              every moment of your vacation.
            </p>
          </div>

          <div id="booking-widget" className="scroll-mt-24">
            <BookingWidget service={service} />
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <DetailTabs />
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
