import Link from "next/link";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";

export default function LessonsPage() {
  const lessons = [
    { id: 1, title: "Salutations", status: "done" },
    { id: 2, title: "Se présenter", status: "done" },
    { id: 3, title: "Les nombres", status: "current" },
    { id: 4, title: "La famille", status: "locked" },
    { id: 5, title: "Les aliments", status: "locked" },
  ];

  return (
    <div className="w-full max-w-none px-10 py-6">
      <h2 className="text-4xl md:text-6xl font-semibold">
        Leçons de <span className="text-[#1e7f43]">Duala</span>
      </h2>

      <p className="text-[#444444] text-xl mt-2">
        Continue ton apprentissage progressivement 
      </p>

      {/* Progress globale */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-sm w-full">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Progression</span>
          <span className="text-sm text-gray-500">2 / 5 leçons</span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div className="bg-[#1e7f43] h-3 rounded-full w-[40%]"></div>
        </div>
      </div>

      {/* Liste des leçons */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{lesson.title}</h3>

              {/* Status icon */}
              {lesson.status === "done" && (
                <CheckCircle className="text-[#1e7f43]" />
              )}
              {lesson.status === "current" && (
                <PlayCircle className="text-blue-500" />
              )}
              {lesson.status === "locked" && (
                <Lock className="text-gray-400" />
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2">
              Apprends les bases de {lesson.title}
            </p>

            {/* Action */}
            <div className="mt-4">
              {lesson.status === "locked" ? (
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-400 py-2 rounded-lg cursor-not-allowed"
                >
                  Verrouillé
                </button>
              ) : (
                <Link
                  href={`/lesson/${lesson.id}`}
                  className={`w-full flex items-center justify-center py-2 rounded-lg font-semibold ${
                    lesson.status === "done"
                      ? "bg-green-100 text-green-700"
                      : "bg-[#1E7F43] text-white hover:bg-green-800"
                  }`}
                >
                  {lesson.status === "done"
                    ? "Revoir"
                    : "Commencer"}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}