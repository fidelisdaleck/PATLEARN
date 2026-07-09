"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, Lock, PlayCircle, RotateCcw } from "lucide-react";
import {
  getLessonProgressions,
  getLessons,
  type Lesson,
  type LessonProgression,
} from "@/lib/lessons";

type LessonViewStatus = "done" | "available" | "locked";

function getCourseIdFromUrl(): number | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const courseId = Number(new URLSearchParams(window.location.search).get("coursId"));
  return Number.isInteger(courseId) && courseId > 0 ? courseId : undefined;
}

function getLessonStatus(lesson: Lesson, progressions: LessonProgression[]): LessonViewStatus {
  const progression = progressions.find(
    (item) => item.lecon_id === lesson.id && item.statut === "termine"
  );

  if (progression) {
    return "done";
  }

  return lesson.statut === "debloque" ? "available" : "locked";
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progressions, setProgressions] = useState<LessonProgression[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLessons = async () => {
    setLoading(true);
    setError(null);

    try {
      const courseId = getCourseIdFromUrl();
      const [loadedLessons, loadedProgressions] = await Promise.all([
        getLessons(courseId),
        getLessonProgressions(),
      ]);

      setLessons(loadedLessons);
      setProgressions(loadedProgressions);
    } catch {
      setError("Impossible de charger les leçons pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadLessons();
  }, []);

  const completedLessons = useMemo(
    () => lessons.filter((lesson) => getLessonStatus(lesson, progressions) === "done").length,
    [lessons, progressions]
  );

  const progressPercent = lessons.length > 0
    ? Math.round((completedLessons / lessons.length) * 100)
    : 0;

  const courseNames = Array.from(
    new Set(lessons.map((lesson) => lesson.cours?.nom).filter(Boolean))
  );
  const title = courseNames.length === 1 ? `Leçons de ${courseNames[0]}` : "Mes leçons";

  if (loading) {
    return (
      <div className="w-full max-w-none md:px-10 py-6">
        <div className="h-12 w-72 rounded-lg bg-gray-200 animate-pulse" />
        <div className="mt-3 h-6 w-96 max-w-full rounded-lg bg-gray-200 animate-pulse" />
        <div className="mt-10 h-28 rounded-xl bg-white shadow-sm animate-pulse" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-48 rounded-xl bg-white shadow-sm animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-none md:px-10 py-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle size={20} />
            <span>Erreur de chargement</span>
          </div>
          <p className="mt-2 text-sm">{error}</p>
          <button
            type="button"
            onClick={loadLessons}
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
    <div className="w-full max-w-none md:px-10 py-6">
      <h2 className="text-4xl md:text-6xl font-semibold">
        {title.includes(" de ") ? (
          <>
            Leçons de <span className="text-[#1e7f43]">{courseNames[0]}</span>
          </>
        ) : (
          title
        )}
      </h2>

      <p className="text-[#444444] text-xl mt-2">
        Continue ton apprentissage progressivement
      </p>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm w-full">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progression</span>
          <span className="text-sm text-gray-500">
            {completedLessons} / {lessons.length} leçon{lessons.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-[#1e7f43] h-3 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {lessons.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h3 className="text-lg font-semibold">Aucune leçon disponible</h3>
          <p className="mt-2 text-sm text-gray-500">
            Les leçons apparaîtront ici dès qu’elles seront disponibles pour ce cours.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const status = getLessonStatus(lesson, progressions);
            const isLocked = status === "locked";

            return (
              <div
                key={lesson.id}
                className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#1e7f43]">
                        {lesson.cours?.nom ?? "Cours"} · Leçon {lesson.ordre}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">{lesson.titre}</h3>
                    </div>

                    {status === "done" && <CheckCircle className="shrink-0 text-[#1e7f43]" />}
                    {status === "available" && <PlayCircle className="shrink-0 text-blue-500" />}
                    {status === "locked" && <Lock className="shrink-0 text-gray-400" />}
                  </div>

                  <p className="text-sm text-gray-500 mt-3">
                    {lesson.description ?? "Découvre une nouvelle étape de ton apprentissage."}
                  </p>

                  <p className="mt-4 text-sm text-gray-500">
                    {lesson.exercises_count ?? 0} exercice{lesson.exercises_count === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="mt-6">
                  {isLocked ? (
                    <button
                      type="button"
                      disabled
                      className="w-full bg-gray-200 text-gray-400 py-2 rounded-lg cursor-not-allowed"
                    >
                      Verrouillé
                    </button>
                  ) : (
                    <Link
                      href={`/lesson/${lesson.id}`}
                      className={`w-full flex items-center justify-center py-2 rounded-lg font-semibold ${
                        status === "done"
                          ? "bg-green-100 text-green-700"
                          : "bg-[#1E7F43] text-white hover:bg-green-800"
                      }`}
                    >
                      {status === "done" ? "Revoir" : "Commencer"}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
