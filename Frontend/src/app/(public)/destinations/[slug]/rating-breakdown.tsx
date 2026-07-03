import { Star } from "lucide-react";
import type { RatingBreakdown } from "@/types";

interface Props {
  breakdown: RatingBreakdown[];
  totalReviews: number;
}

export function RatingBreakdownChart({ breakdown, totalReviews }: Props) {
  if (totalReviews === 0) return null;

  const normalized = [5, 4, 3, 2, 1].map(
    (star) => breakdown.find((b) => b.star === star) ?? { star, count: 0, pct: 0 }
  );

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <h3 className="mb-4 font-display font-semibold text-foreground flex items-center gap-2">
        <Star size={16} className="text-accent fill-accent" />
        Rating Breakdown
      </h3>
      <div className="space-y-2">
        {normalized.map(({ star, count, pct }) => (
          <div key={star} className="flex items-center gap-3">
            <span className="w-3 text-xs text-muted-foreground text-right">{star}</span>
            <Star size={11} className="text-accent fill-accent shrink-0" />
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-xs text-muted-foreground text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
