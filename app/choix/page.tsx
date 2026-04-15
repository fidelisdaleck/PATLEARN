import Header from "@/components/header";
import Link from "next/link";
export default function Languages() {
  const languages = [
    {
      name: "Duala",
      users: "95K apprenants",
      color: "bg-[#0a1c63]",
    },
    {
      name: "Ewondo",
      users: "120K apprenants",
      color: "bg-[#1e7f43]",
    },
    {
      name: "Bassa",
      users: "80K apprenants",
      color: "bg-[#634f0a]",
    },
    {
      name: "Fulfulde",
      users: "150K apprenants",
      color: "bg-[#63110a]",
    },
  ];
  return (
    <div>
      <Header/>
      <section className="mt-10 py-16 px-6">
        <h1 className="text-3xl font-bold text-center mb-10">
          Que veux-tu apprendre ?
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {languages.map((lang, index) => (
            <Link 
              href="/fonctionalites"
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Icône */}
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold ${lang.color}`}
              >
                {lang.name[0]}
              </div>

              {/* Nom */}
              <h2 className="mt-4 text-lg font-semibold">{lang.name}</h2>

              {/* Users */}
              <p className="text-gray-500 text-sm mt-1">{lang.users}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
