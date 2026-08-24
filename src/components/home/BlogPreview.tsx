"use client";

import { useState } from "react";
import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { getBlogs } from "@/lib/api/blogs";
import { resolveImageUrl } from "@/lib/mappers/service";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types/api";

const FETCH_LIMIT = 8;
const HIGHLIGHT_COUNT = 3;
const SIDEBAR_COUNT = 4;

function postDate(post: Blog) {
  return format(parseISO(post.published_at ?? post.created_at), "MMMM d, yyyy");
}

export function BlogPreview() {
  const [active, setActive] = useState(0);

  const blogsQuery = useQuery({
    queryKey: ["blogs", "home-preview"],
    queryFn: () => getBlogs({ limit: FETCH_LIMIT }),
    staleTime: 5 * 60_000,
  });

  const posts = blogsQuery.data?.data ?? [];
  if (!blogsQuery.isLoading && !posts.length) return null;

  const featured = posts[0];
  const highlights = posts.slice(0, HIGHLIGHT_COUNT);
  const sidebar = posts.slice(1, 1 + SIDEBAR_COUNT);
  const highlight = highlights[active];

  return (
    <section className="mx-auto max-w-site px-4 py-10 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <div className="relative overflow-hidden rounded-[24px] bg-surface-muted p-5 sm:rounded-[32px] md:p-10 lg:p-14">
        <Image src="/images/decor/side-deco.png" alt="decoration" width={300} height={300} className="absolute top-0 left-0 z-0 bg-no-repeat bg-left-top bg-contain bg-[length:300px_auto] opacity-10" />
        <SectionHeader
          eyebrow="Recent News & Blogs"
          heading="News & views from Yajman"
        />

        {blogsQuery.isLoading ? (
          <div className="relative mt-8 grid grid-cols-1 gap-5 md:mt-12 md:gap-6 lg:grid-cols-[0.85fr_1fr_0.85fr]">
            <Skeleton className="h-[320px] w-full rounded-2xl md:h-[420px]" />
            <Skeleton className="h-[320px] w-full rounded-2xl md:h-[420px]" />
            <Skeleton className="h-[320px] w-full rounded-2xl md:h-[420px]" />
          </div>
        ) : (
          <div className="relative mt-8 grid grid-cols-1 gap-5 md:mt-12 md:gap-6 lg:grid-cols-[0.85fr_1fr_0.85fr]">
            {/* Mini carousel card — cycles the newest posts */}
            {highlight && (
              <div className="flex flex-col gap-5 rounded-2xl bg-[#1f1f1f] p-6 text-white">
                <Link href={`/blogs/${highlight.slug}`}>
                  <h3 className="font-sans text-xl font-semibold leading-snug">
                    {highlight.title}
                  </h3>
                  {highlight.excerpt && (
                    <p className="mt-2 text-sm text-white/70 line-clamp-3">{highlight.excerpt}</p>
                  )}
                </Link>

                <div className="relative mt-auto aspect-[4/3] w-full">
                  <div className="absolute inset-0 -rotate-3 rounded-xl bg-white/10" />
                  <div className="absolute inset-0 rotate-2 overflow-hidden rounded-xl shadow-modal">
                    <Image
                      src={resolveImageUrl(highlight.feature_image_url)}
                      alt={highlight.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {highlights.length > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {highlights.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Show highlight ${i + 1}`}
                        onClick={() => setActive(i)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          i === active ? "w-6 bg-brand-saffron-400" : "w-2 bg-white/30"
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Featured card */}
            {featured && (
              <Link
                href={`/blogs/${featured.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="relative h-56 w-full overflow-hidden lg:h-64">
                  <Image
                    src={resolveImageUrl(featured.feature_image_url)}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="flex items-center gap-2 text-xs font-medium text-text-muted">
                    <span className="font-semibold text-brand-saffron-400">
                      • {featured.category_name}
                    </span>
                    {postDate(featured)} · By {featured.author_name}
                  </p>
                  <h3 className="font-sans text-xl font-semibold text-text-primary">
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="text-sm text-text-muted line-clamp-2">{featured.excerpt}</p>
                  )}
                  <span className="mt-auto flex items-center gap-2 text-sm font-medium text-brand-saffron-400">
                    <ArrowRight size={16} /> Read More
                  </span>
                </div>
              </Link>
            )}

            {/* Sidebar list */}
            {sidebar.length > 0 && (
              <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-card">
                {sidebar.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className={cn(
                      "flex gap-4",
                      i !== sidebar.length - 1 && "border-b border-border pb-5"
                    )}
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={resolveImageUrl(post.feature_image_url)}
                        alt={post.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold leading-snug text-text-primary line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-xs text-text-muted">{postDate(post)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
