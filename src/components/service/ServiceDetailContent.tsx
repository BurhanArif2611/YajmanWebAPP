type ContentSection = {
  id: string;
  title: string;
  content: string;
  html?: boolean;
};

function normalizeContent(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function looksLikeHtml(value: string) {
  return /<[a-z][\s\S]*>/i.test(value);
}

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

  const add = (id: string, title: string, raw?: string | null, html = false) => {
    const content = raw?.trim();
    if (!content) return;

    const key = normalizeContent(content);
    if (seen.has(key)) return;
    seen.add(key);

    sections.push({ id, title, content, html });
  };

  add("short_description", "Overview", shortDescription);
  add("description", "Description", description);

  const custom = customContent?.trim();
  if (custom) {
    const key = normalizeContent(custom);
    if (!seen.has(key)) {
      seen.add(key);
      sections.push({
        id: "custom_content",
        title: "Additional Details",
        content: custom,
        html: looksLikeHtml(custom),
      });
    }
  }

  return sections;
}

const PROSE_CLASS =
  "prose prose-neutral max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-brand-saffron-400 prose-img:max-w-full prose-ul:text-text-muted prose-ol:text-text-muted";

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
    shortDescription,
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
          {html ? (
            <article
              className={`${PROSE_CLASS} mt-3 overflow-x-auto text-sm sm:text-base`}
              // Authored in admin CMS — API delivers sanitized HTML.
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-text-muted sm:text-base">
              {content}
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
