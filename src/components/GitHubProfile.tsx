import {
  Star,
  GitFork,
  Loader2,
  ArrowUpRight,
  Clock,
} from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { IDENTITY } from '../data/portfolio'
import { SectionLabel } from './ui/SectionLabel'
import { Kicker } from './ui/Kicker'
import { LiquidGlass, TiltCard, SpotlightCard, TextReveal, CountUp } from './effects'

const GITHUB_USERNAME = IDENTITY.github_username

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

function formatPushedDate(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000

export function GitHubProfile() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [totalStars, setTotalStars] = useState(0)
  const [repoLoading, setRepoLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

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

  return (
    <section id="github" className="border-y border-rule/12 overflow-hidden bg-sunken/5">
      <div className="max-w-manifest mx-auto px-6 py-24 md:py-32">
        <SectionLabel number="04" label="Open source" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <h2 className="md:col-span-8 display text-4xl md:text-5xl leading-[1.05]">
            <TextReveal text="What I'm shipping in public." />
          </h2>
          <div className="md:col-span-4 flex flex-col justify-end gap-4">
            <p className="text-ink-secondary leading-relaxed">
              A live read of{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/30 decoration-2 underline-offset-4 hover:decoration-accent/65 font-semibold transition-colors"
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
                    className="inline-flex items-center gap-1.5 hover:text-accent font-semibold transition-colors disabled:opacity-50"
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

        {/* Glassmorphic user statistics bar */}
        {user && (
          <div className="mb-14">
            <LiquidGlass intensity="subtle" tint="rgba(124, 118, 255, 0.05)" className="p-6 rounded-2xl border border-rule/8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-center md:text-left">
                <div>
                  <div className="text-2xl font-bold text-ink-primary">
                    <CountUp value={user.public_repos} duration={1} />
                  </div>
                  <div className="text-xs text-ink-tertiary uppercase tracking-wider mt-1">public repos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink-primary">
                    <CountUp value={totalStars} duration={1} />
                  </div>
                  <div className="text-xs text-ink-tertiary uppercase tracking-wider mt-1">total stars</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink-primary">
                    <CountUp value={user.followers} duration={1} />
                  </div>
                  <div className="text-xs text-ink-tertiary uppercase tracking-wider mt-1">followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ink-primary">
                    {user.location || 'Ahmedabad, IN'}
                  </div>
                  <div className="text-xs text-ink-tertiary uppercase tracking-wider mt-1">location</div>
                </div>
              </div>
            </LiquidGlass>
          </div>
        )}

        {/* Recent repos list */}
        <div>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <Kicker accent>Recent work</Kicker>
              <h3 className="display text-3xl md:text-4xl mt-3 font-bold">
                Latest six repositories.
              </h3>
            </div>
            {user && (
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent font-bold hover:text-accent-hover transition-colors inline-flex items-center gap-1.5"
              >
                all {user.public_repos} on github
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
          </div>

          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {repos.slice(0, 6).map((repo) => (
                <div key={repo.id}>
                  <TiltCard scale={1.015} maxRotation={5}>
                    <SpotlightCard className="h-full rounded-2xl">
                      <LiquidGlass
                        intensity="subtle"
                        tint="rgba(124, 118, 255, 0.08)"
                        className="p-6 md:p-8 flex flex-col h-full min-h-[220px] border border-rule/12 hover:border-accent/40 group transition-all"
                      >
                        <div className="mb-4">
                          <Kicker className="block mb-2 text-[10px]">
                            pushed {formatPushedDate(repo.pushed_at)}
                          </Kicker>
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-base font-bold text-ink-primary hover:text-accent underline decoration-transparent hover:decoration-accent/40 underline-offset-4 break-all transition-colors"
                          >
                            {repo.name}
                          </a>
                        </div>

                        {repo.description && (
                          <p className="text-sm text-ink-secondary leading-relaxed line-clamp-3 mb-6 flex-1">
                            {repo.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 font-mono text-xs text-ink-tertiary mt-auto pt-4 border-t border-rule/8">
                          {repo.language && (
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-dot"
                                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#888' }}
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" />
                            <span className="font-semibold text-ink-secondary">{repo.stargazers_count}</span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <GitFork className="w-3.5 h-3.5" />
                            <span className="font-semibold text-ink-secondary">{repo.forks_count}</span>
                          </span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-4 h-4 text-accent" />
                          </span>
                        </div>
                      </LiquidGlass>
                    </SpotlightCard>
                  </TiltCard>
                </div>
              ))}
            </div>
          ) : repoLoading ? (
            /* Shimmer loading skeletons */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-[220px] rounded-2xl border border-rule/8 bg-paper/20 overflow-hidden relative">
                  <div className="absolute inset-0 animate-shimmer" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20 text-sm text-ink-tertiary font-mono">
              no repositories found
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export type { GitHubUser, GitHubRepo }
