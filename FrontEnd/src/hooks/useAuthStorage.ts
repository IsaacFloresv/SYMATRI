import type { Session } from "@/lib/authStorage";
import { create } from "zustand";
import { getSession, setSession, removeSession } from "@/lib/authStorage";

type AuthState = {
  user: Session | null;
  setUser: (user: Session | null) => void;
};

export const useAuthStorage = create<AuthState>((set) => ({
  user: getSession(),
  setUser: (user) => {
    set({ user });
    if (user) setSession(user);
    else removeSession();
  },
}));