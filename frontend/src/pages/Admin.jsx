import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit, PackagePlus, Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";

export default function Admin() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);

  const [selectedSweet, setSelectedSweet] = useState(null);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [restockQty, setRestockQty] = useState("");

  const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sweets", { headers });
      setSweets(res.data);
    } catch (err) {
      toast.error("Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const resetForm = () => setForm({ name: "", category: "", price: "", quantity: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sweets", form, { headers });
      toast.success("Sweet created successfully! 🍬");
      setIsAddOpen(false);
      resetForm();
      fetchSweets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create sweet");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/sweets/${selectedSweet._id}`, form, { headers });
      toast.success("Sweet updated successfully!");
      setIsEditOpen(false);
      fetchSweets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update sweet");
    }
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/sweets/${selectedSweet._id}/restock`, { quantity: Number(restockQty) }, { headers });
      toast.success("Restock successful!");
      setIsRestockOpen(false);
      setRestockQty("");
      fetchSweets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Restock failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${id}`, { headers });
      toast.success("Sweet deleted.");
      fetchSweets();
    } catch (err) {
      toast.error("Failed to delete sweet");
    }
  };

  const openEdit = (sweet) => {
    setSelectedSweet(sweet);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity
    });
    setIsEditOpen(true);
  };

  const openRestock = (sweet) => {
    setSelectedSweet(sweet);
    setRestockQty("");
    setIsRestockOpen(true);
  };

  const filtered = sweets.filter(
    (s) =>
      (s.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (s.category?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">Admin Panel 🛠️</h1>
          <p className="text-white/60">Manage your inventory and products.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus className="w-5 h-5" /> Add New Sweet
        </Button>
      </div>

      {/* Search & List */}
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            placeholder="Search inventory..."
            className="pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-4">
          <AnimatePresence>
            {filtered.map((sweet) => (
              <motion.div
                key={sweet._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold">{sweet.name}</h3>
                  <div className="flex gap-4 text-white/60 text-sm mt-1">
                    <span>{sweet.category}</span>
                    <span>•</span>
                    <span>₹{sweet.price}</span>
                    <span>•</span>
                    <span className={sweet.quantity < 5 ? "text-red-400 font-bold" : "text-green-400"}>
                      Stock: {sweet.quantity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" onClick={() => openRestock(sweet)} title="Restock">
                    <PackagePlus className="w-5 h-5 text-green-400" />
                  </Button>
                  <Button variant="ghost" onClick={() => openEdit(sweet)} title="Edit">
                    <Edit className="w-5 h-5 text-blue-400" />
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(sweet._id)} title="Delete">
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Sweet">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <Input
              label="Initial Quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-4">Create Sweet</Button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Sweet">
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
            <Input
              label="Quantity (Manual Override)"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-4">Update Sweet</Button>
        </form>
      </Modal>

      {/* Restock Modal */}
      <Modal isOpen={isRestockOpen} onClose={() => setIsRestockOpen(false)} title="Restock Sweet">
        <form onSubmit={handleRestock} className="space-y-4">
          <p className="text-white/60">
            Adding stock to: <span className="text-white font-bold">{selectedSweet?.name}</span>
          </p>
          <Input
            label="Quantity to Add"
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            required
            autoFocus
          />
          <Button type="submit" className="w-full mt-4">Confirm Restock</Button>
        </form>
      </Modal>
    </div>
  );
}
