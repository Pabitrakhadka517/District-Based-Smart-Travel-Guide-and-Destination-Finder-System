import type { Response } from "express";

/**
 * Standard success envelope — matches the frontend's apiGet/apiPost expectations:
 *   { success: true, data: <payload> }
 */
export function ok<T>(res: Response, data: T, status = 200): Response {
  return res.status(status).json({ success: true, data });
}

/**
 * Standard error envelope:
 *   { success: false, error: <message> }
 */
export function fail(res: Response, error: string, status = 400): Response {
  return res.status(status).json({ success: false, error });
}

/**
 * Paginated success envelope — `data` is still the plain array (so every
 * existing caller that just reads `.data` keeps working unchanged), with
 * `total`/`page`/`limit` added alongside it for callers that want real
 * pagination (admin tables, search) instead of a silent hard cap.
 *   { success: true, data: <T[]>, total, page, limit }
 */
export function okPaginated<T>(
  res: Response,
  items: T[],
  total: number,
  page: number,
  limit: number
): Response {
  return res.status(200).json({ success: true, data: items, total, page, limit });
}
