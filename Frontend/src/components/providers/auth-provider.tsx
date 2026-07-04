"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";
import { useWishlist } from "@/store/wishlist-store";
import { apiGet } from "@/services/api-client";
import type { User } from "@/types";

/**
 * Listens for custom DOM events dispatched by the API client:
 *  - "nepayatra:logout"        → clears auth state + redirects to /login
 *  - "nepayatra:token-refresh" → syncs new token + user into the store
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { clearAuth, setAuth, user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    function onLogout() {
      clearAuth();
      router.push("/login");
    }

    function onRefresh(e: Event) {
      const { token, user: refreshedUser } = (e as CustomEvent<{ token: string; user: User }>).detail;
      if (token && refreshedUser) {
        setAuth(token, refreshedUser);
      }
    }

    window.addEventListener("nepayatra:logout", onLogout);
    window.addEventListener("nepayatra:token-refresh", onRefresh as EventListener);
    return () => {
      window.removeEventListener("nepayatra:logout", onLogout);
      window.removeEventListener("nepayatra:token-refresh", onRefresh as EventListener);
    };
  }, [clearAuth, setAuth, router]);

  // Pulls the server-side wishlist into the local store once per login, so the
  // heart icon reflects saved destinations everywhere (not just the /wishlist
  // page) even on a browser/device that never saved them locally before.
  useEffect(() => {
    if (!token) return;
    apiGet<{ ids: string[] }>("/wishlist", true)
      .then(({ ids }) => useWishlist.getState().merge(ids))
      .catch(() => {});
  }, [token]);

  return <>{children}</>;
}
