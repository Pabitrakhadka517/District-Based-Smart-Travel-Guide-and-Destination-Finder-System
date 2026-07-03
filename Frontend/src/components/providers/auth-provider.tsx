"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";
import type { User } from "@/types";

/**
 * Listens for custom DOM events dispatched by the API client:
 *  - "nepayatra:logout"        → clears auth state + redirects to /login
 *  - "nepayatra:token-refresh" → syncs new token + user into the store
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { clearAuth, setAuth, user } = useAuth();
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

  return <>{children}</>;
}
