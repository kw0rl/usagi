"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Heart, Wind, Sparkles, Moon, Box, Waves, Zap } from "lucide-react";
import Snowflake from "@/components/Snowflake";

type BreathingTechnique = {
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  icon: string;
  color: string;
  solidColor: string;
};

const techniques: BreathingTechnique[] = [
  {
    name: "4 7 8 Calm",
    description: "Best for anxiety and sleep. Breathe in 4s, hold 7s, out 8s.",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    icon: "moon",
    color: "from-indigo-400 to-purple-500",
    solidColor: "bg-indigo-500",
  },
  {
    name: "Box Breathing",
    description: "Used by Navy SEALs. Equal parts: in, hold, out, hold.",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    icon: "box",
    color: "from-sky-400 to-blue-500",
    solidColor: "bg-sky-500",
  },
  {
    name: "Gentle Wave",
    description: "Simple and calming. Perfect for beginners.",
    inhale: 4,
    hold1: 2,
    exhale: 6,
    hold2: 0,
    icon: "wave",
    color: "from-teal-400 to-cyan-500",
    solidColor: "bg-teal-500",
  },
  {
    name: "Energize",
    description: "Quick breaths to boost energy and focus.",
    inhale: 3,
    hold1: 0,
    exhale: 3,
    hold2: 0,
    icon: "zap",
    color: "from-amber-400 to-orange-500",
    solidColor: "bg-amber-500",
  },
];

const encouragements = [
  "You're doing amazing, baby 🩵",
  "I'm so proud of you",
  "Just breathe, I'm here with you",
  "You're stronger than you know",
  "One breath at a time, sayang",
  "I love you so much",
  "You've got this, my love",
  "Stay calm, I'm always with you",
];

type Phase = "inhale" | "hold1" | "exhale" | "hold2" | "idle";

