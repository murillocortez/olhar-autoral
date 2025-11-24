import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: <Instagram size={18} strokeWidth={1.5} />, 
      href: "https://instagram.com/olhar.autoral", 
      label: "Instagram" 
    },
    { 
      icon: <Phone size={18} strokeWidth={1.5} />, 
      href: "https://wa.me/5562982795967", 
      label: "WhatsApp" 
    },
    { 
      icon: <Mail size={18} strokeWidth={1.5} />, 
      href: "mailto:murillocortez@gmail.com", 
      label: "Email" 
    },
  ];

  return (
    <footer className="bg-neutral-950 pt-24 pb-12 px-6 border-t border-neutral-900 text-neutral-400 font-light">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        
        {/* Identity Section - Logo */}
        <div className="text-center mb-12 flex flex-col items-center gap-6">
          <Logo variant="symbol" className="w-10 h-10 text-neutral-200" />
          
          <div className="text-center">
            <h4 className="font-serif text-2xl text-neutral-200 mb-1 tracking-wider uppercase">
              Murillo Cortez
            </h4>
            <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-600 block">
              Fotógrafo Autoral
            </span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-10 mb-16">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ y: -3, color: "#f5f5f5" }}
              transition={{ duration: 0.3 }}
              className="text-neutral-500 hover:text-white transition-colors p-2"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Signature Phrase */}
        <div className="mb-16 opacity-80">
          <p className="font-serif italic text-xl text-neutral-500">
            “Criado com intenção. Guiado pela luz.”
          </p>
        </div>

        {/* Bottom Line & Copyright */}
        <div className="w-full border-t border-neutral-900/50 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-neutral-700 gap-4">
          <span>&copy; {currentYear} Olhar Autoral</span>
          
          <div className="flex gap-6">
            <span className="hover:text-neutral-500 cursor-pointer transition-colors">Política de Privacidade</span>
            <span className="hover:text-neutral-500 cursor-pointer transition-colors">Termos de Uso</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;