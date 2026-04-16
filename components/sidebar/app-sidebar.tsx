"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CircleQuestionMark,
  AudioLines,
  BookOpen,
  User,
  LogOut,
} from "lucide-react";

export default function AppSidebar() {

  const pathname = usePathname();
  const navLinkClass = (path: string) =>
    `text-lg px-4 py-1 flex gap-2 rounded-lg transition-all duration-100
    ${
      pathname === path
        ? "bg-[#1e7f4315] text-[#1E7F43]"
        : "text-[#333333] hover:text-[#1E7F43] hover:bg-[#1e7f430d]"
    }`;
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
            <Image
            src="/images/logotransparent.png"
            alt="Patlearn logo"
            width={30}
            height={20}
            priority
            />
            <Link href="/" className="text-xl text-[#1e7f43]">PATLEARN</Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="space-y-5 mt-10">
        <Link
          href="/dashboard"
          className={navLinkClass("/dashboard")}
        >
          <LayoutDashboard size={25} className="text-[#D7AD04]" />
          Tableau de Bord
        </Link>
        <Link
          href="/dashboard/lessons"
          className={navLinkClass("/dashboard/lessons")}
        >
          <BookOpen size={25} className="text-[#D7AD04]" />
          Mes lecons
        </Link>
        <Link
          href="/dashboard/quizzes"
          className={navLinkClass("/dashboard/quizzes")}
        >
          <CircleQuestionMark size={25} className="text-[#D7AD04]" />
          Mes quiz
        </Link>
        <Link
          href="/dashboard/prononciation"
          className={navLinkClass("/dashboard/prononciation")}
        >
          <AudioLines size={25} className="text-[#D7AD04]" />
          Prononciation
        </Link>
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/dashboard/profile"
          className={navLinkClass("/dashboard/profile")}
        >
          <User size={25} className="text-[#D7AD04]" />
          Profil
        </Link>
        <Link
          href="/dashboard/deconnexion"
          className={navLinkClass("/dashboard/deconnexion")}
        >
          <LogOut size={25} className="text-[#d70404]" />
          Deconnexion
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
