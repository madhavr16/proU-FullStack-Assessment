import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// INTERCEPTOR FOR ZUSTAND-PERSIST
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("auth-store");
    if (!raw) return config;

    const parsed = JSON.parse(raw);
    const token = parsed?.state?.token; 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("ATTACHING TOKEN:", token); // optional test
    }
  } catch (err) {
    console.error("AUTH PARSE ERROR:", err);
  }

  return config;
});

export default api;
