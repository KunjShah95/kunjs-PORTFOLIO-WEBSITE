/** Canonical site configuration. Single source of truth for metadata,
 *  navigation, social links, and the machine-readable identity block. */

export const SITE_URL = 'https://kunjshah.vercel.app'

export const IDENTITY = {
  name: 'Kunj Shah',
  initials: 'KS',
  role: 'AI Engineer / Builder',
  personaLine: 'AI engineer building retrieval, agent and model systems that ship.',
  location: 'Ahmedabad, India',
  email: 'kunjkshah05@gmail.com',
  github: 'https://github.com/KunjShah95',
  githubAlt: 'https://github.com/KunjShah01',
  linkedin: 'https://www.linkedin.com/in/kunjshah05',
  x: 'https://x.com/kunjshah_dev',
  huggingface: 'https://huggingface.co/kunjshah01',
  peerlist: 'https://peerlist.io/kunjshah',
  medium: 'https://medium.com/@kkshah2005',
  resume: '/kunjshah_cv.pdf',
  resumeAlt: '/kunjaiml.pdf',
  focus: [
    'Agent systems',
    'Retrieval pipelines',
    'Model infrastructure',
    'Computer vision at the edge',
  ],
} as const

export type NavItem = { href: string; label: string; index: string }

export const NAV: NavItem[] = [
  { href: '/work', label: 'Work', index: '01' },
  { href: '/lab', label: 'Lab', index: '02' },
  { href: '/writing', label: 'Writing', index: '03' },
  { href: '/about', label: 'About', index: '04' },
]

export const SECONDARY_NAV: NavItem[] = [
  { href: '/stack', label: 'Stack', index: '05' },
  { href: '/timeline', label: 'Timeline', index: '06' },
  { href: '/open-source', label: 'Open Source', index: '07' },
  { href: '/contact', label: 'Contact', index: '08' },
]

export const SOCIALS = [
  { label: 'GitHub', handle: 'KunjShah95', href: IDENTITY.github },
  { label: 'LinkedIn', handle: 'kunjshah05', href: IDENTITY.linkedin },
  { label: 'X', handle: '@kunjshah_dev', href: IDENTITY.x },
  { label: 'Hugging Face', handle: 'kunjshah01', href: IDENTITY.huggingface },
  { label: 'Peerlist', handle: 'kunjshah', href: IDENTITY.peerlist },
] as const

/** Open-source contribution record — verified against the public GitHub
 *  activity for KunjShah95. Counts as measured in 2026-06. */
export const OSS_STATS = {
  mergedPRs: 44,
  totalPRs: 72,
  openedIssues: 45,
  projects: 13,
  codeReviews: 18,
  orgs: ['OWASP', 'Microsoft', 'Ollama'],
} as const

export interface Contribution {
  org: string
  label: string
  title: string
  kind: 'merged' | 'proposed'
  tag: string
  url: string
  notable?: boolean
}

export const CONTRIBUTIONS: Contribution[] = [
  {
    org: 'OWASP/Agent-Security-Regression-Harness',
    label: 'OWASP',
    title:
      'Security regression workflow plus a goal-hijack / API-key-extraction scenario for agent testing.',
    kind: 'merged',
    tag: 'AI security',
    url: 'https://github.com/OWASP/Agent-Security-Regression-Harness/pull/109',
    notable: true,
  },
  {
    org: 'microsoft/AI-Engineering-Coach',
    label: 'Microsoft',
    title:
      'AGENTS.md worker definition and trust-flow documentation for the AI engineering coach.',
    kind: 'merged',
    tag: 'documentation',
    url: 'https://github.com/microsoft/AI-Engineering-Coach/pull/50',
    notable: true,
  },
  {
    org: 'ollama/ollama',
    label: 'Ollama',
    title:
      'Proposed token-calculation support with UI display, to cut wasted inference.',
    kind: 'proposed',
    tag: 'inference',
    url: 'https://github.com/ollama/ollama/issues/15639',
    notable: true,
  },
  {
    org: 'Abhash-Chakraborty/Find',
    label: 'Find',
    title:
      'PR issue-ownership triage gate in CI, plus user-feedback loops for person grouping.',
    kind: 'merged',
    tag: 'infrastructure',
    url: 'https://github.com/Abhash-Chakraborty/Find/pull/225',
  },
  {
    org: 'Adoflabs/Veridion',
    label: 'Veridion',
    title: 'Auth enhancements, PWA support, and testing infrastructure.',
    kind: 'merged',
    tag: 'feature',
    url: 'https://github.com/Adoflabs/Veridion/pull/19',
  },
  {
    org: 'Lavina-korani/edupulse-final',
    label: 'EduPulse',
    title: 'RBAC, real-time messaging, i18n/RTL and global search — 10+ merged PRs.',
    kind: 'merged',
    tag: 'feature',
    url: 'https://github.com/Lavina-korani/edupulse-final/pulls?q=author%3AKunjShah95',
  },
  {
    org: 'microsoft/vscode',
    label: 'VS Code',
    title: 'Reported the multi-provider model selection gap (OpenAI / Gemini / Ollama).',
    kind: 'proposed',
    tag: 'issue',
    url: 'https://github.com/microsoft/vscode/issues?q=author%3AKunjShah95',
  },
]

