// PostHog web analytics. Runs only when NEXT_PUBLIC_POSTHOG_KEY is set (set it
// for the Production environment on Vercel only, so previews and local dev
// stay out of the stats). The SDK is loaded lazily so it never delays the
// first paint or hydration.
//
// Cookieless mode: no cookies, localStorage or sessionStorage, so no consent
// banner is needed. Unique visitors are counted with a privacy-preserving
// hash on PostHog's servers, which must be enabled in the PostHog project
// (Settings → Web analytics → Cookieless tracking), otherwise events are
// dropped.
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
        cookieless_mode: "always",
        person_profiles: "identified_only",
      });
    })
    .catch(() => {
      // Analytics must never break the page.
    });
}
