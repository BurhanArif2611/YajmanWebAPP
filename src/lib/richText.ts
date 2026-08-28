export const RICH_TEXT_PROSE_CLASS =
  "prose prose-neutral max-w-none prose-headings:font-sans prose-headings:font-semibold prose-headings:text-text-primary prose-p:text-text-muted prose-p:leading-relaxed prose-strong:text-text-primary prose-strong:font-semibold prose-a:text-brand-saffron-400 prose-img:max-w-full prose-ul:text-text-muted prose-ol:text-text-muted prose-li:text-text-muted";

/** True when content looks like HTML from the admin rich-text editor. */
export function looksLikeHtml(value: string) {
  return /<[a-z][\s\S]*>/i.test(value);
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
