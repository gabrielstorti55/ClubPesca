const FALLBACK_API_BASE_URL = "http://localhost:3000";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || FALLBACK_API_BASE_URL;

export function apiUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export function assetUrl(path = "") {
  if (!path || path.startsWith("data:") || path.startsWith("http")) {
    return path;
  }

  return apiUrl(path);
}
