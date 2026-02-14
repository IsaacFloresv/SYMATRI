import { create } from "zustand";

export type UserPanel = "perfil" | "seguridad" | "notificaciones" | null;

type UiState = {
  activeUserPage: UserPanel;
  setActiveUserPage: (p: UserPanel) => void;
  clearActiveUserPage: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  activeUserPage: null,
  setActiveUserPage: (p) => set({ activeUserPage: p }),
  clearActiveUserPage: () => set({ activeUserPage: null }),
}));
