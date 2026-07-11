import { api, clearSession } from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  tel?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  tel?: string;
}

export function persistSession(token: string, user: User) {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  // Cookies lus par le middleware (proxy.ts) pour protéger les routes
  document.cookie = `token=${token}; path=/`;
  document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; path=/`;
}

export async function login(payload: LoginPayload): Promise<User> {
  const response = await api.post("/api/login", payload);
  const { token, user } = response.data;

  persistSession(token, user);

  return user as User;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const response = await api.post("/api/register", payload);
  const { token, user } = response.data;

  persistSession(token, user);

  return user as User;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/api/logout");
  } catch {
    // Ignorer les erreurs de logout
  } finally {
    clearSession();
  }
}

export async function getUser(): Promise<User> {
  const response = await api.get("/api/me");
  return response.data as User;
}