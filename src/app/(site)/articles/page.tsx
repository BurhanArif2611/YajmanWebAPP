import { ServicesHero } from "@/components/service/ServicesHero";
import { ArticleCategoryTabs } from "@/components/articles/ArticleCategoryTabs";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { PujaServicesSidebar } from "@/components/articles/PujaServicesSidebar";
import { Pagination } from "@/components/ui/Pagination";
import { BlogsCtaBanner } from "@/components/blogs/BlogsCtaBanner";
import { PremiumPujaCarousel } from "@/components/blogs/PremiumPujaCarousel";
import { ARTICLES } from "@/lib/constants";

export const metadata = {
  title: "Articles | Yajman",
  description:
    "Katha, Aarti, Muhurat and Bhajan articles from Yajman — devotional reading for every occasion.",
};

export default function ArticlesPage() {
  return (
    <>
      <ServicesHero title="Articles" />

      <div className="relative z-10 -mt-8 rounded-t-[32px] bg-white pt-10 md:-mt-10">
        <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
          <ArticleCategoryTabs />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ARTICLES.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>

              <Pagination pageCount={2} />
            </div>

            <PujaServicesSidebar />
          </div>
        </div>
      </div>

      <BlogsCtaBanner />
      <PremiumPujaCarousel />
    </>
  );
}
