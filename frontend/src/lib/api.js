const FALLBACK_API_BASE_URL = "http://localhost:3000";

// Se estiver rodando localmente (npm run dev), usa o localhost
// Se estiver em produção (Render), usa a URL do .env
export const API_BASE_URL = import.meta.env.DEV 
  ? "http://localhost:3000" 
  : (import.meta.env.VITE_API_URL || FALLBACK_API_BASE_URL);

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

export function authFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (options.body && typeof options.body === "string" && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(apiUrl(path), {
    ...options,
    headers,
  });
}
