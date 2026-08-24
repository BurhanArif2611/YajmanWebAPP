import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type BlogSidebarItem = {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  /** Category slug — only known when the item came from a full Service; omit to link generically. */
  category?: string;
};

export function BlogSidebar({ services }: { services: BlogSidebarItem[] }) {
  if (!services.length) return null;

  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="mb-3 font-sans text-lg font-semibold text-text-primary">
          Other Top Rated Services
        </h3>
        <ul className="mt-4 flex flex-col gap-8">
          {services.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-sm font-semibold leading-snug text-text-primary line-clamp-2">
                  {item.title}
                </p>
                <Link
                  href={item.category ? `/services/${item.category}/${item.slug}` : "/services"}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-saffron-400"
                >
                  Read More
                  <ArrowRight size={12} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
