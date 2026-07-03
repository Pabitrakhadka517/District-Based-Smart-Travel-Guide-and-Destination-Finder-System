import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({ label, value, icon: Icon, trend, accent = "secondary" }: {
  label: string; value: string; icon: LucideIcon; trend?: number; accent?: "secondary" | "accent" | "success" | "brand";
}) {
  const tones: Record<string, string> = {
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    brand: "bg-brand-50 text-brand-600"
  };
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl", tones[accent])}><Icon size={20} /></div>
        {typeof trend === "number" && (
          <span className={cn("flex items-center gap-0.5 text-xs font-medium", trend >= 0 ? "text-success" : "text-destructive")}>
            {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-2xl font-bold text-brand-600">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
