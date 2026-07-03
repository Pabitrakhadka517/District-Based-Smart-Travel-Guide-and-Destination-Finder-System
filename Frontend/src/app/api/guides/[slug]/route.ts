import { guides } from "@/data/guides";
import { ok, notFound } from "@/lib/api";
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return notFound("Guide not found");
  return ok(guide);
}
