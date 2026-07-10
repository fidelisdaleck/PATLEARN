import { api } from "./axios";

export interface Exercise {
  id: number;
  lecon_id: number;
  titre: string;
  description: string | null;
  ordre: number;
}

export type BackendQuestionType = "qcm" | "vrai_faux" | "texte_libre" | "text_libre";

export interface BackendQuestion {
  id: number;
  exercise_id: number;
  question: string;
  type: BackendQuestionType;
  reponse_correcte: string;
  options: string[] | string | null;
}

export async function getLessonExercises(lessonId: number): Promise<Exercise[]> {
  const response = await api.get<Exercise[]>(`/api/lecons/${lessonId}/exercises`);

  return response.data;
}

export async function getExerciseQuestions(exerciseId: number): Promise<BackendQuestion[]> {
  const response = await api.get<BackendQuestion[]>(`/api/exercises/${exerciseId}/questions`);

  return response.data;
}

export interface SubmitAnswerResponse {
  statut: 'correct' | 'incorrect';
  reponse_correcte: string;
  reponse: any;
}

export async function submitAnswer(
  questionId: number,
  userAnswer: string
): Promise<SubmitAnswerResponse> {
  const response = await api.post<SubmitAnswerResponse>(
    `/api/questions/${questionId}/repondre`,
    { user_answer: userAnswer }
  );
  return response.data;
}
