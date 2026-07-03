"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BarChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-soft">
      <h3 className="font-display font-semibold text-brand-600">{title}</h3>

      <div className="relative mt-8 flex h-48 items-end gap-2">
        {/* horizontal grid lines at 25 / 50 / 75 / 100 % */}
        {[0.25, 0.5, 0.75, 1].map((p) => (
          <div
            key={p}
            className="pointer-events-none absolute left-0 right-0 border-t border-border/50"
            style={{ bottom: `${p * 100}%` }}
          />
        ))}

        {data.map((d, i) => (
          <div
            key={`${d.label}-${i}`}
            className="group relative flex flex-1 flex-col items-center"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* tooltip */}
            {hovered === i && d.value > 0 && (
              <div className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-brand-700 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
                {d.value.toLocaleString()}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-brand-700" />
              </div>
            )}

            <div
              className={cn(
                "w-full rounded-t-md bg-gradient-to-t from-brand-600 to-secondary transition-all duration-300",
                hovered === i && "from-brand-700 shadow-md"
              )}
              style={{
                height: `${(d.value / max) * 100}%`,
                minHeight: d.value > 0 ? "4px" : "0",
              }}
            />
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex gap-2">
        {data.map((d, i) => (
          <div key={`lbl-${i}`} className="flex flex-1 justify-center">
            <span className="text-xs text-muted-foreground">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
