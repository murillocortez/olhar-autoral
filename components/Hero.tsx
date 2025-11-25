import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Logo from './Logo';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  // Parallax effect hooks
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">

      {/* Cinematic Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        {/* Image with Cinematic Filters: Low brightness, High Contrast, Slight Desaturation */}
        <img
          src="/hero-bg.jpg"
          alt="Cinematic Texture"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.15] grayscale-[0.3]"
        />

        {/* Requested Gradient: Top (Black) -> Down (Transparent) */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/20 to-transparent z-10" />

        {/* Subtle bottom vignette to ground the section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-10" />
      </motion.div>

      {/* Decorative Brand Element - Big Faded Symbol */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-[0.03] pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.03 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Logo variant="symbol" className="w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] text-white" />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ y: textY, opacity: opacityText }}
        className="relative z-20 max-w-screen-2xl mx-auto px-6 text-center flex flex-col items-center justify-center w-full mt-12 md:mt-0"
      >

        {/* Subtitle / Artist Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center gap-4"
        >
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-neutral-400 opacity-50" />
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase font-light text-neutral-300 mix-blend-screen">
            Murillo Cortez
          </span>
        </motion.div>

        {/* Main Title - Refined Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-wide text-neutral-100 mb-8 md:mb-10 leading-[1.1] uppercase"
        >
          Olhar <span className="italic font-light opacity-80">Autoral</span>
        </motion.h1>

        {/* Phrase */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="max-w-md md:max-w-2xl text-neutral-300 font-sans font-light text-sm md:text-base tracking-widest uppercase leading-relaxed mb-12 md:mb-16 antialiased"
        >
          A fotografia como verdade.<br />Um salto para uma nova essência visual.
        </motion.p>

        {/* Minimalist Button */}
        <motion.a
          href="#portfolio"
          onClick={handleScrollDown}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
          transition={{ duration: 0.5, delay: 1 }}
          className="group relative inline-flex items-center px-10 py-4 border border-neutral-700/50 backdrop-blur-sm bg-neutral-950/20 hover:bg-neutral-950/40 transition-all duration-500 rounded-sm"
        >
          <span className="uppercase tracking-[0.3em] text-[10px] font-medium text-neutral-200 group-hover:text-white">
            Ver Portfólio
          </span>
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-500 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-widest opacity-50">Scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-neutral-500 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;