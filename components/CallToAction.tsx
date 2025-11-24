import React from 'react';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-neutral-950 flex items-center justify-center text-center overflow-hidden">
      
      {/* Subtle Background Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950 to-neutral-900/20 pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Main Text with Glow Effect */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight text-neutral-100 mb-12 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]"
        >
          “A fotografia como verdade. <br className="hidden md:block" /> Um salto para uma nova essência visual.”
        </motion.h3>
        
        {/* Minimalist Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-16 h-px bg-neutral-700 mx-auto mb-12"
        />

        {/* Premium Button */}
        <motion.a
          href="https://wa.me/5562982795967"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }}
          className="group relative inline-flex items-center justify-center px-12 py-5 border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm hover:bg-neutral-900/80 transition-all duration-300 ease-out"
        >
          <span className="relative z-10 text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-400 group-hover:text-white transition-colors duration-300 font-medium">
            Falar com Murillo
          </span>
        </motion.a>

      </div>
    </section>
  );
};

export default CallToAction;