import { apiGet, apiPost, apiPatch, apiDelete } from "./api-client";
import type { Booking } from "@/types";

export const bookingService = {
  getAll: () =>
    apiGet<Booking[]>("/bookings", true),

  create: (payload: Partial<Booking>) =>
    apiPost<Booking>("/bookings", payload, true),

  updateStatus: (id: string, status: Booking["status"]) =>
    apiPatch<Booking>(`/bookings/${id}`, { status }),

  remove: (id: string) =>
    apiDelete(`/bookings/${id}`),
};
