export const MAX_IMAGE_UPLOAD_BYTES = 10 * 1024 * 1024;
export const MAX_IMAGE_UPLOAD_MB = 10;
export const MAX_REVIEW_PHOTOS = 5;

export const IMAGE_UPLOAD_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

export const AVATAR_UPLOAD_HINT = `JPG, PNG or WebP. Maximum file size ${MAX_IMAGE_UPLOAD_MB} MB.`;

export const REVIEW_PHOTOS_UPLOAD_HINT = `Up to ${MAX_REVIEW_PHOTOS} photos. JPG, PNG or WebP. Maximum ${MAX_IMAGE_UPLOAD_MB} MB per image.`;

export class ImageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageValidationError";
  }
}

export function validateImageUpload(
  file: File,
  maxBytes: number = MAX_IMAGE_UPLOAD_BYTES
): void {
  if (!file.type.startsWith("image/")) {
    throw new ImageValidationError("Please choose an image file.");
  }
  if (file.size > maxBytes) {
    throw new ImageValidationError(`Image must be ${MAX_IMAGE_UPLOAD_MB} MB or smaller.`);
  }
}