export const EDUCATION = {
  school: 'Indus University',
  degree: 'B.Tech, Computer Science',
  period: '2023 — 2027',
  location: 'Ahmedabad, India',
  focus: 'AI/ML integration, automation and systems engineering.',
} as const

export const EXPERIENCE = [
  {
    id: 'xp-ideaboat',
    org: 'Ideaboat',
    role: 'Python Developer & Full-Stack AI/ML Intern',
    period: 'Jul 2026 — Present',
    from: '2026-07',
    to: null,
    kind: 'role' as const,
    body: 'Backend services and APIs with Python and FastAPI, plus full-stack features across React frontends and Node.js backends. Integrating AI/ML capabilities into production systems and contributing to database design, deployment pipelines and third-party integrations.',
    tags: ['PYTHON', 'FASTAPI', 'REACT', 'NODE.JS', 'AI/ML', 'API DESIGN'],
  },
  {
    id: 'xp-phaze',
    org: 'PHAZE_AI',
    role: 'Automation Intern',
    period: 'Dec 2025 — Feb 2026',
    from: '2025-12',
    to: '2026-02',
    kind: 'role' as const,
    body: 'Automated high-scale enterprise workflows using multi-agent systems and agentic reasoning, integrating AI models into full-stack production pipelines.',
    tags: ['PYTHON', 'AGENTS', 'AUTOMATION', 'FULL STACK'],
  },
  {
    id: 'xp-oss',
    org: 'Open Source',
    role: 'Contributor',
    period: '2025 — Present',
    from: '2025-01',
    to: null,
    kind: 'track' as const,
    body: '44 merged pull requests across 13 external projects, including OWASP (agent-security regression harness), Microsoft (AI-Engineering-Coach) and Ollama. Shipped CI gates, security scenarios, feature work and documentation. 45 issues opened.',
    tags: ['OWASP', 'CI/CD', 'AI SECURITY', 'DOCUMENTATION'],
  },
  {
    id: 'xp-hackathons',
    org: 'Hackathons',
    role: 'Finalist',
    period: '2025 — 2026',
    from: '2025-01',
    to: '2026-12',
    kind: 'track' as const,
    body: 'Finalist in four hackathons, including Autonomous Hacks 2026 (selected from 2000+ teams online, then 300+ in the offline final) and Odoo x Adani 2026 (final round of 100+ teams).',
    tags: ['AUTONOMOUS HACKS', 'ODOO x ADANI', 'SIH', 'WALMART', 'GOOGLE AGENTIC'],
  },
  {
    id: 'xp-education',
    org: 'Indus University',
    role: 'B.Tech, Computer Science',
    period: '2023 — 2027',
    from: '2023-08',
    to: '2027-05',
    kind: 'track' as const,
    body: 'Specialising in the intersection of full-stack development and AI: distributed systems that use intelligence at scale. Focus on AI/ML integration and automation.',
    tags: ['CS', 'AI/ML', 'AUTOMATION', 'DISTRIBUTED SYSTEMS'],
  },
] as const

export const HACKATHONS = [
  {
    event: 'Autonomous Hacks',
    year: 2026,
    placement: 'Finalist',
    team: 'Solo',
    note: 'Selected from 2000+ teams in the online round, then 300+ in the offline final. Built an autonomous AI system end to end in 48 hours.',
  },
  {
    event: 'Odoo x Adani',
    year: 2026,
    placement: 'Finalist',
    team: '4',
    note: 'Selected for the final round out of 100+ teams.',
  },
  {
    event: 'AIDTM Hackathon',
    year: 2026,
    placement: 'Participant',
    team: '3',
    note: 'Organised by Adani.',
  },
  {
    event: 'AMD Slingshot',
    year: 2026,
    placement: 'Participant',
    team: '2',
    note: 'Challenge participation.',
  },
  {
    event: 'Odoo Gandhinagar',
    year: 2025,
    placement: 'Finalist',
    team: '3',
    note: 'Selected for the final round out of 350+ teams.',
  },
  {
    event: 'Smart India Hackathon',
    year: 2025,
    placement: 'Finalist',
    team: '6',
    note: 'Qualified as a college-level finalist.',
  },
  {
    event: 'Walmart',
    year: 2025,
    placement: 'Participant',
    team: '3',
    note: 'Innovation challenge.',
  },
  {
    event: 'Google Agentic AI Hackathon',
    year: 2025,
    placement: 'Participant',
    team: '2',
    note: 'Agentic AI track.',
  },
  {
    event: 'Yorkie Hackathon',
    year: 2025,
    placement: 'Participant',
    team: '2',
    note: 'Challenge participation.',
  },
] as const
