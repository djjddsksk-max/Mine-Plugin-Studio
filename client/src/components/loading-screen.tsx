import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0 }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* "Привет" Animation */}
        <div className="mb-12 relative">
          <svg
            width="320"
            height="140"
            viewBox="0 0 320 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_20px_rgba(57,255,20,0.4)]"
          >
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-8xl font-bold"
              style={{ 
                fontFamily: '"Dancing Script", cursive',
                strokeWidth: '2px',
                stroke: 'white',
                fill: 'transparent'
              }}
              initial={{ pathLength: 0, opacity: 0, stroke: "#ffffff" }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                stroke: ["#ffffff", "#ffffff", "#39ff14"],
                fill: ["transparent", "transparent", "rgba(57,255,20,0.1)"]
              }}
              transition={{ 
                pathLength: { duration: 2, delay: 0.5, ease: "easeInOut" },
                opacity: { duration: 0.5, delay: 0.5 },
                stroke: { duration: 1, delay: 2.5 },
                fill: { duration: 1, delay: 3 }
              }}
            >
              Привет
            </motion.text>
          </svg>
          
          {/* Subtle pulse after writing */}
          <motion.div 
            className="absolute inset-0 bg-[#39ff14]/5 blur-2xl rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, delay: 3, repeat: Infinity }}
          />
        </div>

        {/* BLOCKFORGE Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3, ease: "easeOut" }}
          className="relative text-center"
        >
          <h2 className="text-2xl font-bold tracking-[0.4em] text-white/90">
            BLOCK<span className="text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.7)]">FORGE</span>
          </h2>
          <motion.div
            className="h-[1px] w-12 bg-[#39ff14] mx-auto mt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
          />
        </motion.div>
      </div>

      {/* Screen fade out layer */}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1] }}
        transition={{ duration: 0.5, times: [0, 0.9, 1], delay: 4 }}
      />
    </motion.div>
  );
};

export default LoadingScreen;