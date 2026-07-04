import Link from "next/link";
import { Star, Clock, Ticket, ArrowUpRight } from "lucide-react";
import type { TouristAttraction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { CloudinaryImage } from "@/components/shared/cloudinary-image";
import { categorySolidBadge } from "@/lib/category-colors";
import { cn } from "@/lib/utils";

export function AttractionCard({ attraction: a }: { attraction: TouristAttraction }) {
  const feeLabel = a.entryFee?.foreigner ? `NPR ${a.entryFee.foreigner}` : "Free entry";

  return (
    <Link
      href={`/attractions/${a.slug}`}
      className="group block overflow-hidden rounded-3xl border border-border/70 bg-white shadow-soft card-hover"
    >
      <div className="relative h-56 overflow-hidden">
        <CloudinaryImage
          image={a.heroImage}
          alt={a.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-[600ms] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
        <div className="absolute left-3.5 top-3.5 flex gap-2">
          <Badge className={cn("shadow-soft", categorySolidBadge(a.category))}>{a.category}</Badge>
          {a.trending && <Badge className="bg-white/95 text-brand-600 shadow-soft">🔥 Trending</Badge>}
        </div>
        <WishlistButton id={a.id} className="absolute right-3.5 top-3.5" />
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-600 shadow-soft">
          <Star size={12} className="fill-accent text-accent" /> {a.rating.toFixed(1)}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-brand-600 transition group-hover:text-secondary">{a.name}</h3>
          <ArrowUpRight size={18} className="shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock size={12} /> {a.openingHours ? a.openingHours.split("(")[0].trim() : "Open daily"}</span>
          <span className="flex items-center gap-1 font-medium text-brand-600"><Ticket size={12} /> {feeLabel}</span>
        </div>
      </div>
    </Link>
  );
}
