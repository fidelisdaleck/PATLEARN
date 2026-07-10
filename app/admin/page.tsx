"use client";

import { Users, Globe, BookOpen, FileText, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getStats, type Stats } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.error("Erreur stats:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Utilisateurs",
      value: stats?.users ?? 0,
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
      href: "/admin/users",
    },
    {
      label: "Cours / Langues",
      value: stats?.cours ?? 0,
      icon: Globe,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      href: "/admin/languages",
    },
    {
      label: "Leçons",
      value: stats?.lecons ?? 0,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/admin/lessons",
    },
    {
      label: "Questions",
      value: stats?.questions ?? 0,
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-50",
      href: "/admin/languages",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Vue d&rsquo;ensemble de la plateforme PattLearn
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-600 text-sm">
          Erreur lors du chargement des statistiques.
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {loading ? (
                      <span className="inline-block h-6 w-12 bg-slate-200 rounded animate-pulse" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.bg}`}>
                  <Icon className={stat.color} size={22} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ACTIONS RAPIDES */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/languages"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 transition"
          >
            Gérer les langues
          </Link>
          <Link
            href="/admin/lessons"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            Gérer les leçons
          </Link>
          <Link
            href="/admin/users"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            Gérer les utilisateurs
          </Link>
        </div>
      </div>

      {/* INFO */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-green-600" size={20} />
          <h2 className="text-lg font-semibold text-slate-900">
            À propos de PattLearn
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          PattLearn est une plateforme d&rsquo;apprentissage des langues
          camerounaises. Elle propose des cours interactifs en Duala, Ewondo et
          Médumba et bien d'autres à venir avec des exercices de type QCM, Vrai/Faux et saisie libre.
        </p>
      </div>
    </div>
  );
}