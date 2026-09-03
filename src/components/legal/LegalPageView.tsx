import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { formatDate } from "@/lib/utils";
import type { LegalPage } from "@/types/api";

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: page.title }]} />

      <div className="mx-auto max-w-site px-4 pb-16 md:px-8 lg:px-16">
        <h1 className="font-sans text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm text-text-muted">Last updated {formatDate(page.updated_at)}</p>

        <div className="mt-8 overflow-x-auto">
          <article
            className="prose prose-neutral max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-brand-saffron-400 prose-img:max-w-full"
            // Content is authored in the admin rich-text editor and delivered as
            // sanitized HTML by the /legal API — rendered as-is here.
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </>
  );
}
