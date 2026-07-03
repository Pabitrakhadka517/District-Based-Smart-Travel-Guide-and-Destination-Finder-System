"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, X, MapPin, Mountain, CalendarDays, BookOpen,
  ArrowLeft, Clock, Star, ChevronRight, Plus, Check,
  Footprints, Sparkles, Zap,
} from "lucide-react";
import type {
  Destination, TouristAttraction, Trek, Festival, GuideArticle, TripPlan,
} from "@/types";
import { MapWidget, type MapMarker } from "@/components/maps/map-widget";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { KIND_STYLE } from "@/lib/category-colors";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { usePlans, useUpdatePlan } from "@/hooks/use-content";
import { useAuth } from "@/store/auth-store";

/* ── Types ───────────────────────────────────────────────────────────────── */

type FilterKind = "all" | "destination" | "attraction" | "trek" | "festival" | "guide";

type MapEntry =
  | { kind: "destination"; data: Destination }
  | { kind: "attraction"; data: TouristAttraction }
  | { kind: "trek"; data: Trek }
  | { kind: "festival"; data: Festival }
  | { kind: "guide"; data: GuideArticle };

interface Props {
  destinations: Destination[];
  attractions: TouristAttraction[];
  treks: Trek[];
  festivals: Festival[];
  guides: GuideArticle[];
}

/* ── Filter config ───────────────────────────────────────────────────────── */

const FILTERS: { kind: FilterKind; label: string; icon: React.ReactNode }[] = [
  { kind: "all",         label: "All",          icon: <Sparkles size={13} /> },
  { kind: "destination", label: "Destinations",  icon: <MapPin size={13} /> },
  { kind: "attraction",  label: "Attractions",   icon: <Zap size={13} /> },
  { kind: "trek",        label: "Treks",         icon: <Footprints size={13} /> },
  { kind: "festival",    label: "Festivals",     icon: <CalendarDays size={13} /> },
  { kind: "guide",       label: "Guides",        icon: <BookOpen size={13} /> },
];

/* ── Add-to-Trip dropdown ─────────────────────────────────────────────────── */

