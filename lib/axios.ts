import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Efface la session (localStorage + cookies lus par le middleware proxy.ts)
export function clearSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// Gérer les erreurs 401 (token expiré)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearSession();
      window.location.href = "/connexion";
    }
    return Promise.reject(error);
  }
);
