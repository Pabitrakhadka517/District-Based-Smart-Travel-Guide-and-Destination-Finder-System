import { destinations } from "@/data/destinations";
import { reviews } from "@/data/reviews";
import { ok, notFound } from "@/lib/api";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return notFound("Destination not found");
  const destReviews = reviews.filter((r) => r.destinationId === destination.id && r.status === "approved");
  const nearby = destinations.filter((d) => destination.nearby.includes(d.id));
  return ok({ destination, reviews: destReviews, nearby });
}
