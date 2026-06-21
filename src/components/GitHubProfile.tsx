import { useMotionValue, useSpring } from 'framer-motion'
import {
  Star,
  GitFork,
  Loader2,
  ArrowUpRight,
  Clock,
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { IDENTITY } from '../data/portfolio'
import { SectionLabel } from './ui/SectionLabel'
import { Kicker } from './ui/Kicker'
import { useReveal } from '../hooks/useReveal'
import { BentoGrid, BentoCard } from './bento'

const GITHUB_USERNAME = IDENTITY.github_username

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Light-mode cell palette for cream paper (#FAF6EE). Level 0 uses the sunken
// token so empty days read as outlined cells; 1-4 step through burnt-orange
// accent at increasing opacities. All values are visible on the cream surface.
const CELL_STYLES = [
  'bg-sunken',        // level 0 — empty day (visibly outlined)
  'bg-accent/25',     // level 1 — quiet
  'bg-accent/55',     // level 2 — building
  'bg-accent/85',     // level 3 — strong
  'bg-accent',        // level 4 — peak
]

const LANGUAGE_COLORS: Record<string, string> = {
  Python:               '#3572A5',
  TypeScript:           '#3178C6',
  JavaScript:           '#F7DF1E',
  Go:                   '#00ADD8',
  Rust:                 '#DEA584',
  Java:                 '#B07219',
  'C++':                '#F34B7D',
  C:                    '#555555',
  'C#':                 '#178600',
  HTML:                 '#E34C26',
  CSS:                  '#563D7C',
  Shell:                '#89E051',
  Ruby:                 '#701516',
  PHP:                  '#4F5D95',
  'Jupyter Notebook':   '#DA5B0B',
  Dockerfile:           '#384D54',
  Markdown:             '#083FA1',
  Swift:                '#F05138',
  Kotlin:               '#A97BFF',
  Scala:                '#C22D40',
  'R':                  '#198CE7',
  MATLAB:               '#E16737',
  Dart:                 '#00B4AB',
  Elixir:               '#6E4A7E',
  Haskell:              '#5E5086',
  Lua:                  '#000080',
  Perl:                 '#0298C3',
  'Objective-C':        '#438EFF',
  Vue:                  '#41B883',
  Svelte:               '#FF3E00',
  'Vim Script':         '#199F4B',
  PowerShell:           '#012456',
  Makefile:             '#427819',
  TOML:                 '#9C4121',
  YAML:                 '#CB171E',
  JSON:                 '#292929',
  SCSS:                 '#C6538C',
  Less:                 '#1D365D',
  Assembly:             '#6E4C13',
  Zig:                  '#EC915C',
  Nim:                  '#FFE953',
  Crystal:              '#000100',
  Clojure:              '#DB5855',
  Groovy:               '#4298B8',
  CoffeeScript:         '#244776',
  'F#':                 '#B845FC',
  OCaml:                '#3BE133',
  Erlang:               '#B83998',
  Julia:                '#A270BA',
  Nix:                  '#7e7eff',
}

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  location: string | null
  company: string | null
  blog: string | null
}

interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  topics: string[]
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

function useCountUp(target: number, duration = 1.2, enabled = true) {
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    count.set(enabled ? target : 0)
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [target, count, spring, enabled])

  return display
}

function formatPushedDate(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

async function fetchContributions(username: string, year: number): Promise<ContributionDay[]> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    return data.contributions.map((d: { date: string; count: number; level: number }) => ({
      date: d.date,
      count: d.count,
      level: d.level,
    }))
  } catch {
    return []
  }
}

function buildGrid(contributions: ContributionDay[]) {
  const weeks: ContributionDay[][] = []
  let week: ContributionDay[] = []

  if (contributions.length > 0) {
    const firstDate = new Date(contributions[0].date)
    const dayOfWeek = firstDate.getDay()
    for (let i = 0; i < dayOfWeek; i++) {
      week.push({ date: '', count: 0, level: -1 })
    }
  }

  contributions.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })

  if (week.length > 0) {
    while (week.length < 7) {
      week.push({ date: '', count: 0, level: -1 })
    }
    weeks.push(week)
  }

  return weeks
}

