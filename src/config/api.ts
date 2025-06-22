// API Configuration
// Reads from environment variables with fallback to localhost for development

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  PROMPT_INITIAL: `${API_BASE_URL}/api/prompt_initial`,
  PROMPT_REDO: `${API_BASE_URL}/api/prompt_redo`,
} as const;

export default API_BASE_URL;
