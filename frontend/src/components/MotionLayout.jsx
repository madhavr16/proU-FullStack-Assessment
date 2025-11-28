import { motion } from "framer-motion";

export default function MotionLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}       // start position
      animate={{ opacity: 1, y: 0 }}        // animate into view
      exit={{ opacity: 0, y: -20 }}         // exit animation
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
