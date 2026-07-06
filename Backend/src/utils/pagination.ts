export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Parses `page`/`limit` query params into safe, bounded values.
 *
 * `defaultLimit` should be set high enough to cover a resource's current
 * collection size (so callers that never pass `page`/`limit` keep getting
 * "everything" exactly like before), while `maxLimit` caps what a client can
 * explicitly request so a paged UI (admin tables, search) can ask for a
 * smaller page without anyone being able to force an unbounded query.
 */
export function parsePagination(
  query: Record<string, unknown>,
  defaultLimit = 200,
  maxLimit = 500
): PaginationParams {
  const rawPage = Number(query.page);
  const rawLimit = Number(query.limit);

  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  const limit = Number.isFinite(rawLimit) && rawLimit > 0
    ? Math.min(Math.floor(rawLimit), maxLimit)
    : defaultLimit;

  return { page, limit, skip: (page - 1) * limit };
}
