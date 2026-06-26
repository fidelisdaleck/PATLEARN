"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/input";
import { useAuth } from "@/context/AuthContext";

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Échec de connexion. Vérifiez vos identifiants.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="space-y-3 px-10 md:px-20">
        <div className="px-16 md:px-30 py-10">
          <h1 className="text-3xl text-center md:text-5xl text-[#1e7f43]">Connexion</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col max-w-md mx-auto">
            <Input
              name="email"
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              name="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error ? <p className="text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#1E7F43] hover:bg-[#ffffff] hover:border-2 hover:text-black border-[#1e7f43] text-white font-bold px-3 py-2 md:py-3 md:px-6 rounded-lg w-full shadow-xl disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
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
