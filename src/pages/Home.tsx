import { Hero } from '../components/Hero'
import { FeaturedProjects } from '../components/FeaturedProjects'
import { HowIBuild } from '../components/HowIBuild'
import { MetricsDashboard } from '../components/MetricsDashboard'
import { TechStack } from '../components/TechStack'
import { CurrentlyBuilding } from '../components/CurrentlyBuilding'
import { AboutShort } from '../components/AboutShort'
import { FinalCTA } from '../components/FinalCTA'
import { WhyMe } from '../components/WhyMe'
import { motion } from 'framer-motion'

export function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-24 sm:space-y-32 md:space-y-40"
    >
      <Hero />
      <FeaturedProjects />
      <WhyMe />
      <HowIBuild />
      <MetricsDashboard />
      <TechStack />
      <CurrentlyBuilding />
      <AboutShort />
      <FinalCTA />
    </motion.div>
  )
}
