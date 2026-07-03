import Link from "next/link";
import { CheckCircle2, Clock, Route, Star, CalendarDays } from "lucide-react";
import type { ActivityEvent } from "@/types";
import { formatDate } from "@/lib/utils";

const EVENT_CONFIG: Record<
  ActivityEvent["type"],
  { label: (e: ActivityEvent) => string; icon: React.ElementType; dot: string }
> = {
  trip_planned: {
    icon: Route,
    dot: "bg-secondary/15 text-secondary border-secondary/30",
    label: (e) =>
      `Planned trip "${e.tripTitle}"${e.destinationCount ? ` · ${e.destinationCount} stop${e.destinationCount !== 1 ? "s" : ""}` : ""}`,
  },
  trip_ongoing: {
    icon: Clock,
    dot: "bg-accent/15 text-accent border-accent/30",
    label: (e) =>
      `Ongoing trip "${e.tripTitle}"${e.destinationCount ? ` · ${e.destinationCount} stop${e.destinationCount !== 1 ? "s" : ""}` : ""}`,
  },
  trip_completed: {
    icon: CheckCircle2,
    dot: "bg-success/15 text-success border-success/30",
    label: (e) =>
      `Completed trip "${e.tripTitle}"${e.destinationCount ? ` · ${e.destinationCount} stop${e.destinationCount !== 1 ? "s" : ""}` : ""}`,
  },
  review_written: {
    icon: Star,
    dot: "bg-brand-50 text-brand-600 border-brand-200",
    label: (e) =>
      `Reviewed ${e.destinationName}${e.rating ? ` · ${"★".repeat(e.rating)}` : ""}`,
  },
};

function TimelineItem({ event, last }: { event: ActivityEvent; last: boolean }) {
  const cfg = EVENT_CONFIG[event.type];
  const Icon = cfg.icon;
  const label = cfg.label(event);

  const inner = (
    <div className="flex items-start gap-4">
      <div className="relative flex flex-col items-center shrink-0">
        <span className={`grid h-9 w-9 place-items-center rounded-full border ${cfg.dot} z-10`}>
          <Icon size={15} />
        </span>
        {!last && (
          <span className="absolute top-9 left-1/2 -translate-x-1/2 h-full w-px bg-border" />
        )}
      </div>
      <div className="flex-1 pb-6 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug truncate">{label}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDays size={11} />
          {formatDate(event.date)}
        </p>
      </div>
    </div>
  );

  if (event.type === "review_written" && event.destinationSlug) {
    return (
      <Link href={`/destinations/${event.destinationSlug}`} className="block hover:opacity-80 transition-opacity">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function ActivityTimeline({ events, isLoading }: { events: ActivityEvent[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-1.5 pt-1">
              <div className="h-3.5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No activity yet. Plan a trip or write a review to get started.
      </p>
    );
  }

  return (
    <div>
      {events.map((event, i) => (
        <TimelineItem key={`${event.type}-${event.date}-${i}`} event={event} last={i === events.length - 1} />
      ))}
    </div>
  );
}
