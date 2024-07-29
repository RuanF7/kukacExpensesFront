"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import AuthContext from "../authentication/AuthContext";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  // const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    } else if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const resUserExists = await fetch("http://localhost:4000/auth/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("E-mail já cadastrado");
        return;
      }

      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/expenses");
      } else {
        console.log("Falha no cadastro.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Erro durante o cadastro: ", error.message);
      } else {
        console.log("Erro desconhecido durante o cadastro.");
      }
    }
  };

  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex justify-center items-center bg-secondary bg-opacity-25">
        <aside className="bg-primary w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
          <h1 className="text-center text-secondary font-light text-4xl bg-orange rounded-t-xl m-0 py-4">
            Cadastre-se
          </h1>
          <form className="p-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome Completo"
              className="py-2 px3-3 w-full text-secondary text-lg font-light outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="py-2 px3-3 w-full text-secondary text-lg font-light outline-none mt-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="py-2 px3-3 w-full text-secondary text-lg font-light outline-none mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Senha"
              className="py-2 px3-3 w-full text-secondary text-lg font-light outline-none mt-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
            <div className="flex mt-5 justify-between items-center">
              <Link
                href="/login"
                className="text-orange cursor-pointer transition hover:text-primary"
              >
                Já tem uma conta?
              </Link>
              <button
                type="submit"
                className="bg-fullBlack text-orange font-medium py-2 px-8 transition hover:text-primary"
              >
                Cadastre-se
              </button>
            </div>
          </form>
        </aside>
      </div>
    </main>
  );
};

export default SignUp;
