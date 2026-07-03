"use client";
import { Cloud } from "lucide-react";
import { WeatherCard } from "@/components/cards/weather-card";
import { useWeather } from "@/hooks/use-content";

export function WeatherSidebar({ lat, lng }: { lat: number; lng: number }) {
  const { data: forecast, isLoading } = useWeather(lat, lng);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <h3 className="flex items-center gap-2 font-display font-semibold text-brand-600"><Cloud size={18} /> 7-day weather</h3>
      {isLoading ? (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : forecast ? (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {forecast.slice(0, 4).map((w, i) => <WeatherCard key={w.day + i} day={w} />)}
        </div>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">Weather data unavailable.</p>
      )}
    </div>
  );
}
