import type { NextConfig } from "next";

// PostHog ingestion region: EU by default.
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
const posthogAssetsHost = posthogHost.replace(".i.posthog.com", "-assets.i.posthog.com");

// The old portfolio lived on kkratter.com until this site replaced it and now
// lives on portfolio.kkratter.com. Its URLs are still in Google's index and in
// links around the web, so send them to the same page there instead of a 404.
const legacyPortfolioUrl = "https://portfolio.kkratter.com";
const legacyPortfolioSlugs = [
  "ant-design",
  "brama-collection",
  "echo-collection",
  "finanz",
  "fusillo",
  "i-cigni-selvatici-a-coole",
  "intesa-san-paolo",
  "myjuve",
  "one-of-us",
  "orgvsm-series",
  "otto-e-mezzo-nello-sguardo-di-paul-ronald",
  "reply-creative-challenge",
  "sponsorsmart",
  "street-photography",
  "trough-the-looking-glass",
  "unipolmove",
  "unipolpay",
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Required by the PostHog reverse proxy: its API paths end with a slash.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: `/:slug(${legacyPortfolioSlugs.join("|")})`,
        destination: `${legacyPortfolioUrl}/:slug`,
        permanent: true,
      },
      { source: "/secret/:slug", destination: `${legacyPortfolioUrl}/secret/:slug`, permanent: true },
      { source: "/image/:path*", destination: `${legacyPortfolioUrl}/image/:path*`, permanent: true },
      { source: "/favicon/:path*", destination: `${legacyPortfolioUrl}/favicon/:path*`, permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: `${posthogAssetsHost}/static/:path*` },
      { source: "/ingest/array/:path*", destination: `${posthogAssetsHost}/array/:path*` },
      { source: "/ingest/:path*", destination: `${posthogHost}/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
