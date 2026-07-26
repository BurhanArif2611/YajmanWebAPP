import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ARTICLES } from "@/lib/constants";

export function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-sans text-lg font-bold text-text-primary">
          {article.title}
        </h3>
        <p className="text-sm text-text-muted line-clamp-2">{article.excerpt}</p>
        <Link
          href={`/articles/${article.slug}`}
          className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-navy text-sm font-medium text-white transition-colors hover:bg-brand-navy-800"
        >
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
