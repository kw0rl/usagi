"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Heart, X } from "lucide-react";

interface MemoryPhoto {
  id: number;
  src: string;
  initialX: number;
  initialY: number;
  mobileX: number;
  mobileY: number;
  rotation: number;
  scale: number;
  delay: number;
}

const bunaPhotos: MemoryPhoto[] = [
  { id: 1, src: "/buna-1.jpeg", initialX: 10, initialY: 25, mobileX: 5, mobileY: 12, rotation: -8, scale: 1, delay: 0 },
  { id: 2, src: "/buna-2.jpeg", initialX: 65, initialY: 22, mobileX: 55, mobileY: 12, rotation: 5, scale: 0.95, delay: 0.1 },
  { id: 3, src: "/buna-3.jpeg", initialX: 35, initialY: 48, mobileX: 30, mobileY: 30, rotation: -3, scale: 1.05, delay: 0.2 },
  { id: 4, src: "/buna-4.jpeg", initialX: 75, initialY: 52, mobileX: 60, mobileY: 32, rotation: 7, scale: 0.9, delay: 0.3 },
  { id: 5, src: "/buna-5.jpeg", initialX: 5, initialY: 55, mobileX: 5, mobileY: 50, rotation: -5, scale: 1, delay: 0.4 },
  { id: 6, src: "/buna-6.jpeg", initialX: 45, initialY: 75, mobileX: 35, mobileY: 68, rotation: 4, scale: 0.95, delay: 0.5 },
  { id: 7, src: "/buna-7.jpeg", initialX: 80, initialY: 78, mobileX: 60, mobileY: 52, rotation: -6, scale: 1.02, delay: 0.6 },
];

interface DraggablePhotoProps {
  photo: MemoryPhoto;
  onSelect: (photo: MemoryPhoto) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
}

function DraggablePhoto({ photo, onSelect, containerRef, isMobile }: DraggablePhotoProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(photo.id);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Use mobile or desktop positions
  const posX = isMobile ? photo.mobileX : photo.initialX;
  const posY = isMobile ? photo.mobileY : photo.initialY;

  // Parallax effect based on mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePosition({
          x: (clientX - centerX) / centerX,
          y: (clientY - centerY) / centerY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging]);

  // Parallax offset based on photo position (disabled when dragging)
  const parallaxX = !isDragging ? mousePosition.x * (15 + photo.id * 3) : 0;
  const parallaxY = !isDragging ? mousePosition.y * (10 + photo.id * 2) : 0;

  // Spring animation for smooth parallax
  const springX = useSpring(parallaxX, { stiffness: 50, damping: 20 });
  const springY = useSpring(parallaxY, { stiffness: 50, damping: 20 });

  // Combined position with parallax
  const finalX = useMotionValue(position.x);
  const finalY = useMotionValue(position.y);

  useEffect(() => {
    if (!isDragging) {
      finalX.set(position.x + springX.get());
      finalY.set(position.y + springY.get());
    }
  }, [isDragging, position.x, position.y, springX, springY, finalX, finalY]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        setIsDragging(true);
        setZIndex(100);
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
        x.set(0);
        y.set(0);
        setTimeout(() => setZIndex(photo.id + 10), 100);
      }}
      onClick={() => !isDragging && onSelect(photo)}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
      }}
      animate={{ 
        opacity: 1, 
        scale: photo.scale,
      }}
      transition={{ 
        delay: photo.delay,
        duration: 0.6,
        type: "spring",
        damping: 15
      }}
      style={{
        position: "absolute",
        left: `${posX}%`,
        top: `${posY}%`,
        zIndex,
        x: isDragging ? x : position.x,
        y: isDragging ? y : position.y,
      }}
      whileHover={{ scale: photo.scale * 1.1, zIndex: 50 }}
      whileTap={{ scale: photo.scale * 0.95 }}
      className="cursor-grab active:cursor-grabbing"
    >
      {/* Gentle bobbing animation wrapper */}
      <motion.div
        animate={!isDragging ? {
          y: [0, -8, 0, -4, 0],
          rotate: [photo.rotation, photo.rotation + 2, photo.rotation, photo.rotation - 1, photo.rotation],
        } : {}}
        transition={{
          duration: 4 + photo.id * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: photo.delay * 2,
        }}
      >
        {/* Photo frame with soft shadow */}
        <div 
          className="relative bg-white p-2 rounded-lg"
          style={{
            boxShadow: `
              0 10px 25px -5px rgba(0, 0, 0, 0.15),
              0 20px 40px -10px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.5)
            `,
            transform: `rotate(${photo.rotation}deg)`,
          }}
        >
          {/* The actual photo */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 overflow-hidden rounded-md">
            <Image
              src={photo.src}
              alt={`Buna memory ${photo.id}`}
              fill
              className="object-cover"
              draggable={false}
            />
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Cute heart decoration */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: photo.id * 0.3
            }}
            className="absolute -top-2 -right-2 text-pink-400"
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>

          {/* Photo number label */}
          <div className="absolute -bottom-1 -left-1 bg-pink-100 text-pink-600 text-xs font-medium px-2 py-0.5 rounded-full shadow-sm">
            #{photo.id}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Modal for viewing photo in full size
function PhotoModal({ photo, onClose }: { photo: MemoryPhoto | null; onClose: () => void }) {
  if (!photo) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-3 rounded-2xl shadow-2xl max-w-lg"
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg hover:bg-pink-50 transition-colors z-10"
        >
          <X size={20} className="text-gray-600" />
        </button>

        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden rounded-xl">
          <Image
            src={photo.src}
            alt={`Buna memory ${photo.id}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-3 text-center">
          <p className="text-pink-600 font-medium flex items-center justify-center gap-2">
            <Heart size={16} fill="currentColor" />
            Memory #{photo.id}
            <Heart size={16} fill="currentColor" />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingMemories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Floating cloud background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ 
              x: [null, (typeof window !== 'undefined' ? window.innerWidth : 1500) + 200],
              opacity: [0, 0.3, 0.3, 0]
            }}
            transition={{
              duration: 60 + i * 10,
              repeat: Infinity,
              delay: i * 8,
              ease: "linear"
            }}
            className="absolute"
            style={{
              top: `${10 + i * 15}%`,
            }}
          >
            <div 
              className="w-32 h-16 bg-sky-400/40 rounded-full blur-xl"
              style={{ transform: `scale(${1 + i * 0.3})` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main floating memories container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[900px] sm:h-[800px] md:h-[850px]"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 sm:top-16 md:top-28 left-1/2 -translate-x-1/2 z-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 flex items-center gap-2">
            <span>☁️</span>
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              My Handsome
            </span>
            <span>☁️</span>
          </h2>
          <p className="text-center text-pink-400 text-sm mt-1">
             drag the photos around! 
          </p>
        </motion.div>

        {/* Draggable photos */}
        {bunaPhotos.map((photo) => (
          <DraggablePhoto
            key={photo.id}
            photo={photo}
            onSelect={setSelectedPhoto}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            isMobile={isMobile}
          />
        ))}

        {/* Floating decorative hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="absolute pointer-events-none"
            style={{
              left: `${5 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <Heart 
              size={12 + (i % 3) * 4} 
              className="text-pink-300/50" 
              fill="currentColor" 
            />
          </motion.div>
        ))}
      </div>

      {/* Photo modal */}
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </>
  );
}
