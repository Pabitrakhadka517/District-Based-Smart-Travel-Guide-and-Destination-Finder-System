"use client";
import { useState } from "react";
import { Heart, Share2, CalendarPlus, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/store/wishlist-store";
import { useToggleWishlist } from "@/hooks/use-toggle-wishlist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  /** When true, buttons are styled for a dark/hero background */
  dark?: boolean;
}

export function GuideActions({ id, dark = false }: Props) {
  const savedInStore  = useWishlist((s) => s.has(id));
  const hasHydrated   = useWishlist((s) => s.hasHydrated);
  const toggleWishlist = useToggleWishlist();
  const [copied,  setCopied]    = useState(false);
  const saved = hasHydrated && savedInStore;

  const share = () => {
    if (typeof navigator === "undefined") return;
    if (navigator.share) {
      navigator.share({ title: "NepalYatra", url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const glassClass =
    "border border-white/30 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25";

  if (dark) {
    return (
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggleWishlist(id)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={cn(
            "flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition",
            saved
              ? "bg-accent text-accent-foreground"
              : glassClass,
          )}
        >
          <Heart size={15} className={cn(saved && "fill-current")} />
          {saved ? "Saved" : "Save"}
        </button>

        <button
          onClick={share}
          aria-label="Share destination"
          className={cn(
            "flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition",
            glassClass,
          )}
        >
          {copied ? <CheckCircle size={15} /> : <Share2 size={15} />}
          {copied ? "Copied!" : "Share"}
        </button>

        <Link
          href="/planner"
          className="flex items-center gap-2 rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105"
        >
          <CalendarPlus size={15} />
          Plan a trip
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() => toggleWishlist(id)}
        variant={saved ? "accent" : "outline"}
        aria-pressed={saved}
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      >
        <Heart size={16} className={cn(saved && "fill-current")} />
        {saved ? "Saved" : "Save"}
      </Button>

      <Button onClick={share} variant="outline" aria-label="Share destination">
        {copied ? <CheckCircle size={16} className="text-success" /> : <Share2 size={16} />}
        {copied ? "Copied!" : "Share"}
      </Button>

      <Link href="/planner">
        <Button variant="accent">
          <CalendarPlus size={16} /> Plan a trip
        </Button>
      </Link>
    </div>
  );
}
