"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function QuizPage() {
  const quiz = [
    {
      question: "Comment dit-on 'Bonjour' en Duala ?",
      options: ["Mbolo", "Ndolo", "Sawa", "Biso"],
      answer: "Mbolo",
    },
    {
      question: "Que signifie 'Ndolo' ?",
      options: ["Amour", "Maison", "Eau", "Feu"],
      answer: "Amour",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);

  const handleSelect = (option: string) => {
    if (!validated) setSelected(option);
  };

  const handleValidate = () => {
    if (selected) setValidated(true);
  };

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
    setSelected(null);
    setValidated(false);
  };

  const currentQuiz = quiz[current];
  const progress = ((current + 1) / quiz.length) * 100;

  return (
    <div className="w-full max-w-none md:px-10 py-6">
      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-semibold">
        Quiz <span className="text-[#1e7f43]">Duala</span>
      </h2>

      <p className="text-[#444444] text-xl mt-2">
        Teste tes connaissances 
      </p>

      {/* Progress */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progression</span>
          <span className="text-sm text-gray-500">
            {current + 1} / {quiz.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-[#1e7f43] h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold">
          {currentQuiz.question}
        </h3>

        {/* Options */}
        <div className="mt-6 grid gap-4">
          {currentQuiz.options.map((option, index) => {
            const isCorrect = option === currentQuiz.answer;
            const isSelected = option === selected;

            let style = "bg-gray-100 hover:bg-gray-200";

            if (validated) {
              if (isCorrect) style = "bg-green-100 border border-green-600";
              else if (isSelected) style = "bg-red-100 border border-red-600";
            } else if (isSelected) {
              style = "bg-green-50 border border-green-600";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-4 rounded-xl text-left transition ${style}`}
              >
                <div className="flex justify-between items-center">
                  <span>{option}</span>

                  {validated && isCorrect && (
                    <CheckCircle className="text-[#1e7f43]" />
                  )}
                  {validated && isSelected && !isCorrect && (
                    <XCircle className="text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-10">
        {!validated ? (
          <button
            onClick={handleValidate}
            className="w-full md:w-1/2 bg-[#1E7F43] text-white py-3 rounded-xl font-bold hover:bg-green-800 transition"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Question suivante
          </button>
        )}
      </div>
    </div>
  );
}