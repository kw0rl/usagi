"use client";

import { motion } from "framer-motion";
import { HelpCircle, Lightbulb } from "lucide-react";
import QuizGame from "@/components/QuizGame";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-sky-50 pt-20">
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
            className="inline-block p-4 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full shadow-lg mb-6"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How Well Do You Know Me?
          </h1>

          <p className="text-gray-600 max-w-md mx-auto">
            A quiz to test how well you know me. Be honest!
          </p>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-10 border border-amber-100"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Tips from Azrul!
              </h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Score 80% or above to unlock a special reward!</li>
                <li>• Answer honestly, don't just guess</li>
                <li>• If you get it wrong, read my message carefully!</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quiz Game */}
        <QuizGame />
      </div>
    </div>
  );
}
