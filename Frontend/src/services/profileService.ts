import { apiGet, apiPatch, apiPost } from "./api-client";
import type { User } from "@/types";

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const profileService = {
  getMe: () =>
    apiGet<User>("/auth/me", true),

  update: (payload: { name?: string; avatar?: string }) =>
    apiPatch<User>("/auth/profile", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    apiPost<{ message: string }>("/auth/change-password", payload, true),
};
