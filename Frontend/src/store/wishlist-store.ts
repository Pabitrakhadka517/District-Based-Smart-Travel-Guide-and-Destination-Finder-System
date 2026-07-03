"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  collections: Record<string, string[]>;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  addToCollection: (name: string, id: string) => void;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      collections: { Favourites: [], "Bucket List": [] },
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id]
        })),
      has: (id) => get().ids.includes(id),
      addToCollection: (name, id) =>
        set((s) => ({
          collections: {
            ...s.collections,
            [name]: Array.from(new Set([...(s.collections[name] ?? []), id]))
          }
        })),
      clear: () => set({ ids: [] })
    }),
    { name: "nepayatra-wishlist" }
  )
);
