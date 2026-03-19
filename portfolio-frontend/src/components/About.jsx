import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, GraduationCap } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-32 bg-transparent text-white relative overflow-hidden z-10">
      {/* Abstract Background Elements */}
      <motion.div style={{ y: y2 }} className="absolute top-20 right-10 w-64 h-64 bg-[#00f2fe]/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: y1 }} className="absolute bottom-10 left-10 w-96 h-96 bg-[#4facfe]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div style={{ opacity }} className="flex flex-col lg:flex-row gap-20">
          
          {/* Main Text Content */}
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-neon font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-px bg-neon"></span>
                About Me
              </h2>
              <h3 className="text-4xl md:text-6xl font-black leading-tight mb-8">
                Data-Driven <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">Problem Solver.</span>
              </h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-gray-400 text-lg leading-relaxed font-light"
            >
              <p>
                Final-year B.Tech Computer Science Engineering student with hands-on expertise in <strong className="text-white font-medium">SAP Analytics Cloud (SAC)</strong>, specializing in Analytics and Planning. Skilled in story creation, advanced data modeling, linked analysis, calculated measures, dashboards, planning models, data actions, allocations, and forecasting workflows.
              </p>
              <p>
                Additionally, experienced in <strong className="text-white font-medium">full-stack development</strong> using AI the right way, alongside React, Vite.js, Next.js, Express.js, and MongoDB. Currently enhancing skills in Data Analytics, and passionate about delivering impactful, data-driven business solutions.
              </p>
            </motion.div>
          </div>

          {/* Cards / Highlights */}
          <div className="flex-[0.8] flex flex-col gap-6 relative">
            <motion.div 
              style={{ y: y1 }}
              className="absolute -left-10 md:-left-20 top-1/2 w-[1px] h-32 bg-gradient-to-b from-neon to-transparent hidden lg:block"
            />
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md hover:border-neon hover:shadow-[0_0_30px_rgba(0,242,254,0.1)] transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-neon/10 rounded-xl text-neon group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <h4 className="text-2xl font-bold">Education</h4>
              </div>
              <h5 className="text-lg font-semibold text-white">B.Tech in Computer Science and Engineering</h5>
              <p className="text-gray-400 mt-2 line-clamp-2 md:line-clamp-none">
                Malabar College of Engineering <br/>
                <span className="text-sm font-light text-gray-500">(Affiliated to APJ Abdul Kalam Technological University)</span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md hover:border-neon hover:shadow-[0_0_30px_rgba(0,242,254,0.1)] transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#4facfe]/10 rounded-xl text-[#4facfe] group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <h4 className="text-2xl font-bold">Location</h4>
              </div>
              <h5 className="text-lg font-medium text-white">Thrissur, India</h5>
              <div className="w-full h-32 mt-4 rounded-xl overflow-hidden relative">
                {/* Decorative Map BG */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4facfe]/20 to-neon/20 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-neon rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-neon rounded-full" />
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
