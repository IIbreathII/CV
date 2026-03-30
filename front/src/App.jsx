import React, { useRef, useState, useEffect } from 'react'
import { useInView, motion } from 'framer-motion'
import Header from './components/Header/Header'
import Landing from './components/Landing/Landing'
import Experience from './components/Experience/Experience'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  const landingWrapperRef = useRef(null)
  const projectsWrapperRef = useRef(null)
  const [stickyStyle, setStickyStyle] = useState({ top: 0 })
  const [hasAppeared, setHasAppeared] = useState(false)

  const isProjectsInView = useInView(projectsWrapperRef, { amount: 0.4 })

  useEffect(() => {
    const checkHeight = () => {
      if (landingWrapperRef.current) {
        const height = landingWrapperRef.current.offsetHeight
        const viewportHeight = window.innerHeight
        setStickyStyle(height > viewportHeight ? { bottom: 0 } : { top: 0 })
      }
    }
    checkHeight()
    window.addEventListener('resize', checkHeight)
    return () => window.removeEventListener('resize', checkHeight)
  }, [])

  useEffect(() => {
    if (isProjectsInView && !hasAppeared) {
      setHasAppeared(true)
    }
  }, [isProjectsInView, hasAppeared])

  return (
    <div style={{ position: 'relative' }}>
      <Header />

      <div
        ref={landingWrapperRef}
        style={{ position: 'sticky', ...stickyStyle, zIndex: 1 }}
      >
        <Landing />
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Experience />
        <Skills />

        <div
          ref={projectsWrapperRef}
          style={{
            backgroundColor: '#dde1f3',
            minHeight: '100vh',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
              opacity: { duration: 0.7, ease: 'easeOut', delay: 0.5 },
              y: { duration: 0.7, ease: 'easeOut', delay: 0.5 },
              backgroundColor: { duration: 0.8, ease: 'easeInOut' },
            }}
            style={{
              backgroundColor: hasAppeared ? '#ffffff' : '#dde1f3',
              transition: 'background-color 0.8s ease',
            }}
          >
            <Projects />
          </motion.div>
        </div>

        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App