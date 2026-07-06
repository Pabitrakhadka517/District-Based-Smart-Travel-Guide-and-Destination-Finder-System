import type { CloudinaryImage } from "@/types";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Builds a bare (untransformed) Cloudinary delivery URL for a known
 * public_id. Callers that want resizing/format transforms should pipe the
 * result through `cld()` below rather than baking a transform in here —
 * `cld()` inserts exactly one transformation segment.
 */
export function cloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}.jpg`;
}

/** Shown whenever an image is missing, broken, or fails to load — a
 *  dedicated Cloudinary asset (see `nepalyatra/placeholders/`), not an
 *  external URL. */
export const FALLBACK_IMAGE = cloudinaryUrl("nepalyatra/placeholders/default-image");

/** Shown whenever a user/author/reviewer avatar is missing. */
export const DEFAULT_AVATAR = cloudinaryUrl("nepalyatra/placeholders/default-avatar");

/** Resolves an (possibly undefined) CloudinaryImage to a renderable URL. */
export function getImageUrl(image: CloudinaryImage | null | undefined, fallback = FALLBACK_IMAGE): string {
  return image?.url?.trim() ? image.url : fallback;
}

export function getImageAlt(image: CloudinaryImage | null | undefined, fallback = ""): string {
  return image?.alt?.trim() ? image.alt : fallback;
}

interface CldTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | number;
  crop?: "fill" | "fit" | "scale" | "thumb";
}

/**
 * Inserts Cloudinary transformation parameters (auto format + quality,
 * optional resizing) into a res.cloudinary.com delivery URL. Non-Cloudinary
 * URLs (legacy Unsplash seed data) pass through unchanged.
 */
export function cld(url: string, opts: CldTransformOptions = {}): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;

  const parts = [`f_auto`, `q_${opts.quality ?? "auto"}`];
  if (opts.width) parts.push(`w_${opts.width}`);
  if (opts.height) parts.push(`h_${opts.height}`);
  if (opts.width || opts.height) parts.push(`c_${opts.crop ?? "fill"}`);

  return url.replace("/upload/", `/upload/${parts.join(",")}/`);
}
