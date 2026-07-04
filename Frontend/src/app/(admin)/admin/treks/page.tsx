import { getTreks } from "@/services/content";
import { TreksAdmin } from "./treks-admin";
export default async function Page() {
  return <TreksAdmin treks={await getTreks()} />;
}
