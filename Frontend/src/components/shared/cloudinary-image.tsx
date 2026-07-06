"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import type { CloudinaryImage as CloudinaryImageType } from "@/types";
import { getImageUrl, getImageAlt, FALLBACK_IMAGE, cld } from "@/lib/cloudinary";

interface CloudinaryImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: CloudinaryImageType | null | undefined;
  alt?: string;
}

/**
 * Single place every content image in the app should render through.
 * Resolves the {url, blurDataUrl} object shape, falls back to a placeholder
 * on missing data or a load error, and wires up the blur-up placeholder when
 * one was captured at upload time. Real Cloudinary assets automatically get
 * f_auto/q_auto (modern format + automatic quality) applied at the source —
 * next/image's own resizing on top of that handles responsive `sizes`.
 */
export function CloudinaryImage({ image, alt, ...imgProps }: CloudinaryImageProps) {
  const [errored, setErrored] = useState(false);
  const src = cld(errored ? FALLBACK_IMAGE : getImageUrl(image), { quality: "auto" });
  const resolvedAlt = alt ?? getImageAlt(image);

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      onError={() => setErrored(true)}
      placeholder={image?.blurDataUrl ? "blur" : "empty"}
      blurDataURL={image?.blurDataUrl || undefined}
      {...imgProps}
    />
  );
}
