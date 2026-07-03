"use client";
import { useEffect, useState } from "react";
import { Heart, FolderHeart, Trash2 } from "lucide-react";
import type { Destination } from "@/types";
import { useWishlist } from "@/store/wishlist-store";
import { useAuth } from "@/store/auth-store";
import { DestinationCard } from "@/components/cards/destination-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiGet, apiDelete } from "@/services/api-client";

interface ApiWishlist { ids: string[]; }

export function WishlistClient({ all }: { all: Destination[] }) {
  const { ids, collections, clear } = useWishlist();
  // Use a stable boolean selector to avoid re-running the effect on every render
  const loggedIn = useAuth((s) => !!s.token);
  const [apiIds, setApiIds] = useState<string[]>([]);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!loggedIn) { setSynced(true); return; }
    apiGet<ApiWishlist>("/wishlist", true)
      .then((data) => setApiIds(data.ids ?? []))
      .catch(() => {})
      .finally(() => setSynced(true));
  }, [loggedIn]);

  const effectiveIds = synced ? Array.from(new Set([...ids, ...apiIds])) : ids;
  const saved = all.filter((d) => effectiveIds.includes(d.id));

  const clearAll = async () => {
    clear();
    if (loggedIn) {
      await Promise.allSettled(effectiveIds.map((id) => apiDelete(`/wishlist/${id}`)));
      setApiIds([]);
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
      <div className="flex flex-wrap gap-3">
        {Object.entries(collections).map(([name, list]) => (
          <div key={name} className="flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-soft">
            <FolderHeart className="text-accent" size={18} aria-hidden="true" />
            <span className="text-sm font-medium text-brand-600">{name}</span>
            <Badge variant="secondary">{list.length}</Badge>
          </div>
        ))}
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
