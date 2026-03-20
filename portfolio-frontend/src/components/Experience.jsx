import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get((import.meta.env.VITE_API_URL || "http://localhost:5000") + '/api/experience');
        setExperiences(res.data);
      } catch (err) {
        console.error('Failed to fetch experiences');
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 bg-transparent text-white relative z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-neon font-mono text-sm tracking-widest uppercase mb-4">My Journey</h2>
          <h3 className="text-4xl md:text-5xl font-bold">Professional Experience.</h3>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-neon border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative border-l border-white/20 ml-4 md:ml-0 space-y-12 pb-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={exp._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-0 md:flex md:gap-8 items-start group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] top-1.5 w-[10px] h-[10px] rounded-full bg-neon shadow-[0_0_10px_#00f2fe] group-hover:scale-150 transition-transform hidden md:block" />
                <div className="absolute left-[-5px] top-1.5 w-[10px] h-[10px] rounded-full bg-neon shadow-[0_0_10px_#00f2fe] group-hover:scale-150 transition-transform md:hidden" />

                {/* Left Side: Duration & Company (Desktop) */}
                <div className="md:w-1/2 md:text-right hidden md:block pt-1 pr-8">
                  <h4 className="text-white text-xl font-bold">{exp.company}</h4>
                  <p className="text-neon font-mono text-sm mt-1">{exp.duration}</p>
                </div>

                {/* Right Side: Role & Description */}
                <div className="md:w-1/2 md:pl-8">
                  <div className="md:hidden mb-2">
                    <h4 className="text-white text-xl font-bold">{exp.company}</h4>
                    <p className="text-neon font-mono text-sm mt-1">{exp.duration}</p>
                  </div>
                  <h5 className="text-2xl font-bold text-gray-200 mb-3">{exp.role}</h5>
                  <p className="text-gray-400 leading-relaxed bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-neon/50 transition-colors">
                    {exp.description || 'Contributed to impactful projects and collaborated with diverse teams to achieve business goals.'}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {/* Center Line for Desktop */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2 hidden md:block" z-index="-1"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
