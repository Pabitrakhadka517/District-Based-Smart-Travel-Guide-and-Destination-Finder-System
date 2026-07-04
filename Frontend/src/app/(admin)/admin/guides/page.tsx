import { getGuides } from "@/services/content";
import { GuidesAdmin } from "./guides-admin";
export default async function Page() {
  return <GuidesAdmin guides={await getGuides()} />;
}
