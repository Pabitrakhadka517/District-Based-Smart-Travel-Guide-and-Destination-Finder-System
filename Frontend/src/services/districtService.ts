import { apiGet } from "./api-client";
import type { District, TouristAttraction } from "@/types";

export const districtService = {
  getAll: () =>
    apiGet<District[]>("/districts"),

  getAttractions: (slug: string, category?: string) => {
    const q = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiGet<TouristAttraction[]>(`/districts/${slug}/attractions${q}`);
  },
};
