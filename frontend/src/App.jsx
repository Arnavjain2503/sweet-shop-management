import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

export default function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />

      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={token ? <Orders /> : <Navigate to="/login" />}
          />

          {/* Admin only - simplified check, ensure case matches */}
          <Route
            path="/admin"
            element={
              token && (role === "ADMIN" || role === "admin") ? (
                <Admin />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
