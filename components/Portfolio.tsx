import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

const SHOWS_URLS = [
  "https://i.ibb.co/9km0FBDL/IMG-2504.jpg",
  "https://i.ibb.co/3947XXXM/IMG-2500.jpg",
  "https://i.ibb.co/d0Sy4zRG/IMG-2496.jpg",
  "https://i.ibb.co/JFM37qQv/IMG-2490.jpg",
  "https://i.ibb.co/rKbz8qjq/IMG-2535.jpg",
  "https://i.ibb.co/p6q1L7Kb/IMG-2547.jpg",
  "https://i.ibb.co/3yydNFq3/IMG-2546.jpg",
  "https://i.ibb.co/67YQG948/IMG-2579.jpg",
  "https://i.ibb.co/9m57r6Z8/IMG-2578.jpg",
  "https://i.ibb.co/DP8x7t3r/IMG-2582.jpg",
  "https://i.ibb.co/mVFG6htX/IMG-7934.jpg",
  "https://i.ibb.co/J6T0gv5/IMG-7962.jpg",
  "https://i.ibb.co/B5qy0YVf/IMG-7938.jpg",
  "https://i.ibb.co/fdrKwZMH/IMG-7967.jpg",
  "https://i.ibb.co/LX1FrwQ9/IMG-7994.jpg",
  "https://i.ibb.co/Z1twvLbG/IMG-8038.jpg",
  "https://i.ibb.co/0V8pVJq8/IMG-8076.jpg",
  "https://i.ibb.co/LDS16bgn/IMG-8127.jpg",
  "https://i.ibb.co/5Xd0Ndbx/IMG-8124.jpg",
  "https://i.ibb.co/1GM7gF8B/IMG-8112.jpg",
  "https://i.ibb.co/vnQHvgM/IMG-0548.jpg",
  "https://i.ibb.co/jvnz4j9n/IMG-0655.jpg",
  "https://i.ibb.co/Ldx6kBs3/IMG-0770.jpg",
  "https://i.ibb.co/1fVndhGp/IMG-0605.jpg",
  "https://i.ibb.co/B2PPB0pG/IMG-0641.jpg",
  "https://i.ibb.co/fd0QJK0X/IMG-0600.jpg",
  "https://i.ibb.co/v6xBwjhF/IMG-0568.jpg",
  "https://i.ibb.co/rRBQtFYM/IMG-0563.jpg",
  "https://i.ibb.co/LhCK5MGs/IMG-0554.jpg",
  "https://i.ibb.co/Y7rsLKPc/IMG-0552.jpg",
  "https://i.ibb.co/MyQnh0tB/IMG-0549.jpg"
];

