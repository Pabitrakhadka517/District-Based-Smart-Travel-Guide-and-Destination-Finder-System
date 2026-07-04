"use client";

import { useQuery } from "@tanstack/react-query";
import { GeoJSON } from "react-leaflet";
import type { Layer, PathOptions } from "leaflet";
import type { Feature, Geometry } from "geojson";
import { BRAND, SECONDARY } from "@/lib/theme-colors";

interface ProvinceGeoJson {
  type: "FeatureCollection";
  features: Array<Feature<Geometry, { name: string }>>;
}

const DEFAULT_STYLE: PathOptions = {
  color: BRAND,
  weight: 1,
  opacity: 0.4,
  fillColor: SECONDARY,
  fillOpacity: 0.03,
};

const HOVER_STYLE: PathOptions = {
  color: BRAND,
  weight: 2,
  opacity: 0.8,
  fillColor: SECONDARY,
  fillOpacity: 0.18,
};

/** Subtle province boundary overlay — hover highlights a province and shows its name + destination count. */
export function ProvinceLayer({ provinceCounts }: { provinceCounts: Record<string, number> }) {
  const { data } = useQuery({
    queryKey: ["province-geojson"],
    queryFn: () => fetch("/data/nepal-provinces.geojson").then((r) => r.json() as Promise<ProvinceGeoJson>),
    staleTime: Infinity,
  });

  if (!data) return null;

  return (
    <GeoJSON
      data={data}
      style={() => DEFAULT_STYLE}
      onEachFeature={(feature: Feature<Geometry, { name: string }>, layer: Layer) => {
        const name = feature.properties?.name ?? "Nepal";
        const count = provinceCounts[name] ?? 0;
        layer.bindTooltip(`<strong>${name}</strong><br/>${count} destination${count === 1 ? "" : "s"}`, {
          sticky: true,
          className: "!rounded-lg !border-0 !bg-brand-700 !px-2.5 !py-1.5 !text-xs !text-white !shadow-lg",
        });
        layer.on({
          mouseover: (e) => e.target.setStyle(HOVER_STYLE),
          mouseout: (e) => e.target.setStyle(DEFAULT_STYLE),
        });
      }}
    />
  );
}
