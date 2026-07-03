import { reviews } from "@/data/reviews";
import { ok } from "@/lib/api";
import type { Review } from "@/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");
  const result = destination ? reviews.filter((r) => r.destinationId === destination) : reviews;
  return ok(result);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Review>;
  const created: Review = {
    id: `r${Date.now()}`,
    destinationId: body.destinationId ?? "",
    author: body.author ?? "Anonymous",
    avatar: body.avatar ?? "https://i.pravatar.cc/150?img=3",
    rating: body.rating ?? 5,
    title: body.title ?? "",
    body: body.body ?? "",
    date: new Date().toISOString().slice(0, 10),
    helpful: 0,
    status: "pending"
  };
  // In a real app this would persist to PostgreSQL.
  return ok(created, { status: 201 });
}
