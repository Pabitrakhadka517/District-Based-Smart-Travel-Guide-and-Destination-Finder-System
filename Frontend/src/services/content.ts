import type { District, Destination, Review, Trek, Festival, GuideArticle, TouristAttraction, RatingBreakdown } from "@/types";

export interface PlatformStats {
  destinations: number;
  districts: number;
  reviews: number;
  users: number;
  avgRating: number;
}

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

async function get<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`${res.status}`);
    const json = await res.json();
    return json.data as T;
  } catch {
    return ([] as unknown) as T;
  }
}

export const getDistricts = () => get<District[]>("/districts");
export const getDistrict = async (slug: string): Promise<District | null> => {
  try {
    const res = await fetch(`${API}/districts/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    // Backend returns { district, cities } — extract just the district
    return (json.data?.district as District) ?? null;
  } catch {
    return null;
  }
};

export const getDestinations = () => get<Destination[]>("/destinations");
export const getDestination = async (slug: string): Promise<Destination | null> => {
  try {
    const res = await fetch(`${API}/destinations/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    // Backend returns { destination, reviews, nearby } — extract just the destination
    return (json.data?.destination as Destination) ?? null;
  } catch {
    return null;
  }
};

export interface DestinationFull {
  destination: Destination;
  reviews: Review[];
  nearby: Destination[];
  ratingBreakdown: RatingBreakdown[];
  similar: Destination[];
  nearbyAttractions: TouristAttraction[];
}

export const getDestinationFull = async (slug: string): Promise<DestinationFull | null> => {
  try {
    const res = await fetch(`${API}/destinations/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
};
export const getFeatured = () => get<Destination[]>("/destinations?featured=1");
export const getTrending = () => get<Destination[]>("/destinations?trending=1");
export const getNearby = (ids: string[]) => get<Destination[]>(`/destinations?ids=${ids.join(",")}`);

export const getReviews = (destinationId?: string) =>
  get<Review[]>(destinationId ? `/reviews?destination=${destinationId}` : "/reviews");

export const getTreks = () => get<Trek[]>("/treks");
export const getTrek = (slug: string) => get<Trek | null>(`/treks/${slug}`);
export const getFeaturedTreks = () => get<Trek[]>("/treks?featured=1");

export const getFestivals = () => get<Festival[]>("/festivals");

export const getGuides = () => get<GuideArticle[]>("/guides");
export const getGuide = (slug: string) => get<GuideArticle | null>(`/guides/${slug}`);
export const getFeaturedGuides = () => get<GuideArticle[]>("/guides?featured=1");

export const getStats = () => get<PlatformStats>("/stats");
export const getTopReviews = () => get<Review[]>("/reviews?status=approved");

export const getAttractions = (params = "") => get<TouristAttraction[]>(`/attractions${params}`);

export const getDistrictAttractions = (districtSlug: string) =>
  get<TouristAttraction[]>(`/districts/${districtSlug}/attractions`);

export const getAttraction = async (
  slug: string
): Promise<{ attraction: TouristAttraction; nearby: TouristAttraction[] } | null> => {
  try {
    const res = await fetch(`${API}/attractions/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
};
