"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, RotateCcw, ArrowRight } from "lucide-react";
import { updateProgression } from "@/lib/api";

export default function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = parseInt(searchParams.get("score") || "0");
  const total = parseInt(searchParams.get("total") || "1");
  const leconId = searchParams.get("leconId");

  const percentage = Math.round((score / total) * 100);
  const isSuccess = percentage >= 70;

  useEffect(() => {
    const leconIdNumber = Number(leconId);

    if (!leconIdNumber) {
      return;
    }

    updateProgression(leconIdNumber, {
      score: percentage,
      statut: isSuccess ? "termine" : "en_cours",
    }).catch(() => {
      // La leçon reste consultable même si l'enregistrement de la progression échoue
    });
  }, [leconId, percentage, isSuccess]);

  const statusColor = isSuccess ? "text-green-600" : "text-orange-500";
  const bgColor = isSuccess ? "bg-green-50" : "bg-orange-50";
  const borderColor = isSuccess ? "border-green-200" : "border-orange-200";
  const buttonColor = isSuccess
    ? "bg-[#1e7f43] hover:bg-green-800"
    : "bg-orange-500 hover:bg-orange-600";

  function handleContinue() {
    router.push("/dashboard/lessons");
  }

  function handleRetry() {
    if (leconId) {
      router.push(`/lesson/${leconId}`);
      return;
    }

    router.back();
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div
        className={`w-full max-w-2xl rounded-2xl ${bgColor} border-2 ${borderColor} p-8 md:p-12 shadow-lg`}
      >
        <div className="flex flex-col items-center text-center">
          <CheckCircle className={`w-20 h-20 ${statusColor} mb-6`} />

          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Quiz terminé ! 🎉
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Voici tes résultats
          </p>

          <div className="mb-8 w-full">
            <div className={`inline-block rounded-xl px-8 py-6 ${statusColor}`}>
              <div className="text-6xl font-bold">{percentage}%</div>
              <div className="text-xl mt-2 font-semibold">
                {score} / {total} bonnes réponses
              </div>
            </div>
          </div>

          <div className="w-full mb-8">
            <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isSuccess ? "bg-green-500" : "bg-orange-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <p className={`text-lg font-semibold mb-8 ${statusColor}`}>
            {isSuccess
              ? "Excellent ! Tu as réussi cette leçon !"
              : "Continue tes efforts !"}
          </p>

          <div className="w-full flex flex-col md:flex-row gap-4">
            <button
              onClick={handleContinue}
              className={`flex-1 ${buttonColor} text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2`}
            >
              <ArrowRight size={20} />
              Continuer
            </button>

            <button
              onClick={handleRetry}
              className="flex-1 bg-slate-300 hover:bg-slate-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Retenter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}