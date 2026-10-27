/**
 * Canonical origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in
 * production (e.g. https://bio.kkratter.com); on Vercel the production
 * domain is used automatically when the variable is missing.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
