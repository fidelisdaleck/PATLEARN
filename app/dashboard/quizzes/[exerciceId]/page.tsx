"use client";

import { useState } from "react";

import QuestionRenderer from "@/components/quiz/questionRenderer";

import {
  MultipleChoiceQuestionData,
  TextInputQuestionData,
  TrueFalseQuestionData,
  QuestionAnswer,
} from "@/components/quiz/types";

type Question =
  | MultipleChoiceQuestionData
  | TextInputQuestionData
  | TrueFalseQuestionData;

const questions: Question[] = [
  {
    id: 1,
    type: "multiple_choice",
    instruction: "Choisissez la bonne réponse",
    question: "Comment dit-on Bonjour en Douala ?",
    note: "Utilisé jusqu'à midi",
    choices: [
      {
        id: 1,
        text: "A nènè",
      },
      {
        id: 2,
        text: "Idiba bwam",
      },
      {
        id: 3,
        text: "Na som",
      },
      {
        id: 4,
        text: "Mbôa",
      },
    ],
  },

 {
  id: 2,
  type: "text_input",
  question: "Comment dit-on Merci en Douala ?",
  hint: "Une seule réponse attendue.",
  placeholder: "Votre réponse...",
},

  {
    id: 3,
    type: "true_false",
    instruction: "Vrai ou Faux",
    question: "Le Douala est une langue camerounaise.",
    note: "Choisissez la bonne réponse.",
  },
];

export default function LessonPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<QuestionAnswer>(null);

  const question = questions[currentIndex];

  if (!question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Aucune question trouvée.</p>
      </div>
    );
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer(null);
    } else {
      console.log("Quiz terminé !");
      // TODO : Afficher la page de résultats
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
            onClick={nextQuestion}
            disabled={!isAnswerValid}
            className="rounded-xl bg-green-600 px-8 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {currentIndex === questions.length - 1
              ? "Terminer"
              : "Question suivante"}
          </button>
        </div>
      </div>
    </div>
  );
}