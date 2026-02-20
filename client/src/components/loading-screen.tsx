import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Разделяем слово на буквы для анимации "постепенного письма"
  const letters = "Привет".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Анимация "Привет" в стиле iPhone */}
        <div className="mb-16 relative flex justify-center items-center">
          <div className="flex">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-7xl md:text-8xl font-bold inline-block"
                style={{ 
                  fontFamily: '"Dancing Script", cursive',
                  color: 'white',
                  textShadow: '0 0 20px rgba(255,255,255,0.3)'
                }}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  color: index === letters.length - 1 ? ["#ffffff", "#39ff14"] : "#ffffff"
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5 + (index * 0.2),
                  ease: "easeOut",
                  color: { delay: 3, duration: 1 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* Эффект свечения за текстом */}
          <motion.div 
            className="absolute inset-0 bg-[#39ff14]/10 blur-[60px] rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.3, 0.15], scale: [0.8, 1.1, 1] }}
            transition={{ duration: 2, delay: 2.5 }}
          />
        </div>

        {/* BLOCKFORGE Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center"
        >
          <motion.h2 
            className="text-xl md:text-2xl font-bold tracking-[0.5em] text-white/80"
            animate={{ letterSpacing: ["0.3em", "0.5em"] }}
            transition={{ duration: 2, delay: 2.8 }}
          >
            BLOCK<span className="text-[#39ff14] drop-shadow-[0_0_12px_rgba(57,255,20,0.8)]">FORGE</span>
          </motion.h2>
          
          <motion.div
            className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#39ff14] to-transparent mx-auto mt-4"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.2 }}
          />
        </motion.div>
      </div>

      {/* Финальное затухание экрана */}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 0.6, times: [0, 0.85, 1], delay: 3.9 }}
      />
    </motion.div>
  );
};

export default LoadingScreen;