import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, User, Shield } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-panel border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
          SweetShop<span className="text-white">.</span>
        </Link>

        <div className="flex items-center gap-6">
          {!token ? (
            <>
              <Link to="/login" className="text-white/80 hover:text-white font-medium transition">Login</Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-pink-100 transition shadow-lg shadow-white/10"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="p-2 rounded-lg hover:bg-white/10 transition text-white/80 hover:text-white" title="Dashboard">
                <LayoutDashboard className="w-5 h-5" />
              </Link>

              {role === "ADMIN" && (
                <Link to="/admin" className="p-2 rounded-lg hover:bg-white/10 transition text-pink-400 hover:text-pink-300" title="Admin Panel">
                  <Shield className="w-5 h-5" />
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
