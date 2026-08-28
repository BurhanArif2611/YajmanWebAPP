import { looksLikeHtml, RICH_TEXT_PROSE_CLASS, stripHtml } from "@/lib/richText";

type ContentSection = {
  id: string;
  title: string;
  content: string;
  html: boolean;
};

function buildSections({
  shortDescription,
  aboutPuja,
  description,
  customContent,
}: {
  shortDescription?: string | null;
  aboutPuja?: string | null;
  description?: string | null;
  customContent?: string | null;
}): ContentSection[] {
  const seen = new Set<string>();
  const sections: ContentSection[] = [];

  const add = (id: string, title: string, raw?: string | null) => {
    const content = raw?.trim();
    if (!content) return;

    const key = stripHtml(content).toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);

    sections.push({ id, title, content, html: looksLikeHtml(content) });
  };

  add("short_description", "Overview", shortDescription);
  add("about_puja", "About this Puja", aboutPuja);
  add("description", "Description", description);
  add("custom_content", "Additional Details", customContent);

  return sections;
}

function RichTextBlock({ content, html }: { content: string; html: boolean }) {
  if (html) {
    return (
      <article
        className={`${RICH_TEXT_PROSE_CLASS} mt-3 overflow-x-auto text-sm sm:text-base`}
        // Authored in admin CMS — API delivers sanitized HTML.
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-text-muted sm:text-base">
      {content}
    </p>
  );
}

export function ServiceDetailContent({
  shortDescription,
  aboutPuja,
  description,
  customContent,
}: {
  shortDescription?: string | null;
  aboutPuja?: string | null;
  description?: string | null;
  customContent?: string | null;
}) {
  const sections = buildSections({
    aboutPuja,
    description,
    customContent,
  });

  if (!sections.length) return null;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {sections.map(({ id, title, content, html }) => (
        <section key={id}>
          <h2 className="font-sans text-xl font-semibold text-text-primary sm:text-2xl">{title}</h2>
          <RichTextBlock content={content} html={html} />
        </section>
      ))}
    </div>
  );
}
