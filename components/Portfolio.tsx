
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useSupabaseImages } from '../contexts/ImageContext';
import SupabaseImg from './SupabaseImg';

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
  src?: string; // Optional because we might use SupabaseImg logic
  category: string;
  title: string;
  aspectRatio: string;
  palette: keyof typeof PALETTES;
  supabaseCategory?: string; // To help SupabaseImg find the image
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Portfolio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activePalette, setActivePalette] = useState<keyof typeof PALETTES>('neutral');
  const { images, loading, getImage } = useSupabaseImages();

  // Generate portfolio data on mount/update to ensure random shows and social projects
  const portfolioData = useMemo(() => {
    if (loading) return [];

    const showsImages = shuffleArray(images.filter(img => img.category === 'Shows'));
    const socialImages = shuffleArray(images.filter(img => img.category === 'projeto_social'));
    const retratosImages = shuffleArray(images.filter(img => img.category === 'retratos'));
    const gastronomiaImages = shuffleArray(images.filter(img => img.category === 'gastronomia'));

    let showIndex = 0;
    let socialIndex = 0;
    let retratosIndex = 0;
    let gastronomiaIndex = 0;

    const getNextImage = (categoryImages: any[], indexRef: { val: number }) => {
      if (categoryImages.length === 0) return null;
      const img = categoryImages[indexRef.val % categoryImages.length];
      indexRef.val++;
      return img.publicUrl;
    };

    // Helper to get image or fallback
    const getImg = (cat: string, fallback: string) => {
      let url = null;
      if (cat === 'Shows') url = getNextImage(showsImages, { val: showIndex++ });
      else if (cat === 'Projeto Social') url = getNextImage(socialImages, { val: socialIndex++ });
      else if (cat === 'Retrato') url = getNextImage(retratosImages, { val: retratosIndex++ });
      else if (cat === 'Gastronomia') url = getNextImage(gastronomiaImages, { val: gastronomiaIndex++ });

      // Try to find generic if specific not found, or use fallback
      if (!url) {
        // Try to find any image from the category if the specific rotation failed
        const generic = getImage(cat);
        if (generic) return generic;
      }
      return url || fallback;
    };


    return [
      { id: 1, src: getImg('Shows', ""), category: "Shows", title: "Performance", aspectRatio: "aspect-[2/3]", palette: 'deepBlue', supabaseCategory: 'Shows' },
      { id: 2, src: getImg('Gastronomia', ""), category: "Gastronomia", title: "Paladar Visual", aspectRatio: "aspect-[4/3]", palette: 'terracotta', supabaseCategory: 'gastronomia' },
      { id: 3, src: getImg('Retrato', ""), category: "Retrato", title: "Essência", aspectRatio: "aspect-square", palette: 'terracotta', supabaseCategory: 'retratos' },
      { id: 4, src: getImg('Projeto Social', ""), category: "Projeto Social", title: "Humanidade", aspectRatio: "aspect-[3/4]", palette: 'sageGreen', supabaseCategory: 'projeto_social' },
      { id: 5, src: getImg('Shows', ""), category: "Shows", title: "Luz e Som", aspectRatio: "aspect-[3/2]", palette: 'deepBlue', supabaseCategory: 'Shows' },
      { id: 6, src: getImg('Retrato', ""), category: "Retrato", title: "Olhar", aspectRatio: "aspect-[2/3]", palette: 'burntGold', supabaseCategory: 'retratos' },
      { id: 7, src: getImg('Gastronomia', ""), category: "Gastronomia", title: "Texturas", aspectRatio: "aspect-square", palette: 'terracotta', supabaseCategory: 'gastronomia' },
      { id: 8, src: getImg('Projeto Social', ""), category: "Projeto Social", title: "Resiliência", aspectRatio: "aspect-[4/5]", palette: 'deepBlue', supabaseCategory: 'projeto_social' },
      { id: 9, src: getImg('Shows', ""), category: "Shows", title: "Vibração", aspectRatio: "aspect-[4/5]", palette: 'burntGold', supabaseCategory: 'Shows' },
      { id: 10, src: getImg('Retrato', ""), category: "Retrato", title: "Identidade", aspectRatio: "aspect-[3/4]", palette: 'sageGreen', supabaseCategory: 'retratos' },
      { id: 11, src: getImg('Gastronomia', ""), category: "Gastronomia", title: "Sabor", aspectRatio: "aspect-[2/3]", palette: 'terracotta', supabaseCategory: 'gastronomia' },
      { id: 12, src: getImg('Projeto Social', ""), category: "Projeto Social", title: "Verdade", aspectRatio: "aspect-[3/2]", palette: 'deepBlue', supabaseCategory: 'projeto_social' },
      { id: 13, src: getImg('Shows', ""), category: "Shows", title: "Atmosfera", aspectRatio: "aspect-square", palette: 'sageGreen', supabaseCategory: 'Shows' },
      { id: 14, src: getImg('Retrato', ""), category: "Retrato", title: "Alma", aspectRatio: "aspect-[4/3]", palette: 'burntGold', supabaseCategory: 'retratos' },
      { id: 15, src: getImg('Shows', ""), category: "Shows", title: "Palco", aspectRatio: "aspect-[2/3]", palette: 'deepBlue', supabaseCategory: 'Shows' },
    ] as PortfolioItem[];
  }, [loading, images, getImage]); // Re-run when images are loaded

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
  }, [selectedId, portfolioData]);

  const selectedItem = portfolioData.find(item => item.id === selectedId);

  return (
    <section id="portfolio" className="py-32 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 relative z-10 overflow-hidden transition-colors duration-1000">

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
        <div
          className={`mb-20 flex flex-col items-start border-l-2 pl-8 transition-colors duration-700 ${activePalette === 'neutral' ? 'border-neutral-300 dark:border-neutral-800' : ''}`}
          style={{ borderColor: activePalette === 'neutral' ? undefined : PALETTES[activePalette].accent }}>

          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase mb-4 block transition-colors duration-700"
            style={{ color: activePalette === 'neutral' ? undefined : PALETTES[activePalette].accent }}
          >
            <span className={activePalette === 'neutral' ? 'text-neutral-500 dark:text-neutral-400' : ''}>Galeria Selecionada</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-neutral-900 dark:text-white mb-4 transition-colors duration-500"
          >
            Portfólio
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-600 dark:text-neutral-400 font-light text-lg max-w-lg transition-colors duration-500"
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
      className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden ${item.aspectRatio}`}>
        <div className={`absolute inset-0 bg-neutral-200 dark:bg-neutral-900 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />

        <SupabaseImg
          src={item.src}
          category={item.supabaseCategory || 'site'}
          fallbackSrc={item.src}
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

        <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500" />

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