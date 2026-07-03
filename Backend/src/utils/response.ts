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
