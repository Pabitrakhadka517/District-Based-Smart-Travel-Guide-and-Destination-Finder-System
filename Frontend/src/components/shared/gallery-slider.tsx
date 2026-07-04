"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { CloudinaryImage } from "./cloudinary-image";
import { Lightbox } from "./lightbox";
import type { CloudinaryImage as CloudinaryImageType } from "@/types";

export function GallerySlider({ images, alt }: { images: CloudinaryImageType[]; alt: string }) {
  const [i, setI] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;
  const go = (d: number) => setI((p) => (p + d + total) % total);

  if (total === 0) return null;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative h-[260px] overflow-hidden rounded-2xl md:h-[420px]">
        <button
          onClick={() => setLightboxOpen(true)}
          aria-label="View full-screen"
          className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
        >
          <CloudinaryImage
            image={images[i]}
            alt={`${alt} — photo ${i + 1} of ${total}`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </button>

        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/55 p-1.5 text-white backdrop-blur">
          <Expand size={14} />
        </div>

        {/* Slide counter (visible + screen-reader announcement) */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
        >
          {i + 1} / {total}
        </div>

        {total > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label={`Previous photo (${i === 0 ? total : i} of ${total})`}
              className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-soft transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label={`Next photo (${i === total - 1 ? 1 : i + 2} of ${total})`}
              className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-soft transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label={`${alt} photos`}
          className="flex gap-2 overflow-x-auto pb-1"
        >
          {images.map((image, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={i === idx}
              aria-label={`View photo ${idx + 1} of ${total}`}
              onClick={() => setI(idx)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                i === idx ? "border-accent" : "border-transparent opacity-70 hover:opacity-90"
              )}
            >
              <CloudinaryImage image={image} alt="" aria-hidden="true" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <Lightbox images={images} index={i} onClose={() => setLightboxOpen(false)} onIndexChange={setI} />
      )}
    </div>
  );
}
