import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveImageUrl } from "@/lib/mappers/service";
import type { RelatedBlog } from "@/types/api";

export function RelatedArticles({
  posts,
  basePath = "/blogs",
}: {
  posts: RelatedBlog[];
  basePath?: string;
}) {
  if (!posts.length) return null;

  return (
    <section className="mx-auto max-w-site px-4 pb-16 md:px-8 md:pb-20 lg:px-16 lg:pb-24">
      <div className="relative rounded-2xl bg-surface-peach p-6 md:p-16">
        <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute top-0 left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10" />
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-sans text-2xl font-semibold text-text-primary md:text-3xl">
            Related Articles
          </h2>
          <Link
            href="/blogs"
            className="flex items-center gap-1 text-sm font-semibold text-brand-saffron-400"
          >
            View More
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col overflow-hidden rounded-xl bg-white"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={resolveImageUrl(post.feature_image_url)}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="font-sans text-base font-bold text-text-primary">
                  {post.title}
                </h3>
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="mt-auto flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-navy text-sm font-medium text-white transition-colors hover:bg-brand-navy-800"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
