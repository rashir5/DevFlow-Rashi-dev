import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const token = localStorage.getItem("devflow-token");
      const user = JSON.parse(localStorage.getItem("devflow-user") || "null");
      if (token && user) return { token, user };
    } catch {
      // ignore
    }
    return null;
  });

  function login(token, user) {
    localStorage.setItem("devflow-token", token);
    localStorage.setItem("devflow-user", JSON.stringify(user));
    setAuth({ token, user });
  }

  function logout() {
    localStorage.removeItem("devflow-token");
    localStorage.removeItem("devflow-user");
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
