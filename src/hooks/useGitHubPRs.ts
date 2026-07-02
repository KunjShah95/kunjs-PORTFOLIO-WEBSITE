import { useState, useEffect } from 'react'
import { CONTRIBUTIONS, OSS_STATS, Contribution } from '../data/opensource'

interface LiveStats {
  mergedPRs: number
  openedIssues: number
  totalPRs: number
  projects: number
  orgs: string[]
}

const NOTABLE_ORGS = ['owasp', 'microsoft', 'ollama', 'vscode', 'tanstack', 'react', 'github', 'vercel']

export function useGitHubPRs() {
  const [contributions, setContributions] = useState<Contribution[]>(CONTRIBUTIONS)
  const [stats, setStats] = useState<LiveStats>({
    mergedPRs: OSS_STATS.mergedPRs,
    openedIssues: OSS_STATS.openedIssues,
    totalPRs: OSS_STATS.totalPRs,
    projects: OSS_STATS.projects,
    orgs: [...OSS_STATS.orgs],
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchLivePRs() {
      setLoading(true)
      try {
        const username = 'KunjShah95'
        
        // 1. Fetch merged PRs from external repos
        const prQuery = `is:pr author:${username} is:merged -user:${username}`
        const prUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(prQuery)}&sort=updated&order=desc&per_page=15`
        
        // 2. Fetch overall stats to update counts
        const statsQuery = `author:${username} -user:${username}`
        const statsUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(statsQuery)}&per_page=1`

        const [prRes, statsRes] = await Promise.all([
          fetch(prUrl, { cache: 'no-store' }),
          fetch(statsUrl, { cache: 'no-store' }),
        ])

        if (!prRes.ok) {
          // If rate limited or network offline, gracefully keep static fallbacks
          setLoading(false)
          return
        }

        const prData = await prRes.json()
        const items = prData.items || []

        if (items.length > 0) {
          const fetchedContributions: Contribution[] = items.map((item: any) => {
            const urlParts = item.html_url.split('/')
            const org = `${urlParts[3]}/${urlParts[4]}`
            const label = urlParts[4]
            const title = item.title

            // Deduce tag based on title keywords
            const lowerTitle = title.toLowerCase()
            let tag = 'feature'
            if (lowerTitle.includes('doc') || lowerTitle.includes('readme')) tag = 'docs'
            else if (lowerTitle.includes('ci') || lowerTitle.includes('workflow') || lowerTitle.includes('action')) tag = 'infra'
            else if (lowerTitle.includes('secur') || lowerTitle.includes('regress') || lowerTitle.includes('auth')) tag = 'security'
            else if (lowerTitle.includes('fix') || lowerTitle.includes('bug')) tag = 'bugfix'

            const notable = NOTABLE_ORGS.includes(urlParts[3].toLowerCase())

            return {
              org,
              label,
              title,
              kind: 'merged',
              tag,
              url: item.html_url,
              notable,
            }
          })

          // Merge live PRs with static contributions to keep proposed issues/notable manual entries
          // Filter out duplicates from static list if url matches
          const liveUrls = new Set(fetchedContributions.map(c => c.url))
          const uniqueStatic = CONTRIBUTIONS.filter(c => !liveUrls.has(c.url))
          
          // Place live PRs first, followed by static issues/proposed entries
          const mergedList = [...fetchedContributions, ...uniqueStatic].slice(0, 10)
          setContributions(mergedList)
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          const totalCount = statsData.total_count || OSS_STATS.totalPRs
          
          // Fetch merged PRs count specifically
          const mergedCountRes = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(`is:pr author:${username} is:merged -user:${username}`)}&per_page=1`)
          let mergedCount = OSS_STATS.mergedPRs
          if (mergedCountRes.ok) {
            const mergedCountData = await mergedCountRes.json()
            mergedCount = mergedCountData.total_count || OSS_STATS.mergedPRs
          }

          // Fetch issues count specifically
          const issuesCountRes = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(`is:issue author:${username} -user:${username}`)}&per_page=1`)
          let issuesCount = OSS_STATS.openedIssues
          if (issuesCountRes.ok) {
            const issuesCountData = await issuesCountRes.json()
            issuesCount = issuesCountData.total_count || OSS_STATS.openedIssues
          }

          // Build a set of distinct repositories contributed to from the contributions list
          const uniqueOrgs = Array.from(new Set(items.map((item: any) => item.html_url.split('/')[3])))
          const displayOrgs = uniqueOrgs.filter((org: any) => typeof org === 'string').slice(0, 3) as string[]

          setStats({
            mergedPRs: mergedCount,
            openedIssues: issuesCount,
            totalPRs: totalCount,
            projects: uniqueOrgs.length > 0 ? uniqueOrgs.length : OSS_STATS.projects,
            orgs: displayOrgs.length > 0 ? displayOrgs : [...OSS_STATS.orgs],
          })
        }
      } catch (err) {
        console.error('Error fetching live GitHub contributions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLivePRs()
  }, [])

  return { contributions, stats, loading }
}
