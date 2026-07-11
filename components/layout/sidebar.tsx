

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Globe,
  FileText,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Langues & Cours", href: "/admin/languages", icon: Globe },
  { label: "Leçons", href: "/admin/lessons", icon: FileText },
  { label: "Paramètres", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 font-bold text-lg text-slate-900">
        PatLearn
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition
                ${
                  isActive
                    ? "bg-green-50 text-green-600 font-medium"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t border-slate-200 p-4">
        <div className="text-sm text-slate-600">Admin Panel</div>
        <div className="text-xs text-slate-400">PatLearn v1.0</div>
      </div>
    </aside>
  );
}