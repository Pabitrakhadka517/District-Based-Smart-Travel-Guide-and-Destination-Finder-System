import type { Metadata } from "next";
import { getReviews } from "@/services/content";
import { ReviewsClient } from "./reviews-client";

export const metadata: Metadata = { title: "Reviews", description: "Traveller reviews of Nepal's destinations." };

export default async function ReviewsPage() {
  return <ReviewsClient reviews={(await getReviews()).filter((r) => r.status === "approved")} />;
}
