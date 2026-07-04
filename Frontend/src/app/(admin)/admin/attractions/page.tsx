import { getAttractions } from "@/services/content";
import { AttractionsAdmin } from "./attractions-admin";
export default async function Page() {
  return <AttractionsAdmin attractions={await getAttractions()} />;
}
