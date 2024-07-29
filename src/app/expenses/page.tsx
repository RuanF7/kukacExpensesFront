import React from "react";

const Expenses: React.FC = () => {
  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex justify-center items-center bg-secondary bg-opacity-25">
        <aside className="bg-primary w-full max-w-3xl rounded-xl bg-opacity-20 shadow-lg shadow-black">
          <h1 className="text-center text-secondary font-medium text-4xl bg-orange rounded-t-xl m-0 py-4">
            Controle de Despesas
          </h1>
          <div className="p-6">
            <div className="mb-4">
              <button className="bg-fullBlack text-orange font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full">
                Adicionar Despesa
              </button>
            </div>
            <div className="mb-4">
              <button className="bg-fullBlack text-orange font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full">
                Adicionar Renda
              </button>
            </div>
            <div className="mt-6">
              <h2 className="text-primary text-2xl font-light mb-4">
                Resumo das Finanças
              </h2>
              {/* Aqui você pode adicionar um componente para exibir o resumo das finanças */}
              <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-inner">
                <p className="text-primary text-lg">Despesas Totais: R$ 0,00</p>
                <p className="text-primary text-lg">Rendas Totais: R$ 0,00</p>
                <p className="text-primary text-lg">Saldo: R$ 0,00</p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-primary text-2xl font-light mb-4">
                Despesas
              </h2>
              {/* Aqui você pode adicionar uma lista de despesas */}
              <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-inner">
                <p className="text-primary text-lg">
                  Nenhuma despesa cadastrada.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-primary text-2xl font-light mb-4">Rendas</h2>
              {/* Aqui você pode adicionar uma lista de rendas */}
              <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-inner">
                <p className="text-primary text-lg">
                  Nenhuma renda cadastrada.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Expenses;
