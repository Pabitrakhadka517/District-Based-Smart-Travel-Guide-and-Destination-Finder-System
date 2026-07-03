import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

// Tint-background + saturated-text pill styling (pre-existing pattern, kept for
// visual consistency) trades off strict small-text AA contrast for the soft-pill
// look; full AA is enforced instead on buttons, alerts, links, and body copy.
const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-50 text-brand-600",
        secondary: "bg-secondary/10 text-secondary",
        accent: "bg-accent/10 text-accent",
        success: "bg-success/10 text-success",
        gold: "bg-gold/10 text-gold",
        sandstone: "bg-sandstone/10 text-sandstone",
        forest: "bg-forest/10 text-forest",
        maroon: "bg-maroon/10 text-maroon",
        crimson: "bg-crimson/10 text-crimson",
        destructive: "bg-destructive/10 text-destructive",
        warning: "bg-warning/10 text-warning",
        info: "bg-info/10 text-info",
        outline: "border border-border text-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
