import { api } from "./axios";

// ================================
// TYPES
// ================================
export interface Cours {
  id: number;
  nom: string;
  description: string;
  image?: string;
}

export interface Lecon {
  id: number;
  cours_id: number;
  titre: string;
  description: string;
  ordre: number;
  statut: "verrouille" | "debloque";
}

export interface Exercise {
  id: number;
  lecon_id: number;
  titre: string;
  description: string;
  ordre: number;
}

export interface Question {
  id: number;
  exercise_id: number;
  question: string;
  type: "qcm" | "vrai_faux" | "texte_libre";
  reponse_correcte: string;
  options?: string[];
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Stats {
  users: number;
  cours: number;
  lecons: number;
  exercises: number;
  questions: number;
}

// ================================
// STATS ADMIN
// ================================
export const getStats = async (): Promise<Stats> => {
  const res = await api.get("/api/admin/stats");
  return res.data;
};

// ================================
// COURS
// ================================
export const getCours = async (): Promise<Cours[]> => {
  const res = await api.get("/api/cours");
  return res.data;
};

export const getCoursById = async (id: number): Promise<Cours> => {
  const res = await api.get(`/api/cours/${id}`);
  return res.data;
};

export const createCours = async (data: {
  nom: string;
  description: string;
}): Promise<Cours> => {
  const res = await api.post("/api/admin/cours", data);
  return res.data.cours;
};

export const updateCours = async (
  id: number,
  data: { nom: string; description: string }
): Promise<Cours> => {
  const res = await api.put(`/api/admin/cours/${id}`, data);
  return res.data.cours;
};

export const deleteCours = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/cours/${id}`);
};

// ================================
// LEÇONS
// ================================
export const getLecons = async (cours_id: number): Promise<Lecon[]> => {
  const res = await api.get(`/api/cours/${cours_id}/lecons`);
  return res.data;
};

export const getLeconById = async (id: number): Promise<Lecon> => {
  const res = await api.get(`/api/lecons/${id}`);
  return res.data;
};

export const createLecon = async (
  cours_id: number,
  data: { titre: string; description: string; ordre: number }
): Promise<Lecon> => {
  const res = await api.post(`/api/admin/cours/${cours_id}/lecons`, data);
  return res.data.lecon;
};

export const updateLecon = async (
  id: number,
  data: { titre: string; description: string }
): Promise<Lecon> => {
  const res = await api.put(`/api/admin/lecons/${id}`, data);
  return res.data.lecon;
};

export const deleteLecon = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/lecons/${id}`);
};

// ================================
// EXERCICES
// ================================
export const getExercises = async (lecon_id: number): Promise<Exercise[]> => {
  const res = await api.get(`/api/lecons/${lecon_id}/exercises`);
  return res.data;
};

// ================================
// QUESTIONS
// ================================
export const getQuestions = async (
  exercise_id: number
): Promise<Question[]> => {
  const res = await api.get(`/api/exercises/${exercise_id}/questions`);
  return res.data;
};

// ================================
// USERS (ADMIN)
// ================================
export const getUsers = async (): Promise<UserType[]> => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/api/admin/users/${id}`);
};

// ================================
// INSCRIPTIONS
// ================================
export const getInscriptions = async () => {
  const res = await api.get("/api/inscriptions");
  return res.data;
};

export const inscrire = async (cours_id: number) => {
  const res = await api.post(`/api/cours/${cours_id}/inscrire`);
  return res.data;
};

// ================================
// PROGRESSIONS
// ================================
export const getProgressions = async () => {
  const res = await api.get("/api/progressions");
  return res.data;
};

export const updateProgression = async (
  lecon_id: number,
  data: { score: number; statut: string }
) => {
  const res = await api.post(`/api/lecons/${lecon_id}/progression`, data);
  return res.data;
};

// ================================
// RÉPONSES
// ================================
export const repondre = async (
  question_id: number,
  user_answer: string
) => {
  const res = await api.post(`/api/questions/${question_id}/repondre`, {
    user_answer,
  });
  return res.data;
};