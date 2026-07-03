import { districts } from "@/data/districts";
import { ok, notFound } from "@/lib/api";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const district = districts.find((d) => d.slug === slug);
  if (!district) return notFound("District not found");
  return ok({ district, cities: [] });
}
