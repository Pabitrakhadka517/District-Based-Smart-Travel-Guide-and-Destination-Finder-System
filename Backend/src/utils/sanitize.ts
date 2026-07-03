/**
 * Escapes all regex special characters so user-supplied strings are safe
 * to pass to MongoDB's { $regex } operator. Prevents ReDoS attacks.
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Returns only the whitelisted keys from an object, dropping everything else.
 * Use this on req.body before passing to Mongoose to prevent operator injection.
 */
export function pick(
  obj: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Safely casts a query param to string.
 * Returns undefined for objects/arrays — prevents { $ne: "..." } injection
 * through Express's qs query parser.
 */
export function qs(val: unknown): string | undefined {
  return typeof val === "string" ? val : undefined;
}
