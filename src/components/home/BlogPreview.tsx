import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/lib/constants";

export function BlogPreview() {
  const [main, ...rest] = BLOG_POSTS;

  return (
    <section className="mx-auto max-w-site px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24">
      <SectionHeader
        eyebrow="Recent News & Blogs"
        heading="News & views from Yajman"
        align="left"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BlogCard post={main} large />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  post,
  large = false,
}: {
  post: (typeof BLOG_POSTS)[number];
  large?: boolean;
}) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col gap-4 overflow-hidden rounded-xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:flex-row lg:flex-col"
    >
      <div
        className={`relative w-full overflow-hidden ${
          large ? "h-64 md:h-full md:min-h-[320px]" : "h-48 sm:h-auto sm:w-2/5 lg:w-full lg:h-48"
        }`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3">{post.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-4 lg:p-5">
        <p className="text-xs font-medium text-text-muted">
          {post.date} · By {post.author}
        </p>
        <h3
          className={`font-sans font-semibold text-text-primary ${
            large ? "text-2xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        {large && (
          <p className="text-sm text-text-muted line-clamp-2">{post.excerpt}</p>
        )}
        <span className="mt-auto text-sm font-medium text-brand-saffron-400">
          Read More →
        </span>
      </div>
    </Link>
  );
}
