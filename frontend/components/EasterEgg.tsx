"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, X } from "lucide-react";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useKonamiCode(() => {
    setIsActive(true);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 5000);
  });

  if (!isActive) return null;

  return (
    <>
      {/* Floating Hearts Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 1, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute"
          >
            <Heart
              className="text-sky-400"
              size={Math.random() * 20 + 15}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Secret Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-400 rounded-3xl p-8 max-w-md text-center text-white shadow-2xl"
            >
              <button
                onClick={() => setShowMessage(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                <Heart className="w-20 h-20 mx-auto mb-6" fill="white" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-4">
                🎉 You Found It! 🎉
              </h2>

              <p className="text-xl mb-6 leading-relaxed">
                I Love You Sayang! 💕
                <br />
                <span className="text-lg opacity-90">
                  Forever and always, you are my everything.
                </span>
              </p>

              <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 py-2">
                <Music className="w-5 h-5" />
                <span className="text-sm">Secret mode activated!</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deactivate Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsActive(false)}
        className="fixed bottom-4 right-4 z-50 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-pink-600 transition-colors"
      >
        ✨ Deactivate Magic
      </motion.button>
    </>
  );
}
