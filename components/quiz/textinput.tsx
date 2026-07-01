"use client";

import { Volume2 } from "lucide-react";

interface TextInputProps {
  question: {
    id: number;
    question: string;
    hint?: string;
    audio?: string | null;
    placeholder?: string;
  };

  answer: string;

  onAnswer: (value: string) => void;
}

export default function TextInput({question, answer, onAnswer}: TextInputProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">

      {/* Titre */}

      <div className="flex items-center justify-between">

        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Traduisez cette phrase
        </span>

        {question.audio && (
          <button className="flex items-center gap-2 rounded-full border border-green-600 px-4 py-2 text-green-600 transition hover:bg-green-50">
            <Volume2 size={18} />
            Écouter
          </button>
        )}

      </div>

      {/* Carte */}

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">

        {question.hint && (
          <p className="mb-3 text-sm font-medium text-green-600">
            NOTE • {question.hint}
          </p>
        )}

        <h2 className="text-3xl font-bold leading-tight text-slate-900">
          {question.question}
        </h2>

      </div>

      {/* Champ */}

      <input
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder={question.placeholder ?? "Votre traduction..."}
        className="
            h-16
            rounded-2xl
            border
            border-slate-300
            px-6
            text-lg
            outline-none
            transition
            focus:border-green-600
            focus:ring-4
            focus:ring-green-100
        "
      />

    </div>
  );
}