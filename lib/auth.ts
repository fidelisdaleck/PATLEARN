import { api } from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
}

export async function getCsrfCookie(): Promise<void> {
  await api.get("/sanctum/csrf-cookie");
}

export async function login(payload: LoginPayload): Promise<User> {
  await getCsrfCookie();

  const response = await api.post("/api/login", payload);
  return (response.data.user ?? response.data) as User;
}

export async function register(payload: RegisterPayload): Promise<User> {
  await getCsrfCookie();

  const response = await api.post("/api/register", payload);
  return (response.data.user ?? response.data) as User;
}

export async function logout(): Promise<void> {
  await api.post("/api/logout");
}

export async function getUser(): Promise<User> {
  const response = await api.get("/api/user");
  return (response.data.user ?? response.data) as User;
}
