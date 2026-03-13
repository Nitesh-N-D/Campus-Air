const DEFAULT_API_URL = "http://localhost:5000";
const PRODUCTION_API_URL = "https://campus-air.onrender.com";
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL =
  configuredApiUrl ||
  (import.meta.env.DEV ? DEFAULT_API_URL : PRODUCTION_API_URL);
