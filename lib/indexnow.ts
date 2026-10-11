import { DISCOVERY_ASSETS, ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";
import { projects } from "@/lib/site-data";

/**
 * IndexNow key (public). Must match the file at `/{key}.txt` on the origin.
 * Override with INDEXNOW_KEY in production if you rotate it in Bing Webmaster.
 */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "7c4f9e2a1b8d4056a3f2e1d9c8b7a605";

export function indexNowKeyLocation(): string {
  return `${ORIGIN}/${INDEXNOW_KEY}.txt`;
}

/** URLs we want search engines to refresh (pages + discovery assets). */
export function indexNowUrlList(): string[] {
  const paths = [
    ...PUBLIC_ROUTES.map((r) => r.path),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...DISCOVERY_ASSETS.map((a) => a.path),
  ];

  return paths.map((path) => {
    if (path === "") return `${ORIGIN}/`;
    return `${ORIGIN}${path}`;
  });
}

export type IndexNowResult = {
  ok: boolean;
  status: number;
  endpoint: string;
};

/**
 * Notify IndexNow partners (Bing, Yandex, etc.) that URLs changed.
 * @see https://www.indexnow.org/documentation
 */
export async function submitIndexNow(
  urlList: string[],
  endpoint = "https://api.indexnow.org/indexnow",
): Promise<IndexNowResult> {
  const host = new URL(ORIGIN).host;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: indexNowKeyLocation(),
      urlList: urlList.slice(0, 10_000),
    }),
  });

  return { ok: response.ok, status: response.status, endpoint };
}

/** Ping the main IndexNow API and Bing's endpoint (same protocol). */
export async function submitIndexNowAll(urlList: string[]): Promise<IndexNowResult[]> {
  return Promise.all([
    submitIndexNow(urlList),
    submitIndexNow(urlList, "https://www.bing.com/indexnow"),
  ]);
}
