// PostHog web analytics. Runs only when NEXT_PUBLIC_POSTHOG_KEY is set (set it
// for the Production environment on Vercel only, so previews and local dev
// stay out of the stats). The SDK is loaded lazily so it never delays the
// first paint or hydration.
//
// No cookies: `persistence: "memory"` keeps the anonymous id in memory only
// (no cookies, no localStorage), so no consent banner is needed. Same PostHog
// project and settings as f4, maramao, fratmscript and portfolio.kkratter.com.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        // Same-origin reverse proxy (see rewrites in next.config.ts), so ad
        // blockers don't drop the events.
        api_host: "/ingest",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://eu.posthog.com",
        defaults: "2026-08-30",
        persistence: "memory",
        disable_session_recording: true,
        person_profiles: "identified_only",
      });
    })
    .catch(() => {
      // Analytics must never break the page.
    });
}
