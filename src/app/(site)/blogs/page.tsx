import { BlogsHero } from "@/components/blogs/BlogsHero";
import { BlogCategoryTabs } from "@/components/blogs/BlogCategoryTabs";
import { BlogCard } from "@/components/blogs/BlogCard";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { BlogsCtaBanner } from "@/components/blogs/BlogsCtaBanner";
import { PremiumPujaCarousel } from "@/components/blogs/PremiumPujaCarousel";
import { Pagination } from "@/components/ui/Pagination";
import { BLOG_POSTS } from "@/lib/constants";

export const metadata = {
  title: "Blogs | Yajman",
  description:
    "Read the latest news, devotional event highlights, and puja guides from Yajman.",
};

export default function BlogsPage() {
  return (
    <>
      <BlogsHero />

      <div className="relative z-10 -mt-8 rounded-t-[32px] bg-white pt-10 md:-mt-10">
        <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
          <BlogCategoryTabs />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              <div className="flex flex-col gap-8">
                {BLOG_POSTS.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              <Pagination pageCount={2} />
            </div>

            <BlogSidebar />
          </div>
        </div>
      </div>

      <BlogsCtaBanner />
      <PremiumPujaCarousel />
    </>
  );
}
