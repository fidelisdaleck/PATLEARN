"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  getCours,
  getLecons,
  createLecon,
  deleteLecon,
  type Cours,
  type Lecon,
} from "@/lib/api";

export default function LessonsPage() {
  const [cours, setCours] = useState<Cours[]>([]);
  const [lecons, setLecons] = useState<Lecon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCours, setSelectedCours] = useState<number | "all">("all");
  const [search, setSearch] = useState("");

  // Formulaire ajout leçon
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    cours_id: "",
    titre: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  // Charger tous les cours
  useEffect(() => {
    const fetchCours = async () => {
      try {
        const data = await getCours();
        setCours(data);
      } catch (err) {
        console.error("Erreur cours:", err);
      }
    };
    fetchCours();
  }, []);

  // Charger les leçons selon le cours sélectionné
  useEffect(() => {
    const fetchLecons = async () => {
      setLoading(true);
      try {
        if (selectedCours === "all") {
          // Charger toutes les leçons de tous les cours
          const allLecons: Lecon[] = [];
          for (const c of cours) {
            const data = await getLecons(c.id);
            allLecons.push(...data);
          }
          setLecons(allLecons);
        } else {
          const data = await getLecons(selectedCours);
          setLecons(data);
        }
      } catch (err) {
        console.error("Erreur leçons:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cours.length > 0) {
      fetchLecons();
    }
  }, [cours, selectedCours]);

  const handleCreate = async () => {
    if (!form.cours_id || !form.titre) return;
    setSaving(true);
    try {
      const coursId = parseInt(form.cours_id);
      const leconsForCours = lecons.filter((l) => l.cours_id === coursId);
      const newLecon = await createLecon(coursId, {
        titre: form.titre,
        description: form.description,
        ordre: leconsForCours.length + 1,
      });
      setLecons([...lecons, newLecon]);
      setForm({ cours_id: "", titre: "", description: "" });
      setShowForm(false);
    } catch {
      alert("Erreur lors de la création de la leçon");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette leçon ?")) return;
    try {
      await deleteLecon(id);
      setLecons(lecons.filter((l) => l.id !== id));
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const getCoursNom = (cours_id: number) => {
    return cours.find((c) => c.id === cours_id)?.nom ?? "Inconnu";
  };

  const filtered = lecons.filter(
    (l) =>
      l.titre.toLowerCase().includes(search.toLowerCase()) ||
      getCoursNom(l.cours_id).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen size={24} />
            Leçons
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérez les leçons de la plateforme PattLearn.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus size={18} />
          Ajouter une leçon
        </button>
      </div>

      {/* Formulaire ajout */}
      {showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Nouvelle leçon</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              value={form.cours_id}
              onChange={(e) => setForm({ ...form, cours_id: e.target.value })}
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            >
              <option value="">Choisir un cours</option>
              {cours.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
            <input
              placeholder="Titre de la leçon"
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={saving}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Création..." : "Créer"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Filtres */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex items-center gap-2 text-slate-600">
          <Filter size={18} />
          <span className="text-sm font-medium">Filtres</span>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Rechercher une leçon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-green-600"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCours}
              onChange={(e) =>
                setSelectedCours(
                  e.target.value === "all" ? "all" : parseInt(e.target.value)
                )
              }
              className="appearance-none border border-slate-200 rounded-lg px-4 py-2 pr-8 text-sm outline-none focus:border-green-600"
            >
              <option value="all">Toutes les langues</option>
              {cours.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nom}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr className="text-slate-500">
              <th className="px-6 py-4">Titre</th>
              <th className="py-4">Langue</th>
              <th className="py-4">Ordre</th>
              <th className="py-4">Statut</th>
              <th className="py-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Chargement...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Aucune leçon trouvée
                </td>
              </tr>
            ) : (
              filtered.map((lecon) => (
                <tr
                  key={lecon.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {lecon.titre}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {getCoursNom(lecon.cours_id)}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500">
                    Leçon {lecon.ordre}
                  </td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        lecon.statut === "debloque"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {lecon.statut === "debloque" ? "Débloqué" : "Verrouillé"}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleDelete(lecon.id)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Total */}
      {!loading && (
        <p className="text-sm text-slate-500 text-right">
          {filtered.length} leçon{filtered.length > 1 ? "s" : ""} au total
        </p>
      )}
    </div>
  );
}