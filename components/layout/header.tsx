"use client";

import { Search, Bell } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      
      {/* Left: Search */}
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

          <input
            type="text"
            placeholder="Rechercher utilisateurs, cours..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-green-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={18} />

          {/* notification dot */}
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User menu */}
        <UserMenu />
      </div>
    </header>
  );
}