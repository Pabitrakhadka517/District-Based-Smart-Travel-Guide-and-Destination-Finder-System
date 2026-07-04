"use client";
import { useState } from "react";
import { Wallet, Bed, UtensilsCrossed, Bus, Ticket, MoreHorizontal, Users, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { EXPENSE_CATEGORY_STYLE } from "@/lib/category-colors";
import type { BudgetBreakdown } from "@/types";

interface Props {
  budget: number;
  breakdown: BudgetBreakdown;
  travelers?: number;
  tripDays?: number;
  onBudgetChange: (budget: number) => void;
  onBreakdownChange: (breakdown: BudgetBreakdown) => void;
}

const CATEGORIES: {
  key: keyof BudgetBreakdown;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bar: string;
}[] = [
  { key: "accommodation", label: "Accommodation", icon: Bed,             color: EXPENSE_CATEGORY_STYLE.accommodation.text, bar: EXPENSE_CATEGORY_STYLE.accommodation.bar },
  { key: "food",          label: "Food & Dining", icon: UtensilsCrossed, color: EXPENSE_CATEGORY_STYLE.food.text,           bar: EXPENSE_CATEGORY_STYLE.food.bar           },
  { key: "transportation",label: "Transportation", icon: Bus,            color: EXPENSE_CATEGORY_STYLE.transportation.text, bar: EXPENSE_CATEGORY_STYLE.transportation.bar },
  { key: "activities",    label: "Activities",    icon: Ticket,          color: EXPENSE_CATEGORY_STYLE.activities.text,     bar: EXPENSE_CATEGORY_STYLE.activities.bar     },
  { key: "other",         label: "Other",         icon: MoreHorizontal,  color: EXPENSE_CATEGORY_STYLE.other.text,          bar: EXPENSE_CATEGORY_STYLE.other.bar          },
];

function fmt(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export function BudgetPlanner({ budget, breakdown, travelers = 1, tripDays = 1, onBudgetChange, onBreakdownChange }: Props) {
  const [rawBudget, setRawBudget] = useState(String(budget));

  const spent     = Object.values(breakdown).reduce((s, v) => s + (v ?? 0), 0);
  const remaining = budget - spent;

  const perPerson = travelers > 1 ? Math.round(budget / travelers) : null;
  const perDay    = tripDays > 1  ? Math.round(budget / tripDays)  : null;

  const updateCategory = (key: keyof BudgetBreakdown, value: number) =>
    onBreakdownChange({ ...breakdown, [key]: Math.max(0, value) });

  const commitBudget = () => {
    const val = Number(rawBudget.replace(/,/g, ""));
    if (!isNaN(val) && val > 0) onBudgetChange(val);
    else setRawBudget(String(budget));
  };

  return (
    <div className="space-y-5">
      {/* Total budget + quick stats */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
        <p className="mb-3 text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Wallet size={15} className="text-accent" /> Total budget
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-accent">NPR</span>
            <Input
              value={rawBudget}
              onChange={(e) => setRawBudget(e.target.value)}
              onBlur={commitBudget}
              onKeyDown={(e) => e.key === "Enter" && commitBudget()}
              className="text-xl font-bold w-40"
            />
            <span className="text-sm text-muted-foreground">NPR total</span>
          </div>

          {/* Per-person / per-day quick stats */}
          {(perPerson !== null || perDay !== null) && (
            <div className="flex items-center gap-3 ml-auto">
              {perPerson !== null && (
                <div className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-sm">
                  <Users size={13} className="text-muted-foreground" />
                  <span className="font-semibold text-foreground">NPR {fmt(perPerson)}</span>
                  <span className="text-xs text-muted-foreground">/ person</span>
                </div>
              )}
              {perDay !== null && (
                <div className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-sm">
                  <CalendarDays size={13} className="text-muted-foreground" />
                  <span className="font-semibold text-foreground">NPR {fmt(perDay)}</span>
                  <span className="text-xs text-muted-foreground">/ day</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stacked bar */}
      <div className="rounded-2xl border border-border bg-white p-5 shadow-soft space-y-3">
        <p className="text-sm font-semibold text-foreground">Budget allocation</p>
        <div className="flex h-4 overflow-hidden rounded-full">
          {CATEGORIES.map(({ key, bar }) => {
            const pct = budget > 0 ? ((breakdown[key] ?? 0) / budget) * 100 : 0;
            return (
              <div
                key={key}
                className={cn("transition-all duration-300", bar)}
                style={{ width: `${Math.min(pct, 100)}%` }}
                title={`${key}: NPR ${fmt(breakdown[key] ?? 0)}`}
              />
            );
          })}
          {remaining > 0 && budget > 0 && (
            <div
              className="bg-muted"
              style={{ width: `${(remaining / budget) * 100}%` }}
              title={`Unallocated: NPR ${fmt(remaining)}`}
            />
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {CATEGORIES.map(({ key, label, bar }) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={cn("h-2.5 w-2.5 rounded-sm", bar)} />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-2.5 w-2.5 rounded-sm bg-muted" />
            Unallocated
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-2.5 text-sm">
          <span className="text-muted-foreground">Allocated</span>
          <span className="font-semibold text-foreground">NPR {fmt(spent)}</span>
          <span className="text-muted-foreground">Remaining</span>
          <span className={cn("font-semibold", remaining < 0 ? "text-destructive" : "text-success")}>
            {remaining < 0 ? "-" : ""}NPR {fmt(Math.abs(remaining))}
          </span>
        </div>
      </div>

      {/* Category inputs */}
      <div className="rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
        <div className="divide-y divide-border">
          {CATEGORIES.map(({ key, label, icon: Icon, color, bar }) => {
            const val = breakdown[key] ?? 0;
            const pct = budget > 0 ? ((val / budget) * 100).toFixed(1) : "0.0";
            const ppVal = travelers > 1 ? Math.round(val / travelers) : null;
            return (
              <div key={key} className="flex items-center gap-4 px-5 py-4">
                <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted", color)}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {ppVal !== null && (
                        <span className="hidden sm:block">NPR {fmt(ppVal)}/pp</span>
                      )}
                      <span>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full transition-all", bar)}
                      style={{ width: `${Math.min(Number(pct), 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-sm text-muted-foreground">NPR</span>
                  <input
                    type="number"
                    min={0}
                    value={val === 0 ? "" : val}
                    onChange={(e) => updateCategory(key, Number(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24 rounded-xl border border-border bg-white px-2 py-1.5 text-sm font-medium text-right outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {remaining < 0 && (
        <Alert variant="error">
          You are <strong>NPR {fmt(Math.abs(remaining))}</strong> over budget. Reduce category allocations or increase your total budget.
        </Alert>
      )}
    </div>
  );
}
