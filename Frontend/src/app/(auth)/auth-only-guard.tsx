"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/store/auth-store";

const AUTH_ONLY_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

/**
 * Bounces an already-authenticated user away from auth-only pages, checked
 * against the real Zustand token rather than the middleware's session cookie.
 * The cookie only reflects "a login happened at some point" (it lives for
 * 7-30 days) — it doesn't know if that session was later invalidated (e.g. a
 * backend reseed). Redirecting on the cookie alone could permanently bounce
 * someone with a stale cookie to /dashboard with no way back to /login.
 */
export function AuthOnlyGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, isAdmin } = useAuth();

  useEffect(() => {
    if (AUTH_ONLY_PATHS.some((p) => pathname.startsWith(p)) && isLoggedIn()) {
      router.replace(isAdmin() ? "/admin" : "/dashboard");
    }
  }, [pathname, isLoggedIn, isAdmin, router]);

  return null;
}
