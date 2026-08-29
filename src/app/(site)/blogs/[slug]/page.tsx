import { notFound } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BlogDetailHero } from "@/components/blogs/BlogDetailHero";
import { BlogsPlacementSidebar } from "@/components/blogs/BlogsPlacementSidebar";
import { RelatedArticles } from "@/components/blogs/RelatedArticles";
import { ShareButton } from "@/components/ui/ShareButton";
import { getBlogBySlug } from "@/lib/api/blogs";
import { resolveImageUrl } from "@/lib/mappers/service";

type Params = Promise<{ slug: string }>;

async function fetchBlog(slug: string) {
  try {
    return await getBlogBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await fetchBlog(slug);
  if (!post) return {};

  return {
    title: post.meta_title || `${post.title} | Yajman Blog`,
    description: post.meta_description || post.excerpt || undefined,
    alternates: { canonical: `/blogs/${slug}` },
  };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await fetchBlog(slug);

  if (!post) {
    notFound();
  }

  const images = post.images.length
    ? post.images.map((img) => resolveImageUrl(img.url))
    : [resolveImageUrl(post.feature_image_url)];

  const publishedDate = post.published_at ?? post.created_at;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Blogs", href: "/blogs" },
          { label: post.category_name, href: "/blogs" },
          { label: post.title },
        ]}
      />

      <div className="mx-auto max-w-site px-4 pb-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h1 className="min-w-0 font-sans text-2xl font-bold break-words text-text-primary sm:text-3xl md:text-4xl">
                {post.title}
              </h1>
              <ShareButton
                className="w-fit shrink-0"
                title={post.title}
                text={post.excerpt || post.title}
                url={`/blogs/${post.slug}`}
              />
            </div>

            <div className="mt-6">
              <BlogDetailHero images={images} alt={post.title} />
            </div>

            {post.excerpt && (
              <p className="mt-6 text-base leading-relaxed text-text-muted">{post.excerpt}</p>
            )}

            <div className="mt-8 overflow-x-auto">
              <article
                className="prose prose-neutral max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-brand-saffron-400 prose-img:max-w-full"
                // Content is authored in a rich-text editor (CMS) and delivered as
                // sanitized HTML by the blogs API — rendered as-is here.
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="mt-10 flex items-center gap-2 border-t border-border pt-6 text-sm text-text-muted">
              <Image
                src="/images/logo/logo.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              By {post.author_name} · {format(parseISO(publishedDate), "MMMM d, yyyy")}
            </div>
          </div>

          <BlogsPlacementSidebar />
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <RelatedArticles posts={post.related_blogs} />
      </div>
    </>
  );
}
//new slug is added
