"use client";
import { useWishlist } from "@/store/wishlist-store";
import { useAuth } from "@/store/auth-store";
import { useAddToWishlist, useRemoveFromWishlist } from "@/hooks/use-content";

/**
 * Unified wishlist toggle: updates local Zustand store instantly (optimistic)
 * AND syncs to the backend API when the user is logged in.
 */
export function useToggleWishlist() {
  const { toggle, has } = useWishlist();
  const loggedIn = useAuth((s) => !!s.token);
  const add = useAddToWishlist();
  const remove = useRemoveFromWishlist();

  return (id: string) => {
    const wasSaved = has(id);
    toggle(id); // optimistic local update
    if (loggedIn) {
      if (wasSaved) {
        remove.mutate(id);
      } else {
        add.mutate(id);
      }
    }
  };
}
