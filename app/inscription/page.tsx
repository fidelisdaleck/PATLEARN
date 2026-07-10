"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function InscriptionPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const newUser = await register({ username, email, password });

      // Sauvegarder dans cookie pour le middleware
      document.cookie = `token=${localStorage.getItem("token")}; path=/`;
      document.cookie = `user=${encodeURIComponent(JSON.stringify(newUser))}; path=/`;

      router.push("/choix");
    } catch (err: any) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        const firstError = Object.values(errors)[0] as string[];
        setError(firstError[0]);
      } else {
        setError("Une erreur est survenue. Vérifiez vos informations.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="space-y-3 px-10 md:px-20">
        <div className="px-16 md:px-30 py-10">
          <h1 className="text-3xl text-center md:text-5xl text-[#1e7f43]">
            Inscription
          </h1>
        </div>

        {error && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 flex flex-col max-w-md mx-auto"
          >
            <input
              name="username"
              type="text"
              placeholder="Votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e7f43] w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e7f43] w-full"
            />
            <input
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e7f43] w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1E7F43] hover:bg-[#166335] text-white font-bold px-3 py-3 rounded-lg w-full shadow-xl disabled:opacity-50 transition"
            >
              {loading ? "Inscription en cours..." : "Rejoignez nous"}
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center pt-4">
          <div className="flex flex-col md:flex-row gap-1 text-center">
            <p>Vous avez déjà un compte?</p>
            <Link href="/connexion" className="text-blue-500 underline">
              Connectez-vous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}