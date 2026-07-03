"use client";
import { useEffect } from "react";

const STORAGE_KEY = "nepayatra_recently_viewed";

export function RecentlyViewedTracker({ destinationId }: { destinationId: string }) {
  useEffect(() => {
    if (!destinationId) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const deduped = [destinationId, ...ids.filter((id) => id !== destinationId)].slice(0, 10);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deduped));
    } catch {
      // localStorage may be unavailable in private mode
    }
  }, [destinationId]);

  return null;
}
