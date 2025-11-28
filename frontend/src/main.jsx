import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";
import useThemeStore from "./store/theme";

const client = new QueryClient();

function Main() {
  const { theme } = useThemeStore();    // get theme from Zustand store

  return (
    // Apply dark mode class to root wrapper
    <div className={theme === "dark" ? "dark" : ""}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <App />
          <Toaster position="top-right" />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  );
}

export default Main;
