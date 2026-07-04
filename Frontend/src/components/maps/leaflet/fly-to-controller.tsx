"use client";

import { useEffect, type MutableRefObject } from "react";
import { useMap } from "react-leaflet";
import type { Marker as LeafletMarker } from "leaflet";

export interface FlyToTarget {
  id: string;
  lat: number;
  lng: number;
  zoom: number;
}

/**
 * Invisible map child. When `target` changes, flies the map to its coordinates and,
 * once the animation settles, opens the popup of the matching marker (looked up in
 * `markerRefs`) — this is what makes search-result selection "center + zoom + open popup".
 */
export function FlyToController({
  target,
  markerRefs,
}: {
  target: FlyToTarget | null;
  markerRefs: MutableRefObject<Map<string, LeafletMarker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;
    map.flyTo([target.lat, target.lng], target.zoom, { duration: 0.8 });

    const openPopup = () => {
      const marker = markerRefs.current.get(target.id);
      marker?.openPopup();
    };
    map.once("moveend", openPopup);
    return () => {
      map.off("moveend", openPopup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, map]);

  return null;
}
