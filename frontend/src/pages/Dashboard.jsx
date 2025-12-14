import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";
import { Input } from "../components/ui/Input";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(null);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sweets", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSweets(res.data);
    } catch (err) {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const purchase = async (id) => {
    setPurchaseLoading(id);
    try {
      await api.post(
        `/sweets/${id}/purchase`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Sweet purchased successfully! 🍬");
      fetchSweets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    } finally {
      setPurchaseLoading(null);
    }
  };

  const filtered = Array.isArray(sweets) ? sweets.filter(
    (s) =>
      (s.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (s.category?.toLowerCase() || "").includes(search.toLowerCase())
  ) : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            Sweet Dashboard
          </h1>
          <p className="text-white/60 text-lg">
            Browse and purchase your favorite treats.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            placeholder="Search by name or category..."
            className="pl-12 bg-white/5 border-white/10 focus:bg-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-white/40 font-medium">No sweets found 🍭</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((sweet) => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onPurchase={purchase}
                  isLoading={purchaseLoading === sweet._id}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
