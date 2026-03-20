import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const ProfileImage3D = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle and elegant tilt effect
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

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
    <div className="relative w-full max-w-sm aspect-[4/5] mx-auto perspective-1000 group">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full cursor-crosshair"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Gradient Border using ::before-like div */}
        <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-tr from-[#00f2fe] via-transparent to-[#4facfe] opacity-50 group-hover:opacity-100 blur-[2px] transition-all duration-700" style={{ transform: "translateZ(-10px)" }}></div>
        <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-b from-transparent via-[#4facfe] to-[#00f2fe] opacity-30 group-hover:opacity-60 blur-lg transition-all duration-700" style={{ transform: "translateZ(-20px)" }}></div>
        
        {/* Dark Inner Container for Frame */}
        <div className="absolute inset-0 rounded-[22px] bg-[#02050E] overflow-hidden border border-white/10 shadow-2xl">
          
          {/* Internal Parallax Image */}
          <motion.div 
            className="w-full h-full relative"
            style={{ transform: "translateZ(30px)" }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img 
              src="/profile.jpg" 
              alt="Sayand" 
              className="w-full h-full object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-700 ease-in-out"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"; 
              }}
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02050E]/90 via-transparent to-transparent opacity-80" />
            
            {/* Soft sophisticated lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f2fe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
          </motion.div>

        </div>
        
        {/* Top reflections */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-700 rounded-t-[22px] pointer-events-none" style={{ transform: "translateZ(40px)" }} />
        
      </motion.div>

      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-[#00f2fe] blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 rounded-full" />
    </div>
  );
};

export default ProfileImage3D;
