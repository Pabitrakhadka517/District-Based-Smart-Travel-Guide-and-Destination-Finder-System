import { districts } from "@/data/districts";
import { ok } from "@/lib/api";

export async function GET() {
  return ok(districts);
}
