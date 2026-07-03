import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const alertVariants = cva("flex items-start gap-2 rounded-xl border px-4 py-3 text-sm", {
  variants: {
    variant: {
      error: "border-destructive/20 bg-destructive/5 text-destructive",
      warning: "border-warning/30 bg-warning/10 text-warning-foreground",
      success: "border-success/20 bg-success/5 text-success",
      info: "border-info/20 bg-info/10 text-info-foreground"
    }
  },
  defaultVariants: { variant: "error" }
});

const ICON = { error: XCircle, warning: AlertTriangle, success: CheckCircle2, info: Info };

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: boolean;
}

export function Alert({ className, variant = "error", icon = true, children, ...props }: AlertProps) {
  const Icon = ICON[variant ?? "error"];
  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {icon && <Icon className="mt-0.5 h-4 w-4 shrink-0" />}
      <div className="min-w-0">{children}</div>
    </div>
  );
}
