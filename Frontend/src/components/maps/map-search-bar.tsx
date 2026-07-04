"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin, Zap, Footprints, CalendarDays, BookOpen, Map as MapIcon } from "lucide-react";
import type { District } from "@/types";
import { useSearchAutocomplete } from "@/hooks/use-content";
import { useDebouncedValue } from "@/hooks/use-debounced";
import type { MapEntry } from "@/lib/map-entry-helpers";
import { cn } from "@/lib/utils";

export type SearchSelection =
  | { type: "district"; district: District }
  | { type: "entry"; entry: MapEntry };

const KIND_ICON: Record<string, React.ReactNode> = {
  destination: <MapPin size={13} className="text-accent" />,
  attraction: <Zap size={13} className="text-secondary" />,
  trek: <Footprints size={13} className="text-success" />,
  festival: <CalendarDays size={13} className="text-purple" />,
  guide: <BookOpen size={13} className="text-teal" />,
};

export function MapSearchBar({ onSelect }: { onSelect: (selection: SearchSelection) => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const debounced = useDebouncedValue(query, 200);
  const { data, isFetching } = useSearchAutocomplete(debounced);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = data && query.length >= 2 ? [
    ...(data.districts ?? []).slice(0, 3).map((district) => ({ type: "district" as const, district })),
    ...(data.destinations ?? []).slice(0, 4).map((d) => ({ type: "entry" as const, entry: { kind: "destination", data: d } as MapEntry })),
    ...(data.attractions ?? []).slice(0, 4).map((a) => ({ type: "entry" as const, entry: { kind: "attraction", data: a } as MapEntry })),
    ...(data.treks ?? []).slice(0, 4).map((t) => ({ type: "entry" as const, entry: { kind: "trek", data: t } as MapEntry })),
    ...(data.festivals ?? []).slice(0, 4).map((f) => ({ type: "entry" as const, entry: { kind: "festival", data: f } as MapEntry })),
    ...(data.guides ?? []).slice(0, 4).map((g) => ({ type: "entry" as const, entry: { kind: "guide", data: g } as MapEntry })),
  ] : [];

  function pick(selection: SearchSelection) {
    onSelect(selection);
    setQuery("");
    setOpen(false);
  }

  function label(r: SearchSelection): string {
    if (r.type === "district") return r.district.name;
    return r.entry.kind === "guide" ? r.entry.data.title : r.entry.data.name;
  }

  return (
    <div ref={ref} className="absolute right-3 top-3 z-[1000] w-[calc(100%-5.5rem)] max-w-xs sm:w-72">
      <div className="relative rounded-2xl border border-white/60 bg-white/90 shadow-soft backdrop-blur-md">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search districts, treks, attractions…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="w-full rounded-2xl bg-transparent py-2.5 pl-9 pr-8 text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X size={14} />
          </button>
        )}
      </div>

      {open && query.length >= 2 && (
        <div className="mt-1.5 max-h-80 overflow-y-auto rounded-2xl border border-border bg-white shadow-xl">
          {isFetching && results.length === 0 && (
            <p className="px-3 py-4 text-center text-xs text-muted-foreground">Searching…</p>
          )}
          {!isFetching && results.length === 0 && (
            <p className="px-3 py-4 text-center text-xs text-muted-foreground">No matches for &ldquo;{query}&rdquo;</p>
          )}
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => pick(r)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition hover:bg-muted",
                i !== results.length - 1 && "border-b border-border"
              )}
            >
              {r.type === "district" ? <MapIcon size={13} className="text-brand-600" /> : KIND_ICON[r.entry.kind]}
              <span className="flex-1 truncate font-medium text-foreground">{label(r)}</span>
              <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">
                {r.type === "district" ? "District" : r.entry.kind}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
