"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getLecons, getProgressions, type Lecon } from "@/lib/api";

interface Progression {
  id: number;
  lecon_id: number;
  score: number;
  statut: string;
}

export default function DashboardPage() {
  const { user } = useAuth();

  const [lecons, setLecons] = useState<Lecon[]>([]);
  const [progressions, setProgressions] = useState<Progression[]>([]);
  const [loading, setLoading] = useState(true);

  const coursId = typeof window !== "undefined"
    ? parseInt(localStorage.getItem("cours_id") ?? "1")
    : 1;
  const coursNom = typeof window !== "undefined"
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
        console.error("Erreur dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [coursId]);

  // Calculer les stats
  const terminees = progressions.filter((p) => p.statut === "termine").length;
  const enCours = progressions.filter((p) => p.statut === "en_cours").length;
  const scoreTotal = progressions.reduce((acc, p) => acc + p.score, 0);
  const progression = lecons.length > 0
    ? Math.round((terminees / lecons.length) * 100)
    : 0;

  // Trouver la prochaine leçon à faire
  const prochainLecon = lecons.find((l) => {
    const prog = progressions.find((p) => p.lecon_id === l.id);
    return !prog || prog.statut !== "termine";
  });

  return (
    <div className="w-full max-w-none md:px-10 py-6">
      <main className="w-full flex-1">
        {/* Accueil */}
        <h2 className="text-4xl md:text-6xl font-semibold">
          Bienvenue,{" "}
          <span className="text-[#1e7f43]">
            {user?.username ?? "Apprenant"}
          </span>{" "}
          !
        </h2>
        <p className="text-[#444444] text-xl mt-2">
          Prêt à booster ton apprentissage du{" "}
          <span className="text-green-600 font-semibold">{coursNom}</span> ?
        </p>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm h-24 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-green-600 font-semibold flex gap-2">
                  <BookOpen size={20} /> Mes leçons
                </p>
                <h3 className="text-2xl font-bold">{terminees}</h3>
                <p className="text-sm text-gray-500">
                  leçon(s) complétée(s) sur {lecons.length}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-yellow-500 font-semibold flex gap-2">
                  <CheckCircle size={20} /> En cours
                </p>
                <h3 className="text-2xl font-bold">{enCours}</h3>
                <p className="text-sm text-gray-500">leçon(s) en cours</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <p className="text-blue-500 font-semibold flex gap-2">
                  <Trophy size={20} /> Score total
                </p>
                <h3 className="text-2xl font-bold">{scoreTotal}</h3>
                <p className="text-sm text-gray-500">points accumulés</p>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mt-10 bg-white p-6 rounded-xl shadow-sm w-full">
              <div className="flex justify-between mb-2">
                <span className="font-semibold uppercase">{coursNom}</span>
                <span className="text-sm text-gray-500">
                  {terminees} leçon(s) sur {lecons.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progression}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 text-right">
                {progression}% complété
              </p>
            </div>

            {/* Prochaine leçon */}
            {prochainLecon && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-sm text-green-700 font-medium mb-1">
                  Prochaine leçon recommandée
                </p>
                <h3 className="text-lg font-semibold text-slate-800">
                  {prochainLecon.titre}
                </h3>
                <p className="text-sm text-gray-500">{prochainLecon.description}</p>
              </div>
            )}

            {/* Bouton continuer */}
            <div className="flex justify-center">
              <Link
                href="/dashboard/lessons"
                className="mt-10 w-full text-xl flex items-center justify-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl"
              >
                {terminees === 0 ? "Commencer les leçons" : "Continuer les leçons"}
                <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}