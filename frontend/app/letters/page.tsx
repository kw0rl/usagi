"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { letters } from "@/data/letters";
import LetterCard from "@/components/LetterCard";
import LetterModal from "@/components/LetterModal";
import { Letter } from "@/data/letters";

export default function LettersPage() {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    setIsModalOpen(true);
  };

  const closeLetter = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLetter(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            className="inline-block p-4 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full shadow-lg mb-6"
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Open When Letters 💌
          </h1>

          <p className="text-gray-600 max-w-md mx-auto">
            Surat-surat yang saya tulis untuk awak. Buka bila awak rasa sesuai dengan tajuknya ya! 
          </p>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-sky-100"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Heart className="w-6 h-6 text-sky-500" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                How it works
              </h3>
              <p className="text-gray-600 text-sm">
                Each envelope has a different title. When you feel like what's written on the title, tap the envelope to read a message from me. No cheating. Only read the one that matches how you feel!
               </p>

            </div>
          </div>
        </motion.div>

        {/* Letters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {letters.map((letter, index) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              index={index}
              onClick={() => openLetter(letter)}
            />
          ))}
        </div>

        {/* Letter Modal */}
        <LetterModal
          letter={selectedLetter}
          isOpen={isModalOpen}
          onClose={closeLetter}
        />
      </div>
    </div>
  );
}
