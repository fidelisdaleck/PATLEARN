import { api } from "./axios";

export interface Progression {
  id: number;
  user_id: number;
  lecon_id: number;
  score: number;
  statut: 'en_cours' | 'termine';
}

export async function saveProgression(
  leconId: number,
  score: number,
  statut: 'en_cours' | 'termine'
): Promise<Progression> {
  const response = await api.post<{ progression: Progression }>(
    `/api/lecons/${leconId}/progression`,
    { score, statut }
  );
  return response.data.progression;
}

export async function getProgressions(): Promise<Progression[]> {
  const response = await api.get<Progression[]>("/api/progressions");
  return response.data;
}

export async function getProgressionForLesson(leconId: number): Promise<Progression | undefined> {
  const progressions = await getProgressions();
  return progressions.find((p) => p.lecon_id === leconId);
}
