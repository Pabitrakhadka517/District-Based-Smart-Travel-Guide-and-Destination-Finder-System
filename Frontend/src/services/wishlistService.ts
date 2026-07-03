import { apiGet, apiPost, apiDelete } from "./api-client";
import type { Destination } from "@/types";

export interface WishlistData {
  ids: string[];
  destinations: Destination[];
}

export const wishlistService = {
  get: () =>
    apiGet<WishlistData>("/wishlist", true),

  add: (destinationId: string) =>
    apiPost("/wishlist", { destinationId }, true),

  remove: (destinationId: string) =>
    apiDelete(`/wishlist/${destinationId}`),
};
