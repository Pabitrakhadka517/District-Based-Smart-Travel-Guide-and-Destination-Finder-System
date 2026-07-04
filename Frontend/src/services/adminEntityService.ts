import { apiPost, apiPut, apiDelete } from "./api-client";

/** Generic admin CRUD helpers — every content resource (districts, destinations, etc.) shares the same REST shape. */
export const adminEntityService = {
  create: <T>(resource: string, body: unknown) => apiPost<T>(`/${resource}`, body, true),
  update: <T>(resource: string, id: string, body: unknown) => apiPut<T>(`/${resource}/${id}`, body),
  remove: (resource: string, id: string) => apiDelete<{ id: string; deleted: boolean }>(`/${resource}/${id}`),
};
