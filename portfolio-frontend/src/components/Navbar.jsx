import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/80 backdrop-blur-md py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-black tracking-tighter text-white">
          SAYAND<span className="text-neon">.</span>
        </a>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {['Home', 'About', 'Experience', 'Projects'].map((item) => (
            <a 
              key={item} 
              href={`/#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white hover:text-shadow-neon transition-all"
            >
              {item}
            </a>
          ))}
        </div>
        
        <a 
          href="/#contact" 
          className="hidden md:block px-6 py-2 rounded-full border border-gray-600 hover:border-neon hover:text-neon transition-colors"
        >
          Let's Talk
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
