import { User, LogOut, Languages, Moon } from "lucide-react";
import Link from "next/link";
export default function ProfilPage() {
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
            Patlearn CULTURE
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-[#444444] text-lg">
            Nom: <span className="font-medium">Patlearn</span>
          </p>
          <p className="text-[#444444] text-lg">
            Prénom: <span className="font-medium">Culture</span>
          </p>
          <p className="text-[#444444] text-lg">
            Email:{" "}
            <span className="font-medium">patlearnculture@gmail.com</span>
          </p>
        </div>

        {/* LOG-OUT */}
        <div className="flex justify-center">
          <Link
            href="#"
            className="mt-10 w-full text-xl flex items-center justify-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl"
          >
            <LogOut size={20} className="text-[#d70404]" />
            Deconnexion
          </Link>
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
