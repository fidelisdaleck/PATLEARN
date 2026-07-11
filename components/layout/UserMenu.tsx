"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/connexion");
  };

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-100"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
          {user?.username?.charAt(0)?.toUpperCase() ?? "A"}
        </div>

        <span className="text-sm text-slate-700">{user?.username ?? "Admin"}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg">

          {/* User info */}
          <div className="border-b border-slate-100 p-3">
            <p className="text-sm font-medium text-slate-800">{user?.username ?? "Admin"}</p>
            <p className="text-xs text-slate-500">{user?.email ?? ""}</p>
          </div>

          {/* Menu items */}
          <div className="p-2">

            <Link
              href="/admin/settings"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
            >
              <Settings size={16} />
              Paramètres
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}