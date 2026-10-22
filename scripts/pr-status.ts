/**
 * Resolve the true merge state of specific pull requests.
 *
 * The portfolio names OWASP, Microsoft and Ollama as flagship upstream
 * contributions. This checks each one directly, because a closed-unmerged PR
 * is a materially different claim from a merged one.
 *
 * Run with: npx tsx scripts/pr-status.ts
 */
const PRS = [
  "https://api.github.com/repos/OWASP/Agent-Security-Regression-Harness/pulls/109",
  "https://api.github.com/repos/microsoft/AI-Engineering-Coach/pulls/50",
  "https://api.github.com/repos/ollama/ollama/pulls/15691",
  "https://api.github.com/repos/Abhash-Chakraborty/Find/pulls/225",
];

async function run() {
  for (const url of PRS) {
    const label = url.replace("https://api.github.com/repos/", "");
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) audit",
          Accept: "application/vnd.github+json",
        },
      });
      if (!res.ok) {
        console.log(`${label.padEnd(58)} HTTP ${res.status}`);
        continue;
      }
      const data = (await res.json()) as {
        state: string;
        merged: boolean;
        merged_at: string | null;
        title: string;
        user: { login: string };
      };
      console.log(
        `${label.padEnd(58)} state=${data.state.padEnd(7)} merged=${String(data.merged).padEnd(5)} at=${data.merged_at ?? "-"}`,
      );
      console.log(`${" ".repeat(58)} "${data.title}" by ${data.user.login}`);
    } catch (error) {
      console.log(`${label.padEnd(58)} ERR ${error instanceof Error ? error.message : "?"}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 2500));
  }
}

run();
