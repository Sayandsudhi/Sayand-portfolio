import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment, Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

// A dynamic camera that flies forward continuously and reacts heavily to mouse movement
const ScrollFlyCamera = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    // Continuous forward movement
    state.camera.position.z -= delta * 2;
    // Extra thrust from scrolling
    state.camera.position.z -= (scrollY * 0.005) * delta * 5;

    // Mouse movement heavily sways the camera across the starfield
    state.camera.position.x += (mouse.x * 8 - state.camera.position.x) * 0.05;
    state.camera.position.y += (mouse.y * 5 - state.camera.position.y) * 0.05;
    
    // Tilt the camera to emphasize the sweeping sky feeling
    state.camera.rotation.y = -mouse.x * 0.15;
    state.camera.rotation.x = mouse.y * 0.15;
  });

  return null;
};

// A highly unique, attractive 'Data Galaxy' animation representing Data Analytics & Engineering
const DataGalaxy = () => {
  const ref = useRef();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particlesPosition = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Galaxy shape (disk with 3 branching spiral arms)
        const radius = Math.random() * 5 + 0.2;
        const spinAngle = radius * 1.5;
        const branchAngle = ((i % 3) * Math.PI * 2) / 3;
        
        // Scatter noise
        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;

        positions[i*3] = Math.cos(branchAngle + spinAngle) * radius + randomX; // x
        positions[i*3+1] = randomY;                                            // y (flat disk height)
        positions[i*3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ; // z
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    // Slowly rotate the galaxy
    ref.current.rotation.y -= delta * 0.15;
    
    // Simulate it scrolling up and out of view when moving to other sections!
    // y = 0 initially, increases dynamically as user scrolls down.
    ref.current.position.y = (scrollY * 0.012) + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group position={[3.5, 0, -2]} rotation={[0.4, 0, -0.3]}>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#00f2fe" 
          size={0.04} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const MouseSpotlight = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      onMouseMove={handleMouseMove} 
      className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto"
    >
      <div 
        className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-300 opacity-0 hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,242,254,0.1), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
};

const Hero3D = () => {
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <>
      {/* 3D Deep Space Background FIXED GLOBALLY so it spans the entire scrolling website! */}
      <div className="fixed inset-0 z-[-1] bg-[#02050E] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
          <ScrollFlyCamera />
          <DataGalaxy />
          <Stars radius={50} depth={200} count={5000} factor={6} saturation={1} fade speed={2} />
          <Environment preset="city" />
        </Canvas>
      </div>

      <section id="home" className="relative h-[110vh] w-full flex items-center justify-center">
        {/* Interactive & Scroll-Driven Content Envelope */}
        <div className="relative h-full w-full z-10">
          <MouseSpotlight>
            <motion.div 
              style={{ scale, opacity, y, rotateX, perspective: 1000 }}
              className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20"
            >
              <motion.div 
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, delay: 0.2, type: 'spring', bounce: 0.3 }}
                className="max-w-4xl"
              >
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg mb-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                  <span className="text-sm font-mono tracking-widest text-[#4facfe] uppercase">Sys.Online // Ready</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black leading-[1.05] tracking-tighter mb-8 text-white drop-shadow-2xl">
                  Elevating <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Ideas</span> <br /> 
                  into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe] filter drop-shadow-[0_0_30px_rgba(0,242,254,0.4)]">Realities.</span>
                </h1>
                
                <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
                  Seamless full-stack engineering, deep data analytics, and ultra-optimized digital experiences. Built with precision.
                </p>
                
                <div className="flex flex-wrap gap-6 justify-center">
                  <a 
                    href="#projects" 
                    className="group relative px-10 py-5 bg-gradient-to-r from-[#4facfe] to-neon text-dark font-black rounded-full hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:scale-105 transition-all duration-300"
                  >
                    Explore My Work
                  </a>
                  <a 
                    href="#about" 
                    className="px-10 py-5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-dark hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                  >
                    Discover More
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </MouseSpotlight>

          {/* Cinematic Scroll Indicator */}
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Scroll to Dive</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-neon to-transparent" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero3D;
