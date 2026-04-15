
"use client";

import {
  HandFist,
  Check,
  Lightbulb,
  Volume2,
  Pencil,
  ChartLine,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Card from "@/components/card";
import Cardicon from "@/components/cardicon";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Header />

      {/* BANNIERE */}
      <section className="bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/images/bg.jpg')] bg-cover bg-center min-h-[80vh] flex items-center text-center">
        <div className="max-w-6xl mx-auto px-5 md:px-10 space-y-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Apprendre une langue locale n&apos;a jamais été aussi facile.
            </h1>
            <p className="text-base md:text-xl text-gray-300 mt-4">
              Une application pour{" "}
              <span className="text-[#F1C40F]">apprendre</span>,{" "}
              <span className="text-[#F1C40F]">pratiquer</span> et{" "}
              <span className="text-[#F1C40F]">valoriser </span>les langues
              camerounaises.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-center justify-center">
            <button className="bg-[#1E7F43] hover:bg-[#0f3d22] transition text-white font-bold py-3 px-6 rounded-xl shadow-xl">
              Essayer l&apos;application
            </button>
            <button className="bg-[#F1C40F] hover:bg-[#b69d3c] transition text-white font-bold py-3 px-6 rounded-xl shadow-xl">
              Inscrivez-vous gratuitement
            </button>
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20">
        <h1 className="text-3xl md:text-4xl text-center text-[#1E7F43] font-semibold">
          Pourquoi choisir PATLEARN?
        </h1>

        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HandFist className="text-[#F1C40F]" />
              <h2 className="text-2xl font-semibold">Les Defis.</h2>
            </div>

            {[
              "Le manque de resources pedagogiques.",
              "La diversité des langues locales camerounaises.",
              "La transmission intergénerationnelle en baisse.",
            ].map((text, i) => (
              <div key={i} className="flex gap-2 items-start">
                <Check />
                <p className="text-[#444]">{text}</p>
              </div>
            ))}
          </div>

          <Image
            src="/images/defis.jpg"
            alt=""
            width={400}
            height={300}
            className="rounded-xl w-full object-cover"
          />
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/images/solutions.jpg"
            alt=""
            width={400}
            height={300}
            className="rounded-xl w-full object-cover order-2 md:order-1"
          />

          <div className="space-y-4 order-1 md:order-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="text-[#F1C40F]" />
              <h2 className="text-2xl font-semibold">Les Solutions.</h2>
            </div>

            {[
              "Creation de contenus modernes et interactifs.",
              "Structuration et organisation des langues sur PatLearn.",
              "Creation d’un pont entre les generations avec la contribution des enseignants et des locuteurs natifs.",
            ].map((text, i) => (
              <div key={i} className="flex gap-2 items-start">
                <Check />
                <p className="text-[#444]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUES */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20">
        <h1 className="text-3xl md:text-4xl text-center text-[#1E7F43]">
          Qu&rsquo;aimeriez-vous apprendre?
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <Card
            title="Duala?"
            description="Langue parlée dans la région du Littoral."
          />
          <Card title="Ewondo?" description="Langue majoritaire au Centre." />
          <Card title="Medumba?" description="Langue des peuples Bamiléké." />
          <Card title="Autres?" description="Apprendre une autre langue." />
        </div>

        <div className="text-center mt-10">
          <button className="bg-[#1E7F43] hover:bg-[#0f3d22] transition text-white font-bold py-3 px-6 rounded-xl shadow-xl">
            Faites votre choix maintenant
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <h1 className="text-3xl md:text-4xl text-center text-[#1E7F43]">
            Les fonctionalités clés de PATLEARN
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <Cardicon
              icon={<Volume2 />}
              description="Audios et prononciations."
            />
            <Cardicon
              icon={<Pencil />}
              description="Exercices interactifs (Quiz)."
            />
            <Cardicon
              icon={<ChartLine />}
              description="Suivi de progression personalisé."
            />
            <Cardicon
              icon={<Globe />}
              description="Accéssible sur tout appareils."
            />
          </div>
        </div>
      </section>

      {/* PUBLIC */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20">
        <h1 className="text-3xl md:text-4xl text-center text-[#1E7F43]">
          A qui s’adresse PATLEARN?
        </h1>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {[
            {
              img: "etudiants.jpg",
              title: "Les étudiants",
              text: "Désireux d’enrichir leurs connaissances linguistiques.",
            },
            {
              img: "diaspora.jpg",
              title: "La diaspora camerounaise",
              text: "Désireux de valoriser la culture linguistique par l’utilisation courante de leur dialecte.",
            },
            {
              img: "ecole.jpg",
              title: "Les écoles et institutions",
              text: "PATLEARN est pour ceux-ci un outil d’enseignemet moderne de la culture linguistique locale.",
            },
            {
              img: "passion-culture.jpg",
              title: "Les passionnés de culture.",
              text: "Désireux d’en apprendre davantage sur les langues locales camerounaises.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-5 items-center hover:shadow-xl p-5 rounded-xl transition"
            >
              <Image
                src={`/images/${item.img}`}
                alt=""
                width={200}
                height={150}
                className="rounded-lg"
              />
              <div>
                <h2 className="text-[#1E7F43] font-semibold">{item.title}</h2>
                <p className="text-[#333]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAST CTA */}
      <section className="bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/images/dernier-cta.jpg')] bg-cover bg-center h-110 mt-20">
        <div className="md:pl-150 pt-50 space-y-10">
          <p className="text-2xl md:text-4xl text-white text-center">
            Apprennez une langue facilement avec{" "}
            <span className="text-[#1E7F43]">PAT</span>
            <span className="text-[#E74C3C]">LE</span>
            <span className="text-[#D7AD04]">ARN</span>
          </p>
          <div className="text-center">
            <button className="bg-[#1E7F43] hover:bg-[#0f3d22] text-white font-bold py-2 px-5 rounded-xl shadow-xl">
              Commencez maintenant
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
