"use client";
import { useRef } from "react";
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
  // Tracks ids with a request in flight so a rapid double-click can't fire an
  // add and a remove concurrently and leave the server in the wrong order-dependent state.
  const pending = useRef<Set<string>>(new Set());

  return (id: string) => {
    if (pending.current.has(id)) return;

    const wasSaved = has(id);
    toggle(id); // optimistic local update

    if (loggedIn) {
      pending.current.add(id);
      const onSettled = () => pending.current.delete(id);
      if (wasSaved) {
        remove.mutate(id, { onSettled });
      } else {
        add.mutate(id, { onSettled });
      }
    }
  };
}
