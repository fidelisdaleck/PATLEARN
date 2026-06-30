// "use client";
// import {
//   Sidebar,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
// } from "@/components/ui/sidebar";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   Book,
//   Users,
//   BookOpen,
//   LogOut,
//   Settings,
//   Languages,
//   ChartBar,
// } from "lucide-react";

// export default function AdminSidebar() {

//   const pathname = usePathname();
//   const navLinkClass = (path: string) =>
//     `text-lg px-4 py-1 flex gap-2 rounded-lg transition-all duration-100
//     ${
//       pathname === path
//         ? "bg-[#1e7f4315] text-[#1E7F43]"
//         : "text-[#333333] hover:text-[#1E7F43] hover:bg-[#1e7f430d]"
//     }`;
//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <div>
//             <Image
//             src="/images/logotransparent.png"
//             alt="Patlearn logo"
//             width={30}
//             height={20}
//             priority
//             />
//             <Link href="/" className="text-xl text-[#1e7f43]">PATLEARN</Link>
//         </div>
//       </SidebarHeader>

//       <SidebarContent className="space-y-5 mt-10">
//         <Link
//           href="/dashboard"
//           className={navLinkClass("/dashboard")}
//         >
//           <LayoutDashboard size={25} className="text-[#D7AD04]" />
//           Tableau de Bord
//         </Link>
//         <Link
//           href="/dashboard/lessons"
//           className={navLinkClass("/dashboard/lessons")}
//         >
//           <Users size={25} className="text-[#D7AD04]" />
//           Utilisateurs
//         </Link>
//         <Link
//           href="/dashboard/quizzes"
//           className={navLinkClass("/dashboard/quizzes")}
//         >
//           <Languages size={25} className="text-[#D7AD04]" />
//           Langues
//         </Link>
//         <Link
//           href="/"
//           className={navLinkClass("/")}
//         >
//           <Book size={25} className="text-[#D7AD04]" />
//           Cours
//         </Link>
//         <Link
//           href="/"
//           className={navLinkClass("/")}
//         >
//           <BookOpen size={25} className="text-[#D7AD04]" />
//           Exercices
//         </Link>
//         <Link
//           href="/"
//           className={navLinkClass("/")}
//         >
//           <ChartBar size={25} className="text-[#D7AD04]" />
//           Statistiques
//         </Link>
//       </SidebarContent>
//       <SidebarFooter>
//         <Link
//           href="/dashboard/profile"
//           className={navLinkClass("/dashboard/profile")}
//         >
//           <Settings size={25} className="text-[#D7AD04]" />
//           Parametres
//         </Link>
//         <Link
//           href="/dashboard/deconnexion"
//           className={navLinkClass("/dashboard/deconnexion")}
//         >
//           <LogOut size={25} className="text-[#d70404]" />
//           Deconnexion
//         </Link>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Globe,
  BookOpen,
  FileText,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Langues", href: "/admin/languages", icon: Globe },
  { label: "Cours", href: "/admin/courses", icon: BookOpen },
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