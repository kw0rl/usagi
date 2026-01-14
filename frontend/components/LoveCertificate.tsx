"use client";

import { motion } from "framer-motion";
import { X, Download, Heart, Sparkles, Star } from "lucide-react";
import { useRef } from "react";

interface LoveCertificateProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  recipientName?: string;
}

export default function LoveCertificate({
  isOpen,
  onClose,
  score,
  totalQuestions,
  recipientName = "My Dearest Love",
}: LoveCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const percentage = Math.round((score / totalQuestions) * 100);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      
      const link = document.createElement("a");
      link.download = "love-certificate.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download certificate:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-br from-rose-50 via-white to-sky-50 rounded-3xl p-1 shadow-2xl overflow-hidden"
        >
          {/* Decorative Border */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-sky-200 to-purple-200 opacity-50" />
          
          <div className="relative bg-white/90 backdrop-blur rounded-[22px] p-8 md:p-10">
            {/* Corner Decorations */}
            <div className="absolute top-4 left-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-pink-300" />
              </motion.div>
            </div>
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-sky-300" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-rose-300 fill-rose-300" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 right-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Heart className="w-6 h-6 text-pink-300 fill-pink-300" />
              </motion.div>
            </div>

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      i % 2 === 0 ? "text-pink-200" : "text-sky-200"
                    } fill-current`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Certificate Content */}
            <div className="relative text-center">
              {/* Header Decoration */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-pink-300 to-pink-300" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-rose-400 fill-rose-400" />
                </motion.div>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-pink-300 to-pink-300" />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-sky-500 bg-clip-text text-transparent mb-2">
                Certificate of Love
              </h1>
              
              <p className="text-gray-500 text-sm mb-6 italic">
                This certifies that
              </p>

              {/* Recipient Name */}
              <div className="relative mb-6">
                <motion.h2
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-2xl md:text-3xl font-handwriting text-gray-800"
                >
                  {recipientName}
                </motion.h2>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
              </div>

              {/* Message */}
              <div className="bg-gradient-to-r from-pink-50 via-white to-sky-50 rounded-2xl p-6 mb-6 border border-pink-100/50">
                <p className="text-gray-600 leading-relaxed">
                  Has proven beyond doubt to truly know and understand my heart.
                  With a remarkable score of{" "}
                  <span className="font-bold text-rose-500">{percentage}%</span>,
                  this special person has demonstrated that our connection is genuine and deep.
                </p>
              </div>

              {/* Score Badge */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ rotate: -5 }}
                  animate={{ rotate: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-pink-400 via-rose-400 to-sky-400 rounded-full p-1">
                    <div className="bg-white rounded-full px-8 py-4">
                      <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
                        {score}/{totalQuestions}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        Quiz Score
                      </div>
                    </div>
                  </div>
                  {/* Sparkle decorations around badge */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-2"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="text-left">
                  <p className="font-medium text-gray-700">Issued with love</p>
                  <p>{currentDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-handwriting text-xl text-rose-400">
                    Forever Yours
                  </p>
                  <p className="text-xs">Azrul</p>
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-sky-300" />
                <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
                <Star className="w-3 h-3 text-sky-300 fill-sky-300" />
                <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handleDownload}
          className="mt-6 mx-auto flex items-center gap-2 bg-sky-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-600 hover:shadow-lg hover:scale-105 transition-all"
        >
          <Download className="w-5 h-5" />
          Download Certificate
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
