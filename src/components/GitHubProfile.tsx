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
import { BentoGrid, BentoCard } from './bento'

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

  const metaLine = user
    ? [
        `${user.public_repos} public repos`,
        `${totalStars} total stars`,
        `${user.followers} followers`,
        user.location,
      ].filter(Boolean)
    : []

  return (
    <section id="github" className="border-y border-rule/12">
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

        {/* Single-line meta strip */}
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
            <BentoGrid cols={3} className="border border-rule/12">
              {repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  <BentoCard variant="default" className="p-6 md:p-8 flex flex-col h-full">
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
    </section>
  )
}

export type { GitHubUser, GitHubRepo }
