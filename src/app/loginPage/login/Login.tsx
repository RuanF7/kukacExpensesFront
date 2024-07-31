"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Preencha todos os campos");
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.userId);
        router.push("/expenses");
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("Erro durante o login: " + error.message);
      } else {
        setError("Erro desconhecido durante a autenticação.");
      }
    }
  };

  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex justify-center items-center bg-secondary bg-opacity-25">
        <aside className="bg-primary w-full max-w-md rounded-xl bg-opacity-10 shadow-lg shadow-black">
          <h1 className="text-center text-secondary font-light text-4xl bg-orange rounded-t-xl m-0 py-4">
            Entre
          </h1>
          <form className="p-6" onSubmit={handleSubmit}>
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
                className="py-2 px3-3 w-full rounded text-secondary text-lg font-light  mt-3 border border-peach"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
            <div className="flex mt-5 justify-between items-center">
              <button
                type="submit"
                className="bg-fullBlack text-orange font-medium py-2 px-4 transition rounded hover:text-primary w-full"
              >
                Entrar
              </button>
            </div>
          </form>
          <p className="text-center text-primary mt-4 pb-8">
            Não tem uma conta?{" "}
            <a
              href="/signup"
              className="text-orange cursor-pointer transition hover:text-primary"
            >
              Cadastre-se
            </a>
          </p>
        </aside>
      </div>
    </main>
  );
};

export default Login;
