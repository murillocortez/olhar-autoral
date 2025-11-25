import React from 'react';
import { Mail, Instagram, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactProps {
  onOpenBriefing: () => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenBriefing }) => {
  return (
    <section id="contato" className="py-24 px-6 bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="font-serif text-4xl text-white mb-8">Contato</h2>
              <p className="text-neutral-400 font-light mb-12 max-w-md leading-relaxed">
                Disponível para projetos em todo o Brasil e exterior.
                Para orçamentos e colaborações, entre em contato através dos canais ao lado ou inicie um processo criativo.
              </p>
            </div>

            {/* Premium Briefing Button */}
            <div className="mt-8 md:mt-0">
               <motion.button
                onClick={onOpenBriefing}
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="group w-full md:w-auto flex items-center justify-between gap-8 px-8 py-6 border border-neutral-700 hover:bg-neutral-800/30 transition-all duration-300 rounded-sm"
               >
                 <div className="text-left">
                   <span className="block uppercase tracking-[0.2em] text-xs text-neutral-300 group-hover:text-white transition-colors mb-1">
                     Iniciar Projeto
                   </span>
                   <span className="font-serif text-xl text-white">
                     Briefing Personalizado
                   </span>
                 </div>
                 <ArrowRight className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" strokeWidth={1} />
               </motion.button>
            </div>
          </div>

          <div className="space-y-10 md:pl-12 md:border-l border-neutral-800/50">
            <a href="mailto:murillocortez@gmail.com" className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full group-hover:border-white transition-colors text-neutral-400 group-hover:text-white">
                <Mail size={20} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">E-mail</span>
                <span className="text-lg font-serif text-neutral-200 group-hover:text-white transition-colors">murillocortez@gmail.com</span>
              </div>
            </a>

            <a href="https://wa.me/5562982795967" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full group-hover:border-white transition-colors text-neutral-400 group-hover:text-white">
                <Phone size={20} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">WhatsApp</span>
                <span className="text-lg font-serif text-neutral-200 group-hover:text-white transition-colors">(62) 98279-5967</span>
              </div>
            </a>

            <a href="https://instagram.com/olhar.autoral" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
              <div className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-full group-hover:border-white transition-colors text-neutral-400 group-hover:text-white">
                <Instagram size={20} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Social</span>
                <span className="text-lg font-serif text-neutral-200 group-hover:text-white transition-colors">@olhar.autoral</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
