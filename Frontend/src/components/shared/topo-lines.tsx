import { cn } from "@/lib/utils";

/** Decorative topographic contour lines — evokes a Himalayan map. */
export function TopoLines({ className, opacity = 0.5 }: { className?: string; opacity?: number }) {
  return (
    <svg className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} style={{ opacity }} viewBox="0 0 800 400" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M-20 120 C 120 60, 240 180, 380 120 S 620 40, 820 130" />
        <path d="M-20 160 C 120 100, 240 220, 380 160 S 620 80, 820 170" />
        <path d="M-20 200 C 120 140, 240 260, 380 200 S 620 120, 820 210" />
        <path d="M-20 240 C 120 180, 240 300, 380 240 S 620 160, 820 250" />
        <path d="M-20 280 C 120 220, 240 340, 380 280 S 620 200, 820 290" />
        <path d="M-20 320 C 120 260, 240 380, 380 320 S 620 240, 820 330" />
      </g>
    </svg>
  );
}
