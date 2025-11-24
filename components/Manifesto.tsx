import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Aperture, Eye, Flame } from 'lucide-react';

interface ManifestoProps {
  theme: 'light' | 'chaos' | 'texture' | 'soul' | 'truth';
  text: string;
  alignment?: 'left' | 'center' | 'right';
}

const Manifesto: React.FC<ManifestoProps> = ({ theme, text, alignment = 'center' }) => {
  
  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sparkles size={14} strokeWidth={1} />;
      case 'chaos': return <Flame size={14} strokeWidth={1} />;
      case 'texture': return <Aperture size={14} strokeWidth={1} />;
      case 'soul': return <Eye size={14} strokeWidth={1} />;
      default: return <div className="w-1 h-1 bg-current rounded-full" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light': return "Sobre a Luz";
      case 'chaos': return "O Instante";
      case 'texture': return "Matéria e Memória";
      case 'soul': return "Conexão Humana";
      case 'truth': return "O Cotidiano";
      default: return "Manifesto";
    }
  };

  const alignClass = alignment === 'center' ? 'items-center text-center' : 
                     alignment === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <section className="py-24 md:py-32 px-6 bg-neutral-950 flex flex-col justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`max-w-2xl mx-auto w-full flex flex-col ${alignClass} gap-6`}
      >
        {/* Minimalist Label with Icon */}
        <div className="flex items-center gap-3 text-neutral-500 opacity-60">
          <div className="h-px w-8 bg-neutral-700" />
          <span className="text-[9px] uppercase tracking-[0.3em] flex items-center gap-2">
            {getIcon()}
            {getLabel()}
          </span>
          <div className="h-px w-8 bg-neutral-700" />
        </div>

        {/* The Manifesto Text */}
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-200 leading-relaxed font-light italic">
          "{text}"
        </h3>

      </motion.div>
    </section>
  );
};

export default Manifesto;