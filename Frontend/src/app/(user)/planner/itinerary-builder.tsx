"use client";
import { useState } from "react";
import {
  Plus, Trash2, ChevronDown, ChevronUp,
  Clock, MapPin, Pencil, ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { TripDay, TripActivity, TripPlan } from "@/types";
import { dateRange, fmtDay, nanoid } from "./planner-utils";

interface Props {
  plan: TripPlan;
  onChange: (days: TripDay[]) => void;
}

const ACTIVITY_TYPES = [
  { value: "destination", label: "Destination", color: "text-brand-600 bg-brand-50"    },
  { value: "attraction",  label: "Attraction",  color: "text-secondary bg-secondary/10"  },
  { value: "custom",      label: "Custom",      color: "text-muted-foreground bg-muted" },
] as const;

type ActivityType = (typeof ACTIVITY_TYPES)[number]["value"];

function buildDaysFromRange(plan: TripPlan): TripDay[] {
  if (plan.itinerary && plan.itinerary.length > 0) return plan.itinerary;
  const dates = dateRange(plan.startDate, plan.endDate);
  return dates.map((date, i) => ({
    id:         nanoid(),
    day:        i + 1,
    date,
    title:      `Day ${i + 1}`,
    activities: [],
  }));
}

export function ItineraryBuilder({ plan, onChange }: Props) {
  const [days, setDays]             = useState<TripDay[]>(() => buildDaysFromRange(plan));
  const [expanded, setExpanded]     = useState<Set<string>>(() => new Set(days.slice(0, 3).map((d) => d.id)));
  const [editingDay, setEditingDay] = useState<string | null>(null);

  const pushDays = (next: TripDay[]) => {
    setDays(next);
    onChange(next);
  };

  const allExpanded  = days.every((d) => expanded.has(d.id));
  const toggleAll    = () =>
    allExpanded
      ? setExpanded(new Set())
      : setExpanded(new Set(days.map((d) => d.id)));

  const toggleDay = (id: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const updateDayTitle = (id: string, title: string) =>
    pushDays(days.map((d) => (d.id === id ? { ...d, title } : d)));

  const addDay = () => {
    const last = days[days.length - 1];
    let date = "";
    if (last?.date) {
      const d = new Date(last.date + "T12:00:00");
      d.setDate(d.getDate() + 1);
      date = d.toISOString().slice(0, 10);
    }
    const next: TripDay = {
      id:         nanoid(),
      day:        (last?.day ?? 0) + 1,
      date,
      title:      `Day ${(last?.day ?? 0) + 1}`,
      activities: [],
    };
    pushDays([...days, next]);
    setExpanded((s) => new Set([...s, next.id]));
  };

  const removeDay = (id: string) =>
    pushDays(
      days.filter((d) => d.id !== id).map((d, i) => ({ ...d, day: i + 1 }))
    );

  const addActivity = (dayId: string) => {
    const act: TripActivity = {
      id:            nanoid(),
      time:          "",
      title:         "",
      type:          "custom",
      destinationId: "",
      notes:         "",
    };
    pushDays(days.map((d) => d.id === dayId ? { ...d, activities: [...d.activities, act] } : d));
    setExpanded((s) => new Set([...s, dayId]));
  };

  const updateActivity = (dayId: string, actId: string, patch: Partial<TripActivity>) =>
    pushDays(
      days.map((d) =>
        d.id === dayId
          ? { ...d, activities: d.activities.map((a) => (a.id === actId ? { ...a, ...patch } : a)) }
          : d
      )
    );

  const removeActivity = (dayId: string, actId: string) =>
    pushDays(
      days.map((d) =>
        d.id === dayId ? { ...d, activities: d.activities.filter((a) => a.id !== actId) } : d
      )
    );

  if (days.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <p className="mb-4 text-sm text-muted-foreground">
          No days yet. Set trip dates to auto-generate your itinerary, or add days manually.
        </p>
        <Button variant="outline" size="sm" onClick={addDay}>
          <Plus size={14} /> Add first day
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {days.length} {days.length === 1 ? "day" : "days"} ·{" "}
          {days.reduce((s, d) => s + d.activities.length, 0)} activities
        </p>
        <button
          onClick={toggleAll}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
        >
          <ChevronsUpDown size={13} />
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {days.map((day) => (
        <DayCard
          key={day.id}
          day={day}
          isExpanded={expanded.has(day.id)}
          isEditing={editingDay === day.id}
          onToggle={() => toggleDay(day.id)}
          onEditTitle={() => setEditingDay(editingDay === day.id ? null : day.id)}
          onTitleChange={(t) => updateDayTitle(day.id, t)}
          onAddActivity={() => addActivity(day.id)}
          onUpdateActivity={(aid, patch) => updateActivity(day.id, aid, patch)}
          onRemoveActivity={(aid) => removeActivity(day.id, aid)}
          onRemoveDay={() => removeDay(day.id)}
        />
      ))}

      <Button variant="outline" size="sm" onClick={addDay} className="w-full">
        <Plus size={14} /> Add day
      </Button>
    </div>
  );
}

/* ---- DayCard ---- */

interface DayCardProps {
  day: TripDay;
  isExpanded: boolean;
  isEditing: boolean;
  onToggle: () => void;
  onEditTitle: () => void;
  onTitleChange: (t: string) => void;
  onAddActivity: () => void;
  onUpdateActivity: (id: string, patch: Partial<TripActivity>) => void;
  onRemoveActivity: (id: string) => void;
  onRemoveDay: () => void;
}

function DayCard({
  day, isExpanded, isEditing,
  onToggle, onEditTitle, onTitleChange,
  onAddActivity, onUpdateActivity, onRemoveActivity, onRemoveDay,
}: DayCardProps) {
  const done  = day.activities.filter((a) => a.title.trim()).length;
  const total = day.activities.length;

  return (
    <div className="group/card rounded-2xl border border-border bg-white shadow-soft overflow-hidden">
      {/* Day header */}
      <div className="flex items-center gap-3 px-5 py-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xs font-bold text-brand-600">
          {day.day}
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              autoFocus
              value={day.title}
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={onEditTitle}
              onKeyDown={(e) => e.key === "Enter" && onEditTitle()}
              className="h-7 text-sm font-semibold"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground truncate">{day.title}</span>
              <button
                onClick={onEditTitle}
                className="text-muted-foreground hover:text-foreground transition opacity-0 group-hover/card:opacity-100"
              >
                <Pencil size={12} />
              </button>
            </div>
          )}
          {day.date && (
            <p className="text-xs text-muted-foreground">{fmtDay(day.date)}</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          {total > 0 && (
            <span className="text-xs text-muted-foreground">
              {done}/{total}
            </span>
          )}
          <button
            onClick={onRemoveDay}
            className="ml-1 rounded-lg p-1 text-muted-foreground opacity-0 group-hover/card:opacity-100 hover:text-destructive hover:bg-destructive/10 transition"
            title="Remove day"
          >
            <Trash2 size={13} />
          </button>
          <button
            onClick={onToggle}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted transition"
          >
            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Activities */}
      {isExpanded && (
        <div className="border-t border-border px-5 py-4 space-y-3">
          {day.activities.length === 0 && (
            <p className="text-sm text-muted-foreground">No activities yet — add one below.</p>
          )}
          {day.activities.map((act) => (
            <ActivityRow
              key={act.id}
              activity={act}
              onChange={(patch) => onUpdateActivity(act.id, patch)}
              onRemove={() => onRemoveActivity(act.id)}
            />
          ))}
          <Button variant="ghost" size="sm" onClick={onAddActivity} className="text-brand-600">
            <Plus size={13} /> Add activity
          </Button>
        </div>
      )}
    </div>
  );
}

/* ---- ActivityRow ---- */

interface ActivityRowProps {
  activity: TripActivity;
  onChange: (patch: Partial<TripActivity>) => void;
  onRemove: () => void;
}

function ActivityRow({ activity, onChange, onRemove }: ActivityRowProps) {
  const typeConfig = ACTIVITY_TYPES.find((t) => t.value === activity.type) ?? ACTIVITY_TYPES[2];

  return (
    <div className="group/row rounded-xl border border-border/60 bg-muted/20 p-3">
      {/* Title row */}
      <div className="flex items-center gap-2">
        <input
          value={activity.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Activity title…"
          className="flex-1 rounded-lg border-0 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
        />
        <select
          value={activity.type}
          onChange={(e) => onChange({ type: e.target.value as ActivityType })}
          className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium border-0 outline-none", typeConfig.color)}
        >
          {ACTIVITY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        <button
          onClick={onRemove}
          className="shrink-0 text-muted-foreground opacity-0 group-hover/row:opacity-100 hover:text-destructive transition"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Meta row: time + location + notes */}
      <div className="mt-2 flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 rounded-lg bg-white border border-border/60 px-2 py-1">
          <Clock size={11} className="shrink-0 text-muted-foreground" />
          <input
            type="time"
            value={activity.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="w-24 bg-transparent text-xs outline-none text-muted-foreground"
          />
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-lg bg-white border border-border/60 px-2 py-1 min-w-[120px]">
          <MapPin size={11} className="shrink-0 text-muted-foreground" />
          <input
            value={activity.location ?? ""}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Location…"
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/60 focus:ring-0"
          />
        </div>
        <input
          value={activity.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Notes…"
          className="flex-1 min-w-[120px] rounded-lg bg-white border border-border/60 px-2 py-1 text-xs text-muted-foreground outline-none placeholder:text-muted-foreground/60 focus:ring-0"
        />
      </div>
    </div>
  );
}
