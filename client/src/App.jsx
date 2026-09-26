import { useState } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppRoutes() {
  const { auth } = useAuth();
  const [page, setPage] = useState("login");

  if (auth) {
    return <Dashboard />;
  }

  if (page === "register") {
    return <Register onGoToLogin={() => setPage("login")} />;
  }

  return <Login onGoToRegister={() => setPage("register")} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
