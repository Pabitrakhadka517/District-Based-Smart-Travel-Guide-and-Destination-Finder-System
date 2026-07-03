import { Cloud, CloudRain, CloudSnow, Sun, CloudSun } from "lucide-react";
import type { WeatherDay } from "@/types";

const ICONS = { Sunny: Sun, Clear: CloudSun, Cloudy: Cloud, Rain: CloudRain, Snow: CloudSnow } as const;

export function WeatherCard({ day }: { day: WeatherDay }) {
  const Icon = ICONS[day.condition];
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-4 text-center shadow-soft">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{day.day}</span>
      <Icon className="text-secondary" size={28} />
      <span className="text-xs text-muted-foreground">{day.condition}</span>
      <span className="text-sm font-semibold text-brand-600">{day.high}° <span className="text-muted-foreground">/ {day.low}°</span></span>
    </div>
  );
}
