"use client";
import React, { useState } from "react";

interface Expense {
  name: string;
  amount: number;
}

interface Income {
  name: string;
  amount: number;
}

const Expenses: React.FC = () => {
  const [showExpenseInput, setShowExpenseInput] = useState(false);
  const [showIncomeInput, setShowIncomeInput] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const handleAddExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense: Expense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };

      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setExpenseAmount("");
      setShowExpenseInput(false);
    }
  };

  const handleAddIncome = () => {
    if (incomeName && incomeAmount) {
      const newIncome: Income = {
        name: incomeName,
        amount: parseFloat(incomeAmount),
      };

      setIncomes([...incomes, newIncome]);
      setIncomeName("");
      setIncomeAmount("");
      setShowIncomeInput(false);
    }
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex justify-center items-center bg-secondary bg-opacity-25">
        <aside className="bg-primary w-full max-w-3xl rounded-xl bg-opacity-20 shadow-lg shadow-black">
          <h1 className="text-center text-secondary font-medium text-4xl bg-orange rounded-t-xl m-0 py-4">
            Controle de Despesas
          </h1>
          <div className="p-6">
            <div className="mb-4">
              <button
                className="bg-fullBlack text-orange font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full"
                onClick={() => setShowExpenseInput(!showExpenseInput)}
              >
                Adicionar Despesa
              </button>
              {showExpenseInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nome da Despesa"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Valor da Despesa"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <button
                    onClick={handleAddExpense}
                    className="bg-orange text-fullBlack font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full"
                  >
                    Confirmar
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <button
                className="bg-fullBlack text-orange font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full"
                onClick={() => setShowIncomeInput(!showIncomeInput)}
              >
                Adicionar Renda
              </button>
              {showIncomeInput && (
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Nome da Renda"
                    value={incomeName}
                    onChange={(e) => setIncomeName(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Valor da Renda"
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                  <button
                    onClick={handleAddIncome}
                    className="bg-orange text-fullBlack font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full"
                  >
                    Confirmar
                  </button>
                </div>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-primary text-2xl font-light mb-4">
                Resumo das Finanças
              </h2>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-inner">
                <p className="text-primary text-lg">
                  Despesas Totais: R$ {totalExpenses.toFixed(2)}
                </p>
                <p className="text-primary text-lg">
                  Rendas Totais: R$ {totalIncomes.toFixed(2)}
                </p>
                <p className="text-primary text-lg">
                  Saldo: R$ {balance.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-primary text-2xl font-light mb-4">
                Despesas
              </h2>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-inner">
                {expenses.length > 0 ? (
                  expenses.map((expense, index) => (
                    <p key={index} className="text-primary text-lg">
                      {expense.name}: R$ {expense.amount.toFixed(2)}
                    </p>
                  ))
                ) : (
                  <p className="text-primary text-lg">
                    Nenhuma despesa cadastrada.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-primary text-2xl font-light mb-4">Rendas</h2>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-inner">
                {incomes.length > 0 ? (
                  incomes.map((income, index) => (
                    <p key={index} className="text-primary text-lg">
                      {income.name}: R$ {income.amount.toFixed(2)}
                    </p>
                  ))
                ) : (
                  <p className="text-primary text-lg">
                    Nenhuma renda cadastrada.
                  </p>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Expenses;
