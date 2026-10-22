/**
 * Profile every public repository referenced by the portfolio.
 *
 * For each repo this reports the signals a sceptical reviewer actually looks
 * at: age, stars, forks, licence, whether it has a description, and the size
 * of the actual codebase (so "shipped system" can be separated from "a repo
 * with a README").
 *
 * Run with: npx tsx scripts/repo-profile.ts
 */
import { projects, contributions } from "../lib/site-data";

type RepoInfo = {
  slug: string;
  stars: number;
  forks: number;
  created: string;
  pushed: string;
  license: string | null;
  description: string | null;
  sizeKb: number;
  openIssues: number;
  topics: string[];
};

async function repo(owner: string, name: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
      headers: { "User-Agent": "repo-profile", Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      stargazers_count: number;
      forks_count: number;
      created_at: string;
      pushed_at: string;
      license: { spdx_id: string } | null;
      description: string | null;
      size: number;
      open_issues_count: number;
      topics: string[];
    };
    return {
      slug: `${owner}/${name}`,
      stars: data.stargazers_count,
      forks: data.forks_count,
      created: data.created_at.slice(0, 10),
      pushed: data.pushed_at.slice(0, 10),
      license: data.license?.spdx_id ?? null,
      description: data.description,
      sizeKb: data.size,
      openIssues: data.open_issues_count,
      topics: data.topics ?? [],
    };
  } catch {
    return null;
  }
}

async function run() {
  const targets = new Map<string, string>();

  for (const project of projects) {
    if (!project.github) continue;
    const match = project.github.match(/github\.com\/([^/]+)\/([^/#?]+)/);
    if (match) targets.set(match[1] + "/" + match[2], project.title);
  }
  for (const contribution of contributions) {
    const match = contribution.url?.match(/github\.com\/([^/]+)\/([^/]+)\/(pull|issues)/);
    if (match) targets.set(match[1] + "/" + match[2], `contribution: ${contribution.label}`);
  }

  const infos: (RepoInfo | null)[] = [];
  const entries = Array.from(targets.entries());
  for (let i = 0; i < entries.length; i += 6) {
    const batch = entries.slice(i, i + 6);
    infos.push(
      ...(await Promise.all(
        batch.map(async ([path, title]) => {
          const [owner, name] = path.split("/");
          const info = await repo(owner, name);
          if (info) (info as RepoInfo & { title: string }).title = title;
          return info;
        }),
      )),
    );
  }

  console.log(
    "repo".padEnd(46),
    "stars".padStart(5),
    "created".padStart(11),
    "sizeKB".padStart(7),
    "lic".padEnd(5),
    "desc",
  );
  console.log("-".repeat(120));
  for (const info of infos) {
    if (!info) {
      console.log("UNREACHABLE".padEnd(46));
      continue;
    }
    const typed = info as RepoInfo & { title?: string };
    console.log(
      info.slug.padEnd(46),
      String(info.stars).padStart(5),
      info.created.padStart(11),
      String(info.sizeKb).padStart(7),
      String(info.license ?? "-").padEnd(5),
      info.description ? info.description.slice(0, 44) : "NO DESCRIPTION",
    );
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