function buildMonthLabels(year: number) {
  const labels: { month: string; startWeek: number }[] = []
  MONTHS.forEach((month, idx) => {
    const firstDayOfMonth = new Date(year, idx, 1)
    const firstDayOfYear = new Date(year, 0, 1)
    const dayOfYear = Math.floor((firstDayOfMonth.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000))
    const startWeek = Math.floor((dayOfYear + firstDayOfYear.getDay()) / 7)
    labels.push({ month, startWeek })
  })
  return labels
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000

export function GitHubProfile() {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContribs, setTotalContribs] = useState(0)
  const [totalStars, setTotalStars] = useState(0)
  const [loading, setLoading] = useState(true)
  const [repoLoading, setRepoLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)
  const weeks = buildGrid(contributions)
  const monthLabels = buildMonthLabels(selectedYear)

  const loadStatic = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true)
    setRepoLoading(true)
    try {
      const [uRes, rRes1, rRes2, rRes3] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { cache: 'no-store' }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&page=1&type=all`, { cache: 'no-store' }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&page=2&type=all`, { cache: 'no-store' }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&page=3&type=all`, { cache: 'no-store' }),
      ])
      if (uRes.ok) setUser(await uRes.json())
      const fetched: GitHubRepo[] = [
        ...(rRes1.ok ? await rRes1.json() : []),
        ...(rRes2.ok ? await rRes2.json() : []),
        ...(rRes3.ok ? await rRes3.json() : []),
      ]
      if (fetched.length > 0) {
        const stars = fetched.reduce((s, r) => s + r.stargazers_count, 0)
        setTotalStars(stars)
        const sorted = fetched.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
        setRepos(sorted.slice(0, 6))
      }
      setLastUpdated(new Date())
    } catch (e) {
      console.error(e)
    } finally {
      setRepoLoading(false)
      if (isManual) setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    loadStatic()
    const interval = setInterval(() => loadStatic(), REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [loadStatic])

  useEffect(() => {
    let cancelled = false
    async function loadContribs() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchContributions(GITHUB_USERNAME, selectedYear)
        if (cancelled) return
        setContributions(data)
        setTotalContribs(data.reduce((s, d) => s + d.count, 0))
      } catch {
        if (!cancelled) setError('Failed to load contribution data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadContribs()
    return () => { cancelled = true }
  }, [selectedYear])

  // Intersection-driven count-up for the single display number.
  const [heroInView, setHeroInView] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroInView(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const heroCount = useCountUp(totalContribs, 1.6, heroInView)

  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  // Single hero stat line: replaces the 4-col grid with a kicker+number strip
  // so the heatmap is the only visual focus on this page.
  const metaLine = user
    ? [
        `${user.public_repos} public repos`,
        `${totalStars} total stars`,
        `${user.followers} followers`,
        user.location,
      ].filter(Boolean)
    : []

  return (
    <section ref={sectionRef} id="github" className="border-y border-rule/12">
      <div className="max-w-manifest mx-auto px-6 py-24 md:py-32">
        <SectionLabel number="02" label="Open source" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <h2 className="md:col-span-8 display text-4xl md:text-5xl">
            What I&rsquo;m shipping in public.
          </h2>
          <div className="md:col-span-4 flex flex-col justify-end gap-4">
            <p className="text-ink-secondary leading-relaxed">
              A live read of{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-primary underline decoration-ink-primary/30 decoration-2 underline-offset-4 hover:decoration-ink-primary/60 transition-colors"
              >
                github.com/{GITHUB_USERNAME}
              </a>
              . Refreshes every five minutes.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-ink-tertiary">
              {user && (
                <>
                  <span>joined {new Date(user.created_at).getFullYear()}</span>
                  <span className="text-ink-quaternary">/</span>
                  <button
                    onClick={() => loadStatic(true)}
                    disabled={refreshing}
                    className="inline-flex items-center gap-1.5 hover:text-ink-primary transition-colors disabled:opacity-50"
                  >
                    {refreshing && <Loader2 className="w-3 h-3 animate-spin" />}
                    {refreshing ? 'refreshing' : 'refresh data'}
                  </button>
                  {lastUpdated && (
                    <>
                      <span className="text-ink-quaternary">/</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Single-line meta strip — replaces the 4-col stats grid */}
        {metaLine.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 pb-8 mb-12 border-b border-rule/12 font-mono text-sm text-ink-secondary">
            {metaLine.map((m, i) => (
              <span key={m} className="inline-flex items-baseline gap-2">
                <span className="text-ink-primary">{m}</span>
                {i < metaLine.length - 1 && <span className="text-ink-quaternary">/</span>}
              </span>
            ))}
          </div>
        )}

        {/* Heatmap — the hero. Full-width, larger 16px cells, single display number above. */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Kicker accent>Activity</Kicker>
              <div className="display text-7xl md:text-8xl mt-4 leading-[0.9] tracking-tightest tabular-nums">
                {loading ? '…' : error ? '—' : heroCount.toLocaleString()}
              </div>
              <Kicker className="block mt-3">
                contributions in {selectedYear}
              </Kicker>
            </div>
            <div className="flex flex-col items-start md:items-end gap-4">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-3 py-1.5 rounded-sm transition-colors ${
                      y === selectedYear
                        ? 'bg-ink-primary text-paper'
                        : 'text-ink-tertiary hover:text-ink-primary border border-rule/12'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-ink-tertiary">
                <span>less</span>
                {CELL_STYLES.map((cls, i) => (
                  <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
                ))}
                <span>more</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <Loader2 className="w-6 h-6 animate-spin text-ink-tertiary" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-32 text-sm text-ink-tertiary">
                {error}
              </div>
            ) : (
              <div>
                <div className="flex mb-3 h-5 ml-12 relative">
                  {monthLabels.map((label) => (
                    <div
                      key={label.month}
                      className="text-[11px] font-mono text-ink-tertiary absolute"
                      style={{ left: `${(label.startWeek / Math.max(weeks.length, 1)) * 100}%` }}
                    >
                      {label.month}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col gap-[4px] pr-3 text-[10px] font-mono text-ink-tertiary w-8 pt-1">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                      <div key={i} className="h-[16px] flex items-center justify-end">{d}</div>
                    ))}
                  </div>
                  <div className="flex gap-[4px]">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[4px]">
                        {week.map((day, di) => (
                          <div
                            key={`${wi}-${di}`}
                            onMouseEnter={(e) => {
                              if (day.date) {
                                const rect = (e.target as HTMLElement).getBoundingClientRect()
                                setTooltip({
                                  text: `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top - 8,
                                })
                              }
                            }}
                            onMouseLeave={() => setTooltip(null)}
                            className={`w-4 h-4 rounded-sm transition-all duration-150 hover:ring-2 hover:ring-ink-primary hover:ring-offset-1 hover:ring-offset-paper cursor-default ${
                              day.level === -1 ? 'bg-transparent' : CELL_STYLES[Math.min(day.level, 4)] ?? CELL_STYLES[0]
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent repos */}
        <div>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <Kicker accent>Recent work</Kicker>
              <h3 className="display text-3xl md:text-4xl mt-3">
                Latest six repositories.
              </h3>
            </div>
            {user && (
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-tertiary hover:text-ink-primary transition-colors inline-flex items-center gap-1.5"
              >
                all {user.public_repos} on github
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

          {repos.length > 0 ? (
            <BentoGrid cols={3} gap="sm" className="border border-rule/12">
              {repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  <BentoCard variant="flat" hover="translate" className="p-6 md:p-8 flex flex-col h-full">
                    <Kicker className="block mb-3">
                      pushed {formatPushedDate(repo.pushed_at)}
                    </Kicker>
                    <div className="font-mono text-base text-ink-primary group-hover:underline decoration-ink-primary/40 underline-offset-4 break-all mb-3 transition-colors">
                      {repo.name}
                    </div>
                    {repo.description && (
                      <p className="text-sm text-ink-secondary leading-relaxed line-clamp-3 mb-6 min-h-[3.75rem]">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 font-mono text-xs text-ink-tertiary mt-auto">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#888' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 h-px w-0 bg-ink-primary group-hover:w-full transition-all duration-slow ease-out-soft"
                    />
                  </BentoCard>
                </a>
              ))}
            </BentoGrid>
          ) : repoLoading ? (
            <div className="flex items-center justify-center py-20 text-sm text-ink-tertiary font-mono">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              loading repositories&hellip;
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 text-sm text-ink-tertiary font-mono">
              no repositories found
            </div>
          )}
        </div>
      </div>

      {/* Floating tooltip — paper-on-ink */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 bg-ink-primary text-paper text-xs font-mono rounded-md -translate-x-1/2 -translate-y-full shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  )
}

export type { GitHubUser, GitHubRepo, ContributionDay }
