"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Mic, RotateCcw, Volume2 } from "lucide-react";
import { getCours, getMots, type Cours, type Mot } from "@/lib/api";

function getCourseIdFromUrl(): number | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const coursId = Number(new URLSearchParams(window.location.search).get("coursId"));
  return Number.isInteger(coursId) && coursId > 0 ? coursId : undefined;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
  return true;
}

export default function PronunciationPage() {
  const [courses, setCourses] = useState<Cours[]>([]);
  const [selectedCoursId, setSelectedCoursId] = useState<number | null>(null);
  const [mots, setMots] = useState<Mot[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speechUnsupported, setSpeechUnsupported] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const loadedCourses = await getCours();
      setCourses(loadedCourses);

      const preferredCoursId = getCourseIdFromUrl();
      const coursId =
        preferredCoursId ?? loadedCourses[0]?.id ?? null;
      setSelectedCoursId(coursId);

      if (coursId) {
        const loadedMots = await getMots(coursId);
        setMots(loadedMots);
        setCurrent(0);
      }
    } catch {
      setError("Impossible de charger les mots à prononcer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCourse = async (coursId: number) => {
    setSelectedCoursId(coursId);
    setLoading(true);
    setError(null);
    try {
      const loadedMots = await getMots(coursId);
      setMots(loadedMots);
      setCurrent(0);
    } catch {
      setError("Impossible de charger les mots à prononcer.");
    } finally {
      setLoading(false);
    }
  };

  const currentWord = mots[current];
  const progress = mots.length > 0 ? ((current + 1) / mots.length) * 100 : 0;
  const selectedCourseName = useMemo(
    () => courses.find((c) => c.id === selectedCoursId)?.nom,
    [courses, selectedCoursId]
  );

  const playAudio = () => {
    if (!currentWord) return;

    if (currentWord.audio_url) {
      const audio = new Audio(currentWord.audio_url);
      void audio.play();
      return;
    }

    const spoke = speak(currentWord.mot);
    if (!spoke) {
      setSpeechUnsupported(true);
    }
  };

  const nextWord = () => {
    if (current < mots.length - 1) {
      setCurrent(current + 1);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-none md:px-10 py-6">
        <div className="h-12 w-72 rounded-lg bg-gray-200 animate-pulse" />
        <div className="mt-10 h-24 rounded-xl bg-white shadow-sm animate-pulse" />
        <div className="mt-10 h-64 rounded-xl bg-white shadow-sm animate-pulse" />
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
            onClick={load}
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
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-4xl md:text-6xl font-semibold">
          Prononciation{" "}
          {selectedCourseName && (
            <span className="text-[#1e7f43]">{selectedCourseName}</span>
          )}
        </h2>

        {courses.length > 1 && (
          <select
            value={selectedCoursId ?? ""}
            onChange={(e) => handleSelectCourse(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#1e7f43]"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="text-[#444444] text-xl mt-2">Écoute et répète les mots</p>

      {mots.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h3 className="text-lg font-semibold">Aucun mot disponible</h3>
          <p className="mt-2 text-sm text-gray-500">
            Les mots à prononcer apparaîtront ici dès qu&rsquo;ils seront ajoutés pour ce cours.
          </p>
        </div>
      ) : (
        <>
          {/* Progress */}
          <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Progression</span>
              <span className="text-sm text-gray-500">
                {current + 1} / {mots.length}
              </span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-[#1e7f43] h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Card principale */}
          <div className="mt-10 bg-white p-10 rounded-xl shadow-sm text-center">
            <h3 className="text-4xl font-bold">{currentWord.mot}</h3>
            <p className="text-gray-500 mt-2">{currentWord.traduction}</p>

            {!currentWord.audio_url && (
              <p className="mt-2 text-xs text-gray-400">
                Lecture approximative par synthèse vocale (pas d&rsquo;audio natif disponible pour ce mot)
              </p>
            )}
            {speechUnsupported && !currentWord.audio_url && (
              <p className="mt-1 text-xs text-red-500">
                La lecture audio n&rsquo;est pas supportée par ce navigateur.
              </p>
            )}

            {/* Bouton audio */}
            <div className="flex justify-center mt-6">
              <button
                onClick={playAudio}
                className="bg-[#1E7F43] text-white p-4 rounded-full hover:bg-green-800 transition"
              >
                <Volume2 size={28} />
              </button>
            </div>

            {/* Micro (fonctionnalité à venir) */}
            <div className="flex flex-col items-center mt-6">
              <button
                disabled
                title="Bientôt disponible"
                className="bg-gray-100 p-4 rounded-full text-gray-400 cursor-not-allowed"
              >
                <Mic size={28} />
              </button>
              <p className="mt-2 text-xs text-gray-400">
                Reconnaissance vocale bientôt disponible
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-center mt-10">
            <button
              onClick={nextWord}
              disabled={current >= mots.length - 1}
              className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-[#1E7F43] text-white py-3 rounded-xl font-bold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {current >= mots.length - 1 ? "Terminé" : "Mot suivant"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
