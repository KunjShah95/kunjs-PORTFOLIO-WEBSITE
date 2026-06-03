export const prerender = false

const GITHUB_USERNAME = 'KunjShah95'
const CACHE_TTL_SECONDS = 300 // 5 minutes — matches the browser refresh interval

export async function GET() {
  try {
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { 'User-Agent': 'kunjshah-portfolio' },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=100&type=owner`,
        { headers: { 'User-Agent': 'kunjshah-portfolio' } },
      ),
    ])

    if (!uRes.ok) {
      return new Response(
        JSON.stringify({ error: `GitHub user API returned ${uRes.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      )
    }
    if (!rRes.ok) {
      return new Response(
        JSON.stringify({ error: `GitHub repos API returned ${rRes.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const user = await uRes.json()
    const repos = await rRes.json()

    const totalStars = repos.reduce(
      (s: number, r: { stargazers_count: number }) => s + r.stargazers_count,
      0,
    )

    // Sort by most recently pushed, newest first
    const sorted = [...repos].sort(
      (a: { pushed_at: string }, b: { pushed_at: string }) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )

    const data = {
      user: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
        location: user.location,
        company: user.company,
        blog: user.blog,
      },
      repos: sorted.slice(0, 6).map(
        (r: {
          id: number
          name: string
          html_url: string
          description: string | null
          language: string | null
          stargazers_count: number
          forks_count: number
          pushed_at: string
          topics: string[]
        }) => ({
          id: r.id,
          name: r.name,
          html_url: r.html_url,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          pushed_at: r.pushed_at,
          topics: r.topics ?? [],
        }),
      ),
      allRepos: sorted.map(
        (r: {
          id: number
          name: string
          language: string | null
          stargazers_count: number
          pushed_at: string
        }) => ({
          id: r.id,
          name: r.name,
          language: r.language,
          stargazers_count: r.stargazers_count,
          pushed_at: r.pushed_at,
        }),
      ),
      totalStars,
      fetchedAt: new Date().toISOString(),
    }

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${CACHE_TTL_SECONDS}, max-age=0`,
      },
    })
  } catch (e) {
    console.error('GitHub proxy error:', e)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
