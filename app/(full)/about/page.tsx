// import Image from "next/image";
// import {
//   Check,
//   Rocket,
//   LayoutDashboard,
//   Target,
//   ArrowRight,
// } from "lucide-react";
// import Card2 from "@/components/card2";
// export default function About() {
//   return (
//     <div>
//       {/* BANNER */}
//       <section className="text-center py-20 bg-[#1e7f430c] space-y-7">
//         <h1 className="text-5xl">
//           A propos de nous,
//           <span className="text-[#1E7F43]"> PAT</span>
//           <span className="text-[#E74C3C]">LE</span>
//           <span className="text-[#D7AD04]">ARN.</span>
//         </h1>
//         <p className="text-[#444444] text-xl">
//           Decouvrez la raison d&rsquo;etre de notre application.
//         </p>
//       </section>

//       {/* POURQUOI AVONS NOUS CREER */}

//       <section className="mt-10 flex md:flex-row flex-col items-center justify-between md:gap-20 gap-10 px-10">
//         <div className="space-y-5">
//           <h2 className="text-[#1e7f43] md:text-5xl text-2xl">
//             Pourquoi avons-nous créé cette application ?
//           </h2>
//           <p className="text-[#444444] text-10 md:text-xl">
//             L’apprentissage des langues locales reste un défi pour de nombreuses
//             personnes. Entre le manque de ressources accessibles, la disparition
//             progressive de certaines langues et l’absence d’outils modernes
//             adaptés, il devient difficile d’apprendre et de pratiquer
//             efficacement sa langue maternelle ou celle de sa communauté.
//           </p>

//           <p className="text-[#444444] text-10 md:text-xl">
//             Ce projet est né d’un constat simple : les solutions existantes
//             valorisent rarement les langues locales ou les rendent compliquées à
//             apprendre au quotidien. Nous avons donc conçu une application
//             moderne qui met l’accent sur :
//           </p>
//           <div className="text-[#444444] text-10 md:text-xl">
//             <div className="flex gap-2">
//               <Check size={20} className="text-[#1e7f43]" />
//               La simplicité d’apprentissage, accessible à tous les niveaux.
//             </div>
//             <div className="flex gap-2">
//               <Check size={20} className="text-[#1e7f43]" />
//               Une immersion authentique grâce aux audios et prononciations
//               locales.
//             </div>
//             <div className="flex gap-2">
//               <Check size={20} className="text-[#1e7f43]" />
//               Des exercices interactifs pour apprendre en pratiquant réellement.
//             </div>
//             <div className="flex gap-2">
//               <Check size={20} className="text-[#1e7f43]" />
//               Un suivi personnalisé pour progresser à son propre rythme.
//             </div>
//           </div>

//           <p className="text-[#444444] text-10 md:text-xl">
//             Notre objectif est de préserver, valoriser et transmettre les
//             langues locales en les rendant accessibles à tous, partout et à tout
//             moment.
//           </p>
//         </div>
//         <Image
//           className="rounded-xl"
//           src="/images/ecole.jpg"
//           alt=" Hero section image"
//           width={500}
//           height={20}
//           priority
//         />
//       </section>

//       {/* NOS VALEURS */}
//       <section className="mt-30 grid md:grid-cols-2 grid-cols-1 gap-10 md:gap-15 px-10">
//         <Card2
//           icon={<Rocket size={30} className="text-[#D7AD04]" />}
//           title="Notre mission"
//           description="
//                 Notre mission est de rendre l’apprentissage des langues locales simple, 
//                 accessible et moderne pour tous. Aujourd’hui, beaucoup souhaitent apprendre
//                 ou transmettre leur langue maternelle, mais manquent d’outils adaptés et interactifs. 
//                 Notre application a été conçue pour répondre à ce besoin en proposant une solution intuitive 
//                 qui facilite l’apprentissage au quotidien et valorise notre richesse linguistique.
//             "
//         />
//         <Card2
//           icon={<Target size={30} className="text-[#D7AD04]" />}
//           title="Notre Vision"
//           description="
//                 Nous croyons que les langues locales sont un patrimoine vivant 
//                 à préserver et à transmettre aux générations futures. Grâce à cette 
//                 application, chacun peut apprendre, pratiquer et garder vivantes ces langues, 
//                 tout en renforçant son identité culturelle et ses liens avec sa communauté.
//             "
//         />

//         <Card2
//           icon={<LayoutDashboard size={30} className="text-[#D7AD04]" />}
//           title="Une application centrée sur l'apprenant"
//           description="
//                 L’application a été pensée avec un objectif principal : 
//                 offrir une expérience d’apprentissage simple et immersive.   
//                 L’interface permet d’accéder rapidement aux leçons, exercices 
//                 et audios nécessaires pour apprendre naturellement, pratiquer 
//                 régulièrement et évoluer sans difficulté.
//             "
//         />
//       </section>

