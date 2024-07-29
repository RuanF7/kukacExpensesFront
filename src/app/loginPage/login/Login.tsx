import React from "react";

const Login: React.FC = () => {
  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex justify-center items-center bg-secondary bg-opacity-25">
        <aside className="bg-primary w-full max-w-md rounded-xl bg-opacity-20 shadow-lg shadow-black">
          <h1 className="text-center text-secondary font-medium  text-4xl bg-orange rounded-t-xl m-0 py-4">
            Entre
          </h1>
          <form className="p-6">
            <input
              type="text"
              name=""
              placeholder="Nome de usuário"
              className="py-2 px3-3 w-full bg-peach rounded-md text-primary placeholder-primary text-lg font-light outline-none"
            />
            <input
              type="text"
              name=""
              placeholder="Senha"
              className="py-2 px3-3 w-full bg-peach rounded-md text-primary placeholder-primary text-lg font-light outline-none mt-3"
            />
            <div className="flex mt-5 justify-between items-center">
              <a
                href="/signup"
                className="text-orange cursor-pointer transition hover:text-primary"
              >
                Não tem uma conta?
              </a>
              <button
                type="submit"
                className="bg-fullBlack text-orange font-medium rounded-3xl py-2 px-8 transition hover:text-primary"
              >
                Entrar
              </button>
            </div>
          </form>
        </aside>
      </div>
    </main>
  );
};

export default Login;
