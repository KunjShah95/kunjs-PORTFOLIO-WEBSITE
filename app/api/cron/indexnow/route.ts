import { indexNowUrlList, submitIndexNowAll } from "@/lib/indexnow";

/**
 * Weekly IndexNow ping (configure in vercel.json crons).
 * Requires CRON_SECRET — Vercel sends `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return Response.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const urlList = indexNowUrlList();
  const results = await submitIndexNowAll(urlList);

  return Response.json({
    submitted: urlList.length,
    results,
  });
}
