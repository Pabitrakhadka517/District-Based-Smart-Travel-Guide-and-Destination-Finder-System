import { apiGet } from "./api-client";
import type { Destination, District, TouristAttraction, Trek, Festival, GuideArticle } from "@/types";

export interface SearchResult {
  destinations: Destination[];
  attractions?: TouristAttraction[];
  districts?: District[];
  treks?: Trek[];
  festivals?: Festival[];
  guides?: GuideArticle[];
  total: number;
}

export const searchService = {
  search: (queryString: string) =>
    apiGet<SearchResult>(`/search?${queryString}`),
};
