import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ProfileImage3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] perspective-1000 group">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-200 ease-out"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        {/* Glowing backdrop shadow behind the image layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-[#00f2fe] to-[#4facfe] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" 
          style={{ transform: "translateZ(-40px)" }}
        />
        
        {/* Inner Image Container */}
        <div className="absolute inset-0 border-[2px] border-white/10 rounded-3xl overflow-hidden bg-[#02050E] shadow-[0_0_30px_rgba(0,242,254,0.15)] group-hover:shadow-[0_0_50px_rgba(0,242,254,0.3)] transition-all duration-500">
          <img 
            src="/profile.png" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-3xl scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              // Fallback to a sleek placeholder if /profile.png is missing
              e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"; 
            }}
          />
          
          {/* Subtle overlay gradient to blend with the dark theme and neon colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050E] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4facfe]/20 to-transparent mix-blend-overlay" />
        </div>
        
        {/* Interactive Shine Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{ transform: "translateZ(30px)" }}
        />
      </motion.div>

      {/* Abstract Floating Orbs around the image */}
      <motion.div 
        animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full border border-[#00f2fe]/30 bg-[#00f2fe]/10 backdrop-blur-md pointer-events-none"
        style={{ transform: "translateZ(50px)" }}
      />
      <motion.div 
        animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-10 -left-6 w-20 h-20 rounded-full border border-[#4facfe]/30 bg-[#4facfe]/10 backdrop-blur-md pointer-events-none"
        style={{ transform: "translateZ(30px)" }}
      />
    </div>
  );
};

export default ProfileImage3D;
