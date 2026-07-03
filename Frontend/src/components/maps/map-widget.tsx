"use client";
import { useState } from "react";
import { MapPin, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOREST, SUCCESS, SECONDARY, BORDER, SECTION_BACKGROUND } from "@/lib/theme-colors";

export interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: "destination" | "attraction";
}

const BOUNDS = { minLat: 26.3, maxLat: 30.5, minLng: 80.0, maxLng: 88.2 };
const project = (lat: number, lng: number) => ({
  x: ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100,
  y: (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100,
});

const TYPE_COLORS: Record<NonNullable<MapMarker["type"]>, string> = {
  destination: "text-accent",
  attraction: "text-secondary",
};
const TYPE_FILL: Record<NonNullable<MapMarker["type"]>, string> = {
  destination: "fill-accent",
  attraction: "fill-secondary",
};

interface MapWidgetProps {
  markers: MapMarker[];
  height?: string;
  activeId?: string | null;
  onSelect?: (m: MapMarker) => void;
}

export function MapWidget({ markers, height = "h-[420px]", activeId, onSelect }: MapWidgetProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/5 via-brand-50 to-secondary/10",
        height
      )}
    >
      {/* Terrain SVG backdrop */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SECONDARY} stopOpacity="0.12" />
            <stop offset="100%" stopColor={SECONDARY} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={FOREST} stopOpacity="0.35" />
            <stop offset="100%" stopColor={FOREST} stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#skyGrad)" />
        {/* Snow peaks */}
        <path d="M5,35 L12,20 L19,35 Z" fill={BORDER} opacity="0.7" />
        <path d="M18,32 L27,14 L36,32 Z" fill={SECTION_BACKGROUND} opacity="0.8" />
        <path d="M33,35 L42,18 L51,35 Z" fill={BORDER} opacity="0.7" />
        <path d="M55,38 L62,22 L69,38 Z" fill={SECTION_BACKGROUND} opacity="0.6" />
        <path d="M72,36 L80,17 L88,36 Z" fill={BORDER} opacity="0.75" />
        {/* Mid hills */}
        <path d="M0,55 Q20,42 40,50 T80,48 T100,55 L100,100 L0,100 Z" fill="url(#hillGrad)" />
        {/* Lowland plains */}
        <path d="M0,72 Q30,65 60,70 T100,68 L100,100 L0,100 Z" fill={SUCCESS} opacity="0.15" />
        {/* Rivers (faint blue lines) */}
        <path d="M20,55 Q30,65 25,80" stroke={SECONDARY} strokeWidth="0.5" fill="none" opacity="0.5" />
        <path d="M50,50 Q60,62 55,80" stroke={SECONDARY} strokeWidth="0.5" fill="none" opacity="0.5" />
        <path d="M70,54 Q78,65 74,80" stroke={SECONDARY} strokeWidth="0.5" fill="none" opacity="0.4" />
      </svg>

      {/* Label */}
      <span className="absolute left-4 top-4 z-10 rounded-lg bg-white/85 px-3 py-1 text-xs font-semibold text-brand-600 backdrop-blur shadow-sm">
        Nepal · Interactive Map
      </span>

      {/* Markers */}
      {markers.map((m) => {
        const { x, y } = project(m.lat, m.lng);
        const isActive = activeId === m.id;
        const isHovered = hovered === m.id;
        const type = m.type ?? "destination";

        return (
          <button
            key={m.id}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => { onSelect?.(m); }}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
            className="group absolute z-10 -translate-x-1/2 -translate-y-full focus:outline-none"
            aria-label={m.name}
          >
            {/* Ring for active */}
            {isActive && (
              <span className={cn(
                "absolute inset-0 -translate-x-[5px] -translate-y-[2px] h-9 w-9 rounded-full ring-2 ring-offset-1",
                type === "destination" ? "ring-accent" : "ring-secondary"
              )} />
            )}

            <MapPin
              size={isActive ? 34 : isHovered ? 30 : 24}
              className={cn(
                "drop-shadow-md transition-all duration-150",
                TYPE_COLORS[type],
                TYPE_FILL[type]
              )}
            />

            {/* Tooltip */}
            <span className={cn(
              "pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-brand-700 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg transition-opacity",
              isActive || isHovered ? "opacity-100" : "opacity-0"
            )}>
              {m.name}
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-brand-700" />
            </span>
          </button>
        );
      })}

      {/* Empty state for filtered views */}
      {markers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-xl bg-white/80 px-5 py-3 text-center backdrop-blur shadow">
            <p className="text-sm font-medium text-muted-foreground">No map coordinates available</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Browse the list on the right</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5 rounded-xl bg-white/88 p-3 text-xs shadow backdrop-blur">
        <span className="flex items-center gap-1.5">
          <MapPin size={13} className="fill-accent text-accent" />
          Destination
        </span>
        <span className="flex items-center gap-1.5">
          <Zap size={13} className="fill-secondary text-secondary" />
          Attraction
        </span>
      </div>
    </div>
  );
}
