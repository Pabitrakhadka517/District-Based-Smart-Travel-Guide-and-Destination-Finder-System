import { cn } from "@/lib/utils";
import { SECONDARY, ACCENT, SUCCESS, BRAND, GOLD } from "@/lib/theme-colors";

const colors = [SECONDARY, ACCENT, SUCCESS, BRAND, GOLD];

export function PrayerFlags({ className, count = 10 }: { className?: string; count?: number }) {
  return (
    <svg className={cn("h-6 w-full", className)} viewBox={`0 0 ${count * 24} 28`} fill="none" aria-hidden>
      <path d={`M0 4 Q ${(count * 24) / 2} 14 ${count * 24} 4`} stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {Array.from({ length: count }).map((_, i) => {
        const x = i * 24 + 4;
        const dip = Math.sin((i / (count - 1)) * Math.PI) * 8;
        return <rect key={i} x={x} y={4 + dip} width="16" height="14" rx="1.5" fill={colors[i % colors.length]} opacity="0.85" />;
      })}
    </svg>
  );
}
