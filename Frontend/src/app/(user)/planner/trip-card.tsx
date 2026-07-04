"use client";
import {
  CalendarDays, Users, MapPin, Wallet,
  CheckSquare, ChevronRight, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TripPlan } from "@/types";
import { TRAVEL_TYPE_CONFIG, STATUS_STYLE, fmtDay } from "./planner-utils";

interface Props {
  plan: TripPlan;
  onOpen: (plan: TripPlan) => void;
}

function daysUntil(startDate: string | undefined): number | null {
  if (!startDate) return null;
  return Math.ceil(
    (new Date(startDate + "T00:00:00").getTime() - Date.now()) / 86_400_000
  );
}

function countdownLabel(days: number | null): string | null {
  if (days === null || days < 0) return null;
  if (days === 0) return "Starts today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}

export function TripCard({ plan, onOpen }: Props) {
  const cfg    = TRAVEL_TYPE_CONFIG[plan.travelType] ?? TRAVEL_TYPE_CONFIG.Adventure;
  const status = STATUS_STYLE[plan.status]           ?? STATUS_STYLE.planned;
  const Icon   = cfg.icon;

  const totalItems = plan.checklist?.length ?? 0;
  const doneItems  = plan.checklist?.filter((i) => i.completed).length ?? 0;
  const progress   = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  const dateLabel =
    plan.startDate && plan.endDate
      ? `${fmtDay(plan.startDate)} → ${fmtDay(plan.endDate)}`
      : plan.startDate
        ? `From ${fmtDay(plan.startDate)}`
        : "Dates TBD";

  const tripLength =
    plan.startDate && plan.endDate
      ? Math.max(0, Math.round(
          (new Date(plan.endDate).getTime() - new Date(plan.startDate).getTime()) / 86_400_000
        ) + 1)
      : 0;

  const until    = daysUntil(plan.startDate);
  const countdown = countdownLabel(until);

  const isUrgent = until !== null && until >= 0 && until <= 3;
  const isSoon   = until !== null && until >= 0 && until <= 14;

  return (
    <button
      onClick={() => onOpen(plan)}
      className="group w-full text-left rounded-3xl border border-border bg-white shadow-soft hover:shadow-card transition-all duration-200 overflow-hidden"
    >
      {/* Travel-type colour banner */}
      <div className={cn("flex items-center gap-3 px-5 py-3.5", cfg.bg, cfg.border, "border-b")}>
        <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", cfg.bg, "shadow-sm")}>
          <Icon size={18} className={cfg.color} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-xs font-semibold uppercase tracking-wide", cfg.color)}>{cfg.label}</p>
          <p className="truncate font-display font-bold text-base text-foreground">{plan.title}</p>
        </div>
        <span className={cn("shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium", status.badge)}>
          {status.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        {/* Date + duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays size={14} className="shrink-0" />
          <span className="flex-1 truncate">{dateLabel}</span>
          {tripLength > 0 && (
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
              {tripLength}d
            </span>
          )}
        </div>

        {/* Countdown chip */}
        {countdown && (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                isUrgent
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : isSoon
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-border bg-muted text-muted-foreground"
              )}
            >
              <Clock size={10} />
              {countdown}
            </span>
          </div>
        )}

        {/* Travelers + destinations + budget */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {plan.travelers ?? 1} {plan.travelers === 1 ? "traveller" : "travellers"}
          </span>
          {plan.destinationIds.length > 0 && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {plan.destinationIds.length} {plan.destinationIds.length === 1 ? "destination" : "destinations"}
            </span>
          )}
          {plan.budget > 0 && (
            <span className="ml-auto flex items-center gap-0.5 font-medium text-foreground">
              <Wallet size={13} />
              {plan.budget.toLocaleString()}
            </span>
          )}
        </div>

        {/* Checklist progress */}
        {totalItems > 0 && (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckSquare size={11} /> Checklist
              </span>
              <span>{doneItems}/{totalItems}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full transition-all", progress === 100 ? "bg-success" : "bg-accent")}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-xs text-muted-foreground">
          {plan.itinerary?.length > 0
            ? `${plan.itinerary.length} day${plan.itinerary.length > 1 ? "s" : ""} planned`
            : "Start planning →"}
        </span>
        <ChevronRight
          size={16}
          className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-brand-600"
        />
      </div>
    </button>
  );
}
