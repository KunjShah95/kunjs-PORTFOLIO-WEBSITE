import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { IDENTITY } from '../data/portfolio'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)
  const { scrollY } = useScroll()

  // Sophisticated scroll animations
  const scaleProgress = useTransform(scrollY, [0, 500], [1, 0.75])
  const opacityProgress = useTransform(scrollY, [400, 700], [1, 0])
  const yProgress = useTransform(scrollY, [0, 600], [0, 150])

  // Grid animations
  const gridOpacity = useTransform(scrollY, [0, 300], [0.4, 0.1])
  const gridScale = useTransform(scrollY, [0, 500], [1, 1.5])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-screen overflow-hidden"
    >
      {/* Fixed viewport */}
      <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <motion.div
          style={{
            opacity: gridOpacity,
            scale: gridScale,
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="w-full h-full relative">
            {/* Perspective grid lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ perspective: '1000px' }}>
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgb(255 79 0 / 0.15)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Grid glow elements */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 blur-[100px] rounded-full"
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 blur-[120px] rounded-full"
              animate={{ y: [0, -40, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          style={{
            scale: scaleProgress,
            opacity: opacityProgress,
            y: yProgress,
          }}
          className="relative z-20 container-aligned grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-20 lg:pt-0"
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start space-y-8 order-2 lg:order-1 w-full">
            {/* Top Badge - Animated Entry */}


            {/* Main Title - Cinematic Reveal */}
            <div className="relative overflow-hidden w-full">
              <div className="flex flex-col items-start gap-0 leading-none">
                {['KUNJ', 'SHAH'].map((word, wordIdx) => (
                  <div key={word} className="overflow-hidden">
                    <motion.h1
                      initial={{ opacity: 0, y: 120, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: wordIdx * 0.2,
                        duration: 1.2,
                        ease: [0.23, 1, 0.32, 1],
                        type: 'spring',
                        stiffness: 40,
                        damping: 12,
                      }}
                      className="text-7xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[160px] font-black tracking-[-0.04em] text-txt uppercase whitespace-nowrap lg:-ml-1"
                      style={{ perspective: '1200px' }}
                    >
                      {word}
                    </motion.h1>
                  </div>
                ))}
              </div>
            </div>

            {/* Descriptive Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-xl text-left space-y-6"
            >
              <p className="text-lg sm:text-xl text-muted font-light leading-relaxed tracking-wide">
                Building <span className="text-primary font-bold">production-grade AI systems</span> that
                scale intelligently across distributed infrastructure.
              </p>

              {/* Tech Stack Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap justify-start gap-3"
              >
                {['AGENTS_V1', 'MLOPS', 'SYSTEMS', 'INFERENCE'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="px-3 py-1 text-xs font-bold txt-mono tracking-widest uppercase border border-primary/40 bg-primary/10 rounded-full text-primary/80"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* CTA Buttons - Modern Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-row gap-4 pt-4"
            >
              {/* Primary CTA */}
              <a
                href="/projects"
                className="group relative px-8 py-3 bg-primary text-white font-bold text-sm tracking-widest uppercase overflow-hidden rounded-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,79,0,0.4)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Work
                  <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-primary/80"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </a>

              {/* Secondary CTA */}
              <a
                href="/blogs"
                className="px-8 py-3 border-2 border-primary/60 text-txt font-bold text-sm tracking-widest uppercase rounded-sm hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                Read Articles
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="pt-8 border-t border-primary/20 flex gap-10 w-full"
            >
              {[
                { label: 'Projects', value: '12+' },
                { label: 'Articles', value: '6' },
                { label: 'Years', value: '2+' },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-2xl font-black text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] txt-mono text-muted uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full relative group">
            {/* Decorative elements behind image */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />

            {IDENTITY.profile_photo && !imageError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1, type: "spring" }}
                className="relative"
              >
                <div className="absolute inset-0 border-2 border-primary/30 translate-x-4 translate-y-4 rounded-2xl z-0" />
                <img
                  src={IDENTITY.profile_photo}
                  alt={`${IDENTITY.name} profile photo`}
                  className="relative z-10 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-[3/4] object-cover object-top rounded-2xl shadow-2xl transition-all duration-700"
                  onError={() => setImageError(true)}
                />

                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary z-20" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary z-20" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs txt-mono text-muted/60 uppercase tracking-widest">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 text-primary/60" />
          </div>
        </motion.div>
      </div>

      {/* Scroll spacer */}
      <div className="relative h-screen" />
    </section>
  )
}