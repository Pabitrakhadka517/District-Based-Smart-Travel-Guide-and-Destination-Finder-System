import { apiGet, apiPost, apiPut, apiDelete } from "./api-client";
import type { TripPlan } from "@/types";

export const tripService = {
  getAll: () =>
    apiGet<TripPlan[]>("/planner", true),

  create: (payload: Partial<TripPlan>) =>
    apiPost<TripPlan>("/planner", payload, true),

  update: (id: string, payload: Partial<TripPlan>) =>
    apiPut<TripPlan>(`/planner/${id}`, payload),

  remove: (id: string) =>
    apiDelete(`/planner/${id}`),
};
