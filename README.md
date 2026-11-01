# kkratter.com

Personal bio site of Federico Kratter Thaler, live at
[kkratter.com](https://kkratter.com). One static page with every project,
profile and piece of writing, built for SEO first.

## Stack

- Next.js 16 (App Router, fully prerendered) + React 19 + TypeScript
- Tailwind CSS v4
- Inter via `next/font` (self-hosted at build time; `@fontsource/inter` feeds
  the generated OG image); colours from the coss ui (coss.com) light theme
- Mattone, the display face of M63, for the name (`src/fonts`, SIL Open Font
  License 1.1, see `src/fonts/MATTONE-OFL.txt`)
- `next/image` for every picture (AVIF/WebP, responsive `sizes`)
- Hosted on Vercel, domain `kkratter.com` managed in Vercel DNS

## Getting started

Requires Node 22 (see `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # optional locally
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with Turbopack                     |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | ESLint (Next.js core web vitals + TypeScript) |
| `npm run lint:fix`  | ESLint with autofix                           |
| `npm run typecheck` | Generate route types and run `tsc --noEmit`   |
| `npm run check`     | Lint, typecheck and build: run before a PR    |

## Editing content

All content lives in [`src/lib/profile.ts`](src/lib/profile.ts):

- `profile`: name, bio, job title, location, avatar
- `socials`: the four About cards (LinkedIn, GitHub, X, Instagram)
- `projectSections`: Projects, Writing (with `posts`, newest first) and Archive
- `sameAs`: external profiles for the JSON-LD `Person`

Images live in `public/images` (`og/` for card previews, `icons/` for Apple
touch icons of each app). Card layout is in
[`frame-card.tsx`](src/components/frame-card.tsx).

## SEO

- Full metadata (title, description, canonical, robots, Open Graph `profile`,
  Twitter `summary_large_image`) in `src/app/layout.tsx`
- Generated OG/Twitter image (`opengraph-image.tsx`, `twitter-image.tsx`)
- Favicon and Apple touch icon generated from the avatar
- JSON-LD `WebSite` + `ProfilePage` + `Person` (roles, `worksFor`,
  `knowsAbout`, `sameAs`) + `ItemList` of typed projects
  (`SoftwareApplication`, `WebApplication`, `WebSite`, `Blog`)
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `llms.txt` for AI search
- Semantic HTML: one `h1`, one `section` + `h2` per group, card titles as `h3`
  links (real anchor text, the click area covers the card)

## Configuration

| Variable               | Where                 | Value                  |
| ---------------------- | --------------------- | ---------------------- |
| `NEXT_PUBLIC_SITE_URL` | Vercel, Production    | `https://kkratter.com` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Vercel, Production | PostHog project API key (`phc_...`) |

It drives canonical URLs, OG tags, sitemap, robots and JSON-LD. When it is
missing, Vercel's production domain is used, then `http://localhost:3000`.
Preview deployments can leave it unset.

## Analytics

PostHog (EU cloud) counts visits, pageviews and outbound clicks. It loads from
`src/instrumentation-client.ts` only when `NEXT_PUBLIC_POSTHOG_KEY` is set, so
previews and local dev are not tracked. Events go through a same-origin proxy
(`/ingest`, rewrites in `next.config.ts`) so ad blockers don't drop them.

It keeps the anonymous id in memory only (`persistence: "memory"`): no
cookies or storage, no consent banner. For a US project also set
`NEXT_PUBLIC_POSTHOG_HOST` and `NEXT_PUBLIC_POSTHOG_UI_HOST` (see
`.env.example`).

## Deploy

Vercel builds every push: `main` goes to production on `kkratter.com`, every
pull request gets a preview URL. `www.kkratter.com` redirects to the apex
domain (set in Vercel → Project → Settings → Domains). GitHub Actions
(`.github/workflows/ci.yml`) runs lint, typecheck and build on every PR.

The previous portfolio lives at
[portfolio.kkratter.com](https://portfolio.kkratter.com) (Vercel project
`portfolio23`) and is linked from the Archive section.

## Releases

Versions follow SemVer and live in `package.json` (`version`); the changelog
is the [GitHub Releases](https://github.com/kkratterf/bio/releases) page, with
notes generated from PR titles and grouped by label (`.github/release.yml`).

To cut a release, open a PR titled `chore(release): vX.Y.Z` that only runs
`npm version X.Y.Z --no-git-tag-version` (it changes `package.json` and
`package-lock.json`), label it `skip-changelog` and merge it. On `main`,
`.github/workflows/release.yml` sees the new version, tags the merge commit
`vX.Y.Z` and publishes the release. It builds nothing (Vercel deploys) and
runs only on pushes that change `package.json`, so a release costs a few
seconds of Actions time.
