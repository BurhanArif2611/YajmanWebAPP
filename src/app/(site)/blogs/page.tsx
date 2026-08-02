import { BlogsHero } from "@/components/blogs/BlogsHero";
import { BlogCategoryTabs } from "@/components/blogs/BlogCategoryTabs";
import { BlogCard } from "@/components/blogs/BlogCard";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { BlogsCtaBanner } from "@/components/blogs/BlogsCtaBanner";
import { PremiumPujaCarousel } from "@/components/blogs/PremiumPujaCarousel";
import { Pagination } from "@/components/ui/Pagination";
import { getBlogs } from "@/lib/api/blogs";
import { getServices } from "@/lib/api/services";
import { resolveImageUrl } from "@/lib/mappers/service";
import type { Blog } from "@/types/api";

const PAGE_SIZE = 6;

export const metadata = {
  title: "Blogs | Yajman",
  description:
    "Read the latest news, devotional event highlights, and puja guides from Yajman.",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = Number(first(params.page) ?? 1) || 1;
  const category = first(params.category);

  let posts: Blog[] = [];
  let pageCount = 1;
  let loadError = false;

  try {
    const result = await getBlogs({ page, limit: PAGE_SIZE, category });
    posts = result.data;
    pageCount = result.pagination?.total_pages ?? 1;
  } catch {
    loadError = true;
  }

  let sidebarServices: { id: string; title: string; slug: string; image: string; price: number; category: string }[] = [];
  try {
    const svcResult = await getServices({ is_bestseller: true, limit: 5 });
    sidebarServices = svcResult.data.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      image: resolveImageUrl(s.feature_image_url),
      price: Number(s.price),
      category: s.category_slug,
    }));
  } catch {
    // Sidebar is a decorative widget — fine to just stay empty if this fails.
  }

  return (
    <>
      <BlogsHero />

      <div className="relative z-10 -mt-8 rounded-t-[32px] bg-white pt-10 md:-mt-10">
        <div className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
          <BlogCategoryTabs />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
            <div>
              {loadError ? (
                <p className="text-center text-text-muted">
                  Unable to load blogs right now. Please try again later.
                </p>
              ) : posts.length ? (
                <>
                  <div className="flex flex-col gap-8">
                    {posts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>

                  <Pagination pageCount={pageCount} />
                </>
              ) : (
                <p className="text-center text-text-muted">No blog posts found.</p>
              )}
            </div>

            <BlogSidebar services={sidebarServices} />
          </div>
        </div>
      </div>

      <BlogsCtaBanner />
      <PremiumPujaCarousel />
    </>
  );
}
