"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface SettingsState {
  notifications: {
    emailTripReminders: boolean;
    emailNewContent: boolean;
    pushPriceAlerts: boolean;
    pushWeatherAlerts: boolean;
  };
  privacy: {
    publicProfile: boolean;
    publicReviews: boolean;
    personalizedRecommendations: boolean;
  };
  theme: Theme;
  setNotification: (key: keyof SettingsState["notifications"], value: boolean) => void;
  setPrivacy: (key: keyof SettingsState["privacy"], value: boolean) => void;
  setTheme: (theme: Theme) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: {
        emailTripReminders: true,
        emailNewContent: true,
        pushPriceAlerts: false,
        pushWeatherAlerts: true,
      },
      privacy: {
        publicProfile: false,
        publicReviews: true,
        personalizedRecommendations: true,
      },
      theme: "system",
      setNotification: (key, value) =>
        set((s) => ({ notifications: { ...s.notifications, [key]: value } })),
      setPrivacy: (key, value) =>
        set((s) => ({ privacy: { ...s.privacy, [key]: value } })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "nepalyatra-settings" }
  )
);
