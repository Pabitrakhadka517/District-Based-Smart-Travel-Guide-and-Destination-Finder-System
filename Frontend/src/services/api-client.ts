const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";
const TOKEN_KEY = "nepayatra_token";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

/** Try to get a fresh access token using the httpOnly refresh cookie. */
async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include" // sends the httpOnly cookie
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success || !json.data?.token) return null;
    const { token, user } = json.data as { token: string; user: unknown };
    setToken(token);
    // Sync the Zustand store without importing it here (avoids circular deps).
    // The store's persist layer will pick it up on next render.
    window.dispatchEvent(new CustomEvent("nepayatra:token-refresh", { detail: { token, user } }));
    return token;
  } catch {
    return null;
  }
}

/**
 * Core fetch wrapper that handles 401 → refresh → retry once.
 * Dispatches "nepayatra:logout" if refresh also fails.
 */
async function request<T>(
  path: string,
  init: RequestInit,
  withAuth: boolean
): Promise<T> {
  const headers: HeadersInit = withAuth
    ? { ...authHeaders(), ...(init.headers as object) }
    : { "Content-Type": "application/json", ...(init.headers as object) };

  const res = await fetch(`${BASE}${path}`, { ...init, headers, credentials: "include" });

  if (res.status === 401 && withAuth) {
    // Try to refresh the access token
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry the original request with the fresh token
      const retryRes = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...(init.headers as object)
        },
        credentials: "include"
      });
      const retryJson = await retryRes.json();
      if (!retryJson.success) throw new Error(retryJson.error ?? "Request failed");
      return retryJson.data as T;
    }
    // Refresh also failed — log the user out
    window.dispatchEvent(new Event("nepayatra:logout"));
    throw new Error("Session expired. Please log in again.");
  }

  const json = await res.json();
  if (!json.success) throw new Error(json.error ?? "Unknown error");
  return json.data as T;
}

export async function apiGet<T>(path: string, auth = false): Promise<T> {
  return request<T>(path, { method: "GET", cache: "no-store" }, auth);
}

export async function apiPost<T>(path: string, body: unknown, auth = false): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) }, auth);
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: "PUT", body: JSON.stringify(body) }, true);
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: "PATCH", body: JSON.stringify(body) }, true);
}

export async function apiDelete<T = void>(path: string): Promise<T> {
  return request<T>(path, { method: "DELETE" }, true);
}
