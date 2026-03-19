import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skillCategories = [
  {
    title: 'Data & Analytics',
    skills: ['SAP Analytics Cloud', 'Excel', 'Power BI'],
    color: 'from-blue-400 to-blue-600'
  },
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'C'],
    color: 'from-indigo-400 to-purple-600'
  },
  {
    title: 'Web Technologies',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Express.js'],
    color: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'Databases & Tools',
    skills: ['SQL', 'MySQL', 'MongoDB', 'Git', 'GitHub'],
    color: 'from-emerald-400 to-teal-500'
  }
];

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="skills" className="py-32 bg-transparent text-white relative overflow-hidden flex flex-col items-center z-10" ref={containerRef}>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neon font-mono text-sm tracking-widest uppercase mb-4"
          >
            My Arsenal
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black"
          >
            Technical Expertise.
          </motion.h3>
        </div>

        {/* 3D Scroll Perspective Grid */}
        <motion.div 
          style={{ rotateX, y, perspective: 1000 }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, rotateY: 5, zIndex: 10 }}
              className="relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/20 to-transparent group cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
              
              <div className="bg-dark/80 backdrop-blur-xl h-full w-full rounded-[23px] p-8 flex flex-col relative z-10 border border-white/5">
                <div className={`w-12 h-12 rounded-xl mb-6 bg-gradient-to-br ${category.color} p-0.5`}>
                  <div className="w-full h-full bg-dark rounded-[10px] flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold mb-6 text-white">{category.title}</h4>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-neon hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
