import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-site px-4 py-4 md:px-8 md:py-6 lg:px-16 lg:pt-10 lg:pb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-text-muted sm:text-base">
        {items.map((item, i) => (
          <li key={i} className="flex max-w-full items-center gap-2">
            {i > 0 && <ChevronRight size={16} className="shrink-0 text-text-light" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-saffron-400">
                {item.label}
              </Link>
            ) : (
              <span className="line-clamp-1 text-text-primary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
