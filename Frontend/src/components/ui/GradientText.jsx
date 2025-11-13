// src/components/ui/GradientText.jsx
import { motion } from "framer-motion";

export const GradientText = ({ children, className = "" }) => (
  <motion.span
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className={`text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-300% ${className}`}
  >
    {children}
  </motion.span>
);
