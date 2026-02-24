/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    let active = true;

    fetch("http://localhost:3000/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Usuario nao autenticado");
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    fetch("http://localhost:3000/auth/logout", { method: "POST" });
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
