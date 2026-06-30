"use client";

import {
  Search,
  Plus,
  MoreHorizontal,
  BookOpen,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Douala - Niveau Débutant",
    language: "Douala",
    level: "Débutant",
    lessons: 15,
    students: 245,
    status: "Publié",
    createdAt: "12 Juin 2026",
  },
  {
    id: 2,
    title: "Ewondo - Niveau Intermédiaire",
    language: "Ewondo",
    level: "Intermédiaire",
    lessons: 20,
    students: 180,
    status: "Publié",
    createdAt: "02 Juin 2026",
  },
  {
    id: 3,
    title: "Bassa - Expressions courantes",
    language: "Bassa",
    level: "Débutant",
    lessons: 10,
    students: 75,
    status: "Brouillon",
    createdAt: "28 Mai 2026",
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Cours
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les cours disponibles sur PatLearn.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition">
          <Plus size={18} />
          Nouveau cours
        </button>

      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Rechercher un cours..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 outline-none focus:border-green-600"
          />

        </div>

        <div className="flex gap-3">

          <select className="rounded-lg border border-slate-200 px-4 py-2">
            <option>Toutes les langues</option>
            <option>Douala</option>
            <option>Ewondo</option>
            <option>Bassa</option>
          </select>

          <select className="rounded-lg border border-slate-200 px-4 py-2">
            <option>Tous les niveaux</option>
            <option>Débutant</option>
            <option>Intermédiaire</option>
            <option>Avancé</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm text-slate-500">

              <th className="px-6 py-4">Cours</th>
              <th>Langue</th>
              <th>Niveau</th>
              <th>Leçons</th>
              <th>Apprenants</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            {courses.map((course) => (

              <tr
                key={course.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-green-50 p-2">
                      <BookOpen
                        size={20}
                        className="text-green-600"
                      />
                    </div>

                    <span className="font-medium text-slate-800">
                      {course.title}
                    </span>

                  </div>

                </td>

                <td>{course.language}</td>

                <td>{course.level}</td>

                <td>{course.lessons}</td>

                <td>{course.students}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium

                    ${
                      course.status === "Publié"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status}
                  </span>

                </td>

                <td>{course.createdAt}</td>

                <td>

                  <button className="rounded-lg p-2 hover:bg-slate-100">
                    <MoreHorizontal size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}