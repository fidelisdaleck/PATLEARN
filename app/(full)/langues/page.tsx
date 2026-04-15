// import Link from "next/link"
// import { ArrowRight } from "lucide-react"
// export default function Langues() {
//   return (
//     <div>
//       {/* BANNER */}
//       <section className="text-center py-20 bg-[#1e7f430c] space-y-7">
//         <h1 className="text-5xl">Découvrez et apprenez les langues locales camerounaises</h1>
//         <p className="text-[#444444] text-xl">
//           Explorez des langues riches en culture et apprenez facilement grâce à des leçons interactives, 
//           des audios authentiques et un accompagnement intelligent conçu pour progresser efficacement.
//         </p>
//       </section>

//       {/* COMMENT CA MARCHE: Timeline */}
//       <section className="py-20 mt-20 space-y-15 z-0">
//         <div className="text-center space-y-3">
//           <h1 className="text-3xl md:text-4xl  text-[#1e7f43] font-semibold">
//             Choix des langues disponibles
//           </h1>
//           <p className="text-xl text-[#444444]">
//             Accédez à différentes langues locales camerounaises 
//             et choisissez celle que vous souhaitez apprendre selon vos objectifs.
//           </p>
//         </div>
//         <div className="relative ml-5 md:ml-20 pl-12 border-l-3 px-10 md:pr-50  border-[#1e7f43] space-y-16">
//           {/* ITEM */}
//           <div className="relative mx-auto">
//             <div
//               className="absolute -left-20 top-6 w-8 h-8 rounded-full 
//               border-2 border-[#333333] bg-white flex items-center justify-center"
//             >
//               <span className="text-[#1e7f43] font-bold">1</span>
//             </div>

//             <div className="bg-[#1e7f4315] rounded-xl p-8 hover:bg-[#1e7f4330] transition">
//               <h2 className="text-xl font-semibold text-[#333333] mb-3">
//                 Sélection simple d’une langue
//               </h2>
//             </div>
//           </div>

//           {/* ITEM */}
//           <div className="relative">
//             <div
//               className="absolute -left-20 top-6 w-8 h-8 rounded-full 
//               border-2 border-[#333333] bg-white flex items-center justify-center"
//             >
//               <span className="text-[#1e7f43] font-bold">2</span>
//             </div>

//             <div className="bg-[#1e7f4315] rounded-xl p-8 hover:bg-[#1e7f4330] transition">
//               <h2 className="text-xl font-semibold text-[#333333] mb-3">
//                 Accès immédiat aux leçons
//               </h2>
//             </div>
//           </div>

//           {/* ITEM */}
//           <div className="relative">
//             <div
//               className="absolute -left-20 top-6 w-8 h-8 rounded-full 
//               border-2 border-[#333333] bg-white flex items-center justify-center"
//             >
//               <span className="text-[#1e7f43] font-bold">3</span>
//             </div>

//             <div className="bg-[#1e7f4315] rounded-xl p-8 hover:bg-[#1e7f4330] transition">
//               <h2 className="text-xl font-semibold  mb-3">
//                 Progression personnalisée par langue
//               </h2>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* LAST CTA */}
//       <section className="mt-20 text-center py-20 bg-gray-200 space-y-10">
//         <div className="space-y-3">
//           <h1 className="text-3xl md:text-6xl text-[#1e7f43] font-semibold">Commencez à apprendre une langue locale dès aujourd’hui</h1>
//           <p className="text-xl text-[#444444]">Découvrez une nouvelle manière d’apprendre, de pratiquer et de préserver les langues camerounaises.</p>

//         </div>
//         <div className="flex items-center justify-center">
//           <Link href="../inscription">
//             <button className="flex gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] text-white font-bold px-4 py-2 md:py-3 md:px-6 rounded-xl shadow-xl">
//               Choisissez une langue
//               <ArrowRight size={20} />
//             </button>
//           </Link>
//         </div>
//         </section>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Langues() {
  return (
    <div>
      {/* BANNER */}
      <section className="bg-[#1e7f430c] py-24 px-5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Découvrez et apprenez les langues locales camerounaises
          </h1>
          <p className="text-[#444444] text-base md:text-xl">
            Explorez des langues riches en culture et apprenez facilement grâce à des leçons interactives, 
            des audios authentiques et un accompagnement intelligent conçu pour progresser efficacement.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-5xl mx-auto px-5 md:px-10 py-20">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl text-[#1e7f43] font-semibold">
            Choix des langues disponibles
          </h1>
          <p className="text-base md:text-xl text-[#444444]">
            Accédez à différentes langues locales camerounaises 
            et choisissez celle que vous souhaitez apprendre selon vos objectifs.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Ligne verticale */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-[#1e7f43] transform md:-translate-x-1/2" />

          <div className="space-y-16">
            {/* ITEM 1 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              {/* Point */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-2 w-8 h-8 rounded-full border-2 border-[#333333] bg-white flex items-center justify-center z-10">
                <span className="text-[#1e7f43] font-bold">1</span>
              </div>

              <div className="md:w-5/12 ml-12 md:ml-0 mt-10 md:mt-0 bg-[#1e7f4315] p-6 rounded-xl hover:bg-[#1e7f4330] transition">
                <h2 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Sélection simple d’une langue
                </h2>
              </div>

              <div className="hidden md:block md:w-5/12" />
            </div>

            {/* ITEM 2 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-2 w-8 h-8 rounded-full border-2 border-[#333333] bg-white flex items-center justify-center z-10">
                <span className="text-[#1e7f43] font-bold">2</span>
              </div>

              <div className="hidden md:block md:w-5/12"/> 

              <div className="md:w-5/12 ml-12 md:ml-0 mt-10 md:mt-0 bg-[#1e7f4315] p-6 rounded-xl hover:bg-[#1e7f4330] transition">
                <h2 className="text-lg md:text-xl font-semibold text-[#333333]">
                  Accès immédiat aux leçons
                </h2>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-between">
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-2 w-8 h-8 rounded-full border-2 border-[#333333] bg-white flex items-center justify-center z-10">
                <span className="text-[#1e7f43] font-bold">3</span>
              </div>

              <div className="md:w-5/12 ml-12 md:ml-0 mt-10 md:mt-0 bg-[#1e7f4315] p-6 rounded-xl hover:bg-[#1e7f4330] transition">
                <h2 className="text-lg md:text-xl font-semibold">
                  Progression personnalisée par langue
                </h2>
              </div>

              <div className="hidden md:block md:w-5/12" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-200 py-24 px-5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-2xl md:text-5xl text-[#1e7f43] font-semibold leading-tight">
            Commencez à apprendre une langue locale dès aujourd’hui
          </h1>

          <p className="text-base md:text-xl text-[#444444]">
            Découvrez une nouvelle manière d’apprendre, de pratiquer et de préserver les langues camerounaises.
          </p>

          <div className="flex justify-center">
            <Link href="../choix">
              <button className="flex items-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl">
                Choisissez une langue
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