const SOCIAL_URLS = [
  "https://i.ibb.co/0jyYWTZ4/1.jpg",
  "https://i.ibb.co/r2LCXH66/2.jpg",
  "https://i.ibb.co/dsLj2kvX/4.jpg",
  "https://i.ibb.co/kVpYCpz3/3.jpg",
  "https://i.ibb.co/fzwSZrpN/5.jpg",
  "https://i.ibb.co/4nHJDnGz/6.jpg",
  "https://i.ibb.co/N6sjwrJZ/7.jpg",
  "https://i.ibb.co/chQncBfY/8.jpg",
  "https://i.ibb.co/Df1zPrJb/9.jpg",
  "https://i.ibb.co/cKhggsWS/10.jpg",
  "https://i.ibb.co/HDW3RBYH/11.jpg",
  "https://i.ibb.co/RGXsNhS0/12.jpg",
  "https://i.ibb.co/sdXq2GMm/13.jpg",
  "https://i.ibb.co/60VnmPmj/14.jpg",
  "https://i.ibb.co/20wffFfF/15.jpg",
  "https://i.ibb.co/whhCypyT/16.jpg",
  "https://i.ibb.co/dwpL9CKb/17.jpg",
  "https://i.ibb.co/jPvNYStT/18.jpg",
  "https://i.ibb.co/PGYsDWX5/IMG-9076.jpg"
];

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

  // Generate portfolio data on mount to ensure random shows and social projects
  const portfolioData = useMemo(() => {
    const shuffledShows = shuffleArray(SHOWS_URLS);
    const shuffledSocial = shuffleArray(SOCIAL_URLS);

    let showIndex = 0;
    let socialIndex = 0;

    const getNextShowImage = () => {
      const img = shuffledShows[showIndex % shuffledShows.length];
      showIndex++;
      return img;
    };

    const getNextSocialImage = () => {
      const img = shuffledSocial[socialIndex % shuffledSocial.length];
      socialIndex++;
      return img;
    };

    return [
      { id: 1, src: "https://picsum.photos/800/1200?random=101", category: "Editorial", title: "Silêncio Urbano", aspectRatio: "aspect-[2/3]", palette: 'sageGreen' },
      { id: 20, src: getNextSocialImage(), category: "Projeto Social", title: "Essência", aspectRatio: "aspect-[3/4]", palette: 'terracotta' },
      { id: 10, src: getNextShowImage(), category: "Shows", title: "Performance", aspectRatio: "aspect-[2/3]", palette: 'deepBlue' },
      { id: 21, src: getNextSocialImage(), category: "Projeto Social", title: "Olhar", aspectRatio: "aspect-[3/2]", palette: 'burntGold' },
      { id: 3, src: "https://picsum.photos/800/800?random=103", category: "Retrato", title: "Essência", aspectRatio: "aspect-square", palette: 'terracotta' },
      { id: 11, src: getNextShowImage(), category: "Shows", title: "Luz e Som", aspectRatio: "aspect-[3/2]", palette: 'deepBlue' },
      { id: 22, src: getNextSocialImage(), category: "Projeto Social", title: "Silêncio Urbano", aspectRatio: "aspect-square", palette: 'sageGreen' },
      { id: 4, src: "https://picsum.photos/800/1000?random=104", category: "Moda", title: "Texturas", aspectRatio: "aspect-[4/5]", palette: 'burntGold' },
      { id: 12, src: getNextShowImage(), category: "Shows", title: "Energia", aspectRatio: "aspect-square", palette: 'terracotta' },
      { id: 23, src: getNextSocialImage(), category: "Projeto Social", title: "Frame", aspectRatio: "aspect-[4/5]", palette: 'deepBlue' },
      { id: 5, src: "https://picsum.photos/800/600?random=105", category: "Gastronomia", title: "Paladar Visual", aspectRatio: "aspect-[4/3]", palette: 'terracotta' },
      { id: 13, src: getNextShowImage(), category: "Shows", title: "Vibração", aspectRatio: "aspect-[4/5]", palette: 'burntGold' },
      { id: 24, src: getNextSocialImage(), category: "Projeto Social", title: "Autoral", aspectRatio: "aspect-[3/4]", palette: 'sageGreen' },
      { id: 6, src: "https://picsum.photos/800/1200?random=106", category: "Autoral", title: "Fragmentos", aspectRatio: "aspect-[2/3]", palette: 'sageGreen' },
      { id: 14, src: getNextShowImage(), category: "Shows", title: "Atmosfera", aspectRatio: "aspect-[4/3]", palette: 'sageGreen' },
      { id: 25, src: getNextSocialImage(), category: "Projeto Social", title: "Resiliência", aspectRatio: "aspect-[2/3]", palette: 'terracotta' },
      { id: 7, src: "https://picsum.photos/900/900?random=107", category: "Retrato", title: "Olhar", aspectRatio: "aspect-square", palette: 'burntGold' },
      { id: 15, src: getNextShowImage(), category: "Shows", title: "Palco", aspectRatio: "aspect-[2/3]", palette: 'deepBlue' },
      { id: 26, src: getNextSocialImage(), category: "Projeto Social", title: "Humanidade", aspectRatio: "aspect-square", palette: 'sageGreen' },
      { id: 16, src: getNextShowImage(), category: "Shows", title: "Contraste", aspectRatio: "aspect-square", palette: 'burntGold' },
      { id: 27, src: getNextSocialImage(), category: "Projeto Social", title: "Verdade", aspectRatio: "aspect-[3/2]", palette: 'deepBlue' },
      { id: 9, src: "https://picsum.photos/800/1100?random=109", category: "Autoral", title: "Sombras", aspectRatio: "aspect-[3/4]", palette: 'sageGreen' },
      { id: 17, src: getNextShowImage(), category: "Shows", title: "Melodia", aspectRatio: "aspect-[3/2]", palette: 'terracotta' },
      { id: 28, src: getNextSocialImage(), category: "Projeto Social", title: "Identidade", aspectRatio: "aspect-[4/5]", palette: 'burntGold' },
      { id: 29, src: getNextSocialImage(), category: "Projeto Social", title: "Alma", aspectRatio: "aspect-[4/3]", palette: 'terracotta' },
    ] as PortfolioItem[];
  }, []);

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

        {/* View All Button */}
        <div className="mt-24 flex justify-center">
          <a href="#" className="group flex items-center gap-4 px-8 py-4 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-500">
            <span className="uppercase tracking-[0.2em] text-xs text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">Ver Arquivo Completo</span>
            <Plus size={16} className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
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
      className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className={`relative w-full overflow-hidden ${item.aspectRatio}`}>
        <div className={`absolute inset-0 bg-neutral-200 dark:bg-neutral-900 transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'}`} />

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