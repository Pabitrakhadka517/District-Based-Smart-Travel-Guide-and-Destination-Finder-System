"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  /** Unions in ids from the server without dropping anything saved locally (e.g. offline/pre-sync). */
  merge: (serverIds: string[]) => void;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id]
        })),
      has: (id) => get().ids.includes(id),
      merge: (serverIds) =>
        set((s) => ({ ids: Array.from(new Set([...s.ids, ...serverIds])) })),
      clear: () => set({ ids: [] })
    }),
    {
      name: "nepayatra-wishlist",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
