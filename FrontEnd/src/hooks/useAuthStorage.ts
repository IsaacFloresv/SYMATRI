import type { User } from "@/schemas/userSchema"
import {create} from "zustand"

type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuthStorage = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))