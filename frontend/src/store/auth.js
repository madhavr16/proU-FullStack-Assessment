import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      role: null,

      login: (token, role) => set({ token, role }),

      logout: () => set({ token: null, role: null }),
    }),

    {
      name: "auth-store",

      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);

export default useAuthStore;
