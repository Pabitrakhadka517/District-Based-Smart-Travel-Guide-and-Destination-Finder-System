import { randomBytes } from "node:crypto";

/** Generate a collision-safe, opaque, prefixed string id (e.g. "ra1b2c3d4e5f6g7h8"). */
export function genId(prefix: string): string {
  return `${prefix}${randomBytes(8).toString("hex")}`;
}

/** Today's date as YYYY-MM-DD. */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
