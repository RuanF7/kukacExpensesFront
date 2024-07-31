"use client";
import React, { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
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
      const resUserExists = await fetch(
        `http://localhost:4000/users/exists?email=${encodeURIComponent(email)}`
      );
      const { exists } = await resUserExists.json();

      if (exists) {
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
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.userId);
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
        <aside className="bg-primary w-full max-w-md rounded-xl bg-opacity-10 shadow-lg shadow-black">
          <h1 className="text-center text-secondary font-light text-4xl bg-orange rounded-t-xl m-0 py-4">
            Cadastro
          </h1>
          <form className="p-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-orange">
                Nome
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nome Completo"
                className="py-2 px3-3 w-full rounded text-secondary text-lg font-light border border-peach"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-orange">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                className="py-2 px3-3 w-full rounded text-secondary text-lg font-light mt-3 border border-peach"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="block text-orange">
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="Sua senha"
                className="py-2 px3-3 w-full rounded text-secondary text-lg font-light mt-3 border border-peach"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmar senha" className="block text-orange">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Senha"
                className="py-2 px3-3 w-full rounded text-secondary text-lg font-light mt-3 border border-peach"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
            <div className="flex mt-5 justify-between items-center">
              <button
                type="submit"
                className="bg-fullBlack text-orange font-medium py-2 px-4 transition rounded hover:text-primary w-full"
              >
                Cadastre-se
              </button>
            </div>
          </form>
          <p className="text-center text-primary mt-4 pb-8">
            Já tem uma conta?{" "}
            <Link
              href="/"
              className="text-orange cursor-pointer transition hover:text-primary"
            >
              Entrar
            </Link>
          </p>
        </aside>
      </div>
    </main>
  );
};

export default SignUp;
