
import React from 'react';
import { motion } from 'framer-motion';
import SupabaseImg from './SupabaseImg';

const services = [
  {
    symbol: "✦",
    title: "Shows e Eventos",
    description: "Cenas que acontecem uma vez. Meu trabalho é fazer com que elas durem para sempre — com estética, técnica e intensidade.",
    image: "https://i.ibb.co/MyQnh0tB/IMG-0549.jpg",
    supabaseCategory: "Shows"
  },
  {
    symbol: "●",
    title: "Gastronomia",
    description: "Food styling com intenção. Luz, textura e atmosfera que fazem o público sentir o sabor antes mesmo de provar.",
    image: "https://picsum.photos/600/800?random=2",
    supabaseCategory: "gastronomia"
  },
  {
    symbol: "■",
    title: "Retratos Autênticos",
    description: "Não é apenas um retrato — é um encontro. Entre quem você é e como o mundo vai te ver.",
    image: "https://picsum.photos/600/800?random=3",
    supabaseCategory: "retratos"
  },
  {
    symbol: "▲",
    title: "Projetos Autoriais",
    description: "A minha assinatura mais pura. Ideias, conceitos e visões que florescem em forma de fotografia.",
    image: "https://picsum.photos/600/800?random=4",
    supabaseCategory: "projeto_social"
  }
];

const Services: React.FC = () => {
  return (
    <section id="atuacao" className="py-32 px-6 bg-neutral-950 text-neutral-100">
      <div className="max-w-screen-2xl mx-auto">

        {/* Section Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="text-neutral-500 uppercase tracking-[0.3em] text-[10px] mb-4 block">
            Especialidades
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            Áreas de Atuação
          </h2>
          <div className="w-px h-12 bg-neutral-800 mt-8"></div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-900 mb-8 border border-neutral-900 group-hover:border-neutral-800 transition-colors duration-500">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Placeholder loading skeleton */}
                <SupabaseImg
                  src={service.image}
                  category={service.supabaseCategory}
                  fallbackSrc={service.image}
                  alt={service.title}
                  className="relative z-10 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-100 grayscale opacity-90 group-hover:opacity-100"
                />
                {/* Subtle overlay that lifts on hover */}
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none"></div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow items-center text-center px-2">

                {/* Minimalist Symbol */}
                <span className="text-neutral-500 text-lg mb-4 opacity-60 group-hover:opacity-100 group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-1">
                  {service.symbol}
                </span>

                {/* Title */}
                <h3 className="font-serif text-3xl text-neutral-200 mb-5 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description - Narrower width for elegance */}
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-[90%]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;