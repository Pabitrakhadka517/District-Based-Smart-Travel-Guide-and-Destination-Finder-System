import { Sun, Cloud, CloudRain, Snowflake, ThermometerSun, CalendarCheck } from "lucide-react";
import type { WeatherInsight } from "@/types";
import { cn } from "@/lib/utils";

const CONDITION_ICONS = {
  Sunny:  Sun,
  Clear:  Sun,
  Cloudy: Cloud,
  Rain:   CloudRain,
  Snow:   Snowflake,
} as const;

const ADVICE_STYLES: Record<string, { pill: string; border: string }> = {
  "Go now":    { pill: "bg-success text-white",             border: "border-success/30 bg-success/5"       },
  "Good time": { pill: "bg-secondary text-secondary-foreground", border: "border-secondary/30 bg-secondary/5"},
  "Off-season":{ pill: "bg-muted text-muted-foreground",     border: "border-border bg-white"               },
  "Avoid":     { pill: "bg-destructive text-destructive-foreground", border: "border-destructive/20 bg-destructive/5" },
};

export function DistrictWeatherWidget({ weather, districtName }: { weather: WeatherInsight; districtName: string }) {
  const CondIcon = CONDITION_ICONS[weather.condition] ?? Sun;
  const styles   = ADVICE_STYLES[weather.visitAdvice] ?? ADVICE_STYLES["Off-season"];

  return (
    <div className={cn("rounded-2xl border p-5 shadow-soft", styles.border)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-display font-semibold text-brand-600">
          <ThermometerSun size={18} /> Weather in {districtName}
        </h3>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", styles.pill)}>
          {weather.visitAdvice}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <CondIcon size={16} className="shrink-0 text-secondary" />
        <span className="font-medium text-brand-600">{weather.condition}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{weather.currentTemp}°C right now</span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">{weather.message}</p>

      {weather.bestMonths.length > 0 && (
        <div className="mt-3 border-t border-border/50 pt-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <CalendarCheck size={12} /> Best months to visit
          </p>
          <p className="mt-1 text-xs text-foreground">{weather.bestMonths.join(" · ")}</p>
        </div>
      )}
    </div>
  );
}
