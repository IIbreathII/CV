import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

function App() {
  const landingWrapperRef = useRef(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const calculateStickyPosition = () => {
      if (landingWrapperRef.current) {
        const landingHeight = landingWrapperRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const topValue = Math.min(0, windowHeight - landingHeight);
        setStickyTop(topValue);
      }
    };

    calculateStickyPosition();
    window.addEventListener('resize', calculateStickyPosition);

    return () => window.removeEventListener('resize', calculateStickyPosition);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Header />

      <div
        ref={landingWrapperRef}
        style={{
          position: 'sticky',
          top: stickyTop, // Задаем вычисленный сдвиг!
          zIndex: 1,
        }}
      >
        <Landing />
      </div>


      <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#ffffff' }}>
        <Experience />
        <Skills />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Projects />
        </motion.div>

        <Contact />
      </div>
    </div>
  );
}

export default App;