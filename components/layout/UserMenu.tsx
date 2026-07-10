"use client";

import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link"

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg p-2 hover:bg-slate-100"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
          A
        </div>

        <span className="text-sm text-slate-700">Admin</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg">
          
          {/* User info */}
          <div className="border-b border-slate-100 p-3">
            <p className="text-sm font-medium text-slate-800">Admin</p>
            <p className="text-xs text-slate-500">admin@patlearn.com</p>
          </div>

          {/* Menu items */}
          <div className="p-2">
            
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
              <User size={16} />
              Profil
            </button>

            <Link href="/admin/settings">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
                    <Settings size={16} />
                    Paramètres
                </button>
            </Link>

            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50">
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}