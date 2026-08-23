import Image, { type ImageProps } from "next/image";
import { isRemoteImageUrl, resolveImageUrl } from "@/lib/image";

/**
 * Spaces object keys include a leading slash (`https://host//path`). Next's
 * optimizer rejects that as INVALID_IMAGE_OPTIMIZE_REQUEST, so load remote
 * URLs directly in the browser.
 */
export default function AppImage({ src, unoptimized, ...rest }: ImageProps) {
  if (typeof src !== "string") {
    return <Image src={src} unoptimized={unoptimized} {...rest} />;
  }

  const resolved = resolveImageUrl(src);
  return (
    <Image
      src={resolved}
      unoptimized={unoptimized ?? isRemoteImageUrl(resolved)}
      {...rest}
    />
  );
}
