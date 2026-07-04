import { getPackingChecklists } from "@/services/content";
import { ChecklistsAdmin } from "./checklists-admin";
export default async function Page() {
  return <ChecklistsAdmin checklists={await getPackingChecklists()} />;
}
