"use client";

import { Languages, Plus, Search, MoreVertical, BookOpen } from "lucide-react";

const languages = [
  {
    id: 1,
    name: "Douala",
    code: "DUA",
    courses: 24,
    learners: 1250,
    status: "Active",
  },
  {
    id: 2,
    name: "Ewondo",
    code: "EWO",
    courses: 18,
    learners: 980,
    status: "Active",
  },
  {
    id: 3,
    name: "Bassa",
    code: "BAS",
    courses: 12,
    learners: 630,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Fulfulde",
    code: "FUL",
    courses: 9,
    learners: 510,
    status: "Active",
  },
];

export default function LanguagesPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Langues
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les langues disponibles sur PatLearn.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
          <Plus size={18} />
          Ajouter une langue
        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Rechercher une langue..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 outline-none focus:border-green-600"
        />

      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {languages.map((language) => (

          <div
            key={language.id}
            className="rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >

            {/* Header */}

            <div className="flex items-start justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <Languages
                  size={28}
                  className="text-green-600"
                />
              </div>

              <button className="rounded-lg p-2 hover:bg-slate-100">
                <MoreVertical size={18} />
              </button>

            </div>

            {/* Infos */}

            <div className="mt-5">

              <h2 className="text-lg font-semibold text-slate-900">
                {language.name}
              </h2>

              <p className="text-sm text-slate-500">
                Code : {language.code}
              </p>

            </div>

            {/* Stats */}

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen size={16} />
                  Cours
                </span>

                <span className="font-medium">
                  {language.courses}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Apprenants
                </span>

                <span className="font-medium">
                  {language.learners}
                </span>

              </div>

            </div>

            {/* Status */}

            <div className="mt-6">

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium

                ${
                  language.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {language.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}