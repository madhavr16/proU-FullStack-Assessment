import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      role: null,

      login: (token, role) => {
        set({ token, role });
      },

      logout: () => {
        set({ token: null, role: null });
      },
    }),
    {
      name: "auth-store",

      // FIX HYDRATION + SSR + VERCEL storage issues
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage; // client-side only
        }
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
