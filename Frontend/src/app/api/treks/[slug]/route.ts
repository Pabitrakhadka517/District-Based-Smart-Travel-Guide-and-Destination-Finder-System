import { treks } from "@/data/treks";
import { ok, notFound } from "@/lib/api";
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = treks.find((t) => t.slug === slug);
  if (!trek) return notFound("Trek not found");
  return ok(trek);
}
