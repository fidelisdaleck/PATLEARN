"use client";

import {
  Users,
  Globe,
  BookOpen,
  FileText,
} from "lucide-react";

import { useMemo } from "react";

export default function DashboardPage() {
  // DATA MOCK (layout data)
  const stats = useMemo(
    () => [
      {
        label: "Utilisateurs",
        value: "1 250",
        icon: Users,
        color: "text-green-600",
        bg: "bg-green-50",
      },
      {
        label: "Langues",
        value: "12",
        icon: Globe,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      },
      {
        label: "Cours",
        value: "185",
        icon: BookOpen,
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        label: "Leçons",
        value: "540",
        icon: FileText,
        color: "text-orange-600",
        bg: "bg-orange-50",
      },
    ],
    []
  );

  const activities = [
    {
      text: "John a terminé la leçon 12",
      time: "Il y a 2 min",
    },
    {
      text: "Nouvelle langue ajoutée : Ewondo",
      time: "Il y a 1h",
    },
    {
      text: "Cours 'Bassa débutant' publié",
      time: "Hier",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Vue d&rsquo;ensemble de la plateforme PatLearn
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-2 ${stat.bg}`}
                >
                  <Icon className={stat.color} size={20} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* CHART SECTION */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Progression des apprenants
          </h2>

          {/* Mock chart */}
          <div className="flex h-64 items-end gap-2">
            {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-md bg-blue-700"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Activité des 7 derniers jours
          </p>
        </div>

        {/* ACTIVITY */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Activités récentes
          </h2>

          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="border-b border-slate-100 pb-3">
                <p className="text-sm text-slate-700">{a.text}</p>
                <p className="text-xs text-slate-400">{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Actions rapides
        </h2>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
            + Ajouter un cours
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Ajouter une langue
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Créer une leçon
          </button>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Voir statistiques
          </button>
        </div>
      </div>

    </div>
  );
}