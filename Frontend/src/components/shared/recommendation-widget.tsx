import Link from "next/link";
import { Compass } from "lucide-react";
import type { Destination } from "@/types";
import { DestinationCard } from "@/components/cards/destination-card";
import { CardSkeleton } from "@/components/shared/skeletons";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

interface RecommendationWidgetProps {
  title: string;
  subtitle?: string;
  destinations: Destination[];
  isLoading: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  cols?: 3 | 4;
  limit?: number;
  viewAllHref?: string;
}

export function RecommendationWidget({
  title,
  subtitle,
  destinations,
  isLoading,
  emptyTitle,
  emptyDescription,
  cols = 3,
  limit = 12,
  viewAllHref,
}: RecommendationWidgetProps) {
  const items = destinations.slice(0, limit);
  const gridCls =
    cols === 4
      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="h3 text-brand-600">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link href={viewAllHref}>
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className={gridCls}>
          {Array.from({ length: cols }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : items.length === 0 && emptyTitle ? (
        <EmptyState
          icon={Compass}
          title={emptyTitle}
          description={emptyDescription}
          action={viewAllHref ? { label: "Discover destinations", href: viewAllHref } : undefined}
        />
      ) : items.length > 0 ? (
        <div className={gridCls}>
          {items.map((d) => <DestinationCard key={d.id} destination={d} />)}
        </div>
      ) : null}
    </div>
  );
}
