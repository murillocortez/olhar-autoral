import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const About: React.FC = () => {
  return (
    <section id="sobre" className="relative py-24 md:py-40 bg-neutral-950 text-neutral-200 overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-900/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image (Horizontal/Cinematic Portrait) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img 
                src="https://picsum.photos/id/1005/1200/900?grayscale" 
                alt="Murillo Cortez Portrait" 
                className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
              {/* Cinematic Grain Overlay effect */}
              <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none mix-blend-multiply" />
              
              {/* Digital Watermark Overlay on the photo */}
              <div className="absolute bottom-4 right-4 z-20">
                <Logo variant="watermark" />
              </div>
            </div>
            
            {/* Minimalist Caption under photo */}
            <div className="flex items-center gap-4 mt-4">
              <div className="h-px w-12 bg-neutral-800" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Retrato Autoral</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <div className="order-1 lg:order-2">
            
            {/* Header Structure */}
            <div className="mb-10">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="block text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3"
              >
                O Salto Quântico
              </motion.span>
              
              <div className="flex items-center gap-6">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-5xl md:text-6xl text-white leading-none"
                >
                  Sobre Mim
                </motion.h2>
                {/* Graphic Divider */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-px bg-white/30"
                />
              </div>
            </div>

            {/* Content Flow */}
            <div className="space-y-8 font-light text-neutral-300 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Minha história com a fotografia começou antes mesmo de eu perceber. Nasceu no silêncio das observações, na forma como eu sempre enxerguei o mundo em frames. Mas foi ao longo de anos trabalhando em grandes instituições, cobrindo shows, gastronomia e eventos, que entendi que fotografar não era só um trabalho — era um chamado.
              </motion.p>

              {/* Highlight Block: "Card" Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-neutral-900 border border-neutral-800 p-8 md:p-10 my-8 shadow-2xl"
              >
                {/* Subtle paper texture effect via overlay */}
                <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />
                
                <p className="relative z-10 font-serif italic text-2xl md:text-3xl text-neutral-100 leading-snug">
                  "Foram 9 anos segurando a câmera, mas só agora tive coragem de segurar o meu próprio destino."
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Estou entrando em uma nova fase da minha vida. Uma fase que não pede permissão — ela acontece. Depois de contribuir com equipes e produções incríveis, decidi que era hora de dar voz ao meu olhar. Era hora de ser autônomo.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Hoje, o <strong>Olhar Autoral</strong> é a minha identidade criativa. É um compromisso comigo mesmo: fazer da fotografia a minha profissão, minha jornada e meu legado. E cada clique daqui pra frente carrega algo que nunca mais vou abrir mão: <span className="text-white border-b border-white/20 pb-0.5">a verdade do meu olhar.</span>
              </motion.p>
              
              {/* Brand Signature */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-10 flex justify-start"
              >
                <Logo variant="signature" className="text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;