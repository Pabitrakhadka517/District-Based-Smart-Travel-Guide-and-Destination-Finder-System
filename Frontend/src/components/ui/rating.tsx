import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <span
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of 5 stars`}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {/* Stars are presentational — the aria-label above conveys the meaning */}
      <span className="inline-flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= rounded ? "fill-accent text-accent" : "fill-muted text-muted"}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-sm font-medium text-foreground" aria-hidden="true">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}
