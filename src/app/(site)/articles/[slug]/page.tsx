import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { ShareButton } from "@/components/ui/ShareButton";
import { ArticleDetailHero } from "@/components/articles/ArticleDetailHero";
import { ArticleEnquireButton } from "@/components/articles/ArticleEnquireButton";
import { PujaServicesSidebar } from "@/components/articles/PujaServicesSidebar";
import { RelatedServices } from "@/components/articles/RelatedServices";
import { BestSellers } from "@/components/home/BestSellers";
import { ServiceDetailContent } from "@/components/service/ServiceDetailContent";
import { getServiceBySlug } from "@/lib/api/services";
import { resolveImageUrl } from "@/lib/mappers/service";

type Params = Promise<{ slug: string }>;

async function fetchService(slug: string) {
  try {
    return await getServiceBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = await fetchService(slug);
  if (!service) return {};

  return {
    title: service.meta_title || `${service.title} | Yajman Articles`,
    description: service.meta_description || service.short_description || undefined,
    alternates: { canonical: `/articles/${slug}` },
  };
}

export default async function ArticleDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = await fetchService(slug);

  if (!service) {
    notFound();
  }

  const images = service.images?.length
    ? service.images
        .slice()
        .sort((a, b) => a.display_order - b.display_order)
        .map((img) => resolveImageUrl(img.url))
    : [resolveImageUrl(service.feature_image_url)];

  return (
    <>
      <div className="mx-auto max-w-site px-4 pb-10 pt-4 md:px-8 md:pb-12 lg:px-16">
        <Breadcrumb
          items={[
            { label: "Articles", href: "/articles" },
            { label: service.category_name, href: "/articles" },
            { label: service.title },
          ]}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="break-words font-sans text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              {service.title}
            </h1>
            <Badge variant="peach" className="mt-3">
              {service.category_name}
            </Badge>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3 sm:justify-end">
            <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-text-muted sm:text-sm">
              <span className="flex gap-0.5 text-brand-gold-400" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.round(Number(service.rating_avg)) ? "currentColor" : "none"}
                  />
                ))}
              </span>
              {/* ( {String(service.total_reviews).padStart(2, "0")} Reviews ) */}
            </span>
            <ShareButton
              title={service.title}
              text={service.short_description || service.title}
              url={`/articles/${service.slug}`}
            />
          </div>
        </div>

        <div className="mt-5 sm:mt-6">
          <ArticleDetailHero images={images} alt={service.title} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <main className="min-w-0 overflow-hidden">
            <ServiceDetailContent
              shortDescription={service.short_description}
              aboutPuja={service.about_puja}
              description={service.description}
              customContent={service.custom_content}
            />

            {Boolean(service.key_features?.length) && (
              <ul className="mt-6 flex flex-col gap-2">
                {service.key_features!.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-saffron-400" />
                    <span className="min-w-0 break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex items-center gap-4 border-t border-border pt-6 sm:mt-10">
              <ArticleEnquireButton
                serviceId={service.id}
                category={service.category_name}
                serviceName={service.title}
              />
            </div>
          </main>

          <div className="min-w-0">
            <PujaServicesSidebar />
          </div>
        </div>
      </div>

      <BestSellers
        eyebrow="Explore"
        heading="Popular Services"
        includeAllServices
        maxTabs={3}
        compact
      />

      <RelatedServices excludeSlug={service.slug} />
    </>
  );
}
