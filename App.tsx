import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Manifesto from './components/Manifesto';
import Briefing from './components/Briefing';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'briefing'>('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavigateHome = () => {
    setActivePage('home');
  };

  const handleNavigateBriefing = () => {
    setActivePage('briefing');
  };

  return (
    <main className="bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-100 selection:text-neutral-950 overflow-x-hidden">
      <Navbar onNavigateHome={handleNavigateHome} isBriefingActive={activePage === 'briefing'} />
      
      {activePage === 'home' ? (
        <>
          <Hero />
          
          <Manifesto 
            theme="light" 
            text="A luz não ilumina apenas; ela define o que deve ser lembrado. Busco a sombra certa para desenhar o volume e o feixe exato para revelar a alma." 
          />
          
          <About />
          
          <Manifesto 
            theme="chaos" 
            text="No caos da frequência sonora, o silêncio de um milésimo de segundo. Não capturo apenas o artista, mas a eletricidade que vibra entre o palco e a multidão." 
          />
          
          <Services />
          
          <Manifesto 
            theme="soul" 
            text="Um retrato não é uma captura, é uma permissão. Desarme as defesas, espero o intervalo entre as respirações e encontro a verdade que reside no olhar." 
          />
          
          <Portfolio />
          
          <Manifesto 
            theme="truth" 
            text="O extraordinário se esconde na rotina. Fragmentos silenciosos, esquinas esquecidas e gestos involuntários compõem a narrativa invisível do cotidiano." 
          />
          
          <CallToAction />
          <Contact onOpenBriefing={handleNavigateBriefing} />
        </>
      ) : (
        <Briefing onBack={handleNavigateHome} />
      )}
      
      <Footer />
    </main>
  );
};

export default App;
