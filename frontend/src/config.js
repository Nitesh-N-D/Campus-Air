const DEFAULT_API_URL = "http://localhost:5000";
const DEFAULT_APP_URL = "http://localhost:5173";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? DEFAULT_API_URL : "https://campus-air.onrender.com");

export const APP_BASE_URL =
  import.meta.env.VITE_APP_URL ||
  (import.meta.env.DEV ? DEFAULT_APP_URL : window.location.origin);
