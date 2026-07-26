import Image from "next/image";
import { Share2, Star } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArticleDetailHero } from "@/components/articles/ArticleDetailHero";
import { RelatedArticles } from "@/components/blogs/RelatedArticles";
import { ARTICLE_DETAIL } from "@/lib/constants";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return {
    title: `${ARTICLE_DETAIL.title} | Yajman Articles`,
    description: ARTICLE_DETAIL.excerpt,
    alternates: { canonical: `/articles/${slug}` },
  };
}

export default async function ArticleDetailPage({ params }: { params: Params }) {
  await params;
  const article = ARTICLE_DETAIL;

  return (
    <>
      <div className="mx-auto max-w-narrow px-4 pb-16 pt-4 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
        <Breadcrumb
          items={[
            { label: "Articles", href: "/articles" },
            { label: article.breadcrumbCategory, href: "/articles" },
            { label: article.title },
          ]}
        />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-sans text-3xl font-bold text-text-primary md:text-4xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sm text-text-muted">
              <span className="flex gap-0.5 text-brand-gold-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < article.rating ? "currentColor" : "none"}
                  />
                ))}
              </span>
              ( {String(article.reviewCount).padStart(2, "0")} Reviews )
            </span>
            <button className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-saffron-400">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="mt-6">
          <ArticleDetailHero images={article.images} alt={article.title} />
        </div>

        <p className="mt-6 text-base leading-relaxed text-text-muted">
          {article.excerpt}
        </p>

        <article
          className="prose prose-neutral mt-8 max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-brand-saffron-400"
          // Content is authored in a rich-text editor (CMS) and delivered as
          // sanitized HTML by the articles API — rendered as-is here.
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-10 flex items-center gap-2 border-t border-border pt-6 text-sm text-text-muted">
          <Image
            src="/images/logo/logo.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
          Published by {article.publishedBy} · {article.publishedDate}
        </div>
      </div>

      <div className="lg:-mt-4">
        <RelatedArticles basePath="/articles" />
      </div>
    </>
  );
}
