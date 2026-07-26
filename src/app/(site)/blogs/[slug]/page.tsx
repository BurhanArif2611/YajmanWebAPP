import Image from "next/image";
import { Share2 } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BlogDetailHero } from "@/components/blogs/BlogDetailHero";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { RelatedArticles } from "@/components/blogs/RelatedArticles";
import { BLOG_DETAIL } from "@/lib/constants";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return {
    title: `${BLOG_DETAIL.title} | Yajman Blog`,
    description: BLOG_DETAIL.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
  };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  await params;
  const post = BLOG_DETAIL;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Blogs", href: "/blogs" },
          { label: post.breadcrumbCategory, href: "/blogs" },
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
              <BlogDetailHero images={post.images} alt={post.title} />
            </div>

            <p className="mt-6 text-base leading-relaxed text-text-muted">
              {post.excerpt}
            </p>

            <article
              className="prose prose-neutral mt-8 max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-brand-saffron-400"
              // Content is authored in a rich-text editor (CMS) and delivered
              // as sanitized HTML by the blog API — rendered as-is here.
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mt-10 flex items-center gap-2 border-t border-border pt-6 text-sm text-text-muted">
              <Image
                src="/images/logo/logo.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              Published by {post.publishedBy} · {post.publishedDate}
            </div>
          </div>

          <BlogSidebar />
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <RelatedArticles />
      </div>
    </>
  );
}
