"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ThumbsUp, ShieldCheck, ChevronLeft, ChevronRight, X, Camera, MapPin } from "lucide-react";
import type { Review } from "@/types";
import { Rating } from "@/components/ui/rating";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useVoteHelpful } from "@/hooks/use-content";

/* ── helpers ─────────────────────────────────────────────────────────────── */

const VOTED_KEY = "nepayatra_helpful_votes";

function getVotedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(VOTED_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch { return new Set(); }
}

function saveVotedSet(s: Set<string>) {
  try { localStorage.setItem(VOTED_KEY, JSON.stringify([...s])); } catch { /* */ }
}

function relativeTime(dateStr: string): string {
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86_400_000);
  if (days === 0)   return "Today";
  if (days === 1)   return "Yesterday";
  if (days < 7)    return `${days} days ago`;
  if (days < 30)   return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  if (days < 365)  return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""} ago`;
}

/* ── Photo lightbox ──────────────────────────────────────────────────────── */

interface LightboxProps {
  photos: string[];
  idx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function PhotoLightbox({ photos, idx, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
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
          src={photos[idx]}
          alt={`Photo ${idx + 1} of ${photos.length}`}
          className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl"
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={onNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white transition hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Counter + thumbnails strip */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <p className="text-xs font-medium text-white/70">{idx + 1} / {photos.length}</p>
        {photos.length > 1 && (
          <div className="flex gap-1.5">
            {photos.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); onClose(); /* handled by parent index */ }}
                aria-label={`View photo ${i + 1}`}
                className={cn(
                  "h-10 w-10 overflow-hidden rounded-lg border-2 transition",
                  i === idx ? "border-white" : "border-white/30 opacity-60 hover:opacity-80"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ReviewCard ──────────────────────────────────────────────────────────── */

interface ReviewCardProps {
  review: Review;
  /** When rendered on the global /reviews page, pass the destination name */
  destinationName?: string;
  /** Show a compact variant (no photos, truncated body) */
  compact?: boolean;
}

export function ReviewCard({ review: r, destinationName, compact = false }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(r.helpful);
  const [hasVoted, setHasVoted]         = useState(false);
  const [voteFlash, setVoteFlash]       = useState(false);
  const [lightboxIdx, setLightboxIdx]   = useState<number | null>(null);
  const { mutate: vote, isPending }     = useVoteHelpful();

  useEffect(() => { setHasVoted(getVotedSet().has(r.id)); }, [r.id]);

  function handleVote() {
    if (hasVoted || isPending) return;
    vote(r.id, {
      onSuccess: ({ helpful }) => {
        setHelpfulCount(helpful);
        setHasVoted(true);
        setVoteFlash(true);
        setTimeout(() => setVoteFlash(false), 1800);
        const s = getVotedSet();
        s.add(r.id);
        saveVotedSet(s);
      },
    });
  }

  const photos     = r.photos?.filter(Boolean) ?? [];
  const totalPhotos = photos.length;

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto     = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i - 1 + totalPhotos) % totalPhotos : null)),
    [totalPhotos]);
  const nextPhoto     = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % totalPhotos : null)),
    [totalPhotos]);

  return (
    <>
      <article className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-soft">
        {/* ── Destination tag (global page only) ── */}
        {destinationName && (
          <div className="mb-3 flex items-center gap-1 text-xs font-medium text-brand-600">
            <MapPin size={11} />
            {destinationName}
          </div>
        )}

        {/* ── Author row ── */}
        <div className="flex items-start gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            <Image
              src={r.avatar}
              alt={r.author}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="font-semibold text-foreground">{r.author}</p>
              {r.verifiedTraveler && (
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success ring-1 ring-success/20"
                  title="This reviewer confirmed they visited this destination"
                >
                  <ShieldCheck size={11} className="shrink-0" />
                  Verified Traveler
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <time dateTime={r.date} title={formatDate(r.date)}>{relativeTime(r.date)}</time>
              <span aria-hidden>·</span>
              <span>{formatDate(r.date)}</span>
            </div>
          </div>

          <Rating value={r.rating} size={14} />
        </div>

        {/* ── Review body ── */}
        <h4 className="mt-4 font-display text-sm font-semibold text-brand-600">{r.title}</h4>
        <p className={cn(
          "mt-1 text-sm leading-relaxed text-muted-foreground",
          compact && "line-clamp-3"
        )}>
          {r.body}
        </p>

        {/* ── Photos ── */}
        {!compact && photos.length > 0 && (
          <div className="mt-3">
            <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Camera size={11} /> {photos.length} photo{photos.length > 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className="group relative h-20 w-20 overflow-hidden rounded-xl border border-border transition hover:border-brand-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label={`View photo ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Review photo ${i + 1}`}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                  />
                  {i === 2 && photos.length > 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
                      +{photos.length - 3}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer: helpful vote ── */}
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
          <button
            onClick={handleVote}
            disabled={hasVoted || isPending}
            aria-label={hasVoted ? "You marked this as helpful" : "Mark as helpful"}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
              hasVoted
                ? "bg-secondary/10 text-secondary cursor-default"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <ThumbsUp
              size={13}
              className={cn("transition-transform", voteFlash && "scale-125", hasVoted && "fill-current")}
            />
            {hasVoted ? "Helpful" : "Helpful"}
            <span className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
              hasVoted ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
            )}>
              {helpfulCount}
            </span>
          </button>

          {photos.length > 0 && compact && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Camera size={11} /> {photos.length} photo{photos.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </article>

      {/* Lightbox portal */}
      {lightboxIdx !== null && (
        <PhotoLightbox
          photos={photos}
          idx={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
