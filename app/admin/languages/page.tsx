"use client";

import { Globe, Plus, Search, Trash2, ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCours,
  createCours,
  deleteCours,
  getLecons,
  createLecon,
  deleteLecon,
  type Cours,
  type Lecon,
} from "@/lib/api";

export default function LanguagesPage() {
  const [cours, setCours] = useState<Cours[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nom: "", description: "" });
  const [saving, setSaving] = useState(false);

  // Leçons par cours
  const [expandedCours, setExpandedCours] = useState<number | null>(null);
  const [leconsByCours, setLeconsByCours] = useState<Record<number, Lecon[]>>({});
  const [loadingLecons, setLoadingLecons] = useState(false);

  // Formulaire ajout leçon
  const [showLeconForm, setShowLeconForm] = useState<number | null>(null);
  const [leconForm, setLeconForm] = useState({ titre: "", description: "" });
  const [savingLecon, setSavingLecon] = useState(false);

  const fetchCours = async () => {
    try {
      const data = await getCours();
      setCours(data);
    } catch (err) {
      console.error("Erreur cours:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCours();
  }, []);

  const handleCreateCours = async () => {
    if (!form.nom) return;
    setSaving(true);
    try {
      const newCours = await createCours(form);
      setCours([...cours, newCours]);
      setForm({ nom: "", description: "" });
      setShowForm(false);
    } catch {
      alert("Erreur lors de la création du cours");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCours = async (id: number) => {
    if (!confirm("Supprimer ce cours et toutes ses leçons ?")) return;
    try {
      await deleteCours(id);
      setCours(cours.filter((c) => c.id !== id));
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const toggleLecons = async (coursId: number) => {
    if (expandedCours === coursId) {
      setExpandedCours(null);
      return;
    }
    setExpandedCours(coursId);
    if (!leconsByCours[coursId]) {
      setLoadingLecons(true);
      try {
        const data = await getLecons(coursId);
        setLeconsByCours((prev) => ({ ...prev, [coursId]: data }));
      } catch {
        console.error("Erreur leçons");
      } finally {
        setLoadingLecons(false);
      }
    }
  };

  const handleCreateLecon = async (coursId: number) => {
    if (!leconForm.titre) return;
    setSavingLecon(true);
    try {
      const lecons = leconsByCours[coursId] ?? [];
      const newLecon = await createLecon(coursId, {
        titre: leconForm.titre,
        description: leconForm.description,
        ordre: lecons.length + 1,
      });
      setLeconsByCours((prev) => ({
        ...prev,
        [coursId]: [...(prev[coursId] ?? []), newLecon],
      }));
      setLeconForm({ titre: "", description: "" });
      setShowLeconForm(null);
    } catch {
      alert("Erreur lors de la création de la leçon");
    } finally {
      setSavingLecon(false);
    }
  };

  const handleDeleteLecon = async (leconId: number, coursId: number) => {
    if (!confirm("Supprimer cette leçon ?")) return;
    try {
      await deleteLecon(leconId);
      setLeconsByCours((prev) => ({
        ...prev,
        [coursId]: prev[coursId].filter((l) => l.id !== leconId),
      }));
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const filtered = cours.filter((c) =>
    c.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Langues & Cours</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gérez les langues et leurs leçons sur PattLearn.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          Ajouter une langue
        </button>
      </div>

      {/* Formulaire ajout cours */}
      {showForm && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Nouveau cours</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              placeholder="Nom de la langue (ex: Duala)"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCreateCours}
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

      {/* Recherche */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Rechercher une langue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 outline-none focus:border-green-600"
        />
      </div>

      {/* Liste des cours */}
      {loading ? (
        <p className="text-slate-400">Chargement...</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              {/* Header du cours */}
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                    <Globe size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {c.nom}
                    </h2>
                    <p className="text-sm text-slate-500">{c.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLecons(c.id)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <BookOpen size={16} />
                    Leçons
                    {expandedCours === c.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteCours(c.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Leçons du cours */}
              {expandedCours === c.id && (
                <div className="border-t border-slate-100 p-6 bg-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-slate-800">
                      Leçons de {c.nom}
                    </h3>
                    <button
                      onClick={() =>
                        setShowLeconForm(
                          showLeconForm === c.id ? null : c.id
                        )
                      }
                      className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
                    >
                      <Plus size={14} />
                      Ajouter une leçon
                    </button>
                  </div>

                  {/* Formulaire ajout leçon */}
                  {showLeconForm === c.id && (
                    <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 space-y-3">
                      <input
                        placeholder="Titre de la leçon"
                        value={leconForm.titre}
                        onChange={(e) =>
                          setLeconForm({ ...leconForm, titre: e.target.value })
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                      />
                      <input
                        placeholder="Description"
                        value={leconForm.description}
                        onChange={(e) =>
                          setLeconForm({
                            ...leconForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-green-600"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCreateLecon(c.id)}
                          disabled={savingLecon}
                          className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {savingLecon ? "Création..." : "Créer"}
                        </button>
                        <button
                          onClick={() => setShowLeconForm(null)}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Liste des leçons */}
                  {loadingLecons ? (
                    <p className="text-sm text-slate-400">Chargement...</p>
                  ) : (leconsByCours[c.id] ?? []).length === 0 ? (
                    <p className="text-sm text-slate-400">
                      Aucune leçon pour ce cours.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {(leconsByCours[c.id] ?? []).map((lecon) => (
                        <div
                          key={lecon.id}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-700">
                              {lecon.ordre}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {lecon.titre}
                              </p>
                              <p className="text-xs text-slate-500">
                                {lecon.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                lecon.statut === "debloque"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {lecon.statut === "debloque"
                                ? "Débloqué"
                                : "Verrouillé"}
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteLecon(lecon.id, c.id)
                              }
                              className="rounded p-1 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}