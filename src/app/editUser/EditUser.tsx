"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const EditUser = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    userId: "",
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const response = await axios.get("http://localhost:4000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, password } = userData;

    if (!name || !password) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (!storedUserId) {
        alert("ID do usuário não encontrado. Por favor, faça login novamente.");
        return;
      }

      console.log("Atualizando dados para userId:", storedUserId);

      const response = await fetch(
        `http://localhost:4000/users/${storedUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, password }),
        }
      );

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
        setEditing(false);
      } else {
        alert("Erro ao atualizar dados.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      alert("Erro ao atualizar dados.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-secondary bg-opacity-25">
      <aside className="bg-primary w-full max-w-md rounded-xl bg-opacity-10 shadow-lg shadow-black">
        <div className="p-6">
          <button
            onClick={handleEdit}
            className="bg-fullBlack text-orange font-medium py-2 px-4 transition rounded hover:text-primary w-full"
          >
            {editing ? "Cancelar" : "Editar Usuário"}
          </button>
          {editing && (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-orange">
                  Nome:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Novo nome"
                  required
                  className="py-2 px-3 w-full rounded text-secondary text-lg font-light border border-peach mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-orange">
                  Senha:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Nova senha"
                  required
                  className="py-2 px-3 w-full rounded text-secondary text-lg font-light border border-peach mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-fullBlack text-orange font-medium py-2 px-4 transition rounded hover:text-primary w-full"
              >
                Salvar
              </button>
            </form>
          )}
          <button
            onClick={handleLogout}
            className="bg-fullBlack text-orange font-medium py-2 px-4 transition rounded hover:text-primary w-full mt-4"
          >
            Sair
          </button>
        </div>
      </aside>
    </div>
  );
};

export default EditUser;
