import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn"; 

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className, 
  ...props 
}) => {
  const variants = {
    primary: "primary-gradient border-transparent",
    secondary: "glass-button",
    danger: "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20",
    ghost: "bg-transparent border-transparent hover:bg-white/5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
};