function AddToTripDropdown({
  destinationId,
  onClose,
}: {
  destinationId: string;
  onClose: () => void;
}) {
  const { data: plans = [] } = usePlans();
  const updatePlan = useUpdatePlan();
  const { isLoggedIn } = useAuth();
  const [added, setAdded] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!isLoggedIn) {
    return (
      <div
        ref={ref}
        className="absolute right-0 top-full z-30 mt-2 w-60 rounded-xl border border-border bg-white p-4 shadow-xl"
      >
        <p className="text-sm text-muted-foreground">Sign in to add destinations to your trip planner.</p>
        <Link
          href="/auth/login"
          className="mt-3 block w-full rounded-lg bg-brand-600 py-2 text-center text-xs font-semibold text-white hover:bg-brand-700"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const activePlans = plans.filter((p) =>
    p.status === "draft" || p.status === "planned" || p.status === "ready"
  );

  async function addTo(plan: TripPlan) {
    if (added.has(plan.id)) return;
    if (plan.destinationIds.includes(destinationId)) {
      setAdded((s) => new Set([...s, plan.id]));
      return;
    }
    await updatePlan.mutateAsync({
      id: plan.id,
      destinationIds: [...plan.destinationIds, destinationId],
    });
    setAdded((s) => new Set([...s, plan.id]));
  }

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-30 mt-2 w-64 rounded-xl border border-border bg-white shadow-xl"
    >
      <p className="border-b border-border px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Add to trip
      </p>
      {activePlans.length === 0 ? (
        <div className="p-4 text-center">
          <p className="text-sm text-muted-foreground">No active trips.</p>
          <Link
            href="/planner"
            className="mt-2 block text-xs font-medium text-secondary hover:underline"
          >
            Create a trip →
          </Link>
        </div>
      ) : (
        <ul className="max-h-52 overflow-y-auto py-1">
          {activePlans.map((plan) => {
            const isAdded = added.has(plan.id) || plan.destinationIds.includes(destinationId);
            return (
              <li key={plan.id}>
                <button
                  onClick={() => addTo(plan)}
                  disabled={isAdded || updatePlan.isPending}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition hover:bg-muted",
                    isAdded && "text-success"
                  )}
                >
                  {isAdded ? (
                    <Check size={14} className="shrink-0 text-success" />
                  ) : (
                    <Plus size={14} className="shrink-0 text-muted-foreground" />
                  )}
                  <span className="flex-1 truncate font-medium">{plan.title}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {plan.status === "draft" ? "Draft" : plan.status === "planned" ? "Planning" : "Ready"}
                  </Badge>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="border-t border-border p-2">
        <Link
          href="/planner"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-secondary hover:bg-secondary/10"
        >
          <Plus size={12} />
          Create new trip
        </Link>
      </div>
    </div>
  );
}

/* ── Detail panel ────────────────────────────────────────────────────────── */

function DetailPanel({
  entry,
  onBack,
}: {
  entry: MapEntry;
  onBack: () => void;
}) {
  const [showAddTrip, setShowAddTrip] = useState(false);

  function getImage() {
    if (entry.kind === "destination") return entry.data.heroImage;
    if (entry.kind === "attraction") return entry.data.heroImage;
    if (entry.kind === "trek") return entry.data.heroImage;
    if (entry.kind === "festival") return entry.data.image;
    return entry.data.cover;
  }

  function getName() {
    if (entry.kind === "guide") return entry.data.title;
    return entry.data.name;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-1 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft size={13} />
        Back to list
      </button>

      {/* Hero image */}
      <div className="relative mt-2 h-44 w-full overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImage()}
          alt={getName()}
          className="h-full w-full object-cover"
        />
        {/* Wishlist button for destinations */}
        {entry.kind === "destination" && (
          <div className="absolute right-2 top-2">
            <WishlistButton id={entry.data.id} className="h-8 w-8 rounded-full bg-white/90 backdrop-blur shadow" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-base font-bold leading-tight text-foreground">
            {getName()}
          </h2>
          {(entry.kind === "destination" || entry.kind === "attraction") && (
            <div className="shrink-0">
              <Rating value={entry.data.rating} size={13} />
            </div>
          )}
        </div>

        {/* Category + type badges */}
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {entry.kind === "destination" && (
            <>
              <Badge variant="secondary">{entry.data.category}</Badge>
              {entry.data.trending && <Badge className="bg-accent/10 text-accent border-accent/20">Trending</Badge>}
            </>
          )}
          {entry.kind === "attraction" && (
            <Badge variant="secondary">{entry.data.category}</Badge>
          )}
          {entry.kind === "trek" && (
            <>
              <Badge variant="secondary">{entry.data.difficulty}</Badge>
              <Badge variant="outline">{entry.data.region}</Badge>
            </>
          )}
          {entry.kind === "festival" && (
            <>
              <Badge variant="secondary">{entry.data.type}</Badge>
              <Badge variant="outline">{entry.data.season}</Badge>
            </>
          )}
          {entry.kind === "guide" && (
            <Badge variant="secondary">{entry.data.category}</Badge>
          )}
        </div>

        {/* Type-specific info */}
        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          {entry.kind === "destination" && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {entry.data.tagline}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-accent text-accent" />
                  {entry.data.rating.toFixed(1)} ({entry.data.reviewCount} reviews)
                </span>
                {entry.data.recommendedDuration && (
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {entry.data.recommendedDuration}
                  </span>
                )}
              </div>
              {entry.data.budget && (
                <p className="flex items-center gap-1">
                  <span className="font-medium text-foreground">Budget from</span>
                  Rs {entry.data.budget.budget.toLocaleString()} / person
                </p>
              )}
              {entry.data.bestTimeToVisit?.length > 0 && (
                <p>Best time: {entry.data.bestTimeToVisit.join(", ")}</p>
              )}
            </>
          )}

          {entry.kind === "attraction" && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {entry.data.tagline}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span className="flex items-center gap-1">
                  <Star size={11} className="fill-accent text-accent" />
                  {entry.data.rating.toFixed(1)} ({entry.data.reviewCount} reviews)
                </span>
                {entry.data.openingHours && (
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {entry.data.openingHours}
                  </span>
                )}
              </div>
              {entry.data.entryFee && (
                <p>
                  Entry fee: Rs {entry.data.entryFee.nepali} (Nepali) ·{" "}
                  ${entry.data.entryFee.foreigner} (Foreigner)
                </p>
              )}
            </>
          )}

          {entry.kind === "trek" && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {entry.data.tagline}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span className="flex items-center gap-1">
                  <Footprints size={11} />
                  {entry.data.durationDays} days
                </span>
                <span className="flex items-center gap-1">
                  <Mountain size={11} />
                  {entry.data.maxAltitude.toLocaleString()} m
                </span>
                {entry.data.rating > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={11} className="fill-accent text-accent" />
                    {entry.data.rating.toFixed(1)}
                  </span>
                )}
              </div>
              {entry.data.priceFrom > 0 && (
                <p>From ${entry.data.priceFrom.toLocaleString()}</p>
              )}
            </>
          )}

          {entry.kind === "festival" && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {entry.data.description}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  {entry.data.month}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {entry.data.where}
                </span>
                <span>{entry.data.duration}</span>
              </div>
            </>
          )}

          {entry.kind === "guide" && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {entry.data.excerpt}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                <span className="flex items-center gap-1">
                  <BookOpen size={11} />
                  {entry.data.readMinutes} min read
                </span>
                <span>By {entry.data.author}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          {entry.kind === "destination" && (
            <>
              <div className="relative">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-1.5"
                  onClick={() => setShowAddTrip((v) => !v)}
                >
                  <Plus size={13} />
                  Add to Trip Planner
                </Button>
                {showAddTrip && (
                  <AddToTripDropdown
                    destinationId={entry.data.id}
                    onClose={() => setShowAddTrip(false)}
                  />
                )}
              </div>
              <Link href={`/destinations/${entry.data.slug}`}>
                <Button size="sm" className="w-full gap-1.5">
                  View Destination Guide
                  <ChevronRight size={13} />
                </Button>
              </Link>
            </>
          )}

          {entry.kind === "attraction" && (
            <Link href={`/attractions/${entry.data.slug}`}>
              <Button size="sm" className="w-full gap-1.5">
                View Attraction
                <ChevronRight size={13} />
              </Button>
            </Link>
          )}

          {entry.kind === "trek" && (
            <Link href={`/treks/${entry.data.slug}`}>
              <Button size="sm" className="w-full gap-1.5">
                View Trek Details
                <ChevronRight size={13} />
              </Button>
            </Link>
          )}

          {entry.kind === "guide" && (
            <Link href={`/guides/${entry.data.slug}`}>
              <Button size="sm" className="w-full gap-1.5">
                Read Guide
                <ChevronRight size={13} />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Item row ──────────────────────────────────────────────────────────────── */

function ItemRow({ entry, isSelected, onClick }: { entry: MapEntry; isSelected: boolean; onClick: () => void }) {
  function getImage() {
    if (entry.kind === "destination") return entry.data.heroImage;
    if (entry.kind === "attraction") return entry.data.heroImage;
    if (entry.kind === "trek") return entry.data.heroImage;
    if (entry.kind === "festival") return entry.data.image;
    return entry.data.cover;
  }
  function getName() {
    return entry.kind === "guide" ? entry.data.title : entry.data.name;
  }
  function getSub() {
    if (entry.kind === "destination") return entry.data.tagline;
    if (entry.kind === "attraction") return entry.data.category;
    if (entry.kind === "trek") return `${entry.data.durationDays}d · ${entry.data.region}`;
    if (entry.kind === "festival") return `${entry.data.month} · ${entry.data.where}`;
    return entry.data.category;
  }
  function getRating() {
    if (entry.kind === "destination" || entry.kind === "trek") return entry.data.rating;
    if (entry.kind === "attraction") return entry.data.rating;
    return null;
  }

  const rating = getRating();

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition hover:shadow-sm",
        isSelected
          ? "border-accent bg-accent/5 shadow-sm"
          : "border-border bg-white hover:border-accent/40"
      )}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImage()}
          alt={getName()}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{getName()}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{getSub()}</p>
        {rating !== null && (
          <div className="mt-1 flex items-center gap-1">
            <Star size={10} className="fill-accent text-accent" />
            <span className="text-[10px] font-medium text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <ChevronRight size={15} className="shrink-0 text-muted-foreground" />
    </button>
  );
}

/* ── Kind chip ────────────────────────────────────────────────────────────── */

function KindChip({ entry }: { entry: MapEntry }) {
  const labels: Record<FilterKind, string> = {
    destination: "Destination",
    attraction: "Attraction",
    trek: "Trek",
    festival: "Festival",
    guide: "Guide",
    all: "",
  };
  const colors: Record<FilterKind, string> = { ...KIND_STYLE, all: "" };
  return (
    <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", colors[entry.kind])}>
      {labels[entry.kind]}
    </span>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function entryId(e: MapEntry): string {
  return (e.data as { id: string }).id;
}

function entriesMatch(a: MapEntry | null, b: MapEntry): boolean {
  if (!a) return false;
  return a.kind === b.kind && entryId(a) === entryId(b);
}

/* ── Main explorer ──────────────────────────────────────────────────────────── */

export function MapExplorer({ destinations, attractions, treks, festivals, guides }: Props) {
  const [filter, setFilter] = useState<FilterKind>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MapEntry | null>(null);

  /* Build all entries */
  const allEntries = useMemo<MapEntry[]>(() => [
    ...destinations.map((d): MapEntry => ({ kind: "destination", data: d })),
    ...attractions.map((a): MapEntry => ({ kind: "attraction", data: a })),
    ...treks.map((t): MapEntry => ({ kind: "trek", data: t })),
    ...festivals.map((f): MapEntry => ({ kind: "festival", data: f })),
    ...guides.map((g): MapEntry => ({ kind: "guide", data: g })),
  ], [destinations, attractions, treks, festivals, guides]);

  /* Filtered list */
  const filteredEntries = useMemo(() => {
    const byKind = filter === "all" ? allEntries : allEntries.filter((e) => e.kind === filter);
    if (!search.trim()) return byKind;
    const q = search.toLowerCase();
    return byKind.filter((e) => {
      if (e.kind === "destination") return e.data.name.toLowerCase().includes(q) || e.data.tagline.toLowerCase().includes(q);
      if (e.kind === "attraction")  return e.data.name.toLowerCase().includes(q);
      if (e.kind === "trek")        return e.data.name.toLowerCase().includes(q) || e.data.region.toLowerCase().includes(q);
      if (e.kind === "festival")    return e.data.name.toLowerCase().includes(q) || e.data.where.toLowerCase().includes(q);
      if (e.kind === "guide")       return e.data.title.toLowerCase().includes(q) || e.data.category.toLowerCase().includes(q);
      return false;
    });
  }, [allEntries, filter, search]);

  /* Map markers — only destinations + attractions have coordinates */
  const markers = useMemo<MapMarker[]>(() => {
    const showDests = filter === "all" || filter === "destination";
    const showAttrs = filter === "all" || filter === "attraction";
    const out: MapMarker[] = [];
    if (showDests) {
      const dests = filter === "all" ? destinations : (filteredEntries.filter((e) => e.kind === "destination") as { kind: "destination"; data: Destination }[]).map((e) => e.data);
      dests.forEach((d) => out.push({ id: d.id, name: d.name, lat: d.coordinates.lat, lng: d.coordinates.lng, type: "destination" }));
    }
    if (showAttrs) {
      const attrs = filter === "all" ? attractions : (filteredEntries.filter((e) => e.kind === "attraction") as { kind: "attraction"; data: TouristAttraction }[]).map((e) => e.data);
      attrs.forEach((a) => out.push({ id: a.id, name: a.name, lat: a.coordinates.lat, lng: a.coordinates.lng, type: "attraction" }));
    }
    return out;
  }, [destinations, attractions, filter, filteredEntries]);

  /* Which entry is selected, by marker id */
  const selectedId = useMemo(() => {
    if (!selected) return null;
    if (selected.kind === "destination") return selected.data.id;
    if (selected.kind === "attraction") return selected.data.id;
    return null;
  }, [selected]);

  function handleMarkerSelect(m: MapMarker) {
    const entry = allEntries.find((e) => {
      if (e.kind === "destination") return e.data.id === m.id;
      if (e.kind === "attraction") return e.data.id === m.id;
      return false;
    });
    if (entry) setSelected(entry);
  }

  const totalCount = allEntries.length;
  const filteredCount = filteredEntries.length;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background">
      {/* ── Page header ── */}
      <div className="border-b border-border bg-white px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-2xl font-bold text-brand-600 sm:text-3xl">
            Explore Nepal
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalCount} places to discover — destinations, attractions, treks, festivals, and travel guides
          </p>

          {/* Filter chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {FILTERS.map(({ kind, label, icon }) => {
              const count =
                kind === "all"
                  ? allEntries.length
                  : allEntries.filter((e) => e.kind === kind).length;
              return (
                <button
                  key={kind}
                  onClick={() => { setFilter(kind); setSelected(null); }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                    filter === kind
                      ? "border-accent bg-accent text-accent-foreground shadow-sm"
                      : "border-border bg-white text-muted-foreground hover:border-accent/50 hover:text-accent"
                  )}
                >
                  {icon}
                  {label}
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    filter === kind ? "bg-black/10 text-accent-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">

          {/* Map */}
          <div className="w-full lg:flex-1">
            <MapWidget
              markers={markers}
              height="h-[340px] sm:h-[480px] lg:h-[calc(100vh-16rem)]"
              activeId={selectedId}
              onSelect={handleMarkerSelect}
            />

            {/* Map hint */}
            {(filter === "trek" || filter === "festival" || filter === "guide") && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                {filter === "trek" ? "Treks" : filter === "festival" ? "Festivals" : "Guides"} don&apos;t have precise map coordinates — browse the list on the right.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col lg:w-80 xl:w-96 lg:max-h-[calc(100vh-14rem)] lg:overflow-hidden">
            {selected ? (
              <div className="flex flex-col lg:max-h-full lg:overflow-y-auto rounded-2xl border border-border bg-white p-4 shadow-soft">
                <DetailPanel entry={selected} onBack={() => setSelected(null)} />
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="relative mb-3">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="search"
                    placeholder="Search places, regions, guides…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white py-2.5 pl-9 pr-9 text-sm outline-none transition placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Count */}
                <p className="mb-2 text-xs text-muted-foreground">
                  {filteredCount} result{filteredCount !== 1 ? "s" : ""}
                  {search && ` for "${search}"`}
                </p>

                {/* List */}
                <div className="flex flex-col gap-2 lg:max-h-full lg:overflow-y-auto pr-0.5">
                  {filteredEntries.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border p-8 text-center">
                      <Search size={24} className="mx-auto mb-2 text-muted-foreground/40" />
                      <p className="text-sm font-medium text-muted-foreground">No results found</p>
                      <p className="mt-1 text-xs text-muted-foreground">Try a different search or filter</p>
                    </div>
                  ) : (
                    <>
                      {/* When "all", group by kind */}
                      {filter === "all" ? (
                        (["destination", "attraction", "trek", "festival", "guide"] as const).map((kind) => {
                          const group = filteredEntries.filter((e) => e.kind === kind) as MapEntry[];
                          if (group.length === 0) return null;
                          const labels: Record<string, string> = {
                            destination: "Destinations",
                            attraction: "Attractions",
                            trek: "Treks",
                            festival: "Festivals",
                            guide: "Travel Guides",
                          };
                          return (
                            <div key={kind}>
                              <div className="mb-2 mt-3 flex items-center justify-between first:mt-0">
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                  {labels[kind]}
                                </p>
                                <button
                                  onClick={() => setFilter(kind as FilterKind)}
                                  className="text-[10px] font-medium text-secondary hover:underline"
                                >
                                  See all {group.length}
                                </button>
                              </div>
                              {group.slice(0, 3).map((entry) => (
                                <div key={`${entry.kind}-${entryId(entry)}`} className="mb-2">
                                  <ItemRow
                                    entry={entry}
                                    isSelected={entriesMatch(selected, entry)}
                                    onClick={() => setSelected(entry)}
                                  />
                                </div>
                              ))}
                              {group.length > 3 && (
                                <button
                                  onClick={() => setFilter(kind as FilterKind)}
                                  className="mb-2 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-border py-2 text-xs font-medium text-muted-foreground hover:border-accent/40 hover:text-accent transition"
                                >
                                  +{group.length - 3} more {labels[kind].toLowerCase()}
                                </button>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        filteredEntries.map((entry) => (
                          <ItemRow
                            key={`${entry.kind}-${entryId(entry)}`}
                            entry={entry}
                            isSelected={entriesMatch(selected, entry)}
                            onClick={() => setSelected(entry)}
                          />
                        ))
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
