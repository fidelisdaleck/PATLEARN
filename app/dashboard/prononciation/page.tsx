"use client";

import { useState } from "react";
import { Volume2, Mic, ArrowRight } from "lucide-react";

export default function PronunciationPage() {
  const words = [
    { word: "Mbolo", meaning: "Bonjour" },
    { word: "Ndolo", meaning: "Amour" },
    { word: "Sawa", meaning: "Ça va" },
  ];

  const [current, setCurrent] = useState(0);

  const currentWord = words[current];
  const progress = ((current + 1) / words.length) * 100;

  // Simulation audio (à remplacer plus tard)
  const playAudio = () => {
    alert(`Lecture audio: ${currentWord.word}`);
  };

  const nextWord = () => {
    if (current < words.length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="w-full max-w-none px-10 py-6">
      {/* Title */}
      <h2 className="text-4xl md:text-6xl font-semibold">
        Prononciation <span className="text-[#1e7f43]">Duala</span>
      </h2>

      <p className="text-[#444444] text-xl mt-2">
        Écoute et répète les mots 
      </p>

      {/* Progress */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progression</span>
          <span className="text-sm text-gray-500">
            {current + 1} / {words.length}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-[#1e7f43] h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Card principale */}
      <div className="mt-10 bg-white p-10 rounded-xl shadow-sm text-center">
        {/* Mot */}
        <h3 className="text-4xl font-bold">{currentWord.word}</h3>
        <p className="text-gray-500 mt-2">{currentWord.meaning}</p>

        {/* Bouton audio */}
        <div className="flex justify-center mt-6">
          <button
            onClick={playAudio}
            className="bg-[#1E7F43] text-white p-4 rounded-full hover:bg-green-800 transition"
          >
            <Volume2 size={28} />
          </button>
        </div>

        {/* Micro (simulation) */}
        <div className="flex justify-center mt-6">
          <button className="bg-gray-100 p-4 rounded-full hover:bg-gray-200 transition">
            <Mic size={28} />
          </button>
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-center mt-10">
        <button
          onClick={nextWord}
          className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-[#1E7F43] text-white py-3 rounded-xl font-bold hover:bg-green-800 transition"
        >
          Mot suivant
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}