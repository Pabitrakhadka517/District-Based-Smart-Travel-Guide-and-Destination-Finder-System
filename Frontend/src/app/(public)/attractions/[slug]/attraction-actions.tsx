"use client";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/shared/wishlist-button";

export function AttractionActions({ id }: { id: string }) {
  const handleShare = () => {
    if (typeof navigator !== "undefined") {
      if (navigator.share) {
        navigator.share({ url: window.location.href }).catch(() => undefined);
      } else {
        navigator.clipboard.writeText(window.location.href).catch(() => undefined);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <WishlistButton id={id} />
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 size={15} className="mr-1.5" /> Share
      </Button>
    </div>
  );
}
