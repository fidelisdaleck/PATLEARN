import { api } from "./axios";

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

export async function login(payload: LoginPayload): Promise<User> {
  const response = await api.post("/api/login", payload);
  const { token, user } = response.data;

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user as User;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const response = await api.post("/api/register", payload);
  const { token, user } = response.data;

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user as User;
}

export async function logout(): Promise<void> {
  try {
    await api.post("/api/logout");
  } catch {
    // Ignorer les erreurs de logout
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
}

export async function getUser(): Promise<User> {
  const response = await api.get("/api/me");
  return response.data as User;
}