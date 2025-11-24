import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

// Paletas Cromáticas Dinâmicas
const PALETTES = {
  terracotta: { accent: '#C87A5A', glow: 'rgba(200, 122, 90, 0.15)' }, // Terracota Suave
  deepBlue: { accent: '#587EA8', glow: 'rgba(15, 42, 74, 0.25)' },    // Azul Profundo (clareado para texto)
  sageGreen: { accent: '#8FA89F', glow: 'rgba(104, 122, 115, 0.2)' }, // Verde Cinza
  burntGold: { accent: '#D4A66A', glow: 'rgba(170, 122, 54, 0.15)' }, // Dourado Queimado
  neutral: { accent: '#a3a3a3', glow: 'transparent' }                  // Padrão
};

interface PortfolioItem {
  id: number;
  src: string;
  category: string;
  title: string;
  aspectRatio: string;
  palette: keyof typeof PALETTES; // Chave para a cor
}

const portfolioData: PortfolioItem[] = [
  { id: 1, src: "https://picsum.photos/800/1200?random=101", category: "Editorial", title: "Silêncio Urbano", aspectRatio: "aspect-[2/3]", palette: 'sageGreen' },
  { id: 2, src: "https://picsum.photos/1200/800?random=102", category: "Shows", title: "Luz e Som", aspectRatio: "aspect-[3/2]", palette: 'deepBlue' },
  { id: 3, src: "https://picsum.photos/800/800?random=103", category: "Retrato", title: "Essência", aspectRatio: "aspect-square", palette: 'terracotta' },
  { id: 4, src: "https://picsum.photos/800/1000?random=104", category: "Moda", title: "Texturas", aspectRatio: "aspect-[4/5]", palette: 'burntGold' },
  { id: 5, src: "https://picsum.photos/800/600?random=105", category: "Gastronomia", title: "Paladar Visual", aspectRatio: "aspect-[4/3]", palette: 'terracotta' },
  { id: 6, src: "https://picsum.photos/800/1200?random=106", category: "Autoral", title: "Fragmentos", aspectRatio: "aspect-[2/3]", palette: 'sageGreen' },
  { id: 7, src: "https://picsum.photos/900/900?random=107", category: "Retrato", title: "Olhar", aspectRatio: "aspect-square", palette: 'burntGold' },
  { id: 8, src: "https://picsum.photos/1200/800?random=108", category: "Eventos", title: "Movimento", aspectRatio: "aspect-[3/2]", palette: 'deepBlue' },
  { id: 9, src: "https://picsum.photos/800/1100?random=109", category: "Autoral", title: "Sombras", aspectRatio: "aspect-[3/4]", palette: 'sageGreen' },
];

const Portfolio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activePalette, setActivePalette] = useState<keyof typeof PALETTES>('neutral');

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      if (e.key === 'Escape') setSelectedId(null);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const navigate = useCallback((direction: number) => {
    if (!selectedId) return;
    const currentIndex = portfolioData.findIndex(item => item.id === selectedId);
    const newIndex = (currentIndex + direction + portfolioData.length) % portfolioData.length;
    setSelectedId(portfolioData[newIndex].id);
  }, [selectedId]);

  const selectedItem = portfolioData.find(item => item.id === selectedId);

  return (
    <section id="portfolio" className="py-32 bg-neutral-950 text-neutral-100 relative z-10 overflow-hidden transition-colors duration-1000">
      
      {/* AMBIENT LIGHT: Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          background: `radial-gradient(circle at 50% 30%, ${PALETTES[activePalette].glow} 0%, transparent 60%)` 
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        
        {/* Header with Dynamic Accent */}
        <div className="mb-20 flex flex-col items-start border-l-2 pl-8 transition-colors duration-700"
             style={{ borderColor: activePalette === 'neutral' ? '#262626' : PALETTES[activePalette].accent }}>
          
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase mb-4 block transition-colors duration-700"
            style={{ color: activePalette === 'neutral' ? '#737373' : PALETTES[activePalette].accent }}
          >
            Galeria Selecionada
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white mb-4"
          >
            Portfólio
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 font-light text-lg max-w-lg"
          >
            Fragmentos de tempo, luz e narrativa visual.
          </motion.p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {portfolioData.map((item) => (
            <PortfolioItemCard 
              key={item.id} 
              item={item} 
              activePalette={activePalette}
              onHover={() => setActivePalette(item.palette)}
              onLeave={() => setActivePalette('neutral')}
              onClick={() => setSelectedId(item.id)} 
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-24 flex justify-center">
          <a href="#" className="group flex items-center gap-4 px-8 py-4 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900 transition-all duration-500">
            <span className="uppercase tracking-[0.2em] text-xs text-neutral-400 group-hover:text-white transition-colors">Ver Arquivo Completo</span>
            <Plus size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center backdrop-blur-3xl"
            onClick={() => setSelectedId(null)}
          >
            <button 
              className="absolute top-8 right-8 text-neutral-400 hover:text-white transition-colors z-[70] p-2"
              onClick={() => setSelectedId(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <button 
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors z-[70] p-4 hidden md:block"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            >
              <ChevronLeft size={48} strokeWidth={0.5} />
            </button>
            
            <button 
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors z-[70] p-4 hidden md:block"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
            >
              <ChevronRight size={48} strokeWidth={0.5} />
            </button>

            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative max-w-[90vw] max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedItem.src} 
                alt={selectedItem.title} 
                className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                <span className="text-white font-serif text-xl tracking-wide">{selectedItem.title}</span>
                <span 
                  className="block text-xs uppercase tracking-widest mt-1 transition-colors duration-300"
                  style={{ color: PALETTES[selectedItem.palette].accent }}
                >
                  {selectedItem.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PortfolioItemCard: React.FC<{ 
  item: PortfolioItem; 
  activePalette: string;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void; 
}> = ({ item, activePalette, onHover, onLeave, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-neutral-900"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden ${item.aspectRatio}`}>
        <div className={`absolute inset-0 bg-neutral-900 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
        
        <img
          src={item.src}
          alt={item.title}
          onLoad={() => setIsLoading(false)}
          className={`
            w-full h-full object-cover transition-all duration-700 ease-out will-change-transform
            ${isLoading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale'}
            group-hover:grayscale-0 group-hover:scale-[1.03]
          `}
        />
        
        {/* Color Tint Overlay on Hover */}
        <div 
          className="absolute inset-0 transition-colors duration-500 pointer-events-none opacity-0 group-hover:opacity-20 mix-blend-color"
          style={{ backgroundColor: PALETTES[item.palette].accent }} 
        />
        
        <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-neutral-950/90 to-transparent">
          <span 
            className="text-[10px] uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75"
            style={{ color: PALETTES[item.palette].accent }}
          >
            {item.category}
          </span>
          <h3 className="text-white font-serif text-2xl mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;