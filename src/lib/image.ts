export const FALLBACK_IMAGE = "/images/services/service-shivling.png";

/**
 * Keep remote URLs byte-for-byte.
 *
 * Uploads to DigitalOcean Spaces were stored with a leading slash in the
 * object key (`/categories/...`), which is exposed as
 * `https://host//categories/...`. Collapsing that extra slash looks up a
 * different key and Spaces returns 403. Next.js Image optimization also
 * rejects `//` as INVALID_IMAGE_OPTIMIZE_REQUEST, so remote URLs must be
 * rendered unoptimized (see AppImage).
 */
export function resolveImageUrl(url: string | null | undefined): string {
  if (url && (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://"))) {
    return url;
  }
  return FALLBACK_IMAGE;
}

export function isRemoteImageUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
