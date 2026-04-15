"use client";

import Input from "@/components/input";
import Link from "next/link";

export default function Inscriptipn() {
  return (
    <div>
      {/* FORMULAIRE */}
      <section className="space-y-3 px-10 md:px-20">
        <div className="px-16 md:px-30 py-10">
          <h1 className="text-3xl text-center md:text-5xl text-[#1e7f43]">Connexion</h1>
        </div>
        <div>
          <form className="space-y-8 flex flex-col max-w-md mx-auto">
            <Input
              type="email"
              placeholder="exemple@gmail.com"
            />

            <Input
              type="password"
              placeholder="********"
            />
            <button className="bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] text-white font-bold px-3 py-2 md:py-3 md:px-6 rounded-lg w-full shadow-xl">
              Rejoignez nous
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center">
            <div className="flex flex-col md:flex-row gap-1">
                <p>Vous n&rsquo;avez pas encore de compte?</p>
                <Link href="/inscription" className="text-blue-500 underline">
                    Inscrivez-vous
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
