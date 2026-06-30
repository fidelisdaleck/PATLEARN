"use client";

import { Search, Plus, MoreHorizontal } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean@patlearn.com",
    role: "Apprenant",
    status: "Actif",
    joined: "12 Juin 2026",
  },
  {
    id: 2,
    name: "Marie Ndzi",
    email: "marie@patlearn.com",
    role: "Administrateur",
    status: "Actif",
    joined: "05 Juin 2026",
  },
  {
    id: 3,
    name: "Paul Ebogo",
    email: "paul@patlearn.com",
    role: "Apprenant",
    status: "Suspendu",
    joined: "28 Mai 2026",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Utilisateurs
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gérez les comptes des apprenants et administrateurs.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700">
          <Plus size={18} />
          Ajouter
        </button>

      </div>

      {/* Search + Filters */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full max-w-md">

          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            placeholder="Rechercher un utilisateur..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 outline-none focus:border-green-600"
          />

        </div>

        <div className="flex gap-3">

          <select className="rounded-lg border border-slate-200 px-4 py-2">
            <option>Tous les rôles</option>
            <option>Administrateur</option>
            <option>Apprenant</option>
          </select>

          <select className="rounded-lg border border-slate-200 px-4 py-2">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Suspendu</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm text-slate-500">

              <th className="px-6 py-4">Utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                      {user.name.charAt(0)}
                    </div>

                    <span className="font-medium text-slate-800">
                      {user.name}
                    </span>

                  </div>

                </td>

                <td>{user.email}</td>

                <td>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                    {user.role}
                  </span>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm

                    ${
                      user.status === "Actif"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td>{user.joined}</td>

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