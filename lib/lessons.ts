import { api } from "./axios";

export interface Course {
  id: number;
  nom: string;
  description: string | null;
}

export type LessonStatus = "verrouille" | "debloque";

export interface Lesson {
  id: number;
  cours_id: number;
  titre: string;
  description: string | null;
  ordre: number;
  statut: LessonStatus;
  exercises_count?: number;
  cours?: Course;
}

export type ProgressionStatus = "en_cours" | "termine";

export interface LessonProgression {
  id: number;
  user_id: number;
  lecon_id: number;
  score: number;
  statut: ProgressionStatus;
}

export async function getLessons(courseId?: number): Promise<Lesson[]> {
  const response = await api.get<Lesson[]>("/api/lecons", {
    params: courseId ? { cours_id: courseId } : undefined,
  });

  return response.data;
}

export async function getLessonProgressions(): Promise<LessonProgression[]> {
  const response = await api.get<LessonProgression[]>("/api/progressions");

  return response.data;
}
