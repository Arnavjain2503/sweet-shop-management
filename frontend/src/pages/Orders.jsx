import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setOrders(res.data);
            } catch (err) {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/dashboard" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
                            <ArrowLeft className="w-5 h-5 text-white/60" />
                        </Link>
                        <h1 className="text-3xl font-black">My Orders 📦</h1>
                    </div>
                    <p className="text-white/60 ml-11">Track your sweet purchases.</p>
                </div>

                <div className="glass-panel px-6 py-4 rounded-2xl flex flex-col items-center min-w-[200px]">
                    <span className="text-white/60 text-sm font-medium uppercase tracking-wider">Total Spent</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
                        ₹{totalSpent}
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <ShoppingBag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                    <p className="text-white/60 mb-6">Start your sweet journey today!</p>
                    <Link to="/dashboard" className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 font-bold transition">
                        Browse Sweets
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-600/20 flex items-center justify-center border border-white/10">
                                    <ShoppingBag className="w-5 h-5 text-pink-300" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold group-hover:text-pink-300 transition">{order.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-white/50">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(order.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{new Date(order.date).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-bold">₹{order.price}</span>
                                <p className="text-xs text-white/40">Qty: {order.quantity}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
