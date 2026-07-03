import { apiGet } from "./api-client";
import type { Destination } from "@/types";

export const recommendationService = {
  getPersonalized: (viewedIds: string[]) =>
    apiGet<Destination[]>(
      `/recommendations${viewedIds.length ? `?viewed=${viewedIds.join(",")}` : ""}`,
      true
    ),
  getSimilar: (slug: string) =>
    apiGet<Destination[]>(`/recommendations/similar/${slug}`),
  getTrending: () =>
    apiGet<Destination[]>("/recommendations/trending"),
};
