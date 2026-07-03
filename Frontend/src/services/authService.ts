import { apiGet, apiPost } from "./api-client";
import type { User } from "@/types";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  login: (payload: LoginPayload) =>
    apiPost<AuthResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    apiPost<AuthResponse>("/auth/register", payload),

  logout: () =>
    apiPost("/auth/logout", {}, true),

  logoutAll: () =>
    apiPost("/auth/logout-all", {}, true),

  forgotPassword: (email: string) =>
    apiPost<{ message: string }>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    apiPost<{ message: string }>("/auth/reset-password", { token, password }),

};
