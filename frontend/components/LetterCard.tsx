"use client";

import { motion } from "framer-motion";
import { Letter } from "@/data/letters";

interface LetterCardProps {
  letter: Letter;
  onClick: () => void;
  index: number;
}

export default function LetterCard({ letter, onClick, index }: LetterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`cursor-pointer ${letter.themeColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center justify-center min-h-[180px] border-2 border-white/50`}
    >
      <span className="text-5xl mb-4">{letter.coverEmoji}</span>
      <h3 className="text-center font-medium text-gray-700 text-sm leading-tight">
        {letter.title}
      </h3>
    </motion.div>
  );
}
