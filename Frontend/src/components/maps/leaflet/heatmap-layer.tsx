"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { BRAND, SECONDARY, ACCENT, CRIMSON } from "@/lib/theme-colors";

export interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number; // normalized 0..1
}

/** Imperative leaflet.heat layer, added/removed as `visible` toggles. */
export function HeatmapLayer({ points, visible }: { points: HeatPoint[]; visible: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (!visible || points.length === 0) return;

    const heat = (L as unknown as {
      heatLayer: (
        points: Array<[number, number, number]>,
        options: Record<string, unknown>
      ) => L.Layer;
    }).heatLayer(
      points.map((p) => [p.lat, p.lng, p.intensity]),
      {
        radius: 32,
        blur: 18,
        maxZoom: 12,
        max: 0.7,
        minOpacity: 0.35,
        gradient: { 0.15: SECONDARY, 0.4: BRAND, 0.7: ACCENT, 1.0: CRIMSON },
      }
    );

    heat.addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points, visible]);

  return null;
}
