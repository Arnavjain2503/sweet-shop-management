import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function SweetCard({ sweet, onPurchase, isLoading }) {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
    >
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold tracking-tight">{sweet.name}</h3>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/10">
            {sweet.category}
          </span>
        </div>
        <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
          ₹{sweet.price}
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-between items-center text-sm font-medium text-white/60">
          <span>Available Stock</span>
          <span className={isOutOfStock ? "text-red-400" : "text-green-400"}>
            {sweet.quantity} units
          </span>
        </div>

        <Button
          onClick={() => onPurchase(sweet._id)}
          disabled={isOutOfStock || isLoading}
          variant={isOutOfStock ? "ghost" : "primary"}
          className="w-full"
        >
          {isOutOfStock ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              Purchase
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
