import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, LogOut, User, Menu, X, LayoutDashboard, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const NavLinks = () => (
    <>
      <Link
        to="/dashboard"
        className="text-white/80 hover:text-white font-medium transition flex items-center gap-2"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </Link>
      {(role === "ADMIN" || role === "admin") && (
        <Link
          to="/admin"
          className="text-pink-400 hover:text-pink-300 font-medium transition flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Shield className="w-5 h-5" />
          Admin
        </Link>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-tight">SweetShop</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {token ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6 border-r border-white/10 pr-6">
                <Link to="/dashboard" className="text-sm font-medium text-white/60 hover:text-white transition">
                  Dashboard
                </Link>
                {(role === "ADMIN" || role === "admin") && (
                  <Link to="/admin" className="text-sm font-medium text-white/60 hover:text-white transition">
                    Admin
                  </Link>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium hover:text-white/80 transition">Login</Link>
              <Link to="/register">
                <Button size="sm" className="bg-white/10 hover:bg-white/20">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/80">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#0f172a]"
          >
            <div className="flex flex-col p-6 gap-6">
              {token ? (
                <>
                  <NavLinks />
                  <hr className="border-white/10" />
                  <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-red-400">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link to="/login" className="text-center py-3 rounded-xl bg-white/5 border border-white/10 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full py-6 text-lg">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
