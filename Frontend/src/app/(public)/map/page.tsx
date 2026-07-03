import { MapExplorer } from "./map-explorer";
import {
  getDestinations,
  getAttractions,
  getTreks,
  getFestivals,
  getGuides,
} from "@/services/content";

export default async function MapPage() {
  const [destinations, attractions, treks, festivals, guides] = await Promise.all([
    getDestinations(),
    getAttractions(),
    getTreks(),
    getFestivals(),
    getGuides(),
  ]);

  return (
    <MapExplorer
      destinations={destinations}
      attractions={attractions}
      treks={treks}
      festivals={festivals}
      guides={guides}
    />
  );
}
