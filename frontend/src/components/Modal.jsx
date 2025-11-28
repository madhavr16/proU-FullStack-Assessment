import { motion } from "framer-motion";
import Button from "./Button";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          p-6 rounded-xl shadow-xl w-[400px]
          border border-gray-200 dark:border-gray-700
        "
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {children}

        <Button
          onClick={onClose}
          className="
            w-full mt-4
            bg-gray-300 dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            hover:bg-gray-400 dark:hover:bg-gray-600
          "
        >
          Close
        </Button>
      </motion.div>
    </div>
  );
}
