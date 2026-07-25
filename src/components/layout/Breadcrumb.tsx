import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-site px-4 py-6 md:px-8 lg:px-16 lg:pt-10 lg:pb-4">
      <ol className="flex flex-wrap items-center gap-2 text-base font-medium text-text-muted">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={16} className="text-text-light" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-saffron-400">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
