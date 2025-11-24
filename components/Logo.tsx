import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'full' | 'symbol' | 'signature' | 'watermark';
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', color = 'currentColor' }) => {
  
  // O Símbolo: Um círculo fino (lente) com um ponto focal deslocado e uma linha de horizonte
  const Symbol = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Círculo Externo (Lente/Mundo) */}
      <motion.circle 
        cx="20" cy="20" r="18" 
        stroke={color} strokeWidth="1" 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Linha de Horizonte (Perspectiva) - Cortando sutilmente */}
      <motion.line 
        x1="2" y1="20" x2="38" y2="20" 
        stroke={color} strokeWidth="0.5" 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

      {/* Ponto Focal (A visão) */}
      <motion.circle 
        cx="20" cy="20" r="2.5" 
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1, type: "spring" }}
      />
    </svg>
  );

  if (variant === 'symbol') {
    return (
      <div className={`relative ${className}`}>
        <Symbol />
      </div>
    );
  }

  if (variant === 'signature') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="w-8 h-8 opacity-80">
          <Symbol />
        </div>
        <div className="text-center">
          <span className={`block font-serif text-2xl tracking-widest text-[${color}] whitespace-nowrap`}>Murillo Cortez</span>
          <span className={`block font-sans text-[10px] uppercase tracking-[0.3em] opacity-60 text-[${color}] mt-1`}>Olhar Autoral</span>
        </div>
      </div>
    );
  }

  if (variant === 'watermark') {
    return (
      <div className={`flex items-center gap-3 opacity-50 mix-blend-overlay ${className}`}>
        <div className="w-5 h-5">
           <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
             <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" />
             <circle cx="20" cy="20" r="3" fill="white" />
           </svg>
        </div>
        <span className="font-serif text-sm tracking-[0.2em] text-white uppercase">Olhar Autoral</span>
      </div>
    );
  }

  // Variant 'full' (Horizontal Logo)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-6 h-6 md:w-8 md:h-8">
        <Symbol />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className={`font-serif text-lg md:text-xl tracking-[0.15em] leading-none text-[${color}] uppercase`}>
          Olhar Autoral
        </h1>
      </div>
    </div>
  );
};

export default Logo;