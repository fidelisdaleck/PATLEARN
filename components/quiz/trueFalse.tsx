"use client";

import OptionCard from "./optionCard";
import { TrueFalseQuestionData } from "./types";

interface Props {
  question: TrueFalseQuestionData;
  answer: boolean | null;
  onAnswer: (value: boolean) => void;
}

export default function TrueFalseQuestionComponent({
  question,
  answer,
  onAnswer,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">

      {/* Instruction */}

      <div>
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          {question.instruction}
        </span>
      </div>

      {/* Question */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">

        {question.note && (
          <>
            <p className="mb-2 text-sm font-semibold text-green-600">
              NOTE
            </p>

            <p className="mb-4 text-sm text-slate-600">
              {question.note}
            </p>
          </>
        )}

        <h2 className="text-3xl font-bold text-slate-900 leading-relaxed">
          {question.question}
        </h2>

      </div>

      {/* Choix */}

      <div className="grid gap-4 sm:grid-cols-2">

        <OptionCard
          text="Vrai"
          selected={answer === true}
          onClick={() => onAnswer(true)}
        />

        <OptionCard
          text="Faux"
          selected={answer === false}
          onClick={() => onAnswer(false)}
        />

      </div>

    </div>
  );
}