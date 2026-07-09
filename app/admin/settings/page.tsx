"use client";

import { useState } from "react";
import { Settings, User, Shield, Globe } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("Admin PatLearn");
  const [email, setEmail] = useState("admin@patlearn.com");
  const [language, setLanguage] = useState("fr");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings /> Paramètres
        </h1>
        <p className="text-gray-500">
          Gérer les configurations de la plateforme PatLearn
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profil */}
        <div className="bg-white shadow rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 font-semibold">
            <User className="text-blue-500" />
            Profil administrateur
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Nom</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Sauvegarder
            </button>
          </div>
        </div>

        {/* Préférences */}
        <div className="bg-white shadow rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 font-semibold">
            <Globe className="text-green-500" />
            Préférences plateforme
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">
                Langue par défaut
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              >
                <option value="fr">Français</option>
                <option value="en">Anglais</option>
                <option value="pidgin">Pidgin</option>
              </select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-3">
              <span className="text-sm text-gray-600">
                Notifications système
              </span>

              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Appliquer
            </button>
          </div>
        </div>

        {/* Sécurité */}
        <div className="bg-white shadow rounded-xl p-5 space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="text-red-500" />
            Sécurité
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Mot de passe</h3>
              <p className="text-sm text-gray-500">
                Modifier votre mot de passe administrateur
              </p>
              <button className="mt-3 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">
                Changer
              </button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium">Sessions actives</h3>
              <p className="text-sm text-gray-500">
                Voir et gérer les connexions actives
              </p>
              <button className="mt-3 bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-black">
                Gérer
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