export default function BreathePage() {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique>(techniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [encouragement, setEncouragement] = useState(encouragements[0]);

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold1":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "hold2":
        return "Hold";
      default:
        return "Ready?";
    }
  };

  const getPhaseIcon = () => {
    switch (phase) {
      case "inhale":
        return <Wind className="w-8 h-8" />;
      case "hold1":
        return <Sparkles className="w-8 h-8" />;
      case "exhale":
        return <Wind className="w-8 h-8 rotate-180" />;
      case "hold2":
        return <Sparkles className="w-8 h-8" />;
      default:
        return <Heart className="w-8 h-8" />;
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return 1.4;
      case "hold1":
        return 1.4;
      case "exhale":
        return 1;
      case "hold2":
        return 1;
      default:
        return 1.2;
    }
  };

  const getPhaseDuration = useCallback((p: Phase): number => {
    switch (p) {
      case "inhale":
        return selectedTechnique.inhale;
      case "hold1":
        return selectedTechnique.hold1;
      case "exhale":
        return selectedTechnique.exhale;
      case "hold2":
        return selectedTechnique.hold2;
      default:
        return 0;
    }
  }, [selectedTechnique]);

  const getNextPhase = useCallback((current: Phase): Phase => {
    const sequence: Phase[] = ["inhale", "hold1", "exhale", "hold2"];
    const filtered = sequence.filter((p) => getPhaseDuration(p) > 0);
    const currentIndex = filtered.indexOf(current);
    return filtered[(currentIndex + 1) % filtered.length];
  }, [getPhaseDuration]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const phaseDuration = getPhaseDuration(phase);
        if (prev >= phaseDuration) {
          const nextPhase = getNextPhase(phase);
          setPhase(nextPhase);
          
          // Count cycles when returning to inhale
          if (nextPhase === "inhale") {
            setCycles((c) => c + 1);
            setEncouragement(encouragements[Math.floor(Math.random() * encouragements.length)]);
          }
          
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, phase, getPhaseDuration, getNextPhase]);

  const handleStart = () => {
    setIsActive(true);
    setPhase("inhale");
    setTimer(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("idle");
    setTimer(0);
    setCycles(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50/30 to-pink-50 pt-24 pb-12 px-4 relative">
      {/* Floating particles - behind content */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => {
          const positions = [10, 25, 40, 55, 70, 85];
          const durations = [18, 22, 16, 20, 24, 19];
          const colors = [
            "text-sky-200",
            "text-blue-100",
            "text-cyan-100",
            "text-white",
            "text-blue-200",
            "text-sky-100"
          ];
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: `${positions[i]}vw`, 
                y: -50 
              }}
              animate={{
                y: "110vh",
                x: `${positions[i] + Math.sin(i) * 5}vw`,
              }}
              transition={{
                duration: durations[i],
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            >
              <Snowflake className={`w-6 h-6 ${colors[i]}`} />
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wind className="w-8 h-8 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Breathe With Me
            </h1>
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
          <p className="text-gray-500 max-w-md mx-auto">
            Whenever you feel overwhelmed, anxious, or need a moment of peace,
            I&apos;m here with you. Let&apos;s breathe together.
          </p>
        </motion.div>

        {/* Technique Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {techniques.map((tech) => (
            <motion.button
              key={tech.name}
              onClick={() => {
                setSelectedTechnique(tech);
                handleReset();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border-2 transition-all ${
                selectedTechnique.name === tech.name
                  ? `border-transparent bg-gradient-to-br ${tech.color} text-white shadow-lg`
                  : "border-gray-200 bg-white/70 hover:border-gray-300"
              }`}
            >
              <div className="mb-2 flex justify-center">
                {tech.icon === "moon" && <Moon className={`w-6 h-6 ${selectedTechnique.name === tech.name ? "text-white" : "text-indigo-400"}`} />}
                {tech.icon === "box" && <Box className={`w-6 h-6 ${selectedTechnique.name === tech.name ? "text-white" : "text-sky-400"}`} />}
                {tech.icon === "wave" && <Waves className={`w-6 h-6 ${selectedTechnique.name === tech.name ? "text-white" : "text-teal-400"}`} />}
                {tech.icon === "zap" && <Zap className={`w-6 h-6 ${selectedTechnique.name === tech.name ? "text-white" : "text-amber-400"}`} />}
              </div>
              <div className={`font-semibold text-sm ${
                selectedTechnique.name === tech.name ? "text-white" : "text-gray-700"
              }`}>
                {tech.name}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Selected technique description */}
        <motion.p
          key={selectedTechnique.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm mb-8"
        >
          {selectedTechnique.description}
        </motion.p>

        {/* Main Breathing Circle */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Outer glow ring */}
            <motion.div
              animate={{
                scale: getCircleScale(),
                opacity: isActive ? [0.3, 0.6, 0.3] : 0.3,
              }}
              transition={{
                scale: { duration: getPhaseDuration(phase), ease: "easeInOut" },
                opacity: { duration: 2, repeat: Infinity },
              }}
              className={`absolute w-full h-full rounded-full bg-gradient-to-br ${selectedTechnique.color} opacity-30 blur-xl`}
            />
            
            {/* Main circle */}
            <motion.div
              animate={{
                scale: getCircleScale(),
              }}
              transition={{
                duration: getPhaseDuration(phase),
                ease: "easeInOut",
              }}
              className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br ${selectedTechnique.color} shadow-2xl flex flex-col items-center justify-center`}
            >
              {/* Inner content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center text-white"
                >
                  <div className="mb-2 flex justify-center">{getPhaseIcon()}</div>
                  <div className="text-xl md:text-2xl font-bold mb-1">
                    {getPhaseText()}
                  </div>
                  {isActive && phase !== "idle" && (
                    <div className="text-3xl font-mono font-bold">
                      {Math.ceil(getPhaseDuration(phase) - timer)}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Cycles counter */}
          {cycles > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-2 text-gray-500"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{cycles} cycle{cycles > 1 ? "s" : ""} completed</span>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {!isActive ? (
            <motion.button
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full ${selectedTechnique.solidColor} text-white font-semibold shadow-lg flex items-center gap-2`}
            >
              <Play className="w-5 h-5" />
              Start Breathing
            </motion.button>
          ) : (
            <motion.button
              onClick={handlePause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gray-200 text-gray-700 font-semibold shadow-lg flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              Pause
            </motion.button>
          )}
          
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-4 rounded-full bg-white border-2 border-gray-200 text-gray-600 font-semibold shadow-md flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </motion.button>
        </motion.div>

        {/* Encouragement message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={encouragement}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-pink-100">
              <p className="text-gray-600 font-medium">{encouragement}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tips section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Tips for you, baby
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Find a comfortable position, sitting or lying down</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Close your eyes if it helps you focus</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Breathe through your nose, exhale through your mouth</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Try to complete at least 3 to 5 cycles for best effect</span>
            </li>
            <li className="flex items-start gap-3">
              <Heart className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <span>Remember: I love you and I&apos;m always here for you</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
