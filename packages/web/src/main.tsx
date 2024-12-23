import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createClient } from "@openauthjs/openauth";

export const API_URL = new URL(import.meta.env.VITE_API_URL).origin;
export const AUTH_URL = new URL(import.meta.env.VITE_AUTH_URL).origin;

export const client = createClient({
  clientID: "react",
  issuer: AUTH_URL,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
