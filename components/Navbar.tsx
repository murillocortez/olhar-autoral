import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Atuação', href: '#atuacao' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="z-50 relative mix-blend-difference text-white group"
        >
          <Logo variant="full" className="text-white group-hover:opacity-80 transition-opacity" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-[10px] uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full opacity-50"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center gap-8 md:hidden z-40"
            >
              <div className="mb-8 opacity-50">
                <Logo variant="symbol" className="w-12 h-12 text-white" />
              </div>
              
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif text-3xl text-neutral-300 hover:text-white transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;