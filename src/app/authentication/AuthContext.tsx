"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.access_token);
    setUser(response.data.user);
    router.push("/dashboard");
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    setUser(response.data.user);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
