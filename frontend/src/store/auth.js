import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      name: "auth-store", // localStorage key
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
