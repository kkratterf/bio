import { cacheLife } from "next/cache";
import { siteUrl } from "./site";

/**
 * All-time page views of the site, read from PostHog with a HogQL query.
 *
 * Needs two server-only env vars (never NEXT_PUBLIC_):
 * - POSTHOG_PERSONAL_API_KEY: a personal API key (phx_...) with the
 *   `query:read` scope, limited to the kkratter.com project.
 * - POSTHOG_PROJECT_ID: the numeric id of that project.
 *
 * Without them, or when PostHog doesn't answer, it returns null and the
 * counter is not shown. The result is cached and refreshed in the background
 * every 5 minutes, so visitors never wait for PostHog and the API sees at most
 * a dozen queries an hour.
 *
 * The PostHog project is shared with the other kkratter.com sites, so the
 * query keeps only page views on this host. Analytics run without cookies, so
 * every visit is counted (there is no stable id to dedupe on).
 */
export async function getVisitorCount(): Promise<number | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  if (!key || !projectId || !/^\d+$/.test(projectId)) return null;

  const apiHost = (process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://eu.posthog.com").replace(/\/+$/, "");
  const host = new URL(siteUrl).hostname;
  // The hostname comes from our own config; still, keep it to safe characters.
  if (!/^[a-z0-9.-]+$/i.test(host)) return null;

  try {
    const res = await fetch(`${apiHost}/api/projects/${projectId}/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: `SELECT count() FROM events WHERE event = '$pageview' AND properties.$host = '${host}'`,
        },
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { results?: unknown[][] };
    const count = Number(data.results?.[0]?.[0]);
    return Number.isFinite(count) && count > 0 ? count : null;
  } catch {
    return null;
  }
}
