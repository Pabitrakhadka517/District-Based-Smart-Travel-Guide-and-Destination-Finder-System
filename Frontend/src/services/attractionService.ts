import { apiGet } from "./api-client";
import type { TouristAttraction } from "@/types";

export interface AttractionResult {
  attraction: TouristAttraction;
  nearby: TouristAttraction[];
}

export const attractionService = {
  getAll: (params = "") =>
    apiGet<TouristAttraction[]>(`/attractions${params}`),

  getBySlug: (slug: string) =>
    apiGet<AttractionResult>(`/attractions/${slug}`),

  getFeatured: () =>
    apiGet<TouristAttraction[]>("/attractions?featured=1"),

  getTrending: () =>
    apiGet<TouristAttraction[]>("/attractions?trending=1"),
};
