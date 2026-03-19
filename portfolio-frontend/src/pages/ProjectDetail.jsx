import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        const found = res.data.find(p => p._id === id);
        setProject(found);
      } catch (err) {
        console.error('Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark flex flex-col justify-center items-center text-white">
        <h2 className="text-4xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="text-neon hover:underline">Go back home</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
      className="min-h-screen bg-dark pt-32 pb-24 relative overflow-hidden"
    >
      {/* Subtle 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas>
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={2} />
          <OrbitControls autoRotate autoRotateSpeed={0.3} enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-white">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-neon transition mb-10 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> Back to Portfolio
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Image & Tech */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main Image with Glow */}
            <div className="relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-neon/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={project.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'} 
                alt={project.title} 
                className="w-full h-auto rounded-3xl border border-white/10 relative z-10 object-cover"
              />
            </div>

            {/* Tech Stack */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
              <h3 className="text-xl font-bold mb-6 text-neon font-mono uppercase tracking-wider">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-dark border border-white/20 rounded-full text-sm text-gray-300 shadow-inner">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details & Links */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-10"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                {project.title}
              </h1>
              
              <div className="flex gap-4">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-neon text-dark font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all">
                    Live Demo <ExternalLink size={18} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-white/20 font-bold rounded-full hover:bg-white/10 transition-all">
                    Source Code <Github size={18} />
                  </a>
                )}
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-gray-400">
              <h3 className="text-2xl font-bold text-white mb-4">Project Overview</h3>
              {project.description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
