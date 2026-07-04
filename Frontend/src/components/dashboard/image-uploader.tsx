"use client";
import { useRef, useState } from "react";
import { Upload, X, Loader2, ImagePlus, AlertCircle } from "lucide-react";
import { uploadService, validateImageFile, type UploadType } from "@/services/uploadService";
import { CloudinaryImage } from "@/components/shared/cloudinary-image";
import { cn } from "@/lib/utils";
import type { CloudinaryImage as CloudinaryImageType } from "@/types";

interface ImageUploaderProps {
  type: UploadType;
  value: CloudinaryImageType | null | undefined;
  onChange: (image: CloudinaryImageType | null) => void;
  alt?: string;
  label?: string;
  aspectClassName?: string;
}

/** Single-image uploader (hero/cover/avatar fields) — preview, replace, remove, progress. */
export function ImageUploader({
  value, onChange, type, alt = "", label = "Image", aspectClassName = "aspect-video",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    const invalid = validateImageFile(file);
    if (invalid) { setError(invalid); return; }
    setError(null);
    setProgress(0);
    try {
      // Deliberately does not delete the replaced image here — the caller may
      // still Cancel without saving, and this component has no way to know.
      // The owning save handler (or the backend, e.g. profile updates) is
      // responsible for cleaning up the old asset once the change is committed.
      const uploaded = await uploadService.uploadImageWithProgress(file, type, setProgress, alt);
      onChange(uploaded);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setProgress(null);
    }
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    e.target.value = "";
  };

  const remove = () => {
    onChange(null);
  };

  const uploading = progress !== null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className={cn(
        "relative w-full overflow-hidden rounded-xl border border-dashed border-border bg-muted/30",
        aspectClassName
      )}>
        {value?.url ? (
          <>
            <CloudinaryImage image={value} alt={value.alt || label} fill className="object-cover" />
            {!uploading && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition hover:bg-black/40 hover:opacity-100">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-white"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={remove}
                  className="rounded-lg bg-white/90 px-2 py-1.5 text-xs font-medium text-destructive hover:bg-white"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-muted-foreground transition hover:text-foreground"
          >
            <Upload size={22} />
            <span className="text-xs">Click to upload</span>
          </button>
        )}

        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-xs font-medium">{progress}%</span>
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle size={12} className="shrink-0" /> {error}
        </p>
      )}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileInput} />
    </div>
  );
}

interface GalleryUploaderProps {
  type: UploadType;
  value: CloudinaryImageType[];
  onChange: (images: CloudinaryImageType[]) => void;
  alt?: string;
  label?: string;
  max?: number;
}

/** Multi-image uploader (destination/attraction/trek galleries, review photos). */
export function GalleryUploader({
  value, onChange, type, alt = "", label = "Gallery", max = 10,
}: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    setError(null);
    const remaining = max - value.length;
    if (remaining <= 0) { setError(`You can add up to ${max} photos.`); return; }

    const list = Array.from(files).slice(0, remaining);
    for (const file of list) {
      const invalid = validateImageFile(file);
      if (invalid) { setError(invalid); continue; }
      setProgress(0);
      try {
        const uploaded = await uploadService.uploadImageWithProgress(file, type, setProgress, alt);
        onChange([...value, uploaded]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      }
    }
    setProgress(null);
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) void handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeAt = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  const uploading = progress !== null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label} ({value.length}/{max})</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {value.map((img, i) => (
          <div key={img.publicId ?? img.url ?? i} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
            <CloudinaryImage image={img} alt={img.alt || `Photo ${i + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 hidden rounded-full bg-black/60 p-1 text-white group-hover:flex"
              aria-label="Remove photo"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {value.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition hover:text-foreground"
          >
            {uploading
              ? <><Loader2 size={18} className="animate-spin" /><span className="text-[10px]">{progress}%</span></>
              : <><ImagePlus size={18} /><span className="text-[10px]">Add photo</span></>
            }
          </button>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle size={12} className="shrink-0" /> {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={onFileInput}
      />
    </div>
  );
}
