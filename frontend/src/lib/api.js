import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  try {
    const authStore = JSON.parse(localStorage.getItem("auth-store"));
    const token = authStore?.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error("Auth parse error", err);
  }

  return config;
});

export default api;
