import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { IDENTITY } from '../data/portfolio'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()

  // Trigger animations after mount
  useState(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  })

  // Sophisticated scroll animations
  const scaleProgress = useTransform(scrollY, [0, 500], [1, 0.9])
  const opacityProgress = useTransform(scrollY, [300, 600], [1, 0])
  const yProgress = useTransform(scrollY, [0, 600], [0, 100])

  // Grid animations
  const gridOpacity = useTransform(scrollY, [0, 300], [0.4, 0.1])
  const gridScale = useTransform(scrollY, [0, 500], [1, 1.2])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-bg"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{
            opacity: gridOpacity,
            scale: gridScale,
          }}
          className="absolute inset-0"
        >
          <div className="w-full h-full relative">
            <svg className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgb(var(--primary-rgb) / 0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
          </div>
        </motion.div>
      </div>

      {/* Main Content Container */}
      <motion.div
        style={{
          scale: scaleProgress,
          opacity: opacityProgress,
          y: yProgress,
        }}
        className="relative z-20 container-aligned min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-24 pb-12"
      >
        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start space-y-10 order-2 lg:order-1">
          {/* Animated Entry Indicator */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isLoaded ? { width: '80px', opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'circOut' }}
            className="h-[2px] bg-primary mb-2"
          />

          {/* Main Title - Cinematic Reveal */}
          <div className="space-y-2">
            {['KUNJ', 'SHAH'].map((word, wordIdx) => (
              <div key={wordIdx} className="overflow-hidden h-[80px] sm:h-[100px] lg:h-[160px]">
                <motion.h1
                  initial={{ y: '100%' }}
                  animate={isLoaded ? { y: 0 } : {}}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: wordIdx * 0.15,
                  }}
                  className="text-8xl sm:text-9xl lg:text-[180px] font-black tracking-tighter text-txt uppercase leading-[0.85]"
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Descriptive Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="max-w-xl space-y-6"
          >
            <p className="text-xl sm:text-2xl text-muted font-light leading-relaxed">
              Engineering <span className="text-primary font-medium">Full Stack AI</span> solutions and
              complex <span className="text-primary font-medium">automation</span> workflows for the next generation of intelligent systems.
            </p>

            {/* Tech Stack - Staggered Fade */}
            <div className="flex flex-wrap gap-4">
              {['Full Stack', 'AIML', 'Automation', 'Agents'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="px-4 py-1.5 text-[10px] font-bold txt-mono tracking-widest uppercase border border-border bg-surface/50 rounded-full text-muted hover:text-primary hover:border-primary/40 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap gap-6 pt-6"
          >
            <a
              href="/projects"
              className="group relative px-10 py-4 bg-primary text-white font-bold text-sm tracking-widest uppercase overflow-hidden"
            >
              <span className="relative z-10">Explore Research</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border border-border text-txt font-bold text-sm tracking-widest uppercase hover:bg-surface transition-colors"
            >
              Inquire
            </a>
          </motion.div>
        </div>

        {/* Right Column: Visual Element */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]"
          >
            {/* Geometric Accents */}
            <div className="absolute inset-0 border border-primary/20 -translate-x-4 translate-y-4" />
            <div className="absolute inset-0 border border-primary/10 translate-x-4 -translate-y-4" />

            {/* Image Container */}
            <div className="relative w-full h-full bg-surface-highlight overflow-hidden border border-border">
              {IDENTITY.profile_photo && !imageError ? (
                <img
                  src={IDENTITY.profile_photo}
                  alt={IDENTITY.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary/10 italic">
                  Visual_Placeholder
                </div>
              )}
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 p-6 bg-surface border border-border shadow-2xl z-30 hidden sm:block"
            >
              <div className="txt-mono text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Status</div>
              <div className="text-xl font-black text-txt">DEPLOYED</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[10px] txt-mono text-muted uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  )
}
