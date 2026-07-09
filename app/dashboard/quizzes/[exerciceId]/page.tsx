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
import { getExerciseQuestions, submitAnswer, type BackendQuestion } from "@/lib/quizzes";

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

  const [questions, setQuestions] = useState<Question[]>([]);
  const [backendQuestions, setBackendQuestions] = useState<BackendQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<QuestionAnswer>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
        const totalQuestions = questions.length;
        const encodedLeconId = leconId || "unknown";

        router.push(
          `/dashboard/quizzes/results?score=${correctCount}&total=${totalQuestions}&leconId=${encodedLeconId}`
        );
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

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl p-6">
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
