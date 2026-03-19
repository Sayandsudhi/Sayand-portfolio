import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-transparent text-white border-t border-white/10 relative overflow-hidden z-10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-neon font-mono text-sm tracking-widest uppercase mb-4">What's Next?</h2>
          <h3 className="text-5xl md:text-7xl font-black mb-6">Get In Touch.</h3>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <a 
            href="mailto:sayand@gmail.com" 
            className="inline-block px-10 py-5 bg-white text-black text-lg font-bold rounded-full hover:bg-neon hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Say Hello
          </a>

          <div className="flex justify-center gap-8 mt-20">
            <a href="#" className="text-gray-500 hover:text-neon transition transform hover:scale-110"><Github size={28} /></a>
            <a href="#" className="text-gray-500 hover:text-neon transition transform hover:scale-110"><Linkedin size={28} /></a>
            <a href="#" className="text-gray-500 hover:text-neon transition transform hover:scale-110"><Twitter size={28} /></a>
            <a href="#" className="text-gray-500 hover:text-neon transition transform hover:scale-110"><Mail size={28} /></a>
          </div>
          
          <p className="text-gray-600 mt-12 text-sm font-mono tracking-widest">
            © {new Date().getFullYear()} SAYAND K K. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>

      {/* Abstract background elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon/5 to-transparent pointer-events-none" />
    </section>
  );
};

export default Contact;
