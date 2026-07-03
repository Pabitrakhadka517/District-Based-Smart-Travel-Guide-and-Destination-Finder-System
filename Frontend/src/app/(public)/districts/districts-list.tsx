"use client";
import { useState, useMemo } from "react";
import { Search, X, Map } from "lucide-react";
import type { District } from "@/types";
import { DistrictCard } from "@/components/cards/district-card";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/shared/empty-state";

export function DistrictsList({ districts }: { districts: District[] }) {
  const [search, setSearch]     = useState("");
  const [province, setProvince] = useState("All");

  const provinces = useMemo(
    () => ["All", ...Array.from(new Set(districts.map((d) => d.province))).sort()],
    [districts],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return districts.filter((d) => {
      const matchSearch  = !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
      const matchProvince = province === "All" || d.province === province;
      return matchSearch && matchProvince;
    });
  }, [districts, search, province]);

  return (
    <div>
      {/* search + province filter */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search districts by name or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40"
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

        {/* province select */}
        <div className="flex items-center gap-2">
          <Map size={14} className="shrink-0 text-muted-foreground" />
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            aria-label="Filter by province"
            className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40"
          >
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p === "All" ? "All provinces" : `${p} Province`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* province chip pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {provinces.map((p) => (
          <button
            key={p}
            onClick={() => setProvince(p)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              province === p
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-border bg-white text-muted-foreground hover:border-brand-600 hover:text-brand-600",
            )}
          >
            {p === "All" ? "All" : p}
          </button>
        ))}
      </div>

      {/* results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>
        {" "}of {districts.length} districts
        {province !== "All" && <> in <span className="font-medium text-brand-600">{province} Province</span></>}
        {search && <> matching "<span className="font-medium text-brand-600">{search}</span>"</>}
      </p>

      {/* grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Map}
          title="No districts found"
          description="Try a different name or switch to another province."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d, i) => (
            <Reveal key={d.id} delay={Math.min(i * 0.04, 0.3)}>
              <DistrictCard district={d} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
