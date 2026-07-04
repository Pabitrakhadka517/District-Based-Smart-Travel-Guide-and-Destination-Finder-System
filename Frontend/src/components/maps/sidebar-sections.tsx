"use client";

import type { Destination, TouristAttraction, Trek, Festival } from "@/types";
import { type MapEntry, type MapKind, entryId, entriesMatch } from "@/lib/map-entry-helpers";
import { ItemRow } from "@/components/maps/item-row";

interface SidebarSectionsProps {
  destinations: Destination[];
  attractions: TouristAttraction[];
  treks: Trek[];
  festivals: Festival[];
  selected: MapEntry | null;
  onSelect: (entry: MapEntry) => void;
  onSeeAll: (kind: MapKind) => void;
}

/** Upcoming-festival approximation: Festival only has a free-text `month` string
 *  (e.g. "Sep–Oct"), no real date field — this sorts festivals by how close their
 *  first listed month is to the current month, wrapping around the year. */
function upcomingFestivals(festivals: Festival[]): Festival[] {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  return [...festivals].sort((a, b) => {
    const distance = (label: string) => {
      const token = label.split(/[–-]/)[0]?.trim().slice(0, 3);
      const idx = MONTHS.indexOf(token);
      if (idx === -1) return 99;
      return (idx - currentMonth + 12) % 12;
    };
    return distance(a.month) - distance(b.month);
  });
}

function Section({
  title, seeAllLabel, entries, selected, onSelect, onSeeAll, note,
}: {
  title: string;
  seeAllLabel: string;
  entries: MapEntry[];
  selected: MapEntry | null;
  onSelect: (entry: MapEntry) => void;
  onSeeAll: () => void;
  note?: string;
}) {
  if (entries.length === 0) return null;
  return (
    <div>
      <div className="mb-2 mt-4 flex items-center justify-between first:mt-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
        <button onClick={onSeeAll} className="text-[10px] font-medium text-secondary hover:underline">{seeAllLabel}</button>
      </div>
      {note && <p className="mb-2 text-[10px] text-muted-foreground/80">{note}</p>}
      <div className="flex flex-col gap-2">
        {entries.slice(0, 3).map((entry) => (
          <ItemRow key={`${entry.kind}-${entryId(entry)}`} entry={entry} isSelected={entriesMatch(selected, entry)} onClick={() => onSelect(entry)} />
        ))}
      </div>
    </div>
  );
}

export function SidebarSections({ destinations, attractions, treks, festivals, selected, onSelect, onSeeAll }: SidebarSectionsProps) {
  const topDestinations: MapEntry[] = [...destinations]
    .sort((a, b) => b.rating - a.rating)
    .map((d) => ({ kind: "destination", data: d }));

  const popularAttractions: MapEntry[] = [...attractions]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .map((a) => ({ kind: "attraction", data: a }));

  // Trek has no `trending` flag — approximated via featured-first, then rating desc.
  const trendingTreks: MapEntry[] = [...treks]
    .sort((a, b) => (Number(b.featured) - Number(a.featured)) || b.rating - a.rating)
    .map((t) => ({ kind: "trek", data: t }));

  const upcoming: MapEntry[] = upcomingFestivals(festivals).map((f) => ({ kind: "festival", data: f }));

  return (
    <div>
      <Section title="Top Destinations" seeAllLabel={`See all ${destinations.length}`} entries={topDestinations} selected={selected} onSelect={onSelect} onSeeAll={() => onSeeAll("destination")} />
      <Section title="Popular Attractions" seeAllLabel={`See all ${attractions.length}`} entries={popularAttractions} selected={selected} onSelect={onSelect} onSeeAll={() => onSeeAll("attraction")} />
      <Section title="Trending Treks" seeAllLabel={`See all ${treks.length}`} entries={trendingTreks} selected={selected} onSelect={onSelect} onSeeAll={() => onSeeAll("trek")} note="Based on featured picks — Nepal Yatra doesn't track live trek popularity yet." />
      <Section title="Upcoming Festivals" seeAllLabel={`See all ${festivals.length}`} entries={upcoming} selected={selected} onSelect={onSelect} onSeeAll={() => onSeeAll("festival")} note="Estimated from each festival's season — exact dates vary yearly." />
    </div>
  );
}
