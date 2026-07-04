"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { District } from "@/types";
import {
  type MapEntry,
  entryId, entryImage, entryName, entryCategory,
  entryDescription, entryRating, entryDistrictName, entryHref,
} from "@/lib/map-entry-helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { KIND_STYLE } from "@/lib/category-colors";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { cn } from "@/lib/utils";

export function MapPopupContent({
  entry,
  districtsById,
  onViewDetails,
}: {
  entry: MapEntry;
  districtsById: Map<string, District>;
  onViewDetails?: () => void;
}) {
  const rating = entryRating(entry);
  const href = entryHref(entry);

  return (
    <div className="w-[240px] overflow-hidden rounded-xl">
      <div className="relative -m-3 mb-0 h-28 w-[calc(100%+1.5rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={entryImage(entry)} alt={entryName(entry)} className="h-full w-full object-cover" />
        <div className="absolute right-1.5 top-1.5">
          <WishlistButton id={entryId(entry)} className="h-7 w-7" />
        </div>
      </div>

      <div className="mt-2.5">
        <h3 className="font-display text-sm font-bold leading-tight text-foreground line-clamp-1">
          {entryName(entry)}
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className={cn("rounded-full border px-1.5 py-0.5 text-[10px] font-semibold", KIND_STYLE[entry.kind])}>
            {entryCategory(entry)}
          </span>
          <span className="text-[11px] text-muted-foreground">{entryDistrictName(entry, districtsById)}</span>
        </div>

        {rating !== null && (
          <div className="mt-1.5">
            <Rating value={rating} size={11} showValue />
          </div>
        )}

        <p className="mt-1.5 text-xs leading-snug text-muted-foreground line-clamp-2">
          {entryDescription(entry)}
        </p>

        {href && (
          <Link href={href} onClick={onViewDetails}>
            <Button size="sm" className="mt-2.5 w-full gap-1 text-xs">
              View Details
              <ChevronRight size={12} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
