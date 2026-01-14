"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Trophy, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { questions, Question } from "@/data/questions";
import LoveCertificate from "./LoveCertificate";

export default function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQuestion: Question = questions[currentQuestionIndex];
  const percentage = Math.round((score / questions.length) * 100);

  const handleAnswerClick = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    } else {
      setWrongMessage(currentQuestion.wrongAnswerMessage);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizComplete(true);
        if ((score + (correct ? 1 : 0)) / questions.length >= 0.8) {
          triggerConfetti();
        }
      }
    }, 1500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#7dd3fc", "#38bdf8", "#0ea5e9", "#93c5fd", "#60a5fa"],
    });
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Complete!
        </h2>

        <div className="text-6xl font-bold text-sky-500 mb-4">
          {score}/{questions.length}
        </div>

        <p className="text-xl text-gray-600 mb-8">
          {percentage >= 80
            ? "Amazing! You really know me well!"
            : percentage >= 50
            ? "Not bad! But you can do better"
            : "Hmm... you need to study more about me!"}
        </p>

        {percentage >= 80 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-6 bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl"
          >
            <Heart className="w-12 h-12 mx-auto text-sky-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Special Reward!
            </h3>
            <p className="text-gray-600 mb-4">
              Congratulations! You earned a special reward for your high score!
            </p>
            <button
              onClick={() => setShowCertificate(true)}
              className="inline-block bg-sky-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-600 transition-colors"
            >
              Claim Reward
            </button>
          </motion.div>
        )}

        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 mx-auto bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>

        {/* Love Certificate Modal */}
        <AnimatePresence>
          <LoveCertificate
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            score={score}
            totalQuestions={questions.length}
            recipientName="Buna"
          />
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span>Score: {score}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerClick(index)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                  showFeedback
                    ? index === currentQuestion.correctAnswerIndex
                      ? "bg-green-100 border-2 border-green-500 text-green-700"
                      : index === selectedAnswer
                      ? "bg-red-100 border-2 border-red-500 text-red-700"
                      : "bg-gray-100 text-gray-400"
                    : "bg-gray-100 hover:bg-sky-50 hover:border-sky-300 border-2 border-transparent text-gray-700"
                }`}
              >
                <span>{option}</span>
                {showFeedback && index === currentQuestion.correctAnswerIndex && (
                  <Check className="w-6 h-6 text-green-500" />
                )}
                {showFeedback &&
                  index === selectedAnswer &&
                  index !== currentQuestion.correctAnswerIndex && (
                    <X className="w-6 h-6 text-red-500" />
                  )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`text-center p-4 rounded-xl ${
              isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isCorrect ? (
              <p className="font-semibold">Correct! You're amazing!</p>
            ) : (
              <p className="font-semibold">{wrongMessage}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
