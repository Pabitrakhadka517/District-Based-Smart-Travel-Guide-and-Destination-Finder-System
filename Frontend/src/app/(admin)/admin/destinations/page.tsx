import { getDestinations } from "@/services/content";
import { DestinationsAdmin } from "./destinations-admin";
export default async function Page() {
  return <DestinationsAdmin destinations={await getDestinations()} />;
}
