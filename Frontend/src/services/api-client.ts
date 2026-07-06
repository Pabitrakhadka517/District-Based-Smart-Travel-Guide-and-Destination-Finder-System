const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

// The access token has exactly one home on disk: the auth store's own
// persisted entry. Reading/writing that same key directly (by name, not by
// importing the store) avoids a second copy of the token ever existing in
// localStorage while still keeping this module free of a circular import.
const AUTH_STORAGE_KEY = "nepayatra-auth";

interface PersistedAuthBlob {
  state?: { token?: string | null };
  version?: number;
}

function readAuthBlob(): PersistedAuthBlob | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersistedAuthBlob) : null;
  } catch {
    return null;
  }
}

function getToken(): string | null {
  return readAuthBlob()?.state?.token ?? null;
}

/** Exposed for callers that need to build their own request (e.g. XHR uploads with progress). */
export function getApiBase(): string {
  return BASE;
}
export function getAuthToken(): string | null {
  return getToken();
}

function setToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    const blob = readAuthBlob() ?? { state: {}, version: 0 };
    blob.state = { ...blob.state, token };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(blob));
  } catch {
    // Best-effort — the "nepayatra:token-refresh" event still syncs the token
    // into the live Zustand store even if this direct write fails.
  }
}

/** Backend validation errors include a field-level `errors` array — surface it instead
 *  of the generic "Validation failed" message so the UI can show what actually broke. */
function buildErrorMessage(json: { error?: string; errors?: { field: string; message: string }[] }): string {
  const base = json.error ?? "Unknown error";
  if (!json.errors?.length) return base;
  return `${base}: ${json.errors.map((e) => `${e.field} (${e.message})`).join(", ")}`;
}

const DEFAULT_TIMEOUT_MS = 15_000;
const UPLOAD_TIMEOUT_MS  = 60_000;

/**
 * fetch() with a timeout, and a friendly error message instead of the raw
 * "Failed to fetch" / "The operation was aborted" a caller would otherwise
 * see on a hung request, an offline connection, or a DNS failure.
 */
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("The request timed out. Please check your connection and try again.");
    }
    throw new Error("Unable to reach the server. Please check your connection and try again.");
  } finally {
    clearTimeout(timer);
  }
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
    const res = await fetchWithTimeout(`${BASE}/auth/refresh`, {
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

  const res = await fetchWithTimeout(`${BASE}${path}`, { ...init, headers, credentials: "include" });

  if (res.status === 401 && withAuth) {
    // Try to refresh the access token
    const newToken = await refreshAccessToken();
    if (newToken) {
      // Retry the original request with the fresh token
      const retryRes = await fetchWithTimeout(`${BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...(init.headers as object)
        },
        credentials: "include"
      });
      const retryJson = await retryRes.json();
      if (!retryJson.success) throw new Error(buildErrorMessage(retryJson));
      return retryJson.data as T;
    }
    // Refresh also failed — log the user out
    window.dispatchEvent(new Event("nepayatra:logout"));
    throw new Error("Session expired. Please log in again.");
  }

  const json = await res.json();
  if (!json.success) throw new Error(buildErrorMessage(json));
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

/**
 * Multipart upload helper — unlike `request()`, this never sets a
 * `Content-Type` header so the browser can add its own multipart boundary,
 * and the FormData body is passed through unmodified (not JSON.stringify'd).
 */
export async function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetchWithTimeout(`${BASE}${path}`, {
    method: "POST",
    body: formData,
    headers,
    credentials: "include"
  }, UPLOAD_TIMEOUT_MS);

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      const retryRes = await fetchWithTimeout(`${BASE}${path}`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${newToken}` },
        credentials: "include"
      }, UPLOAD_TIMEOUT_MS);
      const retryJson = await retryRes.json();
      if (!retryJson.success) throw new Error(buildErrorMessage(retryJson));
      return retryJson.data as T;
    }
    window.dispatchEvent(new Event("nepayatra:logout"));
    throw new Error("Session expired. Please log in again.");
  }

  const json = await res.json();
  if (!json.success) throw new Error(buildErrorMessage(json));
  return json.data as T;
}
