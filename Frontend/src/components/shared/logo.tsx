import Link from "next/link";
import { Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 font-display text-xl font-bold", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-secondary to-brand-600 text-white shadow-soft">
        <Mountain size={18} />
      </span>
      <span className={light ? "text-white" : "text-brand-600"}>
        Nepa<span className="text-accent">Yatra</span>
      </span>
    </Link>
  );
}
