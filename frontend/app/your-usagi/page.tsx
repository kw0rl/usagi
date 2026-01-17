"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from "lucide-react";

const myPhotos = [
  { src: "/me/azrul-1.png", caption: "Your favorite person 💕" },
  { src: "/me/azrul-2.jpg", caption: "Missing you always 🥺" },
  { src: "/me/azrul-3.jpg", caption: "Thinking of you 💭" },
  { src: "/me/azrul-4.jpg", caption: "Always yours 💗" },
  { src: "/me/azrul-5.jpg", caption: "With love 💌" },
  { src: "/me/azrul-6.jpeg", caption: "Forever & always ✨" },
  { src: "/me/azrul-7.jpg", caption: "Your one and only 🌸" },
  { src: "/me/azrul-8.jpg", caption: "Made for you 💝" },
  { src: "/me/azrul-9.jpg", caption: "My heart is yours 💓" },
  { src: "/me/azrul-10.jpg", caption: "Yours truly 🎀" },
  { src: "/me/azrul-11.jpg", caption: "Only you 💞" },
  { src: "/me/azrul-12.jpg", caption: "Always & forever 🌷" },
  { src: "/me/azrul-13.jpg", caption: "With all my love 💖" },
  { src: "/me/azrul-14.jpg", caption: "Your Usagi 🐰" },
];

export default function YourUsagiPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prev) => {
      const next = prev + newDirection;
      if (next < 0) return myPhotos.length - 1;
      if (next >= myPhotos.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-6 flex flex-col items-center">
      <Link
        href="/"
        className="self-start inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-pink-800 mb-8 font-handwriting"
      >
        📖 Your Usagi&apos;s Album 🐰
      </motion.h1>

      {/* Book Container */}
      <div
        className="relative w-full max-w-md aspect-[3/4]"
        style={{ perspective: "1000px" }}
      >
        {/* Book Cover/Shadow */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-300 to-pink-400 rounded-2xl shadow-2xl" />

        {/* Book Spine */}
        <div className="absolute left-0 top-2 bottom-2 w-4 bg-gradient-to-r from-rose-400 to-rose-300 rounded-l-lg" />

        {/* Page */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute inset-2 left-6 bg-[#fdf8f3] rounded-r-xl rounded-l-sm shadow-lg overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Decorative tape */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/70 rotate-[-3deg] shadow-sm z-10" />

            {/* Photo */}
            <div className="relative w-[85%] aspect-square mx-auto mt-10 rounded-lg overflow-hidden shadow-md border-4 border-white rotate-[-2deg]">
              <Image
                src={myPhotos[currentPage].src}
                alt={myPhotos[currentPage].caption}
                fill
                className="object-cover"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center px-4">
              <p className="font-handwriting text-xl text-gray-700">
                {myPhotos[currentPage].caption}
              </p>
              <div className="flex justify-center gap-1 mt-2">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              </div>
            </div>

            {/* Page Number */}
            <p className="absolute bottom-4 right-6 text-sm text-gray-400 font-handwriting">
              {currentPage + 1} / {myPhotos.length}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-pink-600" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-pink-600" />
        </button>
      </div>

      {/* Page dots */}
      <div className="flex gap-2 mt-6 flex-wrap justify-center max-w-md">
        {myPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentPage ? 1 : -1);
              setCurrentPage(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentPage ? "bg-pink-500" : "bg-pink-300"
            }`}
          />
        ))}
      </div>
    </main>
  );
}
