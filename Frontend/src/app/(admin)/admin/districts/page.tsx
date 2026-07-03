import { getDistricts } from "@/services/content";
import { DistrictsAdmin } from "./districts-admin";
export default async function Page() {
  return <DistrictsAdmin districts={await getDistricts()} />;
}
