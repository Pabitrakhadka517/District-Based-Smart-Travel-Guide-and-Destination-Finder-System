import type { CloudinaryImage } from "@/types";

/** Shown whenever an image is missing, broken, or fails to load. */
export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80";

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
