"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { getLessonExercises } from "@/lib/quizzes";

function getLessonIdFromParam(lessonId: string | string[] | undefined): number | null {
  const value = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const parsedLessonId = Number(value);

  return Number.isInteger(parsedLessonId) && parsedLessonId > 0 ? parsedLessonId : null;
}

export default function LessonStartPage() {
  const params = useParams<{ lessonId?: string | string[] }>();
  const router = useRouter();
  const lessonId = getLessonIdFromParam(params.lessonId);
  const validationError = lessonId ? null : "Leçon introuvable.";
  const [error, setError] = useState<string | null>(null);

  const startLesson = useCallback(async () => {
    if (!lessonId) {
      return;
    }

    setError(null);

    try {
      const exercises = await getLessonExercises(lessonId);
      const firstExercise = exercises[0];

      if (!firstExercise) {
        setError("Aucun exercice n'est disponible pour cette leçon.");
        return;
      }

      router.replace(`/dashboard/quizzes/${firstExercise.id}?leconId=${lessonId}`);
    } catch {
      setError("Impossible de charger l'exercice de cette leçon.");
    }
  }, [lessonId, router]);

  useEffect(() => {
    void startLesson();
  }, [startLesson]);

  const displayedError = validationError ?? error;

  if (displayedError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle size={20} />
            <span>Impossible de démarrer la leçon</span>
          </div>
          <p className="mt-2 text-sm">{displayedError}</p>
          <button
            type="button"
            onClick={startLesson}
            disabled={!lessonId}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RotateCcw size={16} />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-sm">
        <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
