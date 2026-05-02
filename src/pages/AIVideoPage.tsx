import { AIVideoCreation } from '../components/AIVideoCreation'
import { SEO } from '../components/SEO'

export function AIVideoPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <SEO 
        title="AI Video Creation"
        description="AI-powered video creation services by Kunj Shah. Leveraging generative AI for stunning visual content."
        url="https://kunjshah.vercel.app/ai-videos"
      />
      <AIVideoCreation />
    </div>
  )
}
