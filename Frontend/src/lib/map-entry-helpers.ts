import type { Destination, TouristAttraction, Trek, Festival, GuideArticle, District } from "@/types";
import { getImageUrl } from "@/lib/cloudinary";

export type MapKind = "destination" | "attraction" | "trek" | "festival" | "guide";

export type MapEntry =
  | { kind: "destination"; data: Destination }
  | { kind: "attraction"; data: TouristAttraction }
  | { kind: "trek"; data: Trek }
  | { kind: "festival"; data: Festival }
  | { kind: "guide"; data: GuideArticle };

export function entryId(e: MapEntry): string {
  return (e.data as { id: string }).id;
}

export function entriesMatch(a: MapEntry | null, b: MapEntry): boolean {
  if (!a) return false;
  return a.kind === b.kind && entryId(a) === entryId(b);
}

export function entryCoordinates(e: MapEntry): { lat: number; lng: number } {
  return e.data.coordinates;
}

export function entryImage(e: MapEntry): string {
  if (e.kind === "destination") return getImageUrl(e.data.heroImage);
  if (e.kind === "attraction") return getImageUrl(e.data.heroImage);
  if (e.kind === "trek") return getImageUrl(e.data.heroImage);
  if (e.kind === "festival") return getImageUrl(e.data.image);
  return getImageUrl(e.data.cover);
}

export function entryName(e: MapEntry): string {
  return e.kind === "guide" ? e.data.title : e.data.name;
}

export function entryCategory(e: MapEntry): string {
  if (e.kind === "destination") return e.data.category;
  if (e.kind === "attraction") return e.data.category;
  if (e.kind === "trek") return e.data.difficulty;
  if (e.kind === "festival") return e.data.type;
  return e.data.category;
}

export function entryDescription(e: MapEntry): string {
  if (e.kind === "destination") return e.data.tagline;
  if (e.kind === "attraction") return e.data.tagline;
  if (e.kind === "trek") return e.data.tagline;
  if (e.kind === "festival") return e.data.description;
  return e.data.excerpt;
}

/** Rating is only meaningful for destinations/attractions/treks — Festival and Guide carry no rating field. */
export function entryRating(e: MapEntry): number | null {
  if (e.kind === "destination" || e.kind === "attraction") return e.data.rating;
  if (e.kind === "trek") return e.data.rating;
  return null;
}

/**
 * Resolves a human district/region label for every kind. Destination/Attraction resolve
 * via districtId against the districts list; Trek falls back to its own `.region` string;
 * Festival to `.where`; Guide has no location field at all in the data model, so it falls
 * back to a fixed "Nepal" label rather than fabricating one.
 */
export function entryDistrictName(e: MapEntry, districtsById: Map<string, District>): string {
  if (e.kind === "destination" || e.kind === "attraction") {
    return districtsById.get(e.data.districtId)?.name ?? "Nepal";
  }
  if (e.kind === "trek") return e.data.region;
  if (e.kind === "festival") return e.data.where;
  return "Nepal";
}

/**
 * Detail-page link for a given entry. Festivals have no detail route in this app,
 * so callers must check for `null` and omit the "View Details" action in that case.
 */
export function entryHref(e: MapEntry): string | null {
  if (e.kind === "destination") return `/destinations/${e.data.slug}`;
  if (e.kind === "attraction") return `/attractions/${e.data.slug}`;
  if (e.kind === "trek") return `/treks/${e.data.slug}`;
  if (e.kind === "guide") return `/guides/${e.data.slug}`;
  return null;
}
