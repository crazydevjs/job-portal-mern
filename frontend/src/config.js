// API base URL. Local dev → http://localhost:5000 (see .env)
// Production build → value from .env.production
export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
