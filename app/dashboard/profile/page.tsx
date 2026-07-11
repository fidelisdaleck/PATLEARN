"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Languages, Moon, Save, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/axios";
import Link from "next/link"

export default function ProfilPage() {
  const router = useRouter();
  const { user, logout, refreshUser } = useAuth();

  // Infos personnelles
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

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/connexion");
  };

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

  return (
    <div className="md:px-10">
      <h2 className="text-3xl md:text-5xl font-semibold">Mon profil.</h2>
      <p className="text-[#444444] text-xl mt-2">
        Gères ton compte et tes préférences ici.
      </p>

      {/* CONTAINER: resume */}

      <section className="mt-10 border border-[#33333315] rounded-xl shadow-xl px-10 py-10 space-y-4">
        <h2 className="text-[#1e7f43] text-2xl md:text-4xl font-semibold">
          Informations personelles
        </h2>
        <div className="flex gap-5">
          <div className="border border-[#44444430] rounded-full w-20 h-20 flex items-center justify-center">
            <User size={42} className="text-[#333333]" />
          </div>
          <p className="text-[#1e7f43] font-semibold text-lg mt-5">
            {user?.username ?? "Utilisateur"}
          </p>
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
            <label className="text-sm font-medium text-[#444444]">Nom d&rsquo;utilisateur</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#33333330] px-4 py-2 outline-none focus:border-[#1e7f43] text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#444444]">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#33333330] px-4 py-2 outline-none focus:border-[#1e7f43] text-sm"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            disabled={savingProfile}
            className="flex items-center gap-2 rounded-lg bg-[#1E7F43] px-4 py-2 text-sm text-white hover:bg-[#166335] disabled:opacity-50 transition"
          >
            <Save size={16} />
            {savingProfile ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>

        {/* LOG-OUT */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="mt-10 w-full text-xl flex items-center justify-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl"
          >
            <LogOut size={20} className="text-[#d70404]" />
            Déconnexion
          </button>
        </div>
      </section>

      {/* CONTAINER: sécurité */}

      <section className="mt-10 border border-[#33333315] rounded-xl shadow-xl px-10 py-10 space-y-4">
        <h2 className="text-[#1e7f43] text-2xl md:text-4xl font-semibold flex items-center gap-2">
          <Shield size={30} />
          Sécurité
        </h2>
        <p className="text-[#444444] text-xl">Modifiez votre mot de passe.</p>

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
            <label className="text-sm font-medium text-[#444444]">Mot de passe actuel</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-[#33333330] px-4 py-2 outline-none focus:border-[#1e7f43] text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#444444]">Nouveau mot de passe</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-[#33333330] px-4 py-2 outline-none focus:border-[#1e7f43] text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#444444]">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-[#33333330] px-4 py-2 outline-none focus:border-[#1e7f43] text-sm"
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
      </section>

      {/* CONTAINER: preferences */}

      <section className="mt-10 border border-[#33333315] rounded-xl shadow-xl px-10 py-10 space-y-4">
        <h2 className="text-[#1e7f43] text-2xl md:text-4xl font-semibold">Preferences</h2>
        <p className="text-[#444444] text-xl">Personalisez votre experience.</p>
        <div className="">
          <h2 className="text-[#1e7f43] text-xl md:text-2xl flex gap-1"><Languages size={30} className="text-[#D7AD04]" /> Langues</h2>
          <p className="text-[#444444] text-10">
            Faites le choix d&rsquo;une langue d&rsquo;interface.
          </p>
          <div className="flex gap-4">
            <Link
                href="#"
                className="mt-10 w-full text-10 flex items-center justify-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl"
            >
            Francais
          </Link>
          <Link
                href="#"
                className="mt-10 w-full text-10 flex items-center justify-center gap-2 bg-[#ffffff] border-2 border-[#1e7f43] hover:bg-[#1E7F43] hover:text-white  transition text- font-bold px-5 py-3 rounded-xl shadow-xl"
            >
            Anglais
          </Link>
          </div>
        </div>
        <div className="">
          <h2 className="text-[#1e7f43] text-xl md:text-2xl flex gap-1"><Moon size={30} className="text-[#D7AD04]" /> Theme</h2>
          <p className="text-[#444444] text-10">
            Faites le choix du theme de l&rsquo;interface.
          </p>
          <div className="flex gap-4">
            <Link
                href="#"
                className="mt-10 w-full text-10 flex items-center justify-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl"
            >
            Clair
          </Link>
          <Link
                href="#"
                className="mt-10 w-full text-10 flex items-center justify-center gap-2 bg-[#ffffff] border-2 border-[#1e7f43] hover:bg-[#1E7F43] hover:text-white  transition text- font-bold px-5 py-3 rounded-xl shadow-xl"
            >
            Sombre
          </Link>
          </div>
        </div>
        
      </section>
    </div>
  );
}
