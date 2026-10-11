import { R2_CONFIG } from "@/config/r2";

export interface ImageResizeOptions {
  width: number;
  quality?: number;
  fit?: "cover" | "scale-down" | "contain" | "crop";
}

const R2_HOST = new URL(R2_CONFIG.BASE_URL).hostname;

export const IMAGE_THUMB_WIDTHS = {
  galleryAlbumCover: 640,
  galleryModalAlbum: 400,
  galleryPhoto: 720,
  card: 800,
} as const;

function buildCloudflareImageUrl(
  hostname: string,
  pathname: string,
  { width, quality = 80, fit = "cover" }: ImageResizeOptions,
): string {
  const imagePath = pathname.replace(/^\/+/, "");
  const options = [`width=${width}`, `quality=${quality}`, "format=auto", `fit=${fit}`].join(",");

  return `https://${hostname}/cdn-cgi/image/${options}/${imagePath}`;
}

export function getOptimizedImageUrl(
  src: string | undefined,
  options: ImageResizeOptions,
): string | undefined {
  if (!src) {
    return src;
  }

  if (src.includes("/cdn-cgi/image/")) {
    return src;
  }

  if (src.startsWith("/")) {
    return src;
  }

  try {
    const url = new URL(src);

    if (url.hostname === R2_HOST || url.hostname.endsWith(`.${R2_HOST}`)) {
      return buildCloudflareImageUrl(url.hostname, url.pathname, options);
    }
  } catch {
    return src;
  }

  return src;
}

export function getGalleryAlbumCoverUrl(src: string | undefined): string | undefined {
  return getOptimizedImageUrl(src, {
    width: IMAGE_THUMB_WIDTHS.galleryAlbumCover,
    quality: 82,
    fit: "cover",
  });
}

export function getGalleryModalAlbumUrl(src: string | undefined): string | undefined {
  return getOptimizedImageUrl(src, {
    width: IMAGE_THUMB_WIDTHS.galleryModalAlbum,
    quality: 80,
    fit: "cover",
  });
}

export function getGalleryPhotoThumbUrl(src: string | undefined): string | undefined {
  return getOptimizedImageUrl(src, {
    width: IMAGE_THUMB_WIDTHS.galleryPhoto,
    quality: 82,
    fit: "cover",
  });
}

export function getCardImageUrl(src: string | undefined): string | undefined {
  return getOptimizedImageUrl(src, {
    width: IMAGE_THUMB_WIDTHS.card,
    quality: 85,
    fit: "cover",
  });
}
