import { MapWidget } from "./map-widget";
import type { Coordinates } from "@/types";

export function MiniMap({ name, coordinates }: { name: string; coordinates: Coordinates }) {
  return <MapWidget height="h-56" markers={[{ id: "self", name, lat: coordinates.lat, lng: coordinates.lng, type: "destination" }]} />;
}
