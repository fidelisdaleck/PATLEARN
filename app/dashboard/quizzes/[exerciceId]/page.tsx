"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Trophy, ArrowRight, RotateCcw } from "lucide-react";
import { getQuestions, repondre, updateProgression, getExercises, type Question } from "@/lib/api";

interface ResultItem {
  question: Question;
  userAnswer: string;
  statut: "correct" | "incorrect";
  reponse_correcte: string;
}

export default function QuizPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const exerciceId = parseInt(params.exerciceId as string);
  const leconId = parseInt(searchParams.get("lecon_id") ?? "1");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<ResultItem | null>(null);
  const [quizTermine, setQuizTermine] = useState(false);
  const [allExercises, setAllExercises] = useState<number[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Charger tous les exercices de la leçon
        if (leconId) {
          const exercises = await getExercises(leconId);
          const ids = exercises.map((e: any) => e.id);
          setAllExercises(ids);
          const idx = ids.indexOf(exerciceId);
          setCurrentExerciseIndex(idx >= 0 ? idx : 0);
        }
        const data = await getQuestions(exerciceId);
        setQuestions(data);
      } catch (err) {
        console.error("Erreur questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [exerciceId, leconId]);

  const currentQuestion = questions[currentIndex];

  const handleSubmit = async () => {
    if (!answer.trim() || !currentQuestion) return;
    setSubmitting(true);
    try {
      const res = await repondre(currentQuestion.id, answer);
      const result: ResultItem = {
        question: currentQuestion,
        userAnswer: answer,
        statut: res.statut,
        reponse_correcte: res.reponse_correcte,
      };
      const newResults = [...results, result];
      setResults(newResults);
      setLastResult(result);
      setShowFeedback(true);

      // Avancer après 1.5s
      setTimeout(async () => {
        setShowFeedback(false);
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setAnswer("");
        } else {
          // Dernier exercice de la leçon ?
          const isLastExercise = currentExerciseIndex === allExercises.length - 1;
          if (isLastExercise) {
            // Calculer score et sauvegarder progression
            const corrects = newResults.filter((r) => r.statut === "correct").length;
            const score = Math.round((corrects / newResults.length) * 100);
            await updateProgression(leconId, {
              score,
              statut: "termine",
            });
            setQuizTermine(true);
          }
          setShowResult(true);
        }
        setSubmitting(false);
      }, 1500);
    } catch (err) {
      console.error("Erreur réponse:", err);
      setSubmitting(false);
    }
  };

  const handleNextExercice = () => {
    const nextId = allExercises[currentExerciseIndex + 1];
    if (nextId) {
      router.push(`/dashboard/quizzes/${nextId}?lecon_id=${leconId}`);
    }
  };

  const scoreCorrects = results.filter((r) => r.statut === "correct").length;
  const scorePct = results.length > 0
    ? Math.round((scoreCorrects / results.length) * 100)
    : 0;

  // ============================
  // ECRAN DE CHARGEMENT
  // ============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-500">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Aucune question disponible.</p>
          <button
            onClick={() => router.push("/dashboard/lessons?refresh=" + Date.now())}
            className="mt-4 rounded-xl bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700"
          >
            Retour aux leçons
          </button>
        </div>
      </div>
    );
  }

  // ============================
  // ECRAN RESULTATS
  // ============================
  if (showResult) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-2xl">
          {/* Score */}
          <div className={`rounded-2xl p-8 text-center text-white mb-6 ${
            scorePct >= 70 ? "bg-green-600" : "bg-orange-500"
          }`}>
            <Trophy size={48} className="mx-auto mb-3" />
            <h2 className="text-3xl font-bold">{scorePct}%</h2>
            <p className="text-lg mt-1">
              {scoreCorrects} / {results.length} bonnes réponses
            </p>
            {quizTermine && (
              <p className="mt-2 text-sm bg-white/20 rounded-full px-4 py-1 inline-block">
                ✅ Leçon terminée ! Score sauvegardé.
              </p>
            )}
          </div>

          {/* Récap des réponses */}
          <div className="space-y-3 mb-6">
            {results.map((r, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  r.statut === "correct"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {r.statut === "correct" ? (
                    <CheckCircle className="text-green-600 mt-0.5 shrink-0" size={18} />
                  ) : (
                    <XCircle className="text-red-500 mt-0.5 shrink-0" size={18} />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">
                      {r.question.question}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Ta réponse :{" "}
                      <span className={r.statut === "correct" ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                        {r.userAnswer}
                      </span>
                    </p>
                    {r.statut === "incorrect" && (
                      <p className="text-xs text-green-600 mt-0.5">
                        Bonne réponse : <span className="font-medium">{r.reponse_correcte}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {!quizTermine && currentExerciseIndex < allExercises.length - 1 && (
              <button
                onClick={handleNextExercice}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700"
              >
                Exercice suivant <ArrowRight size={18} />
              </button>
            )}
            <button
              onClick={() => router.push("/dashboard/lessons?refresh=" + Date.now())}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 font-medium hover:bg-slate-50"
            >
              Retour aux leçons
            </button>
            <button
              onClick={() => {
                setResults([]);
                setCurrentIndex(0);
                setAnswer("");
                setShowResult(false);
                setQuizTermine(false);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-slate-700 font-medium hover:bg-slate-50"
            >
              <RotateCcw size={16} /> Recommencer cet exercice
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================
  // ECRAN QUESTION
  // ============================
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-2xl p-6">

        {/* Header progression */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Exercice {currentExerciseIndex + 1}/{allExercises.length}
            </span>
            <span className="text-sm font-medium text-green-600">
              Question {currentIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Feedback (correct/incorrect) */}
        {showFeedback && lastResult && (
          <div className={`mb-4 rounded-xl p-4 flex items-center gap-3 ${
            lastResult.statut === "correct"
              ? "bg-green-100 border border-green-300"
              : "bg-red-100 border border-red-300"
          }`}>
            {lastResult.statut === "correct" ? (
              <CheckCircle className="text-green-600" size={22} />
            ) : (
              <XCircle className="text-red-500" size={22} />
            )}
            <div>
              <p className={`font-semibold ${
                lastResult.statut === "correct" ? "text-green-700" : "text-red-600"
              }`}>
                {lastResult.statut === "correct" ? "Bonne réponse ! 🎉" : "Incorrect"}
              </p>
              {lastResult.statut === "incorrect" && (
                <p className="text-sm text-gray-600">
                  La bonne réponse était :{" "}
                  <span className="font-medium text-green-600">
                    {lastResult.reponse_correcte}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Card question */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          {/* Type badge */}
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-4 ${
            currentQuestion.type === "qcm"
              ? "bg-blue-100 text-blue-700"
              : currentQuestion.type === "vrai_faux"
              ? "bg-purple-100 text-purple-700"
              : "bg-orange-100 text-orange-700"
          }`}>
            {currentQuestion.type === "qcm"
              ? "QCM"
              : currentQuestion.type === "vrai_faux"
              ? "Vrai / Faux"
              : "Réponse libre"}
          </span>

          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {currentQuestion.question}
          </h2>

          {/* QCM */}
          
          {currentQuestion.type === "qcm" && (
            <div className="grid grid-cols-1 gap-3">
              {(typeof currentQuestion.options === "string"
                ? JSON.parse(currentQuestion.options)
                : currentQuestion.options ?? []
              ).map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setAnswer(opt)}
                  disabled={submitting}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition ${
                    answer === opt
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 hover:border-green-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* VRAI / FAUX */}
          {currentQuestion.type === "vrai_faux" && (
            <div className="grid grid-cols-2 gap-4">
              {["vrai", "faux"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswer(opt)}
                  disabled={submitting}
                  className={`rounded-xl border-2 py-4 font-bold text-lg capitalize transition ${
                    answer === opt
                      ? opt === "vrai"
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-red-400 bg-red-50 text-red-600"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {opt === "vrai" ? "✅ Vrai" : "❌ Faux"}
                </button>
              ))}
            </div>
          )}

          {/* TEXTE LIBRE */}
          {currentQuestion.type === "texte_libre" && (
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && answer.trim() && !submitting) {
                  handleSubmit();
                }
              }}
              placeholder="Tapez votre réponse..."
              disabled={submitting}
              className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg outline-none focus:border-green-600 disabled:bg-gray-50"
              autoFocus
            />
          )}
        </div>

        {/* Bouton valider */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || submitting}
            className="rounded-xl bg-green-600 px-8 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {submitting
              ? "Vérification..."
              : currentIndex === questions.length - 1
              ? "Terminer"
              : "Question suivante"}
          </button>
        </div>
      </div>
    </div>
  );
}