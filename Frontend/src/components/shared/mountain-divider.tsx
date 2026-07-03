import { cn } from "@/lib/utils";
import { CARD } from "@/lib/theme-colors";

export function MountainDivider({ className, flip = false, fill = CARD }: { className?: string; flip?: boolean; fill?: string }) {
  return (
    <div className={cn("pointer-events-none w-full leading-[0]", flip && "rotate-180", className)} aria-hidden>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-[60px] w-full md:h-[90px]">
        <path d="M0 120 L240 48 L380 86 L560 24 L720 72 L900 18 L1080 70 L1260 36 L1440 96 L1440 120 Z" fill={fill} opacity="0.5" />
        <path d="M0 120 L200 70 L360 100 L540 52 L720 96 L920 46 L1120 92 L1300 60 L1440 110 L1440 120 Z" fill={fill} />
      </svg>
    </div>
  );
}
