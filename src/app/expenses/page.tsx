"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditUser from "../editUser/EditUser";

interface Expense {
  id: number;
  name: string;
  amount: number;
}

interface Income {
  id: number;
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
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [editingIncomeId, setEditingIncomeId] = useState<number | null>(null);
  const [editExpenseName, setEditExpenseName] = useState("");
  const [editExpenseAmount, setEditExpenseAmount] = useState("");
  const [editIncomeName, setEditIncomeName] = useState("");
  const [editIncomeAmount, setEditIncomeAmount] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("TOKEN:", token);
    console.log("USER ID:", userId);
    fetchExpenses();
    fetchIncomes();
  }, []);

  async function fetchExpenses() {
    try {
      const response = await axios.get("http://localhost:4000/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Erro ao carregar despesas:", error);
    }
  }

  async function fetchIncomes() {
    try {
      const response = await axios.get("http://localhost:4000/incomes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncomes(response.data);
    } catch (error) {
      console.error("Erro ao carregar rendas:", error);
    }
  }

  const handleAddExpense = async () => {
    if (expenseName && expenseAmount) {
      try {
        const response = await axios.post(
          "http://localhost:4000/expenses",
          {
            name: expenseName,
            amount: parseFloat(expenseAmount),
            date: new Date().toISOString(),
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpenses([...expenses, response.data]);
        setExpenseName("");
        setExpenseAmount("");
        setShowExpenseInput(false);
      } catch (error) {
        console.error("Erro ao adicionar despesa:", error);
      }
    }
  };

  const handleAddIncome = async () => {
    if (incomeName && incomeAmount) {
      try {
        const response = await axios.post(
          "http://localhost:4000/incomes",
          {
            name: incomeName,
            amount: parseFloat(incomeAmount),
            date: new Date().toISOString(),
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIncomes([...incomes, response.data]);
        setIncomeName("");
        setIncomeAmount("");
        setShowIncomeInput(false);
      } catch (error) {
        console.error("Erro ao adicionar renda:", error);
      }
    }
  };

  const handleEditExpense = async (id: number) => {
    if (editExpenseName && editExpenseAmount) {
      try {
        const response = await axios.put(
          `http://localhost:4000/expenses/${id}`,
          {
            name: editExpenseName,
            amount: parseFloat(editExpenseAmount),
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpenses(
          expenses.map((expense) =>
            expense.id === id ? response.data : expense
          )
        );
        setEditingExpenseId(null);
        setEditExpenseName("");
        setEditExpenseAmount("");
      } catch (error) {
        console.error("Erro ao editar despesa:", error);
      }
    }
  };

  const handleEditIncome = async (id: number) => {
    if (editIncomeName && editIncomeAmount) {
      try {
        const response = await axios.put(
          `http://localhost:4000/incomes/${id}`,
          {
            name: editIncomeName,
            amount: parseFloat(editIncomeAmount),
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIncomes(
          incomes.map((income) => (income.id === id ? response.data : income))
        );
        setEditingIncomeId(null);
        setEditIncomeName("");
        setEditIncomeAmount("");
      } catch (error) {
        console.error("Erro ao editar renda:", error);
      }
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:4000/expenses/${id}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await axios.delete(
        `http://localhost:4000/incomes/${id}?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIncomes(incomes.filter((income) => income.id !== id));
    } catch (error) {
      console.error("Erro ao deletar renda:", error);
    }
  };

  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-start bg-secondary bg-opacity-25 p-4 md:p-8 rounded-lg shadow-lg shadow-black">
        <aside className="bg-primary w-full md:max-w-3xl rounded-xl bg-opacity-10 shadow-lg shadow-black mb-4 md:mb-0 md:mr-4">
          <h1 className="text-center text-secondary font-medium text-4xl bg-orange rounded-t-xl m-0 py-4">
            Controle de Despesas
          </h1>
          <div className="p-6">
            <div className="mb-4">
              <button
                className="bg-fullBlack text-orange font-medium rounded py-2 px-4 transition hover:text-primary w-full"
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
                    className="w-full p-2 mb-2 border rounded border-peach"
                  />
                  <input
                    type="number"
                    placeholder="Valor da Despesa"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full p-2 mb-2 border rounded border-peach"
                  />
                  <button
                    onClick={handleAddExpense}
                    className="bg-orange text-fullBlack font-medium rounded py-2 px-4 transition hover:text-primary w-full"
                  >
                    Confirmar
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <button
                className="bg-fullBlack text-orange font-medium rounded py-2 px-4 transition hover:text-primary w-full"
                onClick={() => setShowIncomeInput(!showIncomeInput)}
              >
                Adicionar Renda
              </button>
              {showIncomeInput && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Nome da Renda"
                    value={incomeName}
                    onChange={(e) => setIncomeName(e.target.value)}
                    className="w-full p-2 mb-2 border rounded border-peach"
                  />
                  <input
                    type="number"
                    placeholder="Valor da Renda"
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    className="w-full p-2 mb-4 border rounded border-peach"
                  />
                  <button
                    onClick={handleAddIncome}
                    className="bg-orange text-fullBlack font-medium rounded py-2 px-4 transition hover:text-primary w-full"
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
              <div className="bg-fullBlack p-4 rounded-lg shadow-inner">
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
              <div className="bg-fullBlack p-4 rounded-lg shadow-inner">
                {expenses.length > 0 ? (
                  expenses.map((expense, index) => (
                    <div
                      key={expense.id}
                      className={
                        expenses.length > 1 && index < expenses.length - 1
                          ? "mb-2"
                          : ""
                      }
                    >
                      {editingExpenseId === expense.id ? (
                        <div>
                          <input
                            type="text"
                            value={editExpenseName}
                            onChange={(e) => setEditExpenseName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded border-peach"
                          />
                          <input
                            type="number"
                            value={editExpenseAmount}
                            onChange={(e) =>
                              setEditExpenseAmount(e.target.value)
                            }
                            className="w-full p-2 mb-2 border rounded border-peach"
                          />
                          <button
                            onClick={() => handleEditExpense(expense.id)}
                            className="bg-orange text-fullBlack font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full"
                          >
                            Confirmar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p className="text-primary text-lg flex-1">
                            {expense.name}: R$ {expense.amount.toFixed(2)}
                          </p>
                          <button
                            onClick={() => {
                              setEditingExpenseId(expense.id);
                              setEditExpenseName(expense.name);
                              setEditExpenseAmount(expense.amount.toFixed(2));
                            }}
                            className="bg-fullBlack text-fullBlack py-1 px-2 rounded mr-2"
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ color: "#fa6400" }}
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="bg-fullBlack text-orange py-1 px-2 rounded"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#fa6400" }}
                            />
                          </button>
                        </div>
                      )}
                    </div>
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
              <div className="bg-fullBlack p-4 rounded-lg shadow-inner">
                {incomes.length > 0 ? (
                  incomes.map((income, index) => (
                    <div
                      key={income.id}
                      className={
                        incomes.length > 1 && index < incomes.length - 1
                          ? "mb-2"
                          : ""
                      }
                    >
                      {editingIncomeId === income.id ? (
                        <div>
                          <input
                            type="text"
                            value={editIncomeName}
                            onChange={(e) => setEditIncomeName(e.target.value)}
                            className="w-full p-2 mb-2 border rounded border-peach"
                          />
                          <input
                            type="number"
                            value={editIncomeAmount}
                            onChange={(e) =>
                              setEditIncomeAmount(e.target.value)
                            }
                            className="w-full p-2 mb-2 border rounded border-peach"
                          />
                          <button
                            onClick={() => handleEditIncome(income.id)}
                            className="bg-orange text-fullBlack font-medium rounded-3xl py-2 px-4 transition hover:text-primary w-full"
                          >
                            Confirmar
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p className="text-primary text-lg flex-1">
                            {income.name}: R$ {income.amount.toFixed(2)}
                          </p>
                          <button
                            onClick={() => {
                              setEditingIncomeId(income.id);
                              setEditIncomeName(income.name);
                              setEditIncomeAmount(income.amount.toFixed(2));
                            }}
                            className="bg-fullBlack text-fullBlack py-1 px-2 rounded mr-2"
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              style={{ color: "#fa6400" }}
                            />
                          </button>
                          <button
                            onClick={() => handleDeleteIncome(income.id)}
                            className="bg-fullBlack text-orange py-1 px-2 rounded"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#fa6400" }}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-primary text-lg">
                    Nenhuma renda cadastrada.
                  </p>
                )}
              </div>
            </div>
            <EditUser />
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Expenses;
