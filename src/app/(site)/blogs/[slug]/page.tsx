import { notFound } from "next/navigation";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BlogDetailHero } from "@/components/blogs/BlogDetailHero";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { RelatedArticles } from "@/components/blogs/RelatedArticles";
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

  const sidebarServices = post.sidebar_services.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    image: resolveImageUrl(s.feature_image_url),
    price: Number(s.price),
  }));

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
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
                {post.title}
              </h1>
              <button className="flex shrink-0 items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-saffron-400">
                <Share2 size={16} />
                Share
              </button>
            </div>

            <div className="mt-6">
              <BlogDetailHero images={images} alt={post.title} />
            </div>

            {post.excerpt && (
              <p className="mt-6 text-base leading-relaxed text-text-muted">{post.excerpt}</p>
            )}

            <article
              className="prose prose-neutral mt-8 max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-brand-saffron-400"
              // Content is authored in a rich-text editor (CMS) and delivered as
              // sanitized HTML by the blogs API — rendered as-is here.
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

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

          <BlogSidebar services={sidebarServices} />
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <RelatedArticles posts={post.related_blogs} />
      </div>
    </>
  );
}
