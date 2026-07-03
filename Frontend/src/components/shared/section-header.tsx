import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, subtitle, center, action, light }: {
  eyebrow?: string; title: string; subtitle?: string; center?: boolean; action?: ReactNode; light?: boolean;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", center && "items-center text-center md:flex-col md:items-center")}>
      <div className={cn(center && "mx-auto max-w-2xl")}>
        {eyebrow && <span className={cn("kicker", center && "justify-center")}>{eyebrow}</span>}
        <h2 className={cn("h2 mt-3", light ? "text-white" : "text-brand-600")}>{title}</h2>
        {subtitle && <p className={cn("lead mt-3 max-w-2xl", light && "text-white/75", center && "mx-auto")}>{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
