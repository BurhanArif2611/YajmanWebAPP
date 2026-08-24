import { ServicesHero } from "@/components/service/ServicesHero";
import { CategoryServicesSection } from "@/components/articles/CategoryServicesSection";
import { BlogsCtaBanner } from "@/components/blogs/BlogsCtaBanner";
import { PremiumPujaCarousel } from "@/components/blogs/PremiumPujaCarousel";

export const metadata = {
  title: "Articles | Yajman",
  description:
    "Katha, Aarti, Muhurat and Bhajan articles from Yajman — devotional reading for every occasion.",
};

export default function ArticlesPage() {
  return (
    <>
      <ServicesHero title="Articles" />

      <div className="relative z-10 bg-white pt-2 sm:-mt-8 sm:rounded-t-[32px] sm:pt-10 md:-mt-10">
        <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
          <CategoryServicesSection />
        </div>
      </div>

      <BlogsCtaBanner />
      <PremiumPujaCarousel />
    </>
  );
}
