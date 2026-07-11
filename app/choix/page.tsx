"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RotateCcw } from "lucide-react";
import Header from "@/components/header";
import { getCours, getInscriptions, inscrire, type Cours } from "@/lib/api";

const COLORS = ["bg-[#0a1c63]", "bg-[#1e7f43]", "bg-[#634f0a]", "bg-[#63110a]"];

interface Inscription {
  id: number;
  cours_id: number;
}

export default function Languages() {
  const router = useRouter();
  const [courses, setCourses] = useState<Cours[]>([]);
  const [enrolledIds, setEnrolledIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joiningId, setJoiningId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const [loadedCourses, inscriptions] = await Promise.all([
        getCours(),
        getInscriptions(),
      ]);

      setCourses(loadedCourses);
      setEnrolledIds(
        new Set((inscriptions as Inscription[]).map((item) => item.cours_id))
      );
    } catch {
      setError("Impossible de charger les langues disponibles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleSelect = async (cours: Cours) => {
    if (!enrolledIds.has(cours.id)) {
      setJoiningId(cours.id);
      try {
        await inscrire(cours.id);
        setEnrolledIds((prev) => new Set(prev).add(cours.id));
      } catch (err: any) {
        // 409 = déjà inscrit, on peut continuer normalement
        if (err?.response?.status !== 409) {
          setJoiningId(null);
          setError("Impossible de s'inscrire à ce cours pour le moment.");
          return;
        }
      }
      setJoiningId(null);
    }

    router.push(`/dashboard/lessons?coursId=${cours.id}`);
  };

  return (
    <div>
      <Header />
      <section className="mt-10 py-16 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          Que veux-tu apprendre ?
        </h1>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-40 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 text-center">
            <div className="flex items-center justify-center gap-2 font-semibold">
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
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucune langue n&rsquo;est disponible pour le moment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
            {courses.map((cours, index) => {
              const isEnrolled = enrolledIds.has(cours.id);
              const isJoining = joiningId === cours.id;

              return (
                <button
                  key={cours.id}
                  type="button"
                  onClick={() => handleSelect(cours)}
                  disabled={isJoining}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                >
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold ${COLORS[index % COLORS.length]}`}
                  >
                    {cours.nom[0]}
                  </div>

                  <h2 className="mt-4 text-lg font-semibold">{cours.nom}</h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {isJoining
                      ? "Inscription..."
                      : isEnrolled
                        ? "Continuer"
                        : cours.description}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
