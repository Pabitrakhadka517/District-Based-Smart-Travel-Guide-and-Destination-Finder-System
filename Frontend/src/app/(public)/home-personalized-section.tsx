"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePersonalizedRecommendations } from "@/hooks/use-content";
import { useAuth } from "@/store/auth-store";
import { DestinationCard } from "@/components/cards/destination-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";

function CardSkeleton() {
  return <div className="h-72 animate-pulse rounded-2xl bg-muted" />;
}

export function HomePersonalizedSection() {
  const { isLoggedIn } = useAuth();
  const { data: recommended = [], isLoading } = usePersonalizedRecommendations();

  if (!isLoggedIn()) return null;
  if (!isLoading && recommended.length === 0) return null;

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Just for you"
        title="Recommended for you"
        subtitle="Destinations scored from your wishlist, recently viewed places, and travel history."
        action={
          <Link href="/search">
            <Button variant="outline">Explore more <ArrowRight size={16} /></Button>
          </Link>
        }
      />
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.slice(0, 4).map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      )}
    </section>
  );
}
