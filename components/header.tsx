"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {Menu, X} from "lucide-react"


export default function Header() {
  const pathname = usePathname();
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (path: string) =>
    `text-xl px-4 py-2 rounded-lg transition-all duration-100
    ${
      pathname === path
        ? "bg-[#1e7f4333] text-[#1E7F43]"
        : "text-[#333333] hover:text-[#1E7F43] hover:bg-[#1e7f430d]"
    }`;

  return (
    <header className="flex items-center justify-between px-8 py-1 shadow-lg sticky top-0 w-full bg-white z-50">
      {/* logo */}
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
      
      {/* Menu desktop */}
      <nav className="hidden md:flex gap-10 text-xl">
        <Link href="/" className={navLinks("/")}>Acceuil</Link>
        <Link href="/fonctionalites" className={navLinks("/fonctionalites")}>Fonctionalités</Link>
        <Link href="/about" className={navLinks("/about")}>A propos</Link>
        <Link href="/langues" className={navLinks("/langues")}>Langues</Link>
      </nav>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <button className="bg-[#1E7F43] hover:bg-[#0f3d22] text-white font-bold py-2 px-4 rounded-xl shadow-xl">Se connecter</button>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!IsMenuOpen)}
        >
          {IsMenuOpen ? (
            <X className="w-6 h-6 text-[#111827]" />
          ) : (
            <Menu className="w-6 h-6 text-[#111827]" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      {IsMenuOpen &&(
        <div className="absolute top-full left-0 w-full px-3 py-5 bg-white shadow-md md:hidden">
          <nav className="flex flex-col gap-10 text-xl">
            <Link href="/" className={navLinks("/")}>Acceuil</Link>
            <Link href="/fonctionalites" className={navLinks("/fonctionalites")}>Fonctionalités</Link>
            <Link href="/about" className={navLinks("/about")}>A propos</Link>
            <Link href="/langues" className={navLinks("/langues")}>Langues</Link>
          </nav>
          <button className="bg-[#1E7F43] hover:bg-[#0f3d22] text-white font-bold py-2 px-4 rounded-xl mt-3 shadow-xl w-full">Se connecter</button>
        </div>
      )}
    </header>
  );
}