//       {/* LAST CTA */}
//       <section className="mt-30 text-center py-20 bg-gray-200 space-y-10">
//         <div className="space-y-3">
//           <h1 className="text-3xl md:text-6xl text-[#1e7f43] font-semibold">
//             Découvrez l’application en pratique
//           </h1>
//           <p className="text-xl text-[#444444]">
//             Explorez les fonctionnalités et commencez à apprendre votre langue
//             locale simplement grâce à notre application web.
//           </p>
//         </div>
//         <div className="flex items-center justify-center">
//           <button className="flex gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] text-white font-bold px-4 py-2 md:py-3 md:px-6 rounded-xl shadow-xl">
//             Accéder à l’application
//             <ArrowRight size={20} />
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import {
  Check,
  Rocket,
  LayoutDashboard,
  Target,
  ArrowRight,
} from "lucide-react";
import Card2 from "@/components/card2";

export default function About() {
  return (
    <div>
      {/* BANNER */}
      <section className="text-center py-24 bg-[#1e7f430c] px-5">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            A propos de nous,
            <span className="text-[#1E7F43]"> PAT</span>
            <span className="text-[#E74C3C]">LE</span>
            <span className="text-[#D7AD04]">ARN.</span>
          </h1>
          <p className="text-[#444444] text-base md:text-xl">
            Decouvrez la raison d&rsquo;etre de notre application.
          </p>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-[#1e7f43] text-2xl md:text-4xl font-semibold">
            Pourquoi avons-nous créé cette application ?
          </h2>

          <p className="text-[#444444] text-base md:text-lg leading-relaxed">
            L’apprentissage des langues locales reste un défi pour de nombreuses
            personnes. Entre le manque de ressources accessibles, la disparition
            progressive de certaines langues et l’absence d’outils modernes
            adaptés, il devient difficile d’apprendre et de pratiquer
            efficacement sa langue maternelle ou celle de sa communauté.
          </p>

          <p className="text-[#444444] text-base md:text-lg leading-relaxed">
            Ce projet est né d’un constat simple : les solutions existantes
            valorisent rarement les langues locales ou les rendent compliquées à
            apprendre au quotidien. Nous avons donc conçu une application
            moderne qui met l’accent sur :
          </p>

          <div className="space-y-3 text-[#444444] text-base md:text-lg">
            {[
              "La simplicité d’apprentissage, accessible à tous les niveaux.",
              "Une immersion authentique grâce aux audios et prononciations locales.",
              "Des exercices interactifs pour apprendre en pratiquant réellement.",
              "Un suivi personnalisé pour progresser à son propre rythme.",
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <Check className="text-[#1e7f43] mt-1" size={20} />
                <p>{text}</p>
              </div>
            ))}
          </div>

          <p className="text-[#444444] text-base md:text-lg leading-relaxed">
            Notre objectif est de préserver, valoriser et transmettre les
            langues locales en les rendant accessibles à tous, partout et à tout
            moment.
          </p>
        </div>

        <Image
          className="rounded-xl w-full object-cover"
          src="/images/ecole.jpg"
          alt="Hero section image"
          width={500}
          height={400}
          priority
        />
      </section>

      {/* VALEURS */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          <Card2
            icon={<Rocket size={30} className="text-[#D7AD04]" />}
            title="Notre mission"
            description="
                Notre mission est de rendre l’apprentissage des langues locales simple, 
                accessible et moderne pour tous. Aujourd’hui, beaucoup souhaitent apprendre
                ou transmettre leur langue maternelle, mais manquent d’outils adaptés et interactifs. 
                Notre application a été conçue pour répondre à ce besoin en proposant une solution intuitive 
                qui facilite l’apprentissage au quotidien et valorise notre richesse linguistique.
            "
          />

          <Card2
            icon={<Target size={30} className="text-[#D7AD04]" />}
            title="Notre Vision"
            description="
                Nous croyons que les langues locales sont un patrimoine vivant 
                à préserver et à transmettre aux générations futures. Grâce à cette 
                application, chacun peut apprendre, pratiquer et garder vivantes ces langues, 
                tout en renforçant son identité culturelle et ses liens avec sa communauté.
            "
          />

          <Card2
            icon={<LayoutDashboard size={30} className="text-[#D7AD04]" />}
            title="Une application centrée sur l'apprenant"
            description="
                L’application a été pensée avec un objectif principal : 
                offrir une expérience d’apprentissage simple et immersive.   
                L’interface permet d’accéder rapidement aux leçons, exercices 
                et audios nécessaires pour apprendre naturellement, pratiquer 
                régulièrement et évoluer sans difficulté.
            "
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-200 py-24 px-5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-2xl md:text-5xl text-[#1e7f43] font-semibold leading-tight">
            Découvrez l’application en pratique
          </h1>

          <p className="text-base md:text-xl text-[#444444]">
            Explorez les fonctionnalités et commencez à apprendre votre langue
            locale simplement grâce à notre application web.
          </p>

          <div className="flex justify-center">
            <button className="flex items-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl">
              Accéder à l’application
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}