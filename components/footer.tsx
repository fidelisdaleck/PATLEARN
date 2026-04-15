import { Facebook, Instagram, Music2, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="px-10 py-15 bg-[#0e3d20] cursor-pointer text-white">
      <div className="flex md:items-center justify-between gap-7 sm:flex-row flex-col">
        <div>
          <Image
            className=""
            src="/images/logotransparent.png"
            alt="Patlearn logo"
            width={50}
            height={20}
            priority
          />
          <p className="mt-5 w-80 text-10 text-[#7c7c7c]">
            <span className="text-[#1E7F43]">PAT</span>
            <span className="text-[#E74C3C]">LE</span>
            <span className="text-[#D7AD04]">ARN </span>
            votre application apprentissage interactifs des langues locales
            camerounaises.
          </p>
          <div className="flex gap-7 mt-5">
            <Facebook className="w-6 h-6 text-[#1E7F43]  cursor-pointer" />
            <Instagram className="w-6 h-6 text-[#1E7F43] cursor-pointer" />
            <Music2 className="w-6 h-6 text-[#1E7F43] cursor-pointer" />
          </div>
        </div>

        <div className="">
          <h2 className="text-xl text-white">Liens Rapides</h2>
          <ul className="text-10 text-[#7c7c7c]">
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Acceuil
            </li>
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Fonctionalités
            </li>
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              A propos
            </li>
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Langues
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-white">Fonctionalités</h2>
          <ul className="text-10 text-[#7c7c7c]">
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Audios et prononciations.
            </li>
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Exercices interactifs (Quiz).
            </li>
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Suivi de progression personalisé.
            </li>
            <li className="mt-2 hover:text-[#1E7F43] cursor-pointer">
              Accéssible sur tout appareils.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl text-white">Contact</h2>
          <ul className="text-10 text-[#7c7c7c]">
            <li className="mt-2">
              <MapPin className="w-5 h-5 inline mr-2 text-[#1E7F43]" /> Douala,
              Cameroun.
            </li>
            <li className="mt-2">
              <Mail className="w-5 h-5 inline mr-2 text-[#1E7F43]" />{" "}
              patlearncontact@gmail.com
            </li>
            <li className="mt-2">
              <Phone className="w-5 h-5 inline mr-2 text-[#1E7F43]" /> +237 6 xx
              xx xx xx
            </li>
          </ul>
        </div>
      </div>
      <div>
        <span className="block w-full h-0.5 bg-gray-500 mx-auto mt-10"></span>
        <p className="text-center text-10 text-[#7c7c7c] mt-5">
          &copy; 2026 Patlearn. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
