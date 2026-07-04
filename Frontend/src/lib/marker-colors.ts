import type { MapKind } from "@/lib/map-entry-helpers";
import { ACCENT, SECONDARY, SUCCESS, PURPLE, TEAL } from "@/lib/theme-colors";

/** Raw hex per entity kind — mirrors `KIND_STYLE` in category-colors.ts. Kept dependency-free
 *  (no Leaflet import) so components that only need the color (e.g. the filter panel legend
 *  dots) don't pull in `leaflet`, which touches `window` at module-eval time and breaks SSR. */
export const MARKER_COLORS: Record<MapKind, string> = {
  destination: ACCENT,
  attraction: SECONDARY,
  trek: SUCCESS,
  festival: PURPLE,
  guide: TEAL,
};
