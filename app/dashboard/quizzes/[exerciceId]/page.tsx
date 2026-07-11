"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import QuestionRenderer from "@/components/quiz/questionRenderer";

import {
  MultipleChoiceQuestionData,
  TextInputQuestionData,
  TrueFalseQuestionData,
  QuestionAnswer,
} from "@/components/quiz/types";
import {
  getExerciseQuestions,
  getLessonExercises,
  submitAnswer,
  type BackendQuestion,
  type Exercise,
} from "@/lib/quizzes";

type Question =
  | MultipleChoiceQuestionData
  | TextInputQuestionData
  | TrueFalseQuestionData;

interface AnswerRecord {
  questionId: number;
  userAnswer: QuestionAnswer;
  isCorrect: boolean;
}

function getExerciseIdFromParam(exerciceId: string | string[] | undefined): number | null {
  const value = Array.isArray(exerciceId) ? exerciceId[0] : exerciceId;
  const exerciseId = Number(value);

  return Number.isInteger(exerciseId) && exerciseId > 0 ? exerciseId : null;
}

function normalizeOptions(options: BackendQuestion["options"]): string[] {
  if (Array.isArray(options)) {
    return options;
  }

  if (typeof options !== "string") {
    return [];
  }

  try {
    const parsedOptions = JSON.parse(options);

    return Array.isArray(parsedOptions) ? parsedOptions : [];
  } catch {
    return [];
  }
}

function formatQuestion(question: BackendQuestion): Question {
  if (question.type === "qcm") {
    return {
      id: question.id,
      type: "multiple_choice",
      instruction: "Choisissez la bonne réponse",
      question: question.question,
      choices: normalizeOptions(question.options).map((option, index) => ({
        id: index + 1,
        text: option,
      })),
    };
  }

  if (question.type === "vrai_faux") {
    return {
      id: question.id,
      type: "true_false",
      instruction: "Vrai ou Faux",
      question: question.question,
      note: "Choisissez la bonne réponse.",
    };
  }

  return {
    id: question.id,
    type: "text_input",
    question: question.question,
    hint: "Une seule réponse attendue.",
    placeholder: "Votre réponse...",
  };
}

export default function LessonPage() {
  const params = useParams<{ exerciceId?: string | string[] }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const exerciseId = getExerciseIdFromParam(params.exerciceId);
  const leconId = searchParams.get("leconId");
  const scoreSoFar = Number(searchParams.get("scoreSoFar") ?? "0");
  const totalSoFar = Number(searchParams.get("totalSoFar") ?? "0");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [backendQuestions, setBackendQuestions] = useState<BackendQuestion[]>([]);
  const [lessonExercises, setLessonExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<QuestionAnswer>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const leconIdNumber = Number(leconId);

    if (!leconIdNumber) {
      setLessonExercises([]);
      return;
    }

    let isMounted = true;

    getLessonExercises(leconIdNumber)
      .then((exercises) => {
        if (isMounted) {
          setLessonExercises(exercises);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLessonExercises([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [leconId]);

  const loadQuestions = useCallback(async () => {
    if (!exerciseId) {
      setError("Exercice introuvable.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const loadedQuestions = await getExerciseQuestions(exerciseId);
      setBackendQuestions(loadedQuestions);
      setQuestions(loadedQuestions.map(formatQuestion));
      setCurrentIndex(0);
      setAnswer(null);
      setAnswers([]);
    } catch {
      setError("Impossible de charger les questions de cet exercice.");
    } finally {
      setLoading(false);
    }
  }, [exerciseId]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const question = questions[currentIndex];
  const backendQuestion = backendQuestions[currentIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-5xl p-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
            <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
            <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
            <div className="h-16 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-16 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle size={20} />
            <span>Erreur de chargement</span>
          </div>
          <p className="mt-2 text-sm">{error}</p>
          <button
            type="button"
            onClick={loadQuestions}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RotateCcw size={16} />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!question || !backendQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Aucune question trouvée.</p>
      </div>
    );
  }

  async function handleNextQuestion() {
    if (!backendQuestion || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitAnswer(backendQuestion.id, String(answer ?? ""));
      const isCorrect = result.statut === "correct";

      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = {
        questionId: backendQuestion.id,
        userAnswer: answer,
        isCorrect,
      };
      setAnswers(updatedAnswers);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setAnswer(null);
      } else {
        const correctCount = updatedAnswers.filter((a) => a.isCorrect).length;
        const cumulativeScore = scoreSoFar + correctCount;
        const cumulativeTotal = totalSoFar + questions.length;
        const encodedLeconId = leconId || "unknown";

        const currentPosition = lessonExercises.findIndex((ex) => ex.id === exerciseId);
        const nextExercise =
          currentPosition >= 0 ? lessonExercises[currentPosition + 1] : undefined;

        if (nextExercise) {
          router.push(
            `/dashboard/quizzes/${nextExercise.id}?leconId=${encodedLeconId}&scoreSoFar=${cumulativeScore}&totalSoFar=${cumulativeTotal}`
          );
        } else {
          router.push(
            `/dashboard/quizzes/results?score=${cumulativeScore}&total=${cumulativeTotal}&leconId=${encodedLeconId}`
          );
        }
      }
    } catch {
      setError("Erreur lors de la soumission de la réponse. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  }

  const isAnswerValid =
    answer !== null &&
    !(typeof answer === "string" && answer.trim() === "");

  const exercisePosition = lessonExercises.findIndex((ex) => ex.id === exerciseId);
  const isLastExerciseOfLesson =
    exercisePosition === -1 || exercisePosition === lessonExercises.length - 1;
  const isLastQuestionOfExercise = currentIndex === questions.length - 1;

  const nextButtonLabel = submitting
    ? "Vérification..."
    : !isLastQuestionOfExercise
      ? "Question suivante"
      : isLastExerciseOfLesson
        ? "Terminer la leçon"
        : "Exercice suivant";

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl p-6">
        {lessonExercises.length > 0 && (
          <p className="mb-4 text-sm font-medium text-slate-500">
            Exercice {exercisePosition + 1} / {lessonExercises.length} · Question{" "}
            {currentIndex + 1} / {questions.length}
          </p>
        )}

        <QuestionRenderer
          question={question}
          answer={answer}
          onAnswer={setAnswer}
        />

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswerValid || submitting}
            className="rounded-xl bg-green-600 px-8 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {nextButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
