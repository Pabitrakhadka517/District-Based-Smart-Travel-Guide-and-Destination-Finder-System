"use client";
import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CloudinaryImage as CloudinaryImageType } from "@/types";
import { getImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: CloudinaryImageType[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Full-screen photo viewer with keyboard nav and a thumbnail strip — shared by GallerySlider and ReviewCard. */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const total = images.length;
  const go = useCallback((d: number) => onIndexChange((index + d + total) % total), [index, total, onIndexChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, go]);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <X size={18} />
      </button>

      <div
        className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageUrl(current)}
          alt={current.alt || `Photo ${index + 1} of ${total}`}
          className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
        />

        {total > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <p className="text-xs font-medium text-white/70">{index + 1} / {total}</p>
        {total > 1 && (
          <div className="flex gap-1.5">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onIndexChange(i); }}
                aria-label={`View photo ${i + 1}`}
                className={cn(
                  "h-10 w-10 overflow-hidden rounded-lg border-2 transition",
                  i === index ? "border-white" : "border-white/30 opacity-60 hover:opacity-80"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getImageUrl(img)} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
