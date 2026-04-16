
import Link from "next/link";
import {
  ArrowRight,
  CircleQuestionMark,
  AudioLines,
  BookOpen,
} from "lucide-react";
export default function Page() {
  return (
    <div className="w-full max-w-none px-10 py-6">
      {/* Main */}
      <main className="w-full flex-1 ">
        <h2 className="text-4xl md:text-6xl font-semibold">
          Bienvenue, Patlearn !
        </h2>
        <p className="text-[#444444] text-xl mt-2">
          Prêt à booster ton apprentissage du <span className="text-green-600">Duala</span> ?
        </p>

        {/* Stats */}
        <div className="mt-10  grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-green-600 font-semibold flex gap-2"><BookOpen size={20} /> Mes leçons</p>
            <h3 className="text-2xl font-bold">7</h3>
            <p className="text-sm text-gray-500">leçon(s) complétée(s)</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-yellow-500 font-semibold flex gap-2"><CircleQuestionMark size={20} /> Mes quiz</p>
            <h3 className="text-2xl font-bold">6</h3>
            <p className="text-sm text-gray-500">quiz complété(s)</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-blue-500 font-semibold flex gap-2"><AudioLines size={20} /> Prononciations</p>
            <h3 className="text-2xl font-bold">2</h3>
            <p className="text-sm text-gray-500">Audios suivi(s).</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-sm w-full">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">DUALA</span>
            <span className="text-sm text-gray-500">7 leçons sur 20</span>
          </div>

          <div className="w-full bg-gray-200 h-3 rounded-full">
            <div className="bg-green-600 h-3 rounded-full w-[35%]"></div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
              <Link href="/inscription" className="mt-10 w-full text-xl flex items-center justify-center gap-2 bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] transition text-white font-bold px-5 py-3 rounded-xl shadow-xl">
                Continuez la lecon
                <ArrowRight size={20} />
              </Link>
          </div>
      </main>
    </div>
  );
}