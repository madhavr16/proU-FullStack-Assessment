import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      role: null,

      login: (token, role) =>
        set({
          token,
          role,
        }),

      logout: () =>
        set({
          token: null,
          role: null,
        }),
    }),
    {
      name: "auth-store",
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name);
          return raw ? JSON.parse(raw) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuthStore;
