# Off-site amplification kit

The on-site AI-crawlability setup is already strong. The missing signal is earned
off-site evidence: links from repositories and profiles that a reader or an
answer engine can follow back to a page that answers the query directly.

Nothing in this file is a claim the site does not already make. Every number
below comes from `lib/site-data.ts` and the published machine-readable files.

## 1. GitHub profile README

Paste into `KunjShah95/KunjShah95/README.md` (the profile repo), then set the
GitHub profile Website field to `https://kunjshah.in` if it is not already set.

```markdown
## Kunj Shah — AI Engineer & Agent Builder

I build the AI feature, then prove it works. Based in Ahmedabad, India.

- 14 shipped AI systems, each with a case study that links source, tests and measured results
- 138+ merged pull requests (67 public) across 32 external repositories
- Agents, RAG search, full-stack AI apps and edge computer vision

**Hire me for a project:** https://kunjshah.in/hire-ai-agent-developer
**Verify the work first:** https://kunjshah.in/proof-of-work
**Automation consulting:** https://kunjshah.in/ai-automation-consultant-ahmedabad
```

## 2. Repository README footer

There are 67 **public merged pull requests**, not 67 public repositories. Only
edit repositories you own, and only where the link is relevant. Run
`scripts/publish-github-backlinks.ps1` to see the eligible set; without `-Apply`
it is a dry run. The current target is the profile README plus the 16 repos the
portfolio cites as shipped work. Re-running is a no-op for repos already linked.

Keep the anchor text descriptive: it is what a crawler reads as the reason for
the link.

```markdown
---
Built by [Kunj Shah](https://kunjshah.in), AI engineer in Ahmedabad.
[See the shipped-project portfolio and 138+ merged PRs (67 public)](https://kunjshah.in/proof-of-work).
Available for [fixed-scope AI agent projects](https://kunjshah.in/hire-ai-agent-developer).
```

For a repo whose README already has an author line, replace that line rather
than adding a second one. Do not paste the block into forks you do not own.

## 3. One linkable case-study post

The post is `https://kunjshah.in/writing/how-to-vet-an-ai-agent-developer-before-hiring`.
It is built from the same shipped systems as the proof page, so the claims in a
LinkedIn or dev-community post can point at something checkable.

Suggested post text:

> I wrote up the vetting pass I would run on any AI agent developer, including
> my own record: definition of done, an eval that can fail, source and tests,
> a limitations section, and merged PRs in repositories you do not own.
> The case study uses 14 shipped systems and 138+ merged PRs (67 public), and
> says plainly what that proof does not show.
> https://kunjshah.in/writing/how-to-vet-an-ai-agent-developer-before-hiring

Publish it on LinkedIn and one dev community where the work is on-topic. The
goal is a link and a citation pickup, not a launch-day spike.

## 4. Cross-link with Srijan Studio

Add a reciprocal, descriptive link from a relevant page on both sites. The
target URL needs to be confirmed before it is added; do not guess it. Once
confirmed, the link should use the partner's name as the anchor text and sit in
an "Collaborators" or "Selected work" section, not in a link dump.

## Checkpoints

- **Monthly:** domain rating.
- **Weekly:** SerpApi rank for "hire AI agent developer", "AI automation consultant Ahmedabad" and "proof of work AI engineer".
- **Biweekly:** Exa index coverage of the three new pages and the case-study post.
