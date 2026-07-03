"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, MapPin, X, ChevronDown } from "lucide-react";
import type { TouristAttraction, AttractionCategory } from "@/types";
import { AttractionCard } from "@/components/cards/attraction-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categorySolid } from "@/lib/category-colors";

const ALL_CATEGORIES: AttractionCategory[] = [
  "Religious Sites",
  "Historical Sites",
  "Natural Attractions",
  "Lakes & Rivers",
  "Mountains & Trekking Routes",
  "Adventure Activities",
  "Cultural Heritage Sites",
  "Viewpoints",
  "National Parks & Wildlife",
  "Local Experiences",
];

export function DistrictAttractions({
  attractions,
}: {
  attractions: TouristAttraction[];
}) {
  const [search, setSearch]           = useState("");
  const [active, setActive]           = useState<AttractionCategory | "All">("All");
  const [showCats, setShowCats]       = useState(false);

  const presentCategories = useMemo(
    () => ALL_CATEGORIES.filter((cat) => attractions.some((a) => a.category === cat)),
    [attractions],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return attractions.filter((a) => {
      const matchSearch  = !q || a.name.toLowerCase().includes(q) || a.tagline?.toLowerCase().includes(q);
      const matchCat     = active === "All" || a.category === active;
      return matchSearch && matchCat;
    });
  }, [attractions, search, active]);

  const isFiltered  = search.length > 0 || active !== "All";
  const activeCount = active === "All" ? attractions.length : attractions.filter((a) => a.category === active).length;

  const groupedByCategory = useMemo(
    () =>
      presentCategories
        .map((cat) => ({ cat, items: filtered.filter((a) => a.category === cat) }))
        .filter(({ items }) => items.length > 0),
    [filtered, presentCategories],
  );

  function clearFilters() {
    setSearch("");
    setActive("All");
  }

  return (
    <div>
      {/* ── search + filter bar ── */}
      <div className="mb-8 space-y-3">
        {/* search row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search attractions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* mobile: toggle category drawer */}
          <button
            onClick={() => setShowCats((v) => !v)}
            className={cn(
              "flex h-11 items-center gap-1.5 rounded-xl border px-3.5 text-sm font-medium transition sm:hidden",
              active !== "All"
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-white text-muted-foreground hover:border-brand-600",
            )}
          >
            <SlidersHorizontal size={14} />
            {active !== "All" ? active : "Filter"}
            <ChevronDown size={13} className={cn("transition-transform", showCats && "rotate-180")} />
          </button>
        </div>

        {/* category chips — hidden on mobile unless expanded */}
        <div className={cn("flex items-center gap-2 overflow-x-auto pb-1 sm:flex", showCats ? "flex" : "hidden")}>
          <SlidersHorizontal size={13} className="shrink-0 text-muted-foreground sm:block hidden" />
          <button
            onClick={() => { setActive("All"); setShowCats(false); }}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition",
              active === "All"
                ? "bg-brand-600 text-white shadow-sm"
                : "border border-border bg-white text-muted-foreground hover:border-brand-600 hover:text-brand-600",
            )}
          >
            All ({attractions.length})
          </button>
          {presentCategories.map((cat) => {
            const count = attractions.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => { setActive(active === cat ? "All" : cat); setShowCats(false); }}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                  active === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "border border-border bg-white text-muted-foreground hover:border-brand-600 hover:text-brand-600",
                )}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── active filter indicator ── */}
      {isFiltered && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {search && (
            <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
              "{search}"
              <button onClick={() => setSearch("")} aria-label="Remove search filter">
                <X size={11} />
              </button>
            </span>
          )}
          {active !== "All" && (
            <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
              {active}
              <button onClick={() => setActive("All")} aria-label={`Remove ${active} filter`}>
                <X size={11} />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-foreground hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── results ── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No attractions found"
          description="Try a different search term or remove the category filter."
        />
      ) : isFiltered ? (
        /* flat grid when filtering / searching */
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>
            {" "}of {activeCount} {active !== "All" ? active.toLowerCase() : "attractions"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.04}>
                <AttractionCard attraction={a} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        /* grouped by category when browsing */
        <div className="space-y-12">
          {groupedByCategory.map(({ cat, items }) => (
            <section key={cat} aria-labelledby={`cat-${cat}`}>
              <div className="mb-5 flex items-center gap-3">
                <span className={cn("h-6 w-1 shrink-0 rounded-full", categorySolid(cat))} />
                <h3
                  id={`cat-${cat}`}
                  className="font-display text-xl font-semibold text-brand-600"
                >
                  {cat}
                </h3>
                <Badge variant="secondary" className="ml-auto">
                  {items.length}
                </Badge>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((a, i) => (
                  <Reveal key={a.id} delay={i * 0.04}>
                    <AttractionCard attraction={a} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
