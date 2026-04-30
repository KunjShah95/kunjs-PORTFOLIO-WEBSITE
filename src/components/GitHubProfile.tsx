import { motion, useMotionValue, useSpring } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Calendar,
  GitBranch,
  Star,
  Users,
  BookOpen,
  ChevronDown,
  Loader2,
  GitFork,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { IDENTITY } from '../data/portfolio'

const GITHUB_USERNAME = IDENTITY.github_username

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// GitHub contribution colors (dark theme)
const CELL_STYLES = [
  'bg-[#161b22]',        // level 0 — no contributions
  'bg-[#0e4429]',        // level 1 — low
  'bg-[#006d32]',        // level 2 — medium
  'bg-[#26a641]',        // level 3 — high
  'bg-[#39d353]',        // level 4 — peak
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

function useCountUp(target: number, duration = 1.2) {
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    count.set(target)
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [target, count, spring])

  return display
}

function StatCard({
  icon: Icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ElementType
  label: string
  value: number
  delay?: number
}) {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useCountUp(triggered ? value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-txt font-mono tabular-nums tracking-tight">{animated}</div>
          <div className="text-xs text-muted font-medium uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

function LanguageBar({ repos }: { repos: GitHubRepo[] }) {
  const langMap: Record<string, number> = {}
  repos.forEach((r) => {
    if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1
  })

  const total = Object.values(langMap).reduce((s, v) => s + v, 0)
  if (total === 0) return null

  const sorted = Object.entries(langMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([lang, cnt]) => ({ lang, pct: (cnt / total) * 100 }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="p-6 bg-surface border border-border rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-primary/10 rounded-lg">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-txt">Top Languages</h3>
      </div>

      <div className="flex h-3 rounded-full overflow-hidden gap-px mb-4">
        {sorted.map(({ lang, pct }) => (
          <motion.div
            key={lang}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: `${pct}%`,
              backgroundColor: LANGUAGE_COLORS[lang] ?? '#6b7280',
              transformOrigin: 'left',
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {sorted.map(({ lang, pct }) => (
          <div key={lang} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[lang] ?? '#6b7280' }}
            />
            <span className="text-xs text-muted font-medium">{lang}</span>
            <span className="text-xs text-muted/50">{pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function RepoCard({ repo, delay = 0 }: { repo: GitHubRepo; delay?: number }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="group block p-5 bg-surface border border-border rounded-xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 bg-surfaceHighlight rounded-md">
            <GitBranch className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold text-txt group-hover:text-primary transition-colors truncate">
            {repo.name}
          </span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted/40 group-hover:text-primary transition-colors flex-shrink-0" />
      </div>

      {repo.description && (
        <p className="text-xs text-muted leading-relaxed line-clamp-2 mb-4">{repo.description}</p>
      )}

      <div className="flex items-center gap-4 mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#6b7280' }}
            />
            <span className="text-[10px] text-muted">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-[10px] text-muted">
          <Star className="w-3 h-3" />
          {repo.stargazers_count}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted">
          <GitFork className="w-3 h-3" />
          {repo.forks_count}
        </div>
      </div>
    </motion.a>
  )
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

  // API returns days starting from Jan 1st - pad beginning to align with actual day of week
  if (contributions.length > 0) {
    const firstDate = new Date(contributions[0].date)
    const dayOfWeek = firstDate.getDay() // 0 = Sunday
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

  // Pad end if incomplete
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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([])
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContribs, setTotalContribs] = useState(0)
  const [totalStars, setTotalStars] = useState(0)
  const [loading, setLoading] = useState(true)
  const [repoLoading, setRepoLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

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
        setAllRepos(sorted)
        setRepos(sorted.slice(0, 8))
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
    async function loadContribs() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchContributions(GITHUB_USERNAME, selectedYear)
        setContributions(data)
        setTotalContribs(data.reduce((s, d) => s + d.count, 0))
      } catch {
        setError('Failed to load contribution data')
      } finally {
        setLoading(false)
      }
    }
    loadContribs()
  }, [selectedYear])

  const weeks = buildGrid(contributions)
  const monthLabels = buildMonthLabels(selectedYear)

  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  return (
    <section id="github" className="py-48 md:py-64 px-4 sm:px-6 relative overflow-hidden bg-bg">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Open Source</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-txt">
              GitHub Profile
            </h2>
            {lastUpdated && (
              <p className="text-xs text-muted/60">
                Live data · Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => loadStatic(true)}
              title="Refresh live data"
              className="p-2.5 rounded-xl border border-border bg-surface hover:border-primary/40 hover:text-primary text-muted transition-all"
            >
              <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            {user && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all"
              >
                <Github className="w-4 h-4" />
                @{user.login}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            <StatCard icon={BookOpen} label="Repositories" value={user.public_repos} delay={0} />
            <StatCard icon={Users}    label="Followers"    value={user.followers}     delay={0.07} />
            <StatCard icon={Star}     label="Total Stars"  value={totalStars}         delay={0.14} />
            <StatCard icon={GitFork}  label="Following"    value={user.following}     delay={0.21} />
          </motion.div>
        )}

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
            {/* Heatmap header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/10">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-txt">Contribution Activity</h3>
                  <p className="text-sm text-muted mt-0.5">
                    {loading ? 'Loading contributions...' : error ? 'Unable to load' : `${totalContribs.toLocaleString()} contributions in ${selectedYear}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Year selector */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 bg-surfaceHighlight hover:bg-border/50 transition-all rounded-lg text-sm font-medium text-txt border border-border/50"
                  >
                    <Calendar className="w-4 h-4 text-muted" />
                    {selectedYear}
                    <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-surface border border-border rounded-xl overflow-hidden z-30 min-w-[100px] shadow-xl shadow-black/20">
                      {years.map((y) => (
                        <button
                          key={y}
                          onClick={() => { setSelectedYear(y); setDropdownOpen(false) }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-surfaceHighlight transition-colors ${y === selectedYear ? 'text-primary font-semibold bg-primary/5' : 'text-txt'}`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[10px] text-muted mr-1">Less</span>
                  {CELL_STYLES.map((cls, i) => (
                    <div key={i} className={`w-3.5 h-3.5 rounded-sm ${cls}`} />
                  ))}
                  <span className="text-[10px] text-muted ml-1">More</span>
                </div>
              </div>
            </div>

            {/* Heatmap grid */}
            <div className="relative overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12 text-sm text-muted">{error}</div>
              ) : (
                <div className="min-w-[750px]">
                  {/* Month labels row */}
                  <div className="flex mb-2 h-5 ml-10 relative">
                    {monthLabels.map((label) => (
                      <div
                        key={label.month}
                        className="text-[11px] font-medium text-muted/70 absolute"
                        style={{ left: `${(label.startWeek / weeks.length) * 100}%` }}
                      >
                        {label.month}
                      </div>
                    ))}
                  </div>

                  {/* Heatmap grid with day labels */}
                  <div className="flex gap-1">
                    {/* Day labels */}
                    <div className="flex flex-col gap-[3px] pr-2 text-[9px] font-mono text-muted/50 w-8 pt-1">
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                        <div key={i} className="h-[13px] flex items-center justify-end">{d}</div>
                      ))}
                    </div>

                    {/* Week columns */}
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
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
                            className={`w-[13px] h-[13px] rounded-sm transition-all duration-200 hover:ring-2 hover:ring-primary/50 hover:ring-offset-1 hover:ring-offset-bg cursor-default ${
                              day.level === -1 ? 'bg-transparent' : CELL_STYLES[Math.min(day.level, 4)] ?? CELL_STYLES[0]
                            }`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Language + Quick Facts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <LanguageBar repos={allRepos} />

          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="p-6 bg-surface border border-border rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-txt">Profile Details</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Member since', value: new Date(user.created_at).getFullYear().toString() },
                  { label: 'Public repos', value: `${user.public_repos}` },
                  { label: 'Followers', value: `${user.followers}` },
                  ...(user.location ? [{ label: 'Location', value: user.location }] : []),
                  ...(user.blog ? [{ label: 'Website', value: user.blog.replace(/^https?:\/\//, '') }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
                    <span className="text-muted">{label}</span>
                    <span className="text-txt font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-border bg-surfaceHighlight hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all group"
              >
                <Github className="w-4 h-4" />
                View Full Profile
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          )}
        </div>

        {/* Recent Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GitBranch className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-txt">Recent Repositories</h3>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1.5"
            >
              View all
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {repos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {repos.slice(0, 8).map((repo, i) => (
                <RepoCard key={`repo-${repo.id}`} repo={repo} delay={i * 0.05} />
              ))}
            </div>
          ) : repoLoading ? (
            <div className="flex items-center justify-center py-16 text-sm text-muted bg-surface border border-border rounded-2xl">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading repositories...
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-sm text-muted bg-surface border border-border rounded-2xl gap-3">
              <GitBranch className="w-8 h-8 text-muted/40" />
              <p>No repositories found</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 bg-txt text-bg text-xs font-medium rounded-lg shadow-xl -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  )
}