import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import type { Destination } from "@/types";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { formatCurrency } from "@/lib/utils";
import { categorySolidBadge } from "@/lib/category-colors";
import { cn } from "@/lib/utils";

export function DestinationCard({ destination: d }: { destination: Destination }) {
  return (
    <Link href={`/destinations/${d.slug}`} className="group block overflow-hidden rounded-3xl border border-border/70 bg-white shadow-soft card-hover">
      <div className="relative h-56 overflow-hidden">
        <Image src={d.heroImage} alt={d.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-[600ms] group-hover:scale-[1.07]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
        <div className="absolute left-3.5 top-3.5 flex gap-2">
          <Badge className={cn("shadow-soft", categorySolidBadge(d.category))}>{d.category}</Badge>
          {d.trending && <Badge className="bg-white/95 text-brand-600 shadow-soft"><span aria-hidden="true">🔥</span> Trending</Badge>}
        </div>
        <WishlistButton id={d.id} className="absolute right-3.5 top-3.5" />
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-600 shadow-soft">
          <Star size={12} className="fill-accent text-accent" /> {d.rating.toFixed(1)}
          <span className="font-normal text-muted-foreground">({d.reviewCount.toLocaleString()})</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-brand-600 transition group-hover:text-secondary">{d.name}</h3>
          <ArrowUpRight size={18} className="shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{d.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
          <div className="flex flex-wrap gap-1">
            {d.tags.slice(0, 2).map((t) => <span key={t} className="text-xs text-muted-foreground">#{t.replace(/\s/g, "")}</span>)}
          </div>
          <span className="text-sm font-semibold text-brand-600">from {formatCurrency(d.budget.budget)}</span>
        </div>
      </div>
    </Link>
  );
}
