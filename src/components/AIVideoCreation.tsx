import { motion } from 'framer-motion'
import { Video, Clock, DollarSign, ArrowUpRight, Wand2 } from 'lucide-react'

export function AIVideoCreation() {
  const services = [
    {
      id: '01',
      title: 'AI Avatar Videos',
      category: 'Synthetic Media',
      desc: 'Photorealistic AI avatars that speak your script. Perfect for courses, marketing, and social content.',
      features: ['Custom Avatars', 'Multi-Language', 'Lip Sync'],
      turnaround: '24–48 hrs',
      startingPrice: '$49',
    },
    {
      id: '02',
      title: 'Text to Video',
      category: 'Generative Content',
      desc: 'Transform scripts into stunning visual narratives using cutting-edge AI video generation models.',
      features: ['Sora', 'Runway', 'Pika Labs'],
      turnaround: '48–72 hrs',
      startingPrice: '$79',
    },
    {
      id: '03',
      title: 'AI Shorts Automation',
      category: 'Social Scale',
      desc: 'Automated short-form content pipeline for TikTok, Reels, and YouTube Shorts. Batch production ready.',
      features: ['Auto Captions', 'Viral Hooks', 'Batch Ops'],
      turnaround: '12–24 hrs',
      startingPrice: '$29',
    },
    {
      id: '04',
      title: 'Voice Cloning',
      category: 'Audio Synthesis',
      desc: 'Clone voices for consistent branding. Maintain your unique tone across all video content.',
      features: ['ElevenLabs', 'Custom Voice', 'Emotion Control'],
      turnaround: '24 hrs',
      startingPrice: '$39',
    },
  ]

  const processSteps = [
    { step: '01', label: 'Brief Intake', desc: 'Share your vision and requirements' },
    { step: '02', label: 'Script Refinement', desc: 'AI-enhanced script optimization' },
    { step: '03', label: 'Generation', desc: 'Cutting-edge AI video synthesis' },
    { step: '04', label: 'Delivery', desc: 'Polished output in your format' },
  ]

  return (
    <section id="ai-videos" className="section-padding bg-bg relative overflow-hidden">
      <div className="container-aligned space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Video className="w-4 h-4" />
              Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              AI Video Creation
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">{services.length} services</span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all duration-200 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">
                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-txt group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span key={feature} className="text-xs font-medium text-muted bg-bg border border-border px-2.5 py-1 rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t lg:border-t-0 lg:border-l border-border bg-bg/50 p-6 flex flex-row lg:flex-col justify-between lg:justify-center gap-4 lg:gap-3 min-w-[160px]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      {service.turnaround}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <DollarSign className="w-4 h-4" />
                      From {service.startingPrice}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-sm font-medium transition-all whitespace-nowrap"
                  >
                    Order
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8 pt-8 border-t border-border"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Wand2 className="w-4 h-4" />
              Process
            </div>
            <h3 className="text-2xl font-bold text-txt">How It Works</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-5 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all text-center space-y-2 group"
              >
                <div className="text-xl font-bold font-mono text-primary/50 group-hover:text-primary transition-colors">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-txt group-hover:text-primary transition-colors">
                    {step.label}
                  </h4>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
