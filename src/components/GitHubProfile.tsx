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
  Activity,
  Code2,
  RefreshCw,
  Globe,
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { IDENTITY } from '../data/portfolio'

const GITHUB_USERNAME = IDENTITY.github_username

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Contribution cell colors — aligned with the theme's primary (indigo/violet)
const CELL_STYLES = [
  'bg-surfaceHighlight',        // level 0 — no contributions
  'bg-primary/15',              // level 1 — low
  'bg-primary/35',              // level 2 — medium
  'bg-primary/60',              // level 3 — high
  'bg-primary',                 // level 4 — peak
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

// Animated counter hook
function useCountUp(target: number, duration = 1.2) {
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    count.set(target)  // drive the source; spring animates to follow
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [target, count, spring])

  return display
}

function StatCardMinimal({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: number
}) {
  const animated = useCountUp(value)
  
  return (
    <div className="flex items-center gap-3 p-3 bg-surfaceHighlight/50 rounded-lg">
      <div className="p-1.5 bg-primary/10 rounded">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-lg font-bold text-txt font-mono tabular-nums">{animated}</div>
        <div className="text-[10px] text-muted uppercase tracking-wide">{label}</div>
      </div>
    </div>
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
    .slice(0, 25)
    .map(([lang, cnt]) => ({ lang, pct: (cnt / total) * 100 }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-surface border border-border rounded-lg p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-txt">Language Distribution</h3>
      </div>

      {/* Stacked bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden gap-px">
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
            title={`${lang}: ${pct.toFixed(0)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 pt-1">
        {sorted.map(({ lang, pct }) => (
          <div key={lang} className="flex items-center gap-1.5 min-w-0">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: LANGUAGE_COLORS[lang] ?? '#6b7280' }}
            />
            <span className="text-[11px] text-muted font-medium truncate">{lang}</span>
            <span className="text-[11px] text-muted/50 flex-shrink-0">{pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </motion.div>
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

  if (contributions.length > 0) {
    const dayOfWeek = new Date(contributions[0].date).getDay()
    for (let i = 0; i < dayOfWeek; i++) week.push({ date: '', count: 0, level: -1 })
  }

  contributions.forEach((day) => {
    week.push(day)
    if (week.length === 7) { weeks.push(week); week = [] }
  })

  if (week.length > 0) {
    while (week.length < 7) week.push({ date: '', count: 0, level: -1 })
    weeks.push(week)
  }
  return weeks
}

function buildMonthLabels(weeks: ContributionDay[][]) {
  const labels: { month: string; idx: number }[] = []
  weeks.forEach((week, wi) => {
    const first = week.find((d) => d.date)
    if (first) {
      const d = new Date(first.date)
      if (d.getDate() <= 7) labels.push({ month: MONTHS[d.getMonth()], idx: wi })
    }
  })
  return labels
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

export function GitHubProfile() {
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])        // recent 8 for display
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([])  // all repos for language stats
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContribs, setTotalContribs] = useState(0)
  const [totalStars, setTotalStars] = useState(0)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  // Fetch user profile + repos — callable for manual & auto refresh
  const loadStatic = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true)
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
      if (isManual) setRefreshing(false)
    }
  }, [])

  // Initial load + auto-refresh every 5 min
  useEffect(() => {
    loadStatic()
    const interval = setInterval(() => loadStatic(), REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [loadStatic])

  // Fetch contributions when year changes
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
  const monthLabels = buildMonthLabels(weeks)

  // Tooltip state
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  return (
    <section id="github" className="section-padding relative overflow-hidden bg-bg">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary/4 rounded-full blur-3xl" />
      </div>

      <div className="container-aligned relative z-10 space-y-12">
        {/* ─── Section Header ─── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Activity className="w-4 h-4" />
              Open Source Activity
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              GitHub Profile
            </h2>
            {lastUpdated && (
              <p className="text-[11px] text-muted/50">
                Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => loadStatic(true)}
              title="Refresh live data"
              className="p-2 rounded-lg border border-border bg-surface hover:border-primary/40 hover:text-primary text-muted transition-all"
            >
              <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            {user && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all"
              >
                <Github className="w-4 h-4" />
                @{user.login}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* ─── Profile Summary Card ─── */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border rounded-lg p-6"
          >
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <StatCardMinimal icon={BookOpen} label="Repos" value={user.public_repos} />
              <StatCardMinimal icon={Users} label="Followers" value={user.followers} />
              <StatCardMinimal icon={Star} label="Stars" value={totalStars} />
              <StatCardMinimal icon={GitFork} label="Following" value={user.following} />
            </div>
            
            {/* Quick facts row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>Member since {new Date(user.created_at).getFullYear()}</span>
              </div>
              {user.location && (
                <div className="flex items-center gap-2 text-muted">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[200px]">{user.blog.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Heatmap + Languages (Two Columns) ─── */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Contribution Heatmap - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3 bg-surface border border-border rounded-lg p-6 sm:p-8 space-y-6"
          >
            {/* Heatmap header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/15">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-txt">Contribution Activity</h3>
                  <p className="text-xs text-muted font-light mt-0.5">
                    {loading ? 'Loading…' : error ? 'Unavailable' : `${totalContribs.toLocaleString()} contributions in ${selectedYear}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Year selector */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-surfaceHighlight hover:bg-border/50 transition-all rounded-md text-xs font-medium text-txt border border-border/70"
                  >
                    <Calendar className="w-3 h-3 text-muted" />
                    {selectedYear}
                    <ChevronDown className={`w-3 h-3 text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg overflow-hidden z-30 min-w-[90px] shadow-2xl shadow-black/20">
                      {years.map((y) => (
                        <button
                          key={y}
                          onClick={() => { setSelectedYear(y); setDropdownOpen(false) }}
                          className={`w-full px-4 py-2 text-left text-xs hover:bg-surfaceHighlight transition-colors ${y === selectedYear ? 'text-primary font-semibold bg-primary/5' : 'text-txt'}`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="hidden sm:flex items-center gap-1.5 ml-2">
                  <span className="text-[10px] text-muted">Less</span>
                  {CELL_STYLES.map((cls, i) => (
                    <div key={i} className={`w-3 h-3 rounded-[2px] ${cls}`} />
                  ))}
                  <span className="text-[10px] text-muted">More</span>
                </div>
              </div>
            </div>

            {/* Heatmap grid */}
            <div className="relative overflow-x-auto pb-1">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-5 h-5 animate-spin text-muted" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 text-sm text-muted">{error}</div>
              ) : (
                <div className="min-w-max select-none">
                  {/* Month labels */}
                  <div className="flex mb-1.5 relative h-4 ml-[30px]">
                    {monthLabels.map((label, i) => (
                      <div
                        key={i}
                        style={{ position: 'absolute', left: `${(label.idx / weeks.length) * 100}%` }}
                        className="text-[10px] font-medium text-muted/70"
                      >
                        {label.month}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-[3px]">
                    {/* Day labels */}
                    <div className="flex flex-col gap-[3px] pr-1.5 text-[8px] font-mono text-muted/50 w-[26px] pt-[13px]">
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                        <div key={i} className="h-[11px] flex items-center justify-end">{d}</div>
                      ))}
                    </div>

                    {/* Cells */}
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
                            className={`w-[11px] h-[11px] rounded-[2px] transition-opacity hover:opacity-80 cursor-default ${
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
          </motion.div>

          {/* Language Distribution - 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-2"
          >
            <LanguageBar repos={allRepos} />
          </motion.div>
        </div>

        {/* ─── Recent Repositories ─── */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-primary" />
              <h3 className="text-base font-bold text-txt">Recent Repositories</h3>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1"
            >
              View all
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {repos.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="flex-shrink-0 w-[280px] group flex flex-col gap-3 p-5 bg-surface border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <GitBranch className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm font-semibold text-txt group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted/40 group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>

                  {repo.description && (
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">{repo.description}</p>
                  )}

                  <div className="flex items-center gap-4 mt-auto pt-1">
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
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-sm text-muted">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Loading repositories…
            </div>
          )}
        </div>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none px-2.5 py-1.5 bg-surface border border-border rounded-md text-[11px] text-txt font-medium shadow-xl -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  )
}
