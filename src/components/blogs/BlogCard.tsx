import Image from "@/components/ui/AppImage";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { resolveImageUrl } from "@/lib/mappers/service";
import type { Blog } from "@/types/api";

export function BlogCard({ post }: { post: Blog }) {
  const dateSource = post.published_at ?? post.created_at;

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col gap-5 border-b border-border pb-8 last:border-b-0 sm:flex-row"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-64">
        <Image
          src={resolveImageUrl(post.feature_image_url)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, 356px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <h3 className="min-w-0 font-sans text-lg font-bold text-text-primary line-clamp-2 sm:text-xl">
            {post.title}
          </h3>
          <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-primary">
            <Calendar size={12} className="text-brand-saffron-400" />
            {format(parseISO(dateSource), "d MMM yyyy")}
          </span>
        </div>
        {post.excerpt && (
          <p className="text-sm leading-relaxed text-text-muted">{post.excerpt}</p>
        )}
        <p className="text-sm text-text-muted">
          <span className="font-semibold text-text-primary">Category :</span>{" "}
          {post.category_name}
        </p>
        <span className="mt-auto flex w-fit items-center gap-1 text-sm font-semibold text-brand-saffron-400">
          Read More
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
