"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Lock, PlayCircle, Loader2 } from "lucide-react";
import { getLecons, getProgressions, getExercises, type Lecon } from "@/lib/api";

interface Progression {
  id: number;
  lecon_id: number;
  score: number;
  statut: string;
}

export default function LessonsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refresh = searchParams.get("refresh");
  const [lecons, setLecons] = useState<Lecon[]>([]);
  const [progressions, setProgressions] = useState<Progression[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingLecon, setStartingLecon] = useState<number | null>(null);

  const coursId =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("cours_id") ?? "1")
      : 1;
  const coursNom =
    typeof window !== "undefined"
      ? localStorage.getItem("cours_nom") ?? "Duala"
      : "Duala";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leconsData, progressData] = await Promise.all([
          getLecons(coursId),
          getProgressions(),
        ]);
        setLecons(leconsData);
        setProgressions(progressData);
      } catch (err) {
        console.error("Erreur leçons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coursId, refresh]); // Re-fetch when refresh changes

  const getStatus = (lecon: Lecon): "done" | "current" | "locked" => {
    const prog = progressions.find((p) => p.lecon_id === lecon.id);
    if (prog?.statut === "termine") return "done";
    if (lecon.statut === "debloque") return "current";
    return "locked";
  };

  // Au clic sur une leçon — charger le premier exercice puis naviguer
  const handleStartLecon = async (lecon: Lecon) => {
    setStartingLecon(lecon.id);
    try {
      const exercises = await getExercises(lecon.id);
      if (exercises.length > 0) {
        router.push(
          `/dashboard/quizzes/${exercises[0].id}?lecon_id=${lecon.id}`
        );
      } else {
        alert("Aucun exercice disponible pour cette leçon.");
        setStartingLecon(null);
      }
    } catch (err) {
      console.error("Erreur exercices:", err);
      alert("Erreur lors du chargement des exercices.");
      setStartingLecon(null);
    }
  };

  const terminees = progressions.filter((p) => p.statut === "termine").length;
  const progression =
    lecons.length > 0 ? Math.round((terminees / lecons.length) * 100) : 0;

  if (loading) {
    return (
      <div className="w-full max-w-none md:px-10 py-6">
        <div className="h-12 w-64 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm h-40 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none md:px-10 py-6">
      <h2 className="text-4xl md:text-6xl font-semibold">
        Leçons de <span className="text-[#1e7f43]">{coursNom}</span>
      </h2>
      <p className="text-[#444444] text-xl mt-2">
        Continue ton apprentissage progressivement.
      </p>

      {/* Barre de progression */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm w-full">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progression globale</span>
          <span className="text-sm text-gray-500">
            {terminees} / {lecons.length} leçons
          </span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-[#1e7f43] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progression}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1 text-right">
          {progression}% complété
        </p>
      </div>

      {/* Liste des leçons */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lecons.map((lecon) => {
          const status = getStatus(lecon);
          const prog = progressions.find((p) => p.lecon_id === lecon.id);
          const isStarting = startingLecon === lecon.id;

          return (
            <div
              key={lecon.id}
              className={`bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition ${
                status === "locked" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    {lecon.ordre}
                  </span>
                  <h3 className="text-lg font-semibold">{lecon.titre}</h3>
                </div>

                {status === "done" && (
                  <CheckCircle className="text-[#1e7f43] shrink-0" />
                )}
                {status === "current" && (
                  <PlayCircle className="text-blue-500 shrink-0" />
                )}
                {status === "locked" && (
                  <Lock className="text-gray-400 shrink-0" />
                )}
              </div>

              <p className="text-sm text-gray-500 mt-2">{lecon.description}</p>

              {/* Score si progression */}
              {prog && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400">Score :</span>
                  <span className="text-xs font-semibold text-green-600">
                    {prog.score} pts
                  </span>
                </div>
              )}

              {/* Bouton action */}
              <div className="mt-4">
                {status === "locked" ? (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-400 py-2 rounded-lg cursor-not-allowed text-sm"
                  >
                    Verrouillé — Complète la leçon précédente
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartLecon(lecon)}
                    disabled={isStarting}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-sm transition ${
                      status === "done"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-[#1E7F43] text-white hover:bg-green-800"
                    } disabled:opacity-60`}
                  >
                    {isStarting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Chargement...
                      </>
                    ) : status === "done" ? (
                      "Revoir la leçon"
                    ) : (
                      "Commencer"
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}