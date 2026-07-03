import { destinations } from "@/data/destinations";
import { ok } from "@/lib/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured");
  const trending = searchParams.get("trending");
  const city = searchParams.get("city");
  const category = searchParams.get("category");

  let result = destinations;
  if (featured) result = result.filter((d) => d.featured);
  if (trending) result = result.filter((d) => d.trending);
  if (city) result = result.filter((d) => d.cityId === city);
  if (category) result = result.filter((d) => d.category === category);
  return ok(result);
}
