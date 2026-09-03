import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage, getLegalPages } from "@/lib/api/legal";

type Params = Promise<{ slug: string }>;

async function fetchPage(slug: string) {
  try {
    return await getLegalPage(slug);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const pages = await getLegalPages();
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await fetchPage(slug);
  if (!page) return {};

  return {
    title: page.meta_title || `${page.title} | Yajman`,
    description: page.meta_description || undefined,
    alternates: { canonical: `/legal/${slug}` },
  };
}

export default async function LegalPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await fetchPage(slug);
  if (!page) notFound();

  return <LegalPageView page={page} />;
}
