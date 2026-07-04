"use client";
import { useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import type { Destination } from "@/types";
import { useWishlist } from "@/store/wishlist-store";
import { useAuth } from "@/store/auth-store";
import { DestinationCard } from "@/components/cards/destination-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { apiDelete } from "@/services/api-client";
import { wishlistService } from "@/services/wishlistService";

export function WishlistClient({ all }: { all: Destination[] }) {
  const { ids, clear, merge } = useWishlist();
  // Use a stable boolean selector to avoid re-running the effect on every render
  const loggedIn = useAuth((s) => !!s.token);

  useEffect(() => {
    if (!loggedIn) return;
    wishlistService.get().then(({ ids: serverIds }) => merge(serverIds)).catch(() => {});
  }, [loggedIn, merge]);

  const saved = all.filter((d) => ids.includes(d.id));

  const clearAll = async () => {
    const removedIds = ids;
    clear();
    if (loggedIn) {
      await Promise.allSettled(removedIds.map((id) => apiDelete(`/wishlist/${id}`)));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="h2 text-brand-600">Your wishlist</h1>
          <p className="lead mt-1">
            {saved.length} saved {saved.length === 1 ? "destination" : "destinations"}.
          </p>
        </div>
        {saved.length > 0 && (
          <Button variant="outline" onClick={clearAll}><Trash2 size={16} /> Clear all</Button>
        )}
      </div>
      {saved.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((d) => <DestinationCard key={d.id} destination={d} />)}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any destination to save it here for later."
          action={{ label: "Discover destinations", href: "/search" }}
        />
      )}
    </div>
  );
}
