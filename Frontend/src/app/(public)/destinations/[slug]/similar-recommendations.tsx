"use client";
import { useSimilarDestinations } from "@/hooks/use-content";
import { RecommendationWidget } from "@/components/shared/recommendation-widget";

export function SimilarRecommendations({ slug }: { slug: string }) {
  const { data = [], isLoading } = useSimilarDestinations(slug);
  if (!isLoading && data.length === 0) return null;
  return (
    <RecommendationWidget
      title="You might also like"
      subtitle="Scored by category, tags, location, and difficulty."
      destinations={data}
      isLoading={isLoading}
      cols={4}
      limit={4}
    />
  );
}
