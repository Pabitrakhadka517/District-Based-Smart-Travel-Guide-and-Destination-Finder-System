import { treks } from "@/data/treks";
import { ok } from "@/lib/api";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured");
  const difficulty = searchParams.get("difficulty");
  let result = treks;
  if (featured) result = result.filter((t) => t.featured);
  if (difficulty) result = result.filter((t) => t.difficulty === difficulty);
  return ok(result);
}
