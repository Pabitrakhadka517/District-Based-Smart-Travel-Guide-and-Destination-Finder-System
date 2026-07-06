"use client";
import { Heart } from "lucide-react";
import { useWishlist } from "@/store/wishlist-store";
import { useToggleWishlist } from "@/hooks/use-toggle-wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({ id, className }: { id: string; className?: string }) {
  const activeInStore = useWishlist((s) => s.has(id));
  const hasHydrated = useWishlist((s) => s.hasHydrated);
  const toggleWishlist = useToggleWishlist();
  const active = hasHydrated && activeInStore;

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(id); }}
      aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={active}
      className={cn("grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur transition hover:scale-110", className)}
    >
      <Heart size={16} className={cn("transition", active ? "fill-accent text-accent" : "text-brand-600")} />
    </button>
  );
}
