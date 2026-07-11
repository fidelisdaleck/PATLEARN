"use client";

import { useEffect, useState } from "react";
import { Settings, User, Shield, LogOut, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();

  // Profil
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Déconnexion
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileSuccess(false);
    setProfileError("");
    try {
      await api.put("/api/profile", { username, email });
      await refreshUser();
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(
        err?.response?.data?.message ?? "Erreur lors de la sauvegarde"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setSavingPassword(true);
    try {
      await api.put("/api/password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(
        err?.response?.data?.message ?? "Mot de passe actuel incorrect."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/connexion");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings size={24} />
            Paramètres
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gérez les configurations de votre compte administrateur.
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50"
        >
          <LogOut size={16} />
          {loggingOut ? "Déconnexion..." : "Se déconnecter"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Profil administrateur */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <User size={18} className="text-blue-500" />
            Profil administrateur
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
              {username?.charAt(0)?.toUpperCase() ?? "A"}
            </div>
            <div>
              <p className="font-medium text-slate-800">{username}</p>
              <p className="text-sm text-slate-500">{email}</p>
              <span className="mt-1 inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                Administrateur
              </span>
            </div>
          </div>

          {profileSuccess && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              Profil mis à jour avec succès !
            </div>
          )}
          {profileError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {profileError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Nom d&rsquo;utilisateur
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600 text-sm"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50 transition"
            >
              <Save size={16} />
              {savingProfile ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>

        {/* Sécurité */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Shield size={18} className="text-red-500" />
            Sécurité
          </div>

          {passwordSuccess && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
              Mot de passe modifié avec succès !
            </div>
          )}
          {passwordError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {passwordError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-green-600 text-sm"
              />
            </div>
            <button
              onClick={handleChangePassword}
              disabled={savingPassword || !currentPassword || !newPassword}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50 transition"
            >
              <Shield size={16} />
              {savingPassword ? "Modification..." : "Changer le mot de passe"}
            </button>
          </div>
        </div>

        {/* Infos plateforme */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 md:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-4">
            Informations de la plateforme
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Plateforme", value: "PatLearn" },
              { label: "Version", value: "1.0.0" },
              { label: "Framework Backend", value: "Laravel 12" },
              { label: "Framework Frontend", value: "Next.js 16" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-slate-50 border border-slate-200 p-4"
              >
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="mt-1 font-medium text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}