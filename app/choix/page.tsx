"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { getCours, inscrire, getInscriptions, type Cours } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const COLORS = [
  "bg-[#0a1c63]",
  "bg-[#1e7f43]",
  "bg-[#634f0a]",
  "bg-[#63110a]",
];

export default function ChoixPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [cours, setCours] = useState<Cours[]>([]);
  const [inscriptions, setInscriptions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [inscribing, setInscribing] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursData, inscData] = await Promise.all([
          getCours(),
          getInscriptions(),
        ]);
        setCours(coursData);
        // Extraire les IDs des cours auxquels l'user est déjà inscrit
        const ids = inscData.map((i: any) => i.cours_id);
        setInscriptions(ids);
      } catch (err) {
        console.error("Erreur chargement:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChoix = async (coursId: number) => {
    setInscribing(coursId);
    try {
      // Inscrire si pas encore inscrit
      if (!inscriptions.includes(coursId)) {
        await inscrire(coursId);
        setInscriptions([...inscriptions, coursId]);
      }
      // Sauvegarder le cours choisi dans localStorage
      localStorage.setItem("cours_id", String(coursId));
      localStorage.setItem(
        "cours_nom",
        cours.find((c) => c.id === coursId)?.nom ?? ""
      );
      router.push("/dashboard");
    } catch (err) {
      console.error("Erreur inscription:", err);
    } finally {
      setInscribing(null);
    }
  };

  return (
    <div>
      <Header />
      <section className="mt-10 py-16 px-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Que veux-tu apprendre ?
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Bonjour{user ? ` ${user.username}` : ""} ! Choisis une langue pour
          commencer.
        </p>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 h-40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cours.map((c, index) => {
              const isInscrit = inscriptions.includes(c.id);
              const isLoading = inscribing === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleChoix(c.id)}
                  disabled={isLoading}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer disabled:opacity-70 relative"
                >
                  {/* Badge inscrit */}
                  {isInscrit && (
                    <span className="absolute top-3 right-3 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Inscrit
                    </span>
                  )}

                  {/* Icône */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold ${
                      COLORS[index % COLORS.length]
                    }`}
                  >
                    {isLoading ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      c.nom[0]
                    )}
                  </div>

                  {/* Nom */}
                  <h2 className="mt-4 text-lg font-semibold">{c.nom}</h2>

                  {/* Description courte */}
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                    {c.description}
                  </p>

                  {/* Action */}
                  <span
                    className={`mt-4 text-sm font-medium ${
                      isInscrit ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {isLoading
                      ? "Chargement..."
                      : isInscrit
                      ? "Continuer →"
                      : "Commencer →"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}