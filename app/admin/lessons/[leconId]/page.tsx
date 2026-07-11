"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ListChecks,
  Plus,
  Trash2,
} from "lucide-react";
import {
  createExercise,
  createQuestion,
  deleteExercise,
  deleteQuestion,
  getExercises,
  getLeconById,
  type Exercise,
  type Lecon,
  type Question,
} from "@/lib/api";

type QuestionType = "qcm" | "vrai_faux" | "texte_libre";

const emptyQuestionForm = {
  question: "",
  type: "qcm" as QuestionType,
  reponse_correcte: "",
  options: ["", ""],
};

function getLeconIdFromParam(leconId: string | string[] | undefined): number | null {
  const value = Array.isArray(leconId) ? leconId[0] : leconId;
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export default function AdminLessonExercisesPage() {
  const params = useParams<{ leconId?: string | string[] }>();
  const leconId = getLeconIdFromParam(params.leconId);

  const [lecon, setLecon] = useState<Lecon | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formulaire ajout exercice
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [exerciseForm, setExerciseForm] = useState({ titre: "", description: "" });
  const [savingExercise, setSavingExercise] = useState(false);

  // Exercice développé + formulaire ajout question
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState<number | null>(null);
  const [questionForm, setQuestionForm] = useState(emptyQuestionForm);
  const [savingQuestion, setSavingQuestion] = useState(false);

  const load = useCallback(async () => {
    if (!leconId) {
      setError("Leçon introuvable.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [loadedLecon, loadedExercises] = await Promise.all([
        getLeconById(leconId),
        getExercises(leconId),
      ]);
      setLecon(loadedLecon);
      setExercises(loadedExercises);
    } catch {
      setError("Impossible de charger les exercices de cette leçon.");
    } finally {
      setLoading(false);
    }
  }, [leconId]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleCreateExercise = async () => {
    if (!leconId || !exerciseForm.titre) return;
    setSavingExercise(true);
    try {
      const newExercise = await createExercise(leconId, {
        titre: exerciseForm.titre,
        description: exerciseForm.description,
        ordre: exercises.length + 1,
      });
      setExercises([...exercises, { ...newExercise, questions: [] }]);
      setExerciseForm({ titre: "", description: "" });
      setShowExerciseForm(false);
    } catch {
      alert("Erreur lors de la création de l'exercice");
    } finally {
      setSavingExercise(false);
    }
  };

  const handleDeleteExercise = async (id: number) => {
    if (!confirm("Supprimer cet exercice et toutes ses questions ?")) return;
    try {
      await deleteExercise(id);
      setExercises(exercises.filter((ex) => ex.id !== id));
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const toggleExercise = (id: number) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const openQuestionForm = (exerciseId: number) => {
    setQuestionForm(emptyQuestionForm);
    setShowQuestionForm(showQuestionForm === exerciseId ? null : exerciseId);
  };

  const updateOption = (index: number, value: string) => {
    const options = [...questionForm.options];
    options[index] = value;
    setQuestionForm({ ...questionForm, options });
  };

  const addOption = () => {
    setQuestionForm({ ...questionForm, options: [...questionForm.options, ""] });
  };

  const removeOption = (index: number) => {
    if (questionForm.options.length <= 2) return;
    setQuestionForm({
      ...questionForm,
      options: questionForm.options.filter((_, i) => i !== index),
    });
  };

  const isQuestionFormValid = () => {
    if (!questionForm.question.trim()) return false;

    if (questionForm.type === "qcm") {
      const nonEmptyOptions = questionForm.options.map((o) => o.trim()).filter(Boolean);
      return nonEmptyOptions.length >= 2 && nonEmptyOptions.includes(questionForm.reponse_correcte.trim());
    }

    if (questionForm.type === "vrai_faux") {
      return questionForm.reponse_correcte === "vrai" || questionForm.reponse_correcte === "faux";
    }

    return questionForm.reponse_correcte.trim().length > 0;
  };

  const handleCreateQuestion = async (exerciseId: number) => {
    if (!isQuestionFormValid()) return;
    setSavingQuestion(true);
    try {
      const options =
        questionForm.type === "qcm"
          ? questionForm.options.map((o) => o.trim()).filter(Boolean)
          : questionForm.type === "vrai_faux"
            ? ["vrai", "faux"]
            : null;

      const newQuestion = await createQuestion(exerciseId, {
        question: questionForm.question,
        type: questionForm.type,
        reponse_correcte: questionForm.reponse_correcte,
        options,
      });

      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === exerciseId
            ? { ...ex, questions: [...(ex.questions ?? []), newQuestion] }
            : ex
        )
      );
      setQuestionForm(emptyQuestionForm);
      setShowQuestionForm(null);
    } catch {
      alert("Erreur lors de la création de la question");
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleDeleteQuestion = async (questionId: number, exerciseId: number) => {
    if (!confirm("Supprimer cette question ?")) return;
    try {
      await deleteQuestion(questionId);
      setExercises((prev) =>
        prev.map((ex) =>
          ex.id === exerciseId
            ? { ...ex, questions: (ex.questions ?? []).filter((q) => q.id !== questionId) }
            : ex
        )
      );
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const typeLabel = (type: QuestionType) => {
    if (type === "qcm") return "QCM";
    if (type === "vrai_faux") return "Vrai / Faux";
    return "Texte libre";
  };

  if (loading) {
    return <p className="text-slate-400">Chargement...</p>;
  }

  if (error || !leconId) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error ?? "Leçon introuvable."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/lessons"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft size={16} />
          Retour aux leçons
        </Link>
        <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <ListChecks size={24} />
              Exercices — {lecon?.titre}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Gérez les exercices et leurs questions pour cette leçon.
            </p>
          </div>
          <button
            onClick={() => setShowExerciseForm(!showExerciseForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus size={18} />
            Ajouter un exercice
          </button>
        </div>
      </div>

      {showExerciseForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Nouvel exercice</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              placeholder="Titre de l'exercice"
              value={exerciseForm.titre}
              onChange={(e) => setExerciseForm({ ...exerciseForm, titre: e.target.value })}
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            />
            <input
              placeholder="Description"
              value={exerciseForm.description}
              onChange={(e) => setExerciseForm({ ...exerciseForm, description: e.target.value })}
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreateExercise}
              disabled={savingExercise}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {savingExercise ? "Création..." : "Créer"}
            </button>
            <button
              onClick={() => setShowExerciseForm(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {exercises.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-400">
          Aucun exercice pour cette leçon.
        </div>
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Exercice {exercise.ordre}
                  </p>
                  <h2 className="text-lg font-semibold text-slate-900">{exercise.titre}</h2>
                  <p className="text-sm text-slate-500">{exercise.description}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {(exercise.questions ?? []).length} question
                    {(exercise.questions ?? []).length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleExercise(exercise.id)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Questions
                    {expandedExercise === exercise.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {expandedExercise === exercise.id && (
                <div className="border-t border-slate-100 p-6 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-800">
                      Questions de {exercise.titre}
                    </h3>
                    <button
                      onClick={() => openQuestionForm(exercise.id)}
                      className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
                    >
                      <Plus size={14} />
                      Ajouter une question
                    </button>
                  </div>

                  {showQuestionForm === exercise.id && (
                    <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
                      <input
                        placeholder="Intitulé de la question"
                        value={questionForm.question}
                        onChange={(e) =>
                          setQuestionForm({ ...questionForm, question: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                      />

                      <select
                        value={questionForm.type}
                        onChange={(e) =>
                          setQuestionForm({
                            ...emptyQuestionForm,
                            question: questionForm.question,
                            type: e.target.value as QuestionType,
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                      >
                        <option value="qcm">QCM</option>
                        <option value="vrai_faux">Vrai / Faux</option>
                        <option value="texte_libre">Texte libre</option>
                      </select>

                      {questionForm.type === "qcm" && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-500">Options</p>
                          {questionForm.options.map((option, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                              />
                              <button
                                onClick={() => removeOption(index)}
                                disabled={questionForm.options.length <= 2}
                                className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-30"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={addOption}
                            className="text-sm text-green-600 hover:underline"
                          >
                            + Ajouter une option
                          </button>

                          <select
                            value={questionForm.reponse_correcte}
                            onChange={(e) =>
                              setQuestionForm({ ...questionForm, reponse_correcte: e.target.value })
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                          >
                            <option value="">Choisir la bonne réponse</option>
                            {questionForm.options
                              .map((o) => o.trim())
                              .filter(Boolean)
                              .map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                          </select>
                        </div>
                      )}

                      {questionForm.type === "vrai_faux" && (
                        <select
                          value={questionForm.reponse_correcte}
                          onChange={(e) =>
                            setQuestionForm({ ...questionForm, reponse_correcte: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                        >
                          <option value="">Choisir la bonne réponse</option>
                          <option value="vrai">Vrai</option>
                          <option value="faux">Faux</option>
                        </select>
                      )}

                      {questionForm.type === "texte_libre" && (
                        <input
                          placeholder="Réponse correcte attendue"
                          value={questionForm.reponse_correcte}
                          onChange={(e) =>
                            setQuestionForm({ ...questionForm, reponse_correcte: e.target.value })
                          }
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                        />
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCreateQuestion(exercise.id)}
                          disabled={savingQuestion || !isQuestionFormValid()}
                          className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {savingQuestion ? "Création..." : "Créer"}
                        </button>
                        <button
                          onClick={() => setShowQuestionForm(null)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}

                  {(exercise.questions ?? []).length === 0 ? (
                    <p className="text-sm text-slate-400">Aucune question pour cet exercice.</p>
                  ) : (
                    <div className="space-y-2">
                      {(exercise.questions ?? []).map((question) => (
                        <div
                          key={question.id}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                {typeLabel(question.type)}
                              </span>
                              <p className="text-sm font-medium text-slate-800">
                                {question.question}
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">
                              Réponse correcte : <span className="font-medium">{question.reponse_correcte}</span>
                              {question.options && question.options.length > 0 && (
                                <> · Options : {question.options.join(", ")}</>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteQuestion(question.id, exercise.id)}
                            className="rounded p-1 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
