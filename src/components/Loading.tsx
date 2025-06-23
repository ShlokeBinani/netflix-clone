import { ImSpinner8 } from "react-icons/im";
import { motion } from "framer-motion";

export const Loading = () => (
  <motion.div
    className="flex items-center justify-center min-h-screen bg-black text-white text-2xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      <ImSpinner8 size={48} /> {/* <-- REMOVE "1000"! */}
    </motion.div>
  </motion.div>
);
