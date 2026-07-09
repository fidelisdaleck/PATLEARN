"use client";

import { BookOpen, Plus, Edit, Trash2, Filter } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  language: string;
  level: string;
  duration: string;
};

const initialLessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction à l'Ewondo",
    language: "Ewondo",
    level: "Débutant",
    duration: "10 min",
  },
  {
    id: 2,
    title: "Salutations de base",
    language: "Bassa",
    level: "Débutant",
    duration: "8 min",
  },
  {
    id: 3,
    title: "Grammaire essentielle",
    language: "Duala",
    level: "Intermédiaire",
    duration: "15 min",
  },
];

export default function LessonsPage() {
  const lessons = initialLessons;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen /> Lessons
          </h1>
          <p className="text-gray-500">
            Gérer les leçons de la plateforme PatLearn
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} />
          Ajouter une leçon
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter size={18} />
          <span className="text-sm">Filtres</span>
        </div>

        <div className="flex gap-3">
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Toutes les langues</option>
            <option>Ewondo</option>
            <option>Bassa</option>
            <option>Duala</option>
          </select>

          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Tous les niveaux</option>
            <option>Débutant</option>
            <option>Intermédiaire</option>
            <option>Avancé</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Titre</th>
              <th className="p-3">Langue</th>
              <th className="p-3">Niveau</th>
              <th className="p-3">Durée</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{lesson.title}</td>
                <td className="p-3">{lesson.language}</td>
                <td className="p-3">{lesson.level}</td>
                <td className="p-3">{lesson.duration}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-green-100 text-green-600">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lessons.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          Aucune leçon disponible pour le moment
        </div>
      )}
    </div>
  );
}
