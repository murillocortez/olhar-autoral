import React from 'react';
import { Mail, Instagram, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contato" className="py-24 px-6 bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="font-serif text-4xl text-white mb-8">Contato</h2>
            <p className="text-neutral-400 font-light mb-12 max-w-md">
              Disponível para projetos em todo o Brasil e exterior.
              Para orçamentos e colaborações, entre em contato através dos canais abaixo.
            </p>
          </div>

          <div className="space-y-8">
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