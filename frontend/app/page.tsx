"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, HelpCircle, Heart, Sparkles, Music, Calendar } from "lucide-react";
import EasterEgg from "@/components/EasterEgg";
import FloatingMemories from "@/components/FloatingMemories";

// 📅 Tarikh mula kenal - 6 Januari 2026
const TOGETHER_SINCE = new Date("2026-01-06T00:00:00");

function useCountdown(startDate: Date) {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      // Total time since start
      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(diff / (1000 * 60));
      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = totalDays % 30;

      setTimeElapsed({ years, months, days, totalHours, totalMinutes, totalSeconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return timeElapsed;
}

function CountdownTimer() {
  const time = useCountdown(TOGETHER_SINCE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="h-40"
      />
    );
  }

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="relative"
    >
      {/* Orbit animation - seconds rotating around */}
      <div className="relative w-64 h-64 mx-auto">
        {/* Center - Days */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-center">
            <motion.div
              className="text-7xl md:text-8xl font-black bg-gradient-to-br from-pink-500 via-rose-400 to-pink-600 bg-clip-text text-transparent"
              style={{ lineHeight: 1 }}
            >
              {time.days}
            </motion.div>
            <div className="text-pink-400 text-sm tracking-[0.3em] uppercase mt-1">days</div>
          </div>
        </motion.div>

        {/* Orbiting ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {/* Hours marker */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              {time.totalHours.toLocaleString()}h
            </div>
          </div>
        </motion.div>

        {/* Second orbiting ring - opposite direction */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {/* Minutes marker */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <div className="bg-rose-400 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
              {time.totalMinutes.toLocaleString()}m
            </div>
          </div>
        </motion.div>

        {/* Pulsing circle behind */}
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-pink-200"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-rose-200"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 60 * Math.PI / 180) * 100],
              y: [0, Math.sin(i * 60 * Math.PI / 180) * 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-gray-500 font-handwriting text-lg">
          orbiting around you since <span className="text-pink-500">Jan 6</span>
        </p>
        <motion.p
          className="text-pink-400 text-sm mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {time.totalSeconds.toLocaleString()} heartbeats ♡
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <EasterEgg />
      
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-sky-100 pt-24 overflow-visible relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
          {/* Floating hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1500),
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100
              }}
              animate={{
                y: -100,
                x: [
                  null,
                  `+=${Math.sin(i) * 50}`,
                  `+=${Math.cos(i) * 50}`,
                  `+=${Math.sin(i + 1) * 50}`
                ],
                rotate: [0, 360],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
              suppressHydrationWarning
            >
              <Heart 
                size={16 + (i % 3) * 6} 
                className={i % 3 === 0 ? "text-pink-200" : i % 3 === 1 ? "text-rose-200" : "text-sky-200"} 
                fill="currentColor" 
              />
            </motion.div>
          ))}

          {/* Floating sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              suppressHydrationWarning
            >
              <Sparkles 
                size={12 + (i % 2) * 4} 
                className="text-yellow-300/40" 
              />
            </motion.div>
          ))}

          {/* Soft moving circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className={`absolute rounded-full bg-gradient-to-br ${
                i % 2 === 0 
                  ? "from-pink-200/10 to-rose-200/10" 
                  : "from-sky-200/10 to-blue-200/10"
              } blur-2xl`}
              style={{
                width: 100 + i * 50,
                height: 100 + i * 50,
                left: `${i * 20}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -20, 20, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              suppressHydrationWarning
            />
          ))}
        </div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 py-16 text-center relative overflow-visible"
        >
          {/* Usagi Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute left-16 md:left-24 lg:left-32 top-24 md:top-20 w-36 h-36 md:w-56 md:h-56 lg:w-72 lg:h-72 paper-float -rotate-6"
          >
            {/* Floating hearts around Usagi */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 3, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0 }}
              className="absolute -top-2 right-8 text-pink-300"
            >
              <Heart size={12} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, -2, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute top-4 -right-2 text-sky-300"
            >
              <Heart size={10} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 1 }}
              className="absolute bottom-8 -left-2 text-pink-400"
            >
              <Heart size={8} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0], x: [0, 2, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.3 }}
              className="absolute top-1/3 -left-4 text-rose-300"
            >
              <Heart size={10} fill="currentColor" />
            </motion.div>

            <Image
              src="/usagi-outline.png"
              alt="Usagi"
              fill
              className="object-contain drop-shadow-xl"
            />
            {/* Speech Bubble for Usagi */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", damping: 12 }}
              className="absolute right-0 md:right-4 -top-8 md:-top-10 speech-bubble-left z-50"
            >
              <div className="cloud-bubble bg-white shadow-lg px-3 py-2 md:px-4 md:py-2">
                <span className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">im buna 🐰</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Neko Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute right-16 md:right-24 lg:right-32 top-24 md:top-20 w-36 h-36 md:w-56 md:h-56 lg:w-72 lg:h-72 paper-float-reverse rotate-6"
          >
            {/* Floating hearts around Neko */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, -3, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.2 }}
              className="absolute -top-2 left-8 text-pink-300"
            >
              <Heart size={12} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 2, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.7 }}
              className="absolute top-4 -left-2 text-sky-300"
            >
              <Heart size={10} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 1.2 }}
              className="absolute bottom-8 -right-2 text-pink-400"
            >
              <Heart size={8} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0], x: [0, -2, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
              className="absolute top-1/3 -right-4 text-rose-300"
            >
              <Heart size={10} fill="currentColor" />
            </motion.div>

            <Image
              src="/neko-outline.png"
              alt="Neko"
              fill
              className="object-contain drop-shadow-xl"
            />
            {/* Speech Bubble for Neko */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", damping: 12 }}
              className="absolute left-0 md:left-4 -top-8 md:-top-10 speech-bubble-right z-50"
            >
              <div className="cloud-bubble bg-white shadow-lg px-3 py-2 md:px-4 md:py-2">
                <span className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">im azrul 🐱</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 pt-64 md:pt-72 lg:pt-80 text-center"
          >
            Welcome My<span className="relative inline-block h-[2em] w-[2.58em] align-middle -ml-1"><Image src="/Love.png" alt="Love" fill className="object-contain" /></span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-2"
          >
            Every click feels like a hug
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-500 mb-12"
          >
            A special place just for us ♡
          </motion.p>

          {/* Countdown Timer */}
          <CountdownTimer />
        </motion.section>

        {/* Bento Grid Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-5xl mx-auto px-4 py-16 relative"
        >
          {/* Background decorative blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-300/30 rounded-full blur-3xl" />
          
          {/* Bento Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            
            {/* Digital Letters - Large tile */}
            <Link href="/letters" className="md:col-span-2 md:row-span-1">
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group h-full min-h-[200px] bg-white/60 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(56,189,248,0.2)] transition-all duration-500 cursor-pointer overflow-hidden relative"
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/0 via-blue-400/0 to-indigo-400/0 group-hover:from-sky-400/10 group-hover:via-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-500 rounded-[2rem]" />
                
                {/* Floating envelope decoration */}
                <motion.div 
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute top-4 right-4 md:top-6 md:right-6"
                >
                  <span className="text-5xl md:text-7xl opacity-20 group-hover:opacity-40 transition-opacity">💌</span>
                </motion.div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-sky-500 bg-sky-50 px-3 py-1 rounded-full">MY LETTER</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors">
                    Hi Dear
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-md">
                    If you ever feel down, just open this letter.
                  </p>
                </div>
                
                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sky-500">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Love Quiz - Tall tile */}
            <Link href="/quiz" className="md:row-span-2">
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 5 }}
                whileTap={{ scale: 0.98 }}
                className="group h-full min-h-[280px] md:min-h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(139,92,246,0.3)] transition-all duration-500 cursor-pointer overflow-hidden relative"
              >
                {/* Animated sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2 + i * 0.5,
                        delay: i * 0.3 
                      }}
                      className="absolute text-white/30"
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`
                      }}
                    >
                      ✦
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                    <Image
                      src="/rabbit.jpg"
                      alt="Rabbit"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Love Quiz
                  </h3>
                  <p className="text-white/80 leading-relaxed flex-grow">
                    Sejauh mana awak kenal saya? Test your knowledge! 🎯
                  </p>
                  
                  {/* Score badge */}
                  <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full self-start">
                    <span className="text-white text-sm font-medium">Score 80%+ untuk reward 🎁</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Spotify Playlist - Wide tile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="md:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2rem] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden relative"
            >
              {/* Spotify green glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1DB954] rounded-lg flex items-center justify-center overflow-hidden">
                      <Image src="/rabbit-music.jpg" alt="Rabbit Music" width={40} height={40} className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Our Playlist</h3>
                      <p className="text-xs text-gray-400">Songs that remind me of you 💙</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <span className="text-2xl">🎵</span>
                  </motion.div>
                </div>
                
                {/* Spotify Embed */}
                <div className="rounded-xl overflow-hidden">
                  <iframe 
                    style={{ borderRadius: '12px' }}
                    src="https://open.spotify.com/embed/playlist/3t1FKjfv50WhqwdBDXwYzb?utm_source=generator&theme=0" 
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
            
          </div>
        </motion.section>

        {/* Floating Memories Cloud Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="relative py-8"
        >
          <FloatingMemories />
        </motion.section>
      </div>
    </>
  );
}
