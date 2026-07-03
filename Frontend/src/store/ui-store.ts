"use client";
import { create } from "zustand";

interface UiState {
  searchOpen: boolean;
  sidebarOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  toggleSidebar: () => void;
}

export const useUi = create<UiState>((set) => ({
  searchOpen: false,
  sidebarOpen: true,
  setSearchOpen: (v) => set({ searchOpen: v }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen }))
}));
