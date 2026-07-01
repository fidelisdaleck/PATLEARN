"use client";

import OptionCard from "./optionCard";
import { MultipleChoiceQuestionData} from "./types";

interface Props {
  question: MultipleChoiceQuestionData;

  answer: number | null;

  onAnswer: (choiceId: number) => void;
}

export default function MultipleChoiceQuestion({
  question,
  answer,
  onAnswer,
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">

      {/* Instruction */}

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          {question.instruction}
        </span>
      </div>

      {/* Carte de question */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">

        {question.note && (
          <p className="mb-3 text-sm font-semibold uppercase text-green-600">
            NOTE
          </p>
        )}

        {question.note && (
          <p className="mb-5 text-sm text-slate-600">
            {question.note}
          </p>
        )}

        <h2 className="text-3xl font-bold leading-tight text-slate-900">
          {question.question}
        </h2>

      </div>

      {/* Réponses */}

      <div className="space-y-4">

        {question.choices.map((choice) => (
          <OptionCard
            key={choice.id}
            text={choice.text}
            selected={answer === choice.id}
            onClick={() => onAnswer(choice.id)}
          />
        ))}

      </div>

    </div>
  );
}