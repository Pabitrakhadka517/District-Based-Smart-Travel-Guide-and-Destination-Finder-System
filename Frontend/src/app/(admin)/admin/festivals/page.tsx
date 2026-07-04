import { getFestivals } from "@/services/content";
import { FestivalsAdmin } from "./festivals-admin";
export default async function Page() {
  return <FestivalsAdmin festivals={await getFestivals()} />;
}
