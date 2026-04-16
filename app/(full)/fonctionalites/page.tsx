
"use client";

import { Pencil, Volume2, ChartLine, Globe, ArrowRight } from "lucide-react";
import Card2 from "@/components/card2";
import Link from "next/link";

export default function Fonctionalites() {
  return (
    <div>
      {/* BANNER */}
      <section className="bg-[#1e7f430c] py-24 px-5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Fonctionalités clés de
            <span className="text-[#1E7F43]"> PAT</span>
            <span className="text-[#E74C3C]">LE</span>
            <span className="text-[#D7AD04]">ARN.</span>
          </h1>
          <p className="text-[#444444] text-base md:text-xl">
            Decouvrez nos fonctionalités multiples pour un apprentissage complet.
          </p>
        </div>
      </section>

      {/* FONCTIONALITES */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card2
            icon={<Volume2 size={30} className="text-[#D7AD04]" />}
            title="Audios et prononciations"
            description="
            Écoutez, répétez et maîtrisez la prononciation correcte grâce à des audios clairs et naturels. 
            "
          />

          <Card2
            icon={<Pencil size={30} className="text-[#D7AD04]" />}
            title="Exercices interactifs (Quiz)"
            description="
            Apprenez activement avec des quiz interactifs conçus pour renforcer rapidement vos connaissances. 
            "
          />

          <Card2
            icon={<ChartLine size={30} className="text-[#D7AD04]" />}
            title="Suivi de progression personnalisé"
            description="
            Visualisez vos progrès, identifiez vos forces et améliorez vos performances chaque jour. 
            "
          />

          <Card2
            icon={<Globe size={30} className="text-[#D7AD04]" />}
            title="Accessible sur tout appareils"
            description="
            Accédez à vos leçons partout, à tout moment, depuis tous vos appareils connectés. 
            "
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-200 py-24 px-5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-2xl md:text-5xl text-[#1e7f43] font-semibold leading-tight">
            Commencer à apprendre dès aujourd’hui
          </h1>

          <p className="text-base md:text-xl text-[#444444]">
            Découvrez toutes les fonctionnalités et commencez à organiser votre apprentissage.
          </p>

          <div className="flex justify-center">
              <Link href="/inscription" className="flex items-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl">
                Créer mon compte gratuitement
                <ArrowRight size={20} />
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}