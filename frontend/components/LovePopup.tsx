'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LovePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [answered, setAnswered] = useState(false);
  const [showLove, setShowLove] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when user enters the site
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleYes = () => {
    setAnswered(true);
    setShowLove(true);
    // Close after showing the love message
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  const handleNo = () => {
    // Move to random position when user clicks "no"
    const maxX = window.innerWidth - 320;
    const maxY = window.innerHeight - 250;
    
    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    
    setPosition({ x: randomX, y: randomY });
  };

  const closePopup = () => {
    if (answered) {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Pixel art style */}
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
            
            .pixel-font {
              font-family: 'Press Start 2P', cursive;
            }
            
            .pixel-border {
              box-shadow: 
                0 -4px 0 0 #000000,
                0 4px 0 0 #000000,
                -4px 0 0 0 #000000,
                4px 0 0 0 #000000,
                -4px -4px 0 0 #000000,
                4px -4px 0 0 #000000,
                -4px 4px 0 0 #000000,
                4px 4px 0 0 #000000,
                0 -8px 0 0 #ff69b4,
                0 8px 0 0 #ff69b4,
                -8px 0 0 0 #ff69b4,
                8px 0 0 0 #ff69b4;
            }
            
            .pixel-btn {
              box-shadow: 
                0 -2px 0 0 #000000,
                0 2px 0 0 #000000,
                -2px 0 0 0 #000000,
                2px 0 0 0 #000000,
                4px 4px 0 0 #000000;
              image-rendering: pixelated;
            }
            
            .pixel-btn:active {
              box-shadow: 
                0 -2px 0 0 #000000,
                0 2px 0 0 #000000,
                -2px 0 0 0 #000000,
                2px 0 0 0 #000000;
              transform: translate(2px, 2px);
            }

            .pixel-heart {
              image-rendering: pixelated;
              animation: pixel-bounce 0.5s infinite alternate;
            }

            @keyframes pixel-bounce {
              from { transform: translateY(0); }
              to { transform: translateY(-8px); }
            }

            @keyframes pixel-blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }

            .blink {
              animation: pixel-blink 1s steps(1) infinite;
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            style={{ imageRendering: 'pixelated' }}
            onClick={closePopup}
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: position.x, 
              y: position.y 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25 
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="pixel-border bg-gradient-to-b from-white via-pink-50 to-pink-100 p-4 sm:p-6 md:p-8 min-w-[260px] sm:min-w-[320px] md:min-w-[420px] max-w-[92vw]">
              {/* Decorative corner pixels */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400"></div>

              {!showLove ? (
                <>
                  {/* Pixel Heart */}
                  <div className="text-center mb-6">
                      <div className="pixel-heart text-3xl sm:text-4xl mb-4 inline-block">
                        <svg width="40" height="40" viewBox="0 0 16 16" className="mx-auto sm:w-12 sm:h-12">
                        <rect x="3" y="1" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="5" y="1" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="9" y="1" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="11" y="1" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="1" y="3" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="3" y="3" width="2" height="2" fill="#ffb6c1"/>
                        <rect x="5" y="3" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="7" y="3" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="9" y="3" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="11" y="3" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="13" y="3" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="1" y="5" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="3" y="5" width="2" height="2" fill="#ffb6c1"/>
                        <rect x="5" y="5" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="7" y="5" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="9" y="5" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="11" y="5" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="13" y="5" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="1" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="3" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="5" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="7" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="9" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="11" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="13" y="7" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="3" y="9" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="5" y="9" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="7" y="9" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="9" y="9" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="11" y="9" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="5" y="11" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="7" y="11" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="9" y="11" width="2" height="2" fill="#ff6b9d"/>
                        <rect x="7" y="13" width="2" height="2" fill="#ff6b9d"/>
                      </svg>
                    </div>
                    <h2 className="pixel-font text-xs sm:text-sm text-pink-600 dark:text-pink-300 leading-relaxed">
                      Do you love me?
                    </h2>
                    <span className="blink inline-block mt-2 text-pink-400 text-xs">▼</span>
                  </div>

                  {/* Pixel Buttons */}
                  <div className="flex gap-4 sm:gap-6 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleYes}
                      className="pixel-btn pixel-font text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-b from-pink-400 to-pink-500 text-white"
                    >
                      ♥ YES
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleNo}
                      className="pixel-btn pixel-font text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-b from-gray-300 to-gray-400 text-gray-700"
                    >
                      NO...
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Love Response */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="pixel-heart text-3xl sm:text-4xl mb-4 inline-block">
                    <svg width="48" height="48" viewBox="0 0 16 16" className="mx-auto sm:w-16 sm:h-16">
                      <rect x="3" y="1" width="2" height="2" fill="#ff1493"/>
                      <rect x="5" y="1" width="2" height="2" fill="#ff1493"/>
                      <rect x="9" y="1" width="2" height="2" fill="#ff1493"/>
                      <rect x="11" y="1" width="2" height="2" fill="#ff1493"/>
                      <rect x="1" y="3" width="2" height="2" fill="#ff1493"/>
                      <rect x="3" y="3" width="2" height="2" fill="#ff69b4"/>
                      <rect x="5" y="3" width="2" height="2" fill="#ff1493"/>
                      <rect x="7" y="3" width="2" height="2" fill="#ff1493"/>
                      <rect x="9" y="3" width="2" height="2" fill="#ff1493"/>
                      <rect x="11" y="3" width="2" height="2" fill="#ff1493"/>
                      <rect x="13" y="3" width="2" height="2" fill="#ff1493"/>
                      <rect x="1" y="5" width="2" height="2" fill="#ff1493"/>
                      <rect x="3" y="5" width="2" height="2" fill="#ff69b4"/>
                      <rect x="5" y="5" width="2" height="2" fill="#ff1493"/>
                      <rect x="7" y="5" width="2" height="2" fill="#ff1493"/>
                      <rect x="9" y="5" width="2" height="2" fill="#ff1493"/>
                      <rect x="11" y="5" width="2" height="2" fill="#ff1493"/>
                      <rect x="13" y="5" width="2" height="2" fill="#ff1493"/>
                      <rect x="1" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="3" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="5" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="7" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="9" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="11" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="13" y="7" width="2" height="2" fill="#ff1493"/>
                      <rect x="3" y="9" width="2" height="2" fill="#ff1493"/>
                      <rect x="5" y="9" width="2" height="2" fill="#ff1493"/>
                      <rect x="7" y="9" width="2" height="2" fill="#ff1493"/>
                      <rect x="9" y="9" width="2" height="2" fill="#ff1493"/>
                      <rect x="11" y="9" width="2" height="2" fill="#ff1493"/>
                      <rect x="5" y="11" width="2" height="2" fill="#ff1493"/>
                      <rect x="7" y="11" width="2" height="2" fill="#ff1493"/>
                      <rect x="9" y="11" width="2" height="2" fill="#ff1493"/>
                      <rect x="7" y="13" width="2" height="2" fill="#ff1493"/>
                    </svg>
                  </div>
                  <h2 className="pixel-font text-xs sm:text-sm text-pink-600 dark:text-pink-300 leading-relaxed">
                    I love you<br/>too :p
                  </h2>
                  <div className="mt-4 flex justify-center gap-3">
                    {['✦', '♥', '✦', '♥', '✦'].map((star, i) => (
                      <motion.span
                        key={i}
                        animate={{ 
                          opacity: [1, 0.3, 1],
                          scale: [1, 0.8, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.4, 
                          delay: i * 0.1 
                        }}
                        className="pixel-font text-pink-500 text-xs"
                      >
                        {star}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
