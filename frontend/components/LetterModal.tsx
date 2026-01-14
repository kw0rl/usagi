"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Letter } from "@/data/letters";

interface LetterModalProps {
  letter: Letter | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterModal({
  letter,
  isOpen,
  onClose,
}: LetterModalProps) {
  if (!letter) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl ${letter.themeColor} p-6 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">{letter.coverEmoji}</span>
              <h2 className="text-xl font-semibold text-gray-800">
                {letter.title}
              </h2>
            </div>

            <div className="bg-white/70 rounded-xl p-6 shadow-inner">
              <p className="whitespace-pre-line text-gray-700 leading-relaxed font-handwriting text-lg">
                {letter.content}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
