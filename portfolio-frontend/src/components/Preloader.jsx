import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 1000); // Wait 1 second at 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1; // Slower progress
      });
    }, 120);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <h1 className="text-[20vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon to-[#4facfe] select-none">
          SAYAND
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-neon font-mono text-sm tracking-widest uppercase">Initializing Canvas</span>
          <span className="text-white font-black text-4xl font-mono">{progress}%</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4facfe] to-neon shadow-[0_0_10px_#00f2fe]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "circOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
