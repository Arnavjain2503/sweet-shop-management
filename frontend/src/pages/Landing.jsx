import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-pink-300 mb-4">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">Premium Sweets Collection</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight bg-gradient-to-r from-white via-pink-100 to-pink-400 bg-clip-text text-transparent">
          Taste the <br />
          <span className="text-white">Extraordinary</span>
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Experience the finest handcrafted sweets, delivered to your doorstep.
          Managing inventory has never been this delicious.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/register"
            className="group px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-pink-50 transition-all flex items-center gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-lg transition-all"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
