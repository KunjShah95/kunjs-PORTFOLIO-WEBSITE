// Verified open-source contributions by KunjShah95.
// Source: github.com/KunjShah95 authored PRs/issues (gh search, 2026-06).
// Only external repos (not my own) — curated, one highlight per project.

export interface Contribution {
  org: string;            // owner/repo
  label: string;          // display name
  title: string;          // what I did
  kind: 'merged' | 'proposed';
  tag: string;            // security | infra | feature | docs | ...
  url: string;
  notable?: boolean;      // brand-name org → surface first
}

// Counts verified via GitHub search API (author:KunjShah95), 2026-06.
export const OSS_STATS = {
  mergedPRs: 44,          // external (not my own repos), merged
  openedIssues: 45,       // external issues opened
  totalPRs: 72,           // external, all states
  projects: 13,           // distinct external repos contributed to
  orgs: ['OWASP', 'Microsoft', 'Ollama'],
} as const;

export const CONTRIBUTIONS: Contribution[] = [
  {
    org: 'OWASP/Agent-Security-Regression-Harness',
    label: 'OWASP',
    title: 'Security regression workflow + goal-hijack API-key-extraction scenario for agent testing.',
    kind: 'merged',
    tag: 'AI security',
    url: 'https://github.com/OWASP/Agent-Security-Regression-Harness/pull/109',
    notable: true,
  },
  {
    org: 'microsoft/AI-Engineering-Coach',
    label: 'Microsoft',
    title: 'AGENTS.md worker + trust-flow documentation for the AI engineering coach.',
    kind: 'merged',
    tag: 'docs',
    url: 'https://github.com/microsoft/AI-Engineering-Coach/pull/50',
    notable: true,
  },
  {
    org: 'ollama/ollama',
    label: 'Ollama',
    title: 'Proposed token-calculation support with UI display to cut wasted inference.',
    kind: 'proposed',
    tag: 'inference',
    url: 'https://github.com/ollama/ollama/issues/15639',
    notable: true,
  },
  {
    org: 'Abhash-Chakraborty/Find',
    label: 'Find',
    title: 'PR issue-ownership triage gate (CI) + user-feedback loops for person grouping.',
    kind: 'merged',
    tag: 'infra',
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
    title: 'RBAC, real-time messaging, i18n/RTL, global search — 10+ merged PRs.',
    kind: 'merged',
    tag: 'feature',
    url: 'https://github.com/Lavina-korani/edupulse-final/pulls?q=author%3AKunjShah95',
  },
  {
    org: 'microsoft/vscode',
    label: 'VS Code',
    title: 'Reported multi-provider model selection gap (OpenAI / Gemini / Ollama).',
    kind: 'proposed',
    tag: 'issue',
    url: 'https://github.com/microsoft/vscode/issues?q=author%3AKunjShah95',
  },
];
