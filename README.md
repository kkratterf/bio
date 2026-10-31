# bio

Personal bio page of Federico Kratter Thaler, a Next.js rebuild of
[avely.me/kkratter](https://avely.me/kkratter).

## Stack

- Next.js 16 (App Router, static prerender) + React 19
- Tailwind CSS v4
- Inter via `next/font` (self-hosted, no layout shift); colours from the
  coss.com (coss ui) light theme
- Mattone, the display face of M63, for the name (`src/fonts`, SIL Open Font
  License 1.1, see `src/fonts/MATTONE-OFL.txt`)
- `next/image` for every picture (AVIF/WebP, responsive `sizes`)

## Content

All content lives in [`src/lib/profile.ts`](src/lib/profile.ts): name, bio,
social profiles (`socials`) and the project sections (`projectSections`).
Images are in `public/images`.

Every card is square. About is a row of four profile cards (two per row
below 1280px); the project sections use two columns on desktop and one below
1280px. Cards follow the coss ui Frame used in M63: a tinted shell with the
header, and a white inner panel with a description and a preview
([`frame-card.tsx`](src/components/frame-card.tsx)).

## SEO

- Full metadata (title, description, canonical, robots, Open Graph `profile`,
  Twitter `summary_large_image`) in `src/app/layout.tsx`
- Generated OG/Twitter image (`opengraph-image.tsx`, `twitter-image.tsx`)
- Favicon and Apple touch icon generated from the avatar
- JSON-LD `ProfilePage` + `Person` (with `sameAs`) + `ItemList` of projects
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- Semantic HTML: one `h1`, one `section` + `h2` per group, card titles as `h3`,
  descriptive link labels, `rel="me"` on profile links

## Configuration

Set the production origin so canonical URLs, sitemap and OG tags are absolute:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

On Vercel the production domain is picked up automatically when the variable is
not set.

## Development

```bash
npm install
npm run dev
```
