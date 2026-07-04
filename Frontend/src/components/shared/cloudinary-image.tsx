"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import type { CloudinaryImage as CloudinaryImageType } from "@/types";
import { getImageUrl, getImageAlt, FALLBACK_IMAGE } from "@/lib/cloudinary";

interface CloudinaryImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: CloudinaryImageType | null | undefined;
  alt?: string;
}

/**
 * Single place every content image in the app should render through.
 * Resolves the {url, blurDataUrl} object shape, falls back to a placeholder
 * on missing data or a load error, and wires up the blur-up placeholder when
 * one was captured at upload time.
 */
export function CloudinaryImage({ image, alt, ...imgProps }: CloudinaryImageProps) {
  const [errored, setErrored] = useState(false);
  const src = errored ? FALLBACK_IMAGE : getImageUrl(image);
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
