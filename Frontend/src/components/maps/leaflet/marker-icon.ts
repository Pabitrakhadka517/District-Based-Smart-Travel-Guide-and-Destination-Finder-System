import L from "leaflet";
import type { MapKind } from "@/lib/map-entry-helpers";
import { BRAND } from "@/lib/theme-colors";
import { MARKER_COLORS } from "@/lib/marker-colors";

const iconCache = new Map<string, L.DivIcon>();

/**
 * Teardrop pin divIcon, color-coded by kind. Deliberately kind-only (no selected/active
 * variant): changing a Marker's `icon` prop makes react-leaflet call `setIcon()`, which
 * resets the marker's internals and closes any popup that was just opened by the same
 * click — so the icon must stay stable across selection changes.
 */
export function buildDivIcon(kind: MapKind): L.DivIcon {
  const cached = iconCache.get(kind);
  if (cached) return cached;

  const color = MARKER_COLORS[kind];
  const size = 32;
  const html = `
    <div style="position:relative;width:${size}px;height:${size * 1.35}px;">
      <svg width="${size}" height="${size * 1.35}" viewBox="0 0 32 44" style="filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35));">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 28 16 28s16-17 16-28c0-8.837-7.163-16-16-16z" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    </div>`;

  const icon = L.divIcon({
    html,
    className: "",
    iconSize: [size, size * 1.35],
    iconAnchor: [size / 2, size * 1.35],
    popupAnchor: [0, -size * 1.2],
  });
  iconCache.set(kind, icon);
  return icon;
}

/** Brand-blue circular cluster bubble with a count label, glassmorphic ring. */
export function buildClusterIcon(cluster: { getChildCount: () => number }): L.DivIcon {
  const count = cluster.getChildCount();
  const size = count < 10 ? 40 : count < 50 ? 48 : 56;
  const html = `
    <div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;border-radius:9999px;
      background:${BRAND};color:#fff;font-weight:700;font-size:${count < 100 ? 13 : 11}px;
      box-shadow:0 0 0 4px rgba(255,255,255,0.85),0 6px 16px -2px rgba(27,79,114,0.45);
      border:2px solid rgba(255,255,255,0.9);
    ">${count}</div>`;

  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
