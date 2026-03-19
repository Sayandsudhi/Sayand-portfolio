import React from 'react';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="relative z-0"
    >
      <Hero3D />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </motion.div>
  );
};

export default Home;
